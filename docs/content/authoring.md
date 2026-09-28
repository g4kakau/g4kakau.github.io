# Authoring reference — normative source

This is the single normative owner of the technical publishing contract for
`notes.kakau.tw`: MathJax macros, Kramdown landmines, image/caption
conventions, cross-article references, and cross-site integration rules.
`AGENTS.md` only carries the agent-facing hard requirements (always run
`math: true`, always use `\lvert…\rvert` inline) plus a pointer here — if
`AGENTS.md`'s summary and this file ever disagree, this file is correct.

This file only answers one question: **once a post is decided, how do you
publish it correctly.** Topic selection and briefs are the
`kakau-content-engine` skill's job; auditing is `kakau-content-auditor` and
[`docs/audits/`](../audits/). Branch/front-matter/categories/date rules are
in `AGENTS.md`, not repeated here.

Source: migrated from the retired `g4kakau-writer` skill's technical
sections (2026-09-28), with the repo as the sole normative copy from then on.

---

## 1. MathJax 與 physics package

有數學的文章：front matter 加 `math: true`，內文開頭加：

```markdown
$$\require{physics}$$
```

| 用途 | 寫法 | 不要寫 |
|---|---|---|
| 微分算子 | `\dd{x}`、`\dd{\theta}` | 裸 `dx`、`d\theta` |
| 導數 | `\dv{f}{x}`、`\dv[2]{f}{x}`；行內斜線 `\dv*{f}{x}` | — |
| 偏導數 | `\pdv{f}{x}`、`\pdv*{f}{x}` | — |
| 向量 | `\vb{v}` | — |
| 旋度／散度／叉積／點積 | `\curl`、`\divergence`、`\cross`、`\vdot` | — |
| 絕對值／範數（display） | `\abs{x}`、`\norm{\vb v}` | — |
| 絕對值（行內） | `\lvert x\rvert` | `|x|`、`\left|x\right|` |

- `title`、`description` 是純文字，**不可含 LaTeX**（`11^30 mod 100`，不是 `$11^{30}$`）。
- 重要結論可用 `$$\boxed{…}$$`。
- 台灣用法：矩陣的 column 是「行」、row 是「列」。

## 2. Kramdown 行內公式地雷

Kramdown 先解析 Markdown 才交給 MathJax，下列語法在**行內 `$…$`** 會靜默出錯；display math `$$…$$` 不受影響。

| # | 地雷 | 症狀 | 規則 |
|---|---|---|---|
| 1 | 裸 `\|` | 整段被吞成破碎表格 | 行內用 `\lvert…\rvert`；表格儲存格內用 `\|` |
| 2 | `\\`（矩陣換行） | 矩陣擠成一行 | 多行矩陣一律 display math，句子拆成「文字＋display＋文字」 |
| 3 | 兩個以上成對 `_` | 被配成 `<em>`，下標破碎 | 改 display math |
| 4 | `\{` `\}` | 反斜線被吃掉，集合括號消失 | 行內寫 `\\{` `\\}` |

檢查（`tools/check_posts.rb` 上線前的手動版）：

```bash
# 地雷 1
grep -noP '(?<!\$)\$[^$\n]*\$(?!\$)' _posts/FILE.md | grep '|'
# 地雷 4
grep -noP '(?<!\$)\$[^$\n]*(?<!\\)\\\{[^$\n]*\$(?!\$)' _posts/FILE.md
```

已知現況（2026-09-28）：地雷 4 有 20 處／7 篇尚未修正，渲染已確認錯誤（受影響文章清單與稽核狀態見
[`docs/audits/coverage.md`](../audits/coverage.md) 「待辦」）。

## 3. 圖片與 caption

- 可編輯原始檔放 `assets/img/posts/<slug>/src/`（TikZ `.tex` 等），輸出檔放 `assets/img/posts/<slug>/`。
- 說明性圖提供 light／dark 兩版，命名 `<name>-zh-light.svg`／`<name>-zh-dark.svg`（英文版 `-en-`）。
- Chirpy 原生斜體 caption 不渲染 LaTeX、不支援連結，一律用 `.fig-caption`。需要 caption 的文章在 `$$\require{physics}$$` 後加：

```html
<link rel="stylesheet" href="/assets/css/posts-custom.css">
```

Markdown 圖片之後：

```markdown
![有意義的 alt 文字](/assets/img/posts/slug/fig-zh-light.svg){: .light w="760" }
![有意義的 alt 文字](/assets/img/posts/slug/fig-zh-dark.svg){: .dark w="760" }

**圖 N：** 說明文字，可含 $LaTeX$ 與[連結](/posts/slug/)。
{: .fig-caption }
```

圖片行與 caption 之間**空一行**；`{: .fig-caption }` 緊接 caption，不空行。
HTML block 之後改用 `<p class="fig-caption"><strong>圖 N：</strong>…</p>`。
編號每篇從圖 1 起；舊格式 `<p class="text-center"><em>…</em></p>` 修文時一併換掉。

## 4. 跨文章引用

- `\label`／`\eqref` 是頁面本地的；跨文章引用會顯示 `???`。改用描述文字＋連結：`[第一篇的等效電阻算式](/posts/resistor-cube-1-node-voltage/) $R_{\text{eq}}=\Delta V/I$`。
- 系列內部連結用 `{% post_url YYYY-MM-DD-slug %}`；改檔名日期時同步更新所有引用，否則 build 失敗。
- 不得殘留 Obsidian `[[wikilink]]`。
- 連結要放在數學式外：`[$11^{30}\bmod 100$](/posts/…)`，不是 `$[…](…)$`。
- 不寫「下一篇會介紹」除非下一篇已存在或已在 Notion 排定；否則寫「未來會介紹」。

## 5. 跨站整合

- 不在文章內手寫 CTA 框、UTM 或招生文案。ecosystem footer 由 plugin 自動加入。
- Contextual CTA 只透過 `_data/kakau.yml` 的 `contextual_ctas` mapping；目的地只能用該檔已定義的名稱。
- 招生暫停期間不得新增指向 `apply` 的連結（見 commit `412e86a`）。
- 分析與 attribution 規則見 [`docs/operations/analytics.md`](../operations/analytics.md)、[`docs/operations/attribution.md`](../operations/attribution.md)。

## 6. 發布前檢查

```bash
bash tools/check_integration.sh   # 內含 ruby tools/check_terminology.rb
node --test tools/test_goatcounter.mjs
node --test tools/test_attribution.mjs
bash tools/test.sh          # production build + htmlproofer（會重建 _site）
```

build 通過只代表技術層沒壞，**不代表內容已稽核**；是否已稽核看
[`docs/audits/coverage.md`](../audits/coverage.md)。稽核的分層定義與 pass 語意見
[`docs/content/audit-policy.md`](audit-policy.md)。
