# Kakau 兩站整合：筆記庫交付說明

## 架構

- `_data/kakau.yml`：集中管理 academy destinations、UTM、custom-domain 狀態與首批 contextual CTA mapping。
- `_plugins/kakau_integration.rb`：以 Jekyll hook 自動把 ecosystem footer 加到所有文章。
- `_includes/sidebar.html`：最小 Chirpy include override，在全域 sidebar 加入物理學苑入口；沒有複製或改寫 layout。
- `_includes/contextual-cta.html`：只有 mapping 中的文章顯示，避免每篇文章都變成招生頁。
- `_includes/ecosystem-footer.html`：所有文章的低干擾品牌與跨站入口。
- `/paths/`：editorial learning path 層，與 categories 並存。

## 首批 contextual CTA

共 13 篇，涵蓋「高中物理背後的數學」與「古典力學」兩組內容。目的地只使用 Sample 或 Syllabus；純代數、量子等較遠內容只保留 ecosystem footer。

## 舊 URL 與部署

- 所有 post permalink 保持 `/posts/:title/`。
- `/academy/` 是 Notes 對 Kakau 物理學苑的 canonical bridge page；它不複製價格、日期、成班條件或契約等正式產品資訊。
- `/tutoring-plans/` 僅保留 noindex compatibility redirect，舊連結不會 404，也不會形成重複內容。
- active workflow 仍只監聽 `theme`；已移除監聽 `main/master` 的舊 workflow。
- 2026-09-06 已完成 GitHub Pages custom domain、DNS、TLS 憑證與 Enforce HTTPS；正式網址為 `https://notes.kakau.tw`。

## 發布前人工檢查

- 375、768、1440 px 檢查首頁、sidebar、CTA、學習路徑與長公式。
- 抽查首頁、導讀、關於、聯絡、`/academy/`、legacy redirect、categories、tags、archives，以及至少五篇不同分類文章。
- 依 `docs/custom-domain-cutover.md` 另行安排 custom-domain 切換。
