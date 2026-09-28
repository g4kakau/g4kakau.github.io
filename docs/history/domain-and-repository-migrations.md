# Domain and repository migrations

Append-only provenance log for infrastructure-level changes to this publishing
property (`notes.kakau.tw` / `qavit/kakau-note`). Entries are dated and never
rewritten — a superseded fact gets a new dated entry that closes it out, not
an edit to the old one. This is historical record, not a runbook: none of the
steps below are expected to repeat. Current domain/DNS/hosting state lives in
[`docs/operations/domain-dns.md`](../operations/domain-dns.md).

---

## 2026-09-06 — notes.kakau.tw custom domain cutover

### 目前狀態（as recorded 2026-09-06）

2026-09-06 已完成 GitHub Pages custom domain 綁定，以及 GoDaddy 的 `notes` CNAME。公開 DNS 已正確解析至 `g4kakau.github.io`；production canonical 已切換為 `https://notes.kakau.tw`，TLS 憑證已簽發並啟用 Enforce HTTPS。

`_config.notes-domain.yml` 保留為 migration 驗證紀錄；production workflow 直接使用已切換的 `_config.yml`。

### 已完成的網域設定

1. 先在 GitHub repository 的 Pages 設定加入 custom domain `notes.kakau.tw`，避免子網域遭接管。
2. 在 GoDaddy DNS 建立 `notes` CNAME 記錄，值為 `g4kakau.github.io`；不要指向 `kakau.tw`，也不要使用 wildcard。
3. 公開 DNS resolver 已可解析 `notes.kakau.tw`。
4. GitHub 已核發憑證；`https://notes.kakau.tw` 可連線，Enforce HTTPS 已開啟。

### 程式碼切換

以下項目以獨立 commit 完成：

1. 把 `_config.yml` 的 `url` 改為 `https://notes.kakau.tw`。
2. 新增根目錄 `CNAME`，內容只放 `notes.kakau.tw`。
3. 把 `_data/kakau.yml` 的 `notes.custom_domain_live` 改成 `true`。
4. 執行 `JEKYLL_ENV=production bundle exec jekyll build`，檢查 canonical、feed 與 sitemap。
5. 部署後確認 `g4kakau.github.io` 會保留 path 導向 custom domain，並在 GitHub Pages 開啟 Enforce HTTPS。

### 回復方式（as recorded 2026-09-06，未曾動用）

若憑證或導向異常，回復上述獨立 commit，讓 canonical 回到可用的 GitHub Pages hostname；不要同時讓兩個 hostname 各自成為 canonical。

---

## 2026-09-28 — repository ownership migration（`g4kakau/g4kakau.github.io` → `qavit/kakau-note`）

這是 repository identity 的正規化，不是網站搬家：`notes.kakau.tw`、文章 permalink、canonical URL、作者 identity 全部不變，只把底層 repo 從個人帳號 `g4kakau` 轉移＋更名到 `qavit` 底下的 `kakau-note`。

**已確認完成（用 `gh api` 直接查證，不只憑對話紀錄）：**

- Repository transfer：`qavit/kakau-note`，`id: 1144837062`，`node_id: R_kgDORDzTxg`（與轉移前相同，git history／issues／PR 都保留），`default_branch: theme`。
- `kakau.tw` 已在 `qavit` 帳號下完成 domain verification（`protected_domain_state: verified`），可防止其他帳號搶注這個網域下的 GitHub Pages custom domain。
- `qavit/kakau-note` 的 Pages 設定：`cname: notes.kakau.tw`、`https_certificate.state: approved`、`https_enforced: true`、`build_type: workflow`（沿用既有 `pages.yml`，未修改）。

**當時尚未完成，2026-09-28 稍晚已關閉——見下一則條目：**

- Cloudflare 的 `notes` CNAME 當時仍指向 `g4kakau.github.io`，還沒切到 `qavit.github.io`。網站當時仍正常（`https://notes.kakau.tw` 回 200），因為 GitHub Pages 邊界節點是依 `Host: notes.kakau.tw` 這個標頭路由到目前擁有這個 custom domain 的 repo，不是依 CNAME 目標值本身；加上 domain 已 verified，其他帳號也不能搶這個 custom domain。所以這筆 CNAME 當時沒有急迫性。

**repo 內同時處理的變更：**

- `git remote`（本機）：`https://github.com/qavit/kakau-note.git`。
- `_config.yml` 的 `comments.giscus.repo`：`g4kakau/g4kakau.github.io` → `qavit/kakau-note`（`repo_id`／`category_id` 不變，因為 repository node id 沒變）。
- `README.md`、`AGENTS.md`：repo 名稱與網站說明改為現況。
- `_includes/kakau-attribution.html` 註解：範例 host 改為 `qavit.github.io`。
- **刻意不動**：`CNAME`（本來就是 `notes.kakau.tw`）、`_config.yml` 的 `url`（本來就是 `https://notes.kakau.tw`）、`_data/authors.yml`、`_data/kakau.yml` 的 origin、`.gitmodules`、GoatCounter `id: g4kakau`（純 analytics site id，跟 GitHub owner 無關）、`docs/operations/analytics.md` 裡的 GoatCounter id 說明。
- **待 owner 決定**：`_config.yml` 的 `github.username`（目前是 `g4kakau`）與 `social.links` 裡的 `https://github.com/g4kakau`——這代表 Kakau 品牌側欄的公開 GitHub 連結身份，跟這次 repo 轉移的 infra 決策是不同層次的問題，尚未變更。

---

## 2026-09-28 — Cloudflare `notes` CNAME repointed to `qavit.github.io`

上一則條目記錄的 Cloudflare CNAME 缺口，同日稍晚已由 owner 完成處理並以多組 resolver（含 1.1.1.1、8.8.8.8 與作業系統預設 resolver）驗證：

- Cloudflare 的 `notes` CNAME 現在指向 `qavit.github.io`（不再是 `g4kakau.github.io`）。
- 多組公開 resolver 解析結果一致。
- `https://notes.kakau.tw` 持續回 200，TLS 與 Enforce HTTPS 未受影響。

**此次網域／repo owner 遷移到此結束，沒有未結的 DNS action item。** 若之後需要再動 DNS，開新的一則條目，不要回頭改寫這一則或上一則。
