# Domain, DNS & hosting — current state

Current-state contract for how `notes.kakau.tw` resolves and is served. For
how it got this way, see [`docs/history/domain-and-repository-migrations.md`](../history/domain-and-repository-migrations.md);
that file is historical provenance, not this one — if this file and the
history log ever disagree, this file wins for "what's true now."

## Current facts

| | Value |
|---|---|
| Canonical domain | `notes.kakau.tw` |
| DNS provider | Cloudflare |
| `notes` CNAME target | `qavit.github.io` |
| GitHub Pages repo | `qavit/kakau-note` (`CNAME` file at repo root: `notes.kakau.tw`) |
| HTTPS | Enforced (GitHub-issued certificate) |
| Domain ownership | Verified under the `qavit` GitHub account (`kakau.tw` domain verification), which also blocks other accounts from claiming this custom domain |
| Giscus repo binding | `qavit/kakau-note` (`repo_id: R_kgDORDzTxg`, unchanged across the repo-ownership migration because the underlying repository node id didn't change) |

There is no open DNS action item as of 2026-09-28.

## Where each fact is actually enforced

This doc is a description, not the implementation. The implementation truth
lives in:

- `_config.yml` — `url:` (canonical URL) and `comments.giscus.*` (Giscus repo binding)
- `CNAME` (repo root) — the custom domain GitHub Pages serves
- Cloudflare's own DNS console — the `notes` CNAME record (not visible from this repo)
- GitHub repository Settings → Pages — custom domain, HTTPS enforcement, domain verification

If this doc and `_config.yml`/`CNAME` ever disagree, treat the config files
as correct and fix this doc, not the other way around — they're what
actually gets built and deployed.

## Changing anything here

A DNS or hosting change (new CNAME target, moving to a different registrar,
re-verifying domain ownership, etc.) is an infrastructure event, not a
content change. Record it as a new dated entry in
[`docs/history/domain-and-repository-migrations.md`](../history/domain-and-repository-migrations.md),
then update the table above to match the new current state.
