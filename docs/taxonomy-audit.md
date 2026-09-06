# Taxonomy audit（2026-09-06）

## 結論

現有 79 篇文章的兩層 categories 統計如下。中文內容的第一層 taxonomy 已一致；唯一英文分類屬於英文翻譯頁，並非誤植，因此本次不改名、不改 URL。

| 第一層 | 篇數 | 判斷 | Canonical |
|---|---:|---|---|
| 大學數學 | 30 | 正常 | 大學數學 |
| 大學物理 | 27 | 正常 | 大學物理 |
| 高中物理 | 14 | 正常 | 高中物理 |
| 高中數學 | 7 | 正常 | 高中數學 |
| High School Math | 1 | 英文翻譯頁的語系隔離 | 保留 High School Math |

英文島為 `_posts/2026-06-14-trig-symmetric-pairing-en.md`，具有 `lang: en`、獨立 `/en/posts/.../` permalink，且與中文版用 `translation_id` 配對。將它合併成中文分類會讓英文讀者進入中文 taxonomy，也不是安全修正。

## 同名次分類

`力學` 與 `電磁學` 同時出現在不同第一層分類下，是合理的學段區分，不應只依名稱批次合併。Chirpy 的 category archive 對同名次分類可能呈現聚合效果；在不更改既有 permalink 的前提下，本次保留。

## 後續規則

- 新增中文文章時，第一層只使用 `高中數學`、`高中物理`、`大學數學`、`大學物理`。
- 英文翻譯頁需有 `lang: en`、獨立 permalink 與 translation pairing，才可使用英文 taxonomy。
- 若未來建立完整英文站，再設計 locale-aware category URL；不要在單篇修正中全面 rename。
