# AGENTS.md — kakau-note AI Agent 操作指引

這個檔案提供給 AI agent（Claude Cowork、Codex 等）使用，說明這個 repo 的架構、規則和慣例。

---

## 基本資訊

| 項目 | 內容 |
|---|---|
| 網站 | https://notes.kakau.tw |
| Repo | `qavit/kakau-note`（2026-09-28 由 `g4kakau/g4kakau.github.io` 轉移並更名而來，repository ID／git history 不變；見 `docs/history/domain-and-repository-migrations.md`） |
| 用途 | 數理家教品牌網站、教學文章、SEO 內容資產 |
| 主題 | [Chirpy](https://github.com/cotes2357/jekyll-theme-chirpy) v7.x |
| Jekyll | 4.4.x |
| Ruby | 3.3.6（rbenv 管理） |
| 部署 | GitHub Pages（Actions workflow），push 到 `theme` branch 自動觸發 |

---

## Branch 規則

- **`theme` branch** = 正式線上版本，所有修改都在這裡
- **`main` branch** = 廢棄的舊版自製 layout，不要動

**所有新文章、修改、commit 都要在 `theme` branch 上進行。**

---

## Git / Commit 身份規範

- 所有 Claude Code、Codex、ChatGPT 或其他 coding agent 在這個 repo 建立的 commit，都必須使用 repo-local 的 `qavit` Git identity（`git config --local`，不是 global）。
- 不得以 `g4kakau`、agent 自己的名字、Claude、ChatGPT、Codex 等身份作為 commit 的 author 或 committer。
- 不得為了這個 repo 去修改 global Git config——只設 `--local`。
- 每次 commit 前，若不確定目前 identity 是什麼，先跑 `git var GIT_AUTHOR_IDENT` 與 `git var GIT_COMMITTER_IDENT` 確認。
- 這條規則從 2026-09-28（`3ee7a18` 之後）生效；`3ee7a18` 以前用 `g4kakau` identity 建立的既有 commit 不回溯修改（不 amend、不 rewrite history）。

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
- **`date`（與檔名日期）預設對應原始素材筆記的日期**，而不是動工／發布當天。若筆記有 `source_created`（對話實際發生的時間），優先用它；沒有的話退而用筆記的 `created`。同一批動工的多篇文章，日期通常會因此打散在不同天，這是預期行為，不要為了方便而全部改成同一天。純自撰、沒有對應筆記的文章才用動工當天的日期。因為 `_posts/` 檔名必須是 `YYYY-MM-DD-slug.md`，改日期等於要重新命名檔案——同時要記得更新所有指向該檔案的 `{% post_url %}` 引用（否則會直接 build failed）。

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
| 大學物理—熱學 | `[大學物理, 熱學]` |

---

## 數學式寫法

這個網站使用 **MathJax v3**（由 Chirpy 內建，front matter 加 `math: true` 啟用）。

| 用途 | 語法 |
|---|---|
| 行內公式 | `$E = mc^2$` |
| 獨立行公式 | `$$F = ma$$` |
| 對齊多行公式 | `$$\begin{aligned} ... \end{aligned}$$` |

Markdown 表格中的 `|` 符號需要跳脫：`\|x\| < 1`。

**重要地雷：行內公式（單個 `$...$`）中的裸 `\|`（例如 `$|x-1|$`）即使不在表格裡，也可能被 Kramdown 誤判成表格分隔符，導致整個段落被吞成一列破碎的表格（`$` 和文字被拆進不同 `<td>`，數學式完全無法渲染）。這不是「有時候」的邊緣案例，是實測會發生的常見錯誤。**

- 行內絕對值一律用 `\lvert x-1\rvert` 而不是 `|x-1|`。
- 這個問題只發生在單行內、段落層級的內容；獨立行公式（`$$...$$`）與真正的 Markdown 表格儲存格（那裡本來就用 `\|` 跳脫）不受影響。
- 寫完後可以用 `grep -noP '(?<!\$)\$[^$\n]*\$(?!\$)' _posts/檔名.md | grep '|'` 快速抓出所有還沒修正的行內裸 `|`。

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
6. **延伸閱讀**：優先提供相關文章或學習路徑

### Kakau 整合元件

- 所有文章會由 `_plugins/kakau_integration.rb` 自動加入 ecosystem footer，不要在文章內手動貼招生框。
- 只有與現行課程高度相關的文章才顯示 contextual CTA；slug mapping 集中在 `_data/kakau.yml`。
- 新文章若需要 contextual CTA，更新集中 mapping，不要自行建立不同文案、UTM 或產品敘事。

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
