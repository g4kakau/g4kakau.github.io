/**
 * Behavioural tests for the Notes-side first-touch attribution capture.
 *
 * The script under test is an inline `<script>` inside a Liquid include, so it is extracted
 * here and run against a stubbed `document`/`window` rather than a browser. What is asserted is
 * the *shared* contract with the Academy (`qavit/kakau-front`, `src/lib/attribution.ts` and
 * `tests/attribution.test.mjs`): both properties write the same cookie, so a rule that holds on
 * one side and not the other produces two first touches that never meet.
 *
 * Run: node tools/test_attribution.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { runInNewContext } from "node:vm";
import test from "node:test";
import assert from "node:assert/strict";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const INCLUDE = join(ROOT, "_includes", "kakau-attribution.html");
const DAY = 24 * 60 * 60 * 1000;

const source = (() => {
  const html = readFileSync(INCLUDE, "utf8");
  const match = html.match(/<script data-kakau-attribution>([\s\S]*?)<\/script>/);
  assert.ok(match, "the include no longer contains the attribution script");
  return match[1];
})();

/**
 * One page load. `cookies` is the jar the fake document reads from; whatever the script writes
 * is parsed back out so the tests can assert on cookie attributes, not just the value.
 */
function visit({ href, referrer = "", cookies = "", cookieThrows = false }) {
  const writes = [];
  const url = new URL(href);
  const document = {
    get cookie() {
      if (cookieThrows) throw new Error("cookies are blocked");
      return cookies;
    },
    set cookie(value) {
      if (cookieThrows) throw new Error("cookies are blocked");
      writes.push(value);
    },
    referrer,
  };
  const window = {
    location: { href, hostname: url.hostname, protocol: url.protocol },
  };
  runInNewContext(source, { document, window, URL, console });

  const written = writes.length > 0 ? writes[writes.length - 1] : null;
  const attributes = {};
  let record = null;
  if (written) {
    const [pair, ...rest] = written.split("; ");
    record = JSON.parse(decodeURIComponent(pair.slice(pair.indexOf("=") + 1)));
    for (const part of rest) {
      const eq = part.indexOf("=");
      if (eq < 0) attributes[part] = true;
      else attributes[part.slice(0, eq)] = part.slice(eq + 1);
    }
  }
  return { writes, written, record, attributes };
}

/** The cookie as it would already exist in the visitor's browser. */
function jar(value) {
  return `kakau_attr=${encodeURIComponent(typeof value === "string" ? value : JSON.stringify(value))}`;
}

const fresh = (extra) => ({
  utm_source: "facebook",
  landing_path: "/",
  first_seen_at: new Date().toISOString(),
  attribution_version: 1,
  ...extra,
});

test("a UTM deep-link into an article is a first touch", () => {
  const { record, attributes } = visit({
    href: "https://notes.kakau.tw/posts/taylor-series/?utm_source=facebook&utm_medium=group&utm_campaign=fall2026&utm_content=note_taylor",
  });

  assert.deepEqual(record, {
    landing_path: "/posts/taylor-series/",
    first_seen_at: record.first_seen_at,
    attribution_version: 1,
    utm_source: "facebook",
    utm_medium: "group",
    utm_campaign: "fall2026",
    utm_content: "note_taylor",
  });
  assert.ok(Date.now() - Date.parse(record.first_seen_at) < 60_000);
});

test("the cookie is scoped to the parent domain so the Academy can read it", () => {
  const { attributes } = visit({
    href: "https://notes.kakau.tw/posts/taylor-series/?utm_source=facebook",
  });

  assert.equal(attributes.Domain, "kakau.tw");
  assert.equal(attributes.Path, "/");
  assert.equal(attributes.SameSite, "Lax");
  assert.equal(attributes.Secure, true);
  assert.equal(attributes["Max-Age"], String(30 * 24 * 60 * 60));
});

test("hosts that are not ours get a host-only cookie, never a parent-domain write", () => {
  for (const href of ["https://g4kakau.github.io/posts/x/?utm_source=facebook", "http://localhost:4000/posts/x/?utm_source=facebook"]) {
    const { attributes } = visit({ href });
    assert.equal(attributes.Domain, undefined, href);
  }
  // http must not claim Secure, or the browser drops the write entirely.
  assert.equal(visit({ href: "http://localhost:4000/?utm_source=facebook" }).attributes.Secure, undefined);
});

test("an external referrer with no UTM is still an acquisition touch", () => {
  const { record } = visit({
    href: "https://notes.kakau.tw/posts/taylor-series/",
    referrer: "https://www.facebook.com/groups/123/?some=thing",
  });

  assert.equal(record.referrer_host, "www.facebook.com");
  assert.equal(record.utm_source, undefined);
  assert.equal(record.landing_path, "/posts/taylor-series/");
});

test("a plain direct visit writes nothing, so a later campaign can still claim it", () => {
  assert.equal(visit({ href: "https://notes.kakau.tw/posts/taylor-series/" }).written, null);
});

test("a live first touch is never overwritten and never renewed", () => {
  const existing = fresh({ utm_medium: "group", landing_path: "/posts/a/" });
  const later = visit({
    href: "https://notes.kakau.tw/posts/b/?utm_source=threads&utm_medium=profile",
    cookies: jar(existing),
  });
  assert.equal(later.written, null);

  // ...and the same holds for the Academy -> Notes -> Academy direction.
  const internal = visit({
    href: "https://notes.kakau.tw/posts/b/",
    referrer: "https://kakau.tw/start",
    cookies: jar(existing),
  });
  assert.equal(internal.written, null);
});

test("after 30 days a new attributed touch becomes the new first touch", () => {
  const stale = fresh({ first_seen_at: new Date(Date.now() - 31 * DAY).toISOString() });
  const { record } = visit({
    href: "https://notes.kakau.tw/posts/b/?utm_source=threads&utm_medium=profile",
    cookies: jar(stale),
  });
  assert.equal(record.utm_source, "threads");
});

test("the internal two-site journey never impersonates an acquisition", () => {
  // Arriving from the Academy, with the Academy's own placement tag on the link.
  const { written } = visit({
    href: "https://notes.kakau.tw/posts/taylor-series/?utm_source=kakau_academy&utm_medium=referral&utm_campaign=content_flywheel",
    referrer: "https://kakau.tw/syllabus",
  });
  assert.equal(written, null);

  // A planted internal record is not a real first touch either: the next real one replaces it.
  const { record } = visit({
    href: "https://notes.kakau.tw/posts/b/?utm_source=1111&utm_medium=referral",
    cookies: jar(fresh({ utm_source: "kakau_academy" })),
  });
  assert.equal(record.utm_source, "1111");
});

test("a tampered cookie is not trusted", () => {
  for (const planted of ["not-json-at-all", { ...fresh(), attribution_version: 2 }, { ...fresh(), first_seen_at: "nonsense" }]) {
    const { record } = visit({
      href: "https://notes.kakau.tw/?utm_source=youtube&utm_medium=organic",
      cookies: jar(planted),
    });
    assert.equal(record?.utm_source, "youtube", `planted: ${JSON.stringify(planted)}`);
  }
});

test("no query string, click id or PII survives into the record", () => {
  const { written, record } = visit({
    href: "https://notes.kakau.tw/posts/taylor-series/?utm_source=facebook&fbclid=IwAR_SECRET&gclid=abc&email=parent%40example.com&name=%E7%8E%8B%E5%B0%8F%E6%98%8E&token=xyz#reply",
    referrer: "https://mail.google.com/mail/u/0/?q=parent@example.com",
  });

  assert.deepEqual(Object.keys(record).sort(), [
    "attribution_version", "first_seen_at", "landing_path", "referrer_host", "utm_source",
  ]);
  assert.equal(record.referrer_host, "mail.google.com");
  const raw = decodeURIComponent(written);
  for (const leak of ["fbclid", "IwAR_SECRET", "gclid", "example.com", "王小明", "token", "xyz", "?", "#"]) {
    assert.ok(!raw.includes(leak), `cookie leaked ${leak}`);
  }
});

test("a crafted link cannot inject, bloat the cookie or break the page", () => {
  const flood = "a".repeat(5000);
  const { written, record } = visit({
    href: `https://notes.kakau.tw/posts/x/?utm_source=${flood}&utm_medium=%22%3E%3Cscript%3Ealert(1)%3C%2Fscript%3E&utm_campaign=${flood}&utm_content=${flood}`,
  });

  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    if (record[key]) assert.ok(record[key].length <= 64, `${key} not capped`);
  }
  // Dangerous characters are dropped, not escaped.
  assert.equal(record.utm_medium, "scriptalert1script");
  assert.ok(written.split(";")[0].length < 1024, "cookie must not balloon");
});

test("an unusable cookie jar is survivable, not a page error", () => {
  assert.doesNotThrow(() =>
    visit({ href: "https://notes.kakau.tw/?utm_source=facebook", cookieThrows: true }),
  );
});
