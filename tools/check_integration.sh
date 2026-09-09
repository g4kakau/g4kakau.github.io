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
check_forbidden "non-Taiwan terminology" '經典力學|坐標|(^|[^演])算法|數組|方差|方程組|標量|固體物理|形狀信息|觀測數據|實驗數據|保存完整|查找|高亮|點擊|端點配置|最高效|高效計算|解耦([^合]|$)' index.html _tabs _includes _posts _data paths docs

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

# Cross-site identity contract. Articles here are authored by a person whose canonical profile
# lives on kakau.tw; that @id is what lets a crawler merge the two sites into one author instead
# of inventing a second one. See _data/authors.yml and _plugins/author_identity.rb.
if ! search_quiet 'id: https://kakau\.tw/about/#person' _data/authors.yml; then
  echo "ERROR: _data/authors.yml no longer points at the canonical Person @id on kakau.tw" >&2
  failures=1
fi

if ! search_quiet '^      author: sin-iu-ho$' _config.yml; then
  echo "ERROR: posts no longer default to the named author; the byline falls back to the brand" >&2
  failures=1
fi

# `social.name` describes the site/brand. Turning it into the person's name would collapse the
# Organization and the Person into one entity, so it must stay as the brand.
if ! search_quiet '^  name: Kakau$' _config.yml; then
  echo "ERROR: social.name must stay the brand name, not the author's name" >&2
  failures=1
fi

if ! search_quiet '何信佑' _tabs/about.md; then
  echo "ERROR: /about/ no longer names the author in human-readable text" >&2
  failures=1
fi

exit "$failures"
