import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * GoatCounter is kept deliberately: it is the only consumer of the five `notes_to_*` CTA events
 * and it backs the per-post view counter. What it must not receive is the query string --
 * `fbclid` on every link shared from Facebook, and Kakau's own `utm_*` on campaign links.
 *
 * These run the settings block out of `_includes/analytics/goatcounter.html` itself, then replay
 * the parts of count.js that decide what actually goes on the wire (`get_data` + `urlencode`,
 * transcribed from the served script). A copy of the settings here would drift; the include is
 * the thing under test.
 */
const include = readFileSync(new URL('../_includes/analytics/goatcounter.html', import.meta.url), 'utf8');

/** Evaluate the settings script against a stub window, as a browser would. */
function loadSettings({ href = 'https://notes.kakau.tw/posts/taylor-series/?fbclid=FBTEST&utm_source=facebook', referrer = '' } = {}) {
  const script = include.match(/<script data-kakau-goatcounter-settings>([\s\S]*?)<\/script>/);
  assert.ok(script, 'the settings script is gone from the include');

  const url = new URL(href);
  const window = { location: { pathname: url.pathname, search: url.search, hostname: url.hostname, href } };
  new Function('window', 'URL', 'location', 'document', script[1])(
    window, URL, window.location, { referrer },
  );
  return { settings: window.goatcounter, ready: window.kakauGoatcounterReady, window };
}

/** count.js, faithfully: the two functions that decide the request. */
function countJsRequest(goatcounter, { location, referrer, vars = {} }) {
  const isEmpty = (v) => v === null || v === undefined || typeof v === 'function';
  const getPath = () => (location.pathname + location.search) || '/';
  const getData = (input) => {
    const data = {
      p: input.path === undefined ? goatcounter.path : input.path,
      r: input.referrer === undefined ? goatcounter.referrer : input.referrer,
      t: input.title === undefined ? goatcounter.title : input.title,
      e: !!(input.event || goatcounter.event),
      q: location.search,
    };
    const rcb = typeof data.r === 'function' ? data.r : undefined;
    const pcb = typeof data.p === 'function' ? data.p : undefined;
    if (isEmpty(data.r)) data.r = referrer;
    if (isEmpty(data.p)) data.p = getPath();
    if (rcb) data.r = rcb(data.r);
    if (pcb) data.p = pcb(data.p);
    return data;
  };
  // The include patches get_data after count.js defines it; do the same here.
  goatcounter.get_data = getData;
  goatcounter.count = () => {};
  const patched = (() => {
    const original = goatcounter.get_data;
    return (input) => {
      const data = original(input || {});
      data.q = '';
      return data;
    };
  })();
  const data = patched(vars);
  // urlencode(): keys with '' / null / undefined / false are omitted entirely.
  return '?' + Object.entries(data)
    .filter(([, v]) => v !== '' && v !== null && v !== undefined && v !== false)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
}

test('the page view carries no query string, by either route', () => {
  const { settings, window } = loadSettings();
  const request = countJsRequest(settings, { location: window.location, referrer: '' });

  for (const leaked of ['fbclid', 'FBTEST', 'utm_source', 'facebook', 'gclid', '%3F', '?fbclid']) {
    assert.ok(!request.slice(1).includes(leaked), `GoatCounter request leaked ${leaked}: ${request}`);
  }
  assert.ok(request.includes(`p=${encodeURIComponent('/posts/taylor-series/')}`), request);
  assert.ok(!/[?&]q=/.test(request), `the q parameter survived: ${request}`);
});

test('an explicit event path still wins, so the five events keep working', () => {
  const { settings, window } = loadSettings();
  for (const event of ['notes_to_academy', 'notes_to_sample', 'notes_to_syllabus', 'notes_to_course', 'notes_to_apply']) {
    const request = countJsRequest(settings, {
      location: window.location, referrer: '', vars: { path: `event/${event}`, title: 'x', event: true },
    });
    assert.ok(request.includes(encodeURIComponent(`event/${event}`)), `${event} lost its path: ${request}`);
    assert.ok(!request.includes('fbclid'), `${event} leaked the query string: ${request}`);
  }
});

test('the referrer is reduced to an origin, and internal clicks are not referrals', () => {
  const { settings } = loadSettings();
  const cases = [
    ['https://l.facebook.com/l.php?u=https%3A%2F%2Fnotes.kakau.tw&h=SECRET', 'https://l.facebook.com'],
    ['https://www.google.com/search?q=%E7%89%A9%E7%90%86', 'https://www.google.com'],
    ['https://notes.kakau.tw/posts/other/', ''],
    ['', ''],
    ['not a url', ''],
  ];
  for (const [input, expected] of cases) {
    assert.equal(settings.referrer(input), expected, `referrer(${JSON.stringify(input)})`);
  }
});

test('no_onload is set, because the q patch has to land before the first count', () => {
  const { settings, ready } = loadSettings();
  assert.equal(settings.no_onload, true, 'without no_onload the async script counts before the patch exists');
  assert.equal(typeof ready, 'function', 'the onload hook is missing; nothing would ever call count()');
});

test('every rendered data-kakau-event is one of the five pinned names', () => {
  // Guards both directions: a typo that silently stops being counted, and a sixth event
  // appearing without a decision. docs/analytics.md is the contract.
  const pinned = new Set(['notes_to_academy', 'notes_to_sample', 'notes_to_syllabus', 'notes_to_course', 'notes_to_apply']);
  const root = new URL('../', import.meta.url).pathname;
  const skip = new Set(['.git', '_site', 'node_modules', '.jekyll-cache', 'vendor', '.claude']);
  const found = new Set();

  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      if (skip.has(entry)) continue;
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) { walk(path); continue; }
      if (!/\.(html|md|markdown)$/.test(entry)) continue;
      const text = readFileSync(path, 'utf8');
      for (const m of text.matchAll(/data-kakau-event="([^"]+)"/g)) {
        // `_includes/contextual-cta.html` renders `{{ event_name }}`; the literal it resolves to
        // is a Liquid `assign` in the same file, picked up by the next matcher. A placeholder is
        // therefore not an unpinned event -- but a file with a placeholder and no assign is.
        if (m[1].includes('{{')) {
          assert.match(text, /assign\s+event_name\s*=\s*'[a-z_]+'/, `${path} renders a Liquid event name but assigns none`);
          continue;
        }
        found.add(m[1]);
      }
      for (const m of text.matchAll(/assign\s+event_name\s*=\s*'([a-z_]+)'/g)) found.add(m[1]);
    }
  };
  walk(root);

  for (const name of found) assert.ok(pinned.has(name), `unpinned event "${name}"; add it to docs/analytics.md and here, or fix the typo`);
  for (const name of pinned) assert.ok(found.has(name), `event "${name}" is no longer rendered anywhere; it silently stopped being measured`);
});
