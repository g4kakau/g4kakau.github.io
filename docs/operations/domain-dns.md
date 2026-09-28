# Domain, DNS & hosting — current state

Current-state contract for how `notes.kakau.tw` resolves and is served. For
how it got this way, see [`docs/history/domain-and-repository-migrations.md`](../history/domain-and-repository-migrations.md);
that file is historical provenance, not this one — if this file and the
history log ever disagree, this file wins for "what's true now."

## Current facts

Public hostname routing and the generated site's canonical URL are two
separate truths, enforced in two different places:

```
Public hostname routing
├── Cloudflare DNS
│   notes.kakau.tw → qavit.github.io
└── GitHub Settings → Pages
    Custom domain = notes.kakau.tw, HTTPS enforced

Generated-site canonical URL
└── _config.yml
    url: "https://notes.kakau.tw"
```

| | Value | Truth lives in |
|---|---|---|
| Canonical domain | `notes.kakau.tw` | `_config.yml` `url:` |
| DNS provider | Cloudflare | Cloudflare's own DNS console (not visible from this repo) |
| `notes` CNAME target | `qavit.github.io` | Cloudflare DNS |
| GitHub Pages custom domain | `notes.kakau.tw` | GitHub repository Settings → Pages |
| HTTPS | Enforced (GitHub-issued certificate) | GitHub repository Settings → Pages |
| Domain ownership | Verified under the `qavit` GitHub account (`kakau.tw` domain verification), which also blocks other accounts from claiming this custom domain | GitHub repository Settings → Pages |
| Giscus repo binding | `qavit/kakau-note` (`repo_id: R_kgDORDzTxg`, unchanged across the repo-ownership migration because the underlying repository node id didn't change) | `_config.yml` `comments.giscus.*` |

There is no open DNS action item as of 2026-09-28.

### About the repo-root `CNAME` file

This repo deploys GitHub Pages through a **custom GitHub Actions workflow**
(`.github/workflows/pages.yml`), not the legacy "branch" Pages source. In
that deployment mode, GitHub Pages **ignores** a repository-root `CNAME`
file entirely — the custom domain is whatever's configured under Settings →
Pages, full stop. The file (currently containing `notes.kakau.tw`, matching
the real setting) is retained as a repository convention / historical
compatibility marker from before the custom-workflow migration, not as
runtime configuration. Don't treat it as a source of truth for the custom
domain, and don't expect changing it to do anything — change Settings →
Pages instead.

## Where each fact is actually enforced

This doc is a description, not the implementation. The implementation truth
lives in:

- `_config.yml` — `url:` (canonical URL) and `comments.giscus.*` (Giscus repo binding)
- Cloudflare's own DNS console — the `notes` CNAME record (not visible from this repo)
- GitHub repository Settings → Pages — custom domain, HTTPS enforcement, domain verification (this is the actual custom-domain truth, not the repo-root `CNAME` file)

If this doc and `_config.yml` ever disagree, treat `_config.yml` as correct
and fix this doc, not the other way around — it's what actually gets built.

## Changing anything here

A DNS or hosting change (new CNAME target, moving to a different registrar,
re-verifying domain ownership, etc.) is an infrastructure event, not a
content change. Record it as a new dated entry in
[`docs/history/domain-and-repository-migrations.md`](../history/domain-and-repository-migrations.md),
then update the table above to match the new current state.
