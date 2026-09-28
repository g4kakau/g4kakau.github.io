# docs/ — index

Four semantic tiers. Knowing which tier a file is in tells you whether to
follow it as an instruction or read it as a record:

| Tier | Meaning |
|---|---|
| `architecture/` | Current system structure — how the thing actually works right now |
| `content/`, `operations/` | Current normative contracts and runbooks — follow these |
| `audits/` | Evidence — dated reports are immutable once committed (corrections are appended, never rewritten); `coverage.md` is the one living index in this tier |
| `history/` | Completed events — provenance, not instructions; nothing here describes what to do next |

This repo is the public knowledge-publishing layer for `notes.kakau.tw`.
It is not Kakau's business roadmap, content backlog, or product spec store —
see `AGENTS.md` for what this repo is and isn't. Anything whose authoritative
source is Notion, Obsidian, or another Kakau repo is referenced here, not
duplicated.

## architecture/

- [`publishing-pipeline.md`](architecture/publishing-pipeline.md) — how a post goes from `_posts/` to a live page: front-matter defaults, the CTA/footer injection hook, analytics/attribution includes, and the CI gate in `pages.yml`.

## content/

- [`authoring.md`](content/authoring.md) — normative source for MathJax macros, Kramdown landmines, image/caption conventions, cross-article references.
- [`taxonomy.md`](content/taxonomy.md) — normative source for `categories` rules (the four top-level values, sub-area table, English-page rules).
- [`audit-policy.md`](content/audit-policy.md) — what "audited" means: the L1–L5 layers, scope types, and pass semantics that audit instances in `audits/` are checked against.

## operations/

- [`analytics.md`](operations/analytics.md) — GoatCounter contract: data-minimization override, event names, maintenance rules.
- [`attribution.md`](operations/attribution.md) — cross-subdomain first-touch attribution: the shared cookie contract with `kakau-front`.
- [`domain-dns.md`](operations/domain-dns.md) — current domain/DNS/hosting facts (canonical domain, CNAME target, HTTPS, Giscus binding).

## audits/

- [`coverage.md`](audits/coverage.md) — living ledger: which post has been checked at which layer, and when. A blank cell means unaudited, not passed.
- [`2026-09-06-taxonomy-audit.md`](audits/2026-09-06-taxonomy-audit.md) — one-time 79-post category-count snapshot; forward-looking rules it found were extracted into `content/taxonomy.md`.
- [`2026-09-08-full-site-fact-audit.md`](audits/2026-09-08-full-site-fact-audit.md) — batch B1–B12 site-wide L1 (scientific/mathematical correctness) audit, 79 posts.
- [`2026-09-28-release-8-new-posts.md`](audits/2026-09-28-release-8-new-posts.md) — release audit for 8 untracked posts before their first commit; the template to follow for future release audits.

## history/

- [`domain-and-repository-migrations.md`](history/domain-and-repository-migrations.md) — append-only log: the 2026-09-06 custom-domain cutover, the 2026-09-28 repository ownership migration, and the same-day DNS repoint that closed it out.
- [`2026-09-06-two-site-integration-delivery.md`](history/2026-09-06-two-site-integration-delivery.md) — delivery notes for the original Kakau Notes ↔ Academy integration (first 13 contextual CTAs, pre-launch checklist). Durable architecture facts from this were extracted into `architecture/publishing-pipeline.md`; this file stays frozen as the delivery record.

## Not here on purpose

Editorial topic selection, briefs, and investment decisions (Create /
Refresh / Consolidate / Skip) live in Kakau's Notion "內容排程" — this repo
only holds content that's already been decided and published. Don't add a
backlog, a roadmap, or a planning draft under `docs/`; if a planning
document was used to arrive at a decision recorded here, the decision is
what's kept, not the draft.
