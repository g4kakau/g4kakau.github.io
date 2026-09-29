# i18n foundation v0.1

## Locale and URLs

- Canonical locales are `zh-TW` and `en`; `zh-TW` is the default.
- Existing Chinese URLs remain unprefixed. A reviewed English post uses `/en/posts/:title/`.
- Locale is URL-driven. There is no automatic language detection or redirect.
- A missing translation is unavailable: do not create an English route, redirect to Chinese, or present Chinese content as English.

## Content translation model

Posts default to `lang: zh-TW`. A translated pair declares the same stable `translation_id`; its English counterpart declares `lang: en` and the explicit `/en/posts/.../` permalink. `_plugins/i18n_foundation.rb` validates duplicate locales and exposes only real peers as `page.translations`.

The model intentionally keeps editorial bodies in post files. It does not put articles in a UI dictionary or introduce a translation CMS.

## SEO and UI

- Chirpy uses each post's `lang` for `<html lang>` and Jekyll SEO Tag's Open Graph locale.
- The existing SEO plugin generates a self-canonical URL. `metadata-hook.html` emits `hreflang` only for existing peers, plus Chinese `x-default`.
- `language-switcher.html` renders only where a post has two published counterparts. It links to the paired post, never to a locale homepage.
- Shared theme UI continues to use Chirpy locale data. Product-specific UI copy should use focused includes/data rather than article translations.

## Adding a translated note

1. Write and review the editorial counterpart; do not machine-translate by default.
2. Add the same `translation_id`, set its `lang`, and give English its `/en/posts/.../` permalink.
3. Build the site and inspect both pages' canonical, `hreflang`, Open Graph locale, metadata, and switcher.

## Terminology

| Term | English |
| --- | --- |
| Kakau | Kakau |
| Kakau 物理學苑 | Kakau Physics Academy |
| Kakau Lab | Kakau Lab |
| Kakau 公開數理筆記 | Kakau Notes |
| 互動模型 | interactive science model |
| 探索 | explore / investigation (not drill) |
| 物理量 | physical quantity |

## Known limitations

Only one existing article pair validates this model in v0.1. Category, tag, home, feed, and search result localization remain Chinese-first until they have a deliberately curated English content surface.
