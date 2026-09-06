#!/usr/bin/env bash

set -eu

failures=0

if command -v rg >/dev/null 2>&1; then
  search() { rg -n -i "$@"; }
  search_quiet() { rg -q "$@"; }
  list_matching() { rg -l "$@"; }
else
  search() { grep -R -n -i -E -- "$@"; }
  search_quiet() { grep -q -E -- "$@"; }
  list_matching() { grep -R -l -E -- "$@"; }
fi

check_forbidden() {
  label="$1"
  pattern="$2"
  shift 2
  if search "$pattern" "$@"; then
    echo "ERROR: found forbidden ${label}" >&2
    failures=1
  fi
}

check_forbidden "legacy production domain" 'kakau-tutor\.vercel\.app' _config.yml index.html _tabs _includes _posts _data
check_forbidden "legacy Google inquiry form" 'forms\.gle/R38gD1b9SecEbufq8' _config.yml index.html _tabs _includes _posts _data
check_forbidden "legacy tutoring CTA" '歡迎預約家教課|需要家教或預約諮詢' _config.yml index.html _tabs _includes _posts _data
check_forbidden "placeholder social account" 'threads\.net/@placeholder' _config.yml index.html _tabs _includes _posts _data

if search '/tutoring-plans/' _tabs _includes index.html _data; then
  echo "ERROR: /tutoring-plans/ remains a primary navigation destination" >&2
  failures=1
fi

if [[ ! -f _tabs/academy.md ]] || ! search_quiet '^permalink: /academy/$' _tabs/academy.md; then
  echo "ERROR: /academy/ bridge page is missing" >&2
  failures=1
fi

if [[ ! -f tutoring-plans/index.html ]] || ! search_quiet "canonical.*academy" tutoring-plans/index.html; then
  echo "ERROR: legacy /tutoring-plans/ compatibility redirect is missing" >&2
  failures=1
fi

if [[ $(list_matching '<div class="cta-box">|\{% include cta\.html %\}' _posts | wc -l | tr -d ' ') != "0" ]]; then
  echo "ERROR: post-level legacy CTA markup remains" >&2
  failures=1
fi

if [[ $(find _posts -type f -name '*.md' | wc -l | tr -d ' ') -lt 1 ]]; then
  echo "ERROR: no posts found" >&2
  failures=1
fi

exit "$failures"
