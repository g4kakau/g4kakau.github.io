# notes.kakau.tw 切換手冊

## 目前狀態

2026-09-06 實測 `notes.kakau.tw` 尚未解析。因此 production `_config.yml` 暫時維持 `https://g4kakau.github.io`，避免 canonical、feed、sitemap 與使用者連結指向不可達 hostname。

`_config.notes-domain.yml` 是 migration-ready 的 build overlay，不會被目前 production workflow自動採用。

## 切換前驗證

1. 先在 GitHub repository 的 Pages 設定加入 custom domain `notes.kakau.tw`，避免子網域遭接管。
2. 在 GoDaddy DNS 建立 `notes` CNAME 記錄，值為 `g4kakau.github.io`；不要指向 `kakau.tw`，也不要使用 wildcard。
3. 等待公開 DNS resolver 能解析 `notes.kakau.tw`；GitHub 說明 DNS 傳播最長可能需要 24 小時。
4. 等待 GitHub 核發憑證，確認 `https://notes.kakau.tw` 可連線。

## 程式碼切換

完成上述驗證後，再用一個獨立 commit：

1. 把 `_config.yml` 的 `url` 改為 `https://notes.kakau.tw`。
2. 新增根目錄 `CNAME`，內容只放 `notes.kakau.tw`。
3. 把 `_data/kakau.yml` 的 `notes.custom_domain_live` 改成 `true`。
4. 執行 `JEKYLL_ENV=production bundle exec jekyll build`，檢查 canonical、feed 與 sitemap。
5. 部署後確認 `g4kakau.github.io` 會導向 custom domain，並在 GitHub Pages 開啟 Enforce HTTPS。

## 回復方式

若憑證或導向異常，回復上述獨立 commit，讓 canonical 回到可用的 GitHub Pages hostname；不要同時讓兩個 hostname 各自成為 canonical。
