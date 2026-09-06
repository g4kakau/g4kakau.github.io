# notes.kakau.tw 切換手冊

## 目前狀態

2026-09-06 已完成 GitHub Pages custom domain 綁定，以及 GoDaddy 的 `notes` CNAME。公開 DNS 已正確解析至 `g4kakau.github.io`；production canonical 已切換為 `https://notes.kakau.tw`。GitHub Pages 的新 HTTPS 憑證仍可能需要一段時間簽發。

`_config.notes-domain.yml` 保留為 migration 驗證紀錄；production workflow 直接使用已切換的 `_config.yml`。

## 已完成的網域設定

1. 先在 GitHub repository 的 Pages 設定加入 custom domain `notes.kakau.tw`，避免子網域遭接管。
2. 在 GoDaddy DNS 建立 `notes` CNAME 記錄，值為 `g4kakau.github.io`；不要指向 `kakau.tw`，也不要使用 wildcard。
3. 公開 DNS resolver 已可解析 `notes.kakau.tw`。
4. 等待 GitHub 核發憑證，確認 `https://notes.kakau.tw` 可連線並開啟 Enforce HTTPS。

## 程式碼切換

以下項目以獨立 commit 完成：

1. 把 `_config.yml` 的 `url` 改為 `https://notes.kakau.tw`。
2. 新增根目錄 `CNAME`，內容只放 `notes.kakau.tw`。
3. 把 `_data/kakau.yml` 的 `notes.custom_domain_live` 改成 `true`。
4. 執行 `JEKYLL_ENV=production bundle exec jekyll build`，檢查 canonical、feed 與 sitemap。
5. 部署後確認 `g4kakau.github.io` 會保留 path 導向 custom domain，並在 GitHub Pages 開啟 Enforce HTTPS。

## 回復方式

若憑證或導向異常，回復上述獨立 commit，讓 canonical 回到可用的 GitHub Pages hostname；不要同時讓兩個 hostname 各自成為 canonical。
