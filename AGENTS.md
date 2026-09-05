# AGENTS.md — g4kakau.github.io AI Agent 操作指引

這個檔案提供給 AI agent（Claude Cowork、Codex 等）使用，說明這個 repo 的架構、規則和慣例。

---

## 基本資訊

| 項目 | 內容 |
|---|---|
| 網站 | https://g4kakau.github.io |
| 用途 | 數理家教品牌網站、教學文章、SEO 內容資產 |
| 主題 | [Chirpy](https://github.com/cotes2357/jekyll-theme-chirpy) v7.x |
| Jekyll | 4.4.x |
| Ruby | 3.3.6（rbenv 管理） |
| 部署 | GitHub Pages，push 到 `theme` branch 自動觸發 |

---

## Branch 規則

- **`theme` branch** = 正式線上版本，所有修改都在這裡
- **`main` branch** = 廢棄的舊版自製 layout，不要動

**所有新文章、修改、commit 都要在 `theme` branch 上進行。**

---

## 新增文章的規則

### 檔案位置與命名

```
_posts/YYYY-MM-DD-英文-kebab-case-slug.md
```

### Front Matter 模板

```yaml
---
layout: post
title: "文章標題（繁體中文）"
date: YYYY-MM-DD 00:00:00 +0800
categories: [大分類, 小分類]
tags: [tag1, tag2, tag3]
math: true
description: "一句話摘要，約 50–120 字，給 SEO meta description 用"
---
```

**重要規則：**
- `math: true` 是 Chirpy 啟用 MathJax 的開關。有數學式的文章**一定要加**，否則 `$...$` 不會渲染。
- `categories` 採兩層：大分類在前，小分類在後。
- `tags` 用來補充關鍵字，盡量包含使用者會搜尋的詞彙（繁體中文）。
- `layout: post` 不可省略。

### Categories 慣例

| 文章類型 | categories |
|---|---|
| 高中物理—力學 | `[高中物理, 力學]` |
| 高中物理—靜力學 | `[高中物理, 靜力學]` |
| 高中物理—波動 | `[高中物理, 波動]` |
| 高中物理—電磁學 | `[高中物理, 電磁學]` |
| 大學微積分 | `[大學數學, 微積分]` |
| 大學線性代數 | `[大學數學, 線性代數]` |
| 大學常微分方程 | `[大學數學, 常微分方程]` |
| 大學物理—電磁學 | `[大學物理, 電磁學]` |
| 大學物理—電路學 | `[大學物理, 電路學]` |
| 大學物理—力學 | `[大學物理, 力學]` |
| 大學物理—古典場論 | `[大學物理, 古典場論]` |
| 大學物理—量子場論 | `[大學物理, 量子場論]` |
| 大學物理—天文物理 | `[大學物理, 天文物理]` |
| 高中物理—近代物理 | `[高中物理, 近代物理]` |
| 高中數學—三角函數 | `[高中數學, 三角函數]` |
| 高中數學—幾何 | `[高中數學, 幾何]` |
| 高中數學—代數 | `[高中數學, 代數]` |
| 高中物理—核物理 | `[高中物理, 核物理]` |

---

## 數學式寫法

這個網站使用 **MathJax v3**（由 Chirpy 內建，front matter 加 `math: true` 啟用）。

| 用途 | 語法 |
|---|---|
| 行內公式 | `$E = mc^2$` |
| 獨立行公式 | `$$F = ma$$` |
| 對齊多行公式 | `$$\begin{aligned} ... \end{aligned}$$` |

Markdown 表格中的 `|` 符號需要跳脫：`\|x\| < 1`。

---

## 內容風格

### 目標讀者

- **高中生**：選修物理（III、IV）、段考複習、大考衝刺
- **大學生**：微積分、線性代數、普通物理
- **家長**：尋找家教資訊

### 文章結構慣例

1. **開場**：用一個直覺問題或生活場景帶入
2. **直覺說明**：用類比或圖像，不直接丟公式
3. **正式定義/推導**：清楚分節，用 `##`、`###`
4. **應用/例題**：至少一個具體例子
5. **總結**：表格或條列整理重點
6. **CTA 框**：放在文章最後

### CTA 框

```html
<div class="cta-box">
  <strong>還有問題嗎？</strong><br>
  <a href="/contact">→ 歡迎預約家教課，直接針對你的問題討論</a>
</div>
```

### 語言

- 繁體中文（台灣用法）
- 術語第一次出現時附英文：`動量（momentum）`
- 避免簡體中文詞彙

---

## SEO 原則

- `title` 盡量包含目標關鍵字（放在句首更好）
- `description` 約 50–120 字，說清楚「讀這篇可以學到什麼」
- 文章內部連結：同系列文章之間互相連結
- 圖片加 `alt` 屬性

---

## 內容來源

教學筆記位於：`~/Documents/Obsidian/TEACHING/`（家教課記錄、AI 對話匯出、課程規劃）與 `~/Documents/Obsidian/Archive/`（雜項對話匯出，內含大量數理內容，**每次挖掘素材都要一併掃描**，並非只是備存舊資料）。

重要索引：
- `~/Projects/life-os-pm/content-backlog.md` — 文章待辦清單
- `~/Projects/life-os-pm/docs/jingan-knowledge-index.md` — jingan 系列（微積分/線代/物理）內容地圖

高潛力文章候選（依優先序）：
1. 泰勒展開（已完成）
2. 積分換元法（tutor-jing'an-10–12）
3. 特徵值與特徵向量（tutor-jing'an-41–44）
4. 行列式的幾何意義（tutor-jing'an-34–35）
5. Gram–Schmidt 正交化（tutor-jing'an-47–48）

---

## 禁止事項

- 不要修改 `main` branch
- 不要 push `DEV_NOTES.md`（在 `.gitignore`）
- 不要移除 `math: true`（除非文章真的沒有數學）
- 不要使用 Chirpy 以外的 layout（`home`、`base` 是舊版殘留）
- 不要在文章裡硬寫 MathJax script tag（Chirpy 已內建）

---

_最後更新：2026-05-10_
