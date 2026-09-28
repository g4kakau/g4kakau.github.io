# Audit policy — layers, scope, and pass semantics

This defines what "audited" means for content on `notes.kakau.tw`, as a
policy — distinct from any single audit *instance*. Instances (findings,
evidence, dispositions) live in [`docs/audits/`](../audits/) and are never
edited after publication; this file is edited when the policy itself
changes. Audits are run by the `kakau-content-auditor` skill (evidence-first,
read-only by default); this file documents the contract it works against,
not the skill's internals.

## Layers

Every audit instance scopes itself to one or more of these layers. A post
can be audited at L1 without ever having been checked at L3 — that's a real,
trackable state, not a gap to silently assume away.

| Layer | Checks | Machine-checkable? |
|---|---|---|
| **L1** — 科學／數學正確性 | 數值、算式、物理／數學命題、史實與命名、內部一致性、措辭（see the 6-point standard in [`docs/audits/2026-09-08-full-site-fact-audit.md`](../audits/2026-09-08-full-site-fact-audit.md)) | No — requires independent recalculation |
| **L2** — 教學品質 | Structure, clarity, whether simplifications mislead rather than aid intuition | No — judgment call; may be checked without a per-item score (acceptable per precedent in the 2026-09-28 release audit) |
| **L3** — SEO／架構 | Internal links, duplicate/cannibalizing intent, categories correctness, `description` length (50–120 chars per `docs/content/authoring.md`'s front-matter contract) | Partially — length and category values are checkable; intent overlap is not |
| **L4** — Funnel | Contextual CTA correctness, UTM hygiene, no links into paused enrollment flows | Partially — `tools/check_integration.sh` catches some (e.g. `/tutoring-plans/` as primary nav, legacy CTA markup) |
| **L5** — 技術發布 | Kramdown landmines (`docs/content/authoring.md` §2), `math: true` presence, build success, `htmlproofer`, terminology | Yes — `tools/check_integration.sh`, `tools/test.sh`, `node --test tools/test_*.mjs` |

## Scope types

An audit instance declares one scope. These are the scopes actually used to
date, not an aspirational list:

- **Single Asset** — one post
- **Cluster** — a named series (e.g. the logarithm series, the resistor-cube series)
- **Release / PR** — everything untracked/new since the last audited baseline, before it's committed (see [`docs/audits/2026-09-28-release-8-new-posts.md`](../audits/2026-09-28-release-8-new-posts.md) for the shape of this)
- **Site-wide** — the whole `_posts/` corpus at a point in time (see [`docs/audits/2026-09-08-full-site-fact-audit.md`](../audits/2026-09-08-full-site-fact-audit.md))
- **Migration** — triggered by an infrastructure or ownership change, checking that content wasn't silently invalidated
- **Post-deployment** — checking what actually shipped, not just what was about to ship

## Pass semantics

- **A blank cell in [`docs/audits/coverage.md`](../audits/coverage.md) means "not yet audited at that layer," never "passed."** Only a filled-in date, pointing at a report, counts as evidence of a check having happened.
- Findings are logged with a severity: **BLOCKER** (must fix before commit/publish), **P1**, **P2**, **P3** (in roughly descending urgency; see the findings register format in `docs/audits/2026-09-28-release-8-new-posts.md` §3 for the columns an instance should have: ID, Asset, Layer, Severity, Finding, Evidence, Recommendation, Acceptance).
- An asset's **disposition** after an audit is one of: **KEEP**, **KEEP (after fixing X)**, or a call for **Refresh / Consolidate / Rebuild / Skip** (the latter four are editorial-investment decisions handed back to the `kakau-content-engine` workflow / Notion, not resolved inside the audit itself).
- **Audit reports are immutable once committed.** A later correction is appended as a new dated section within the same report (see `2026-09-28-release-8-new-posts.md` §10 for the pattern) or as a new dated report — never a silent rewrite of a prior finding.
- **`coverage.md` is the one living exception** — it's an index, updated in place as new layers get checked for existing posts. The dated report files it points to are not.

## Cadence

No fixed schedule is established yet beyond what's already happened
(a full site-wide L1 pass, and release audits run per batch of new/untracked
posts before commit). Establishing a recurring cadence (e.g. quarterly
site-wide L3/L4 review against Search Console and GoatCounter data) is an
editorial-investment decision, not a repo policy change — track it in
Notion, not here.
