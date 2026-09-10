# Kakau 跨站分析約定

## 現況

筆記庫使用 GoatCounter（site id：`g4kakau`）。所有由筆記庫前往 `kakau.tw` 的共用連結集中在 `_data/kakau.yml`，並帶有：

- `utm_source=kakau_notes`
- `utm_medium=referral`
- `utm_campaign=content_flywheel`

頁面上的跨站連結另有 `data-kakau-event`。`_includes/kakau-analytics.html` 會在 GoatCounter 可用時送出自訂事件；分析服務被阻擋時不影響導覽。


## 送出前的資料最小化（2026-09-10）

主題預設的 `_includes/analytics/goatcounter.html` 直接載入 `count.js` 且不帶任何設定。
那樣會把**完整查詢字串送出兩次**：一次在 `p` 裡（`get_path()` 回傳 `pathname + search`），
一次是 `count.js` 無條件從 `location.search` 塞進去的 `q` 參數。

於是每一條從 Facebook 分享回來的文章連結，其 `fbclid` 都會進到 `zgo.at`；
Kakau 自己的檔期連結則會把 `utm_*` 一起送過去。**計算一次瀏覽不需要這些東西。**

本 repo 以 `_includes/analytics/goatcounter.html` 覆寫主題版本，做三件事：

| | 改動 | 為什麼 |
|---|---|---|
| 1 | `path` 回傳 `location.pathname` | 預設是 `pathname + search` |
| 2 | 在 `count.js` 定義 `get_data` **之後**把 `q` 設為空字串 | 這一項**沒有**設定可用；`urlencode()` 會略過空值，所以 `q` 是整個消失而不是送出 `q=` |
| 3 | `referrer` 只留 origin | 足以分辨 Facebook 與 Google，但不會夾帶對方站上的查詢字串；同網域 referrer 直接清空 |

第 2 項需要 `no_onload: true` 才可能：`count.js` 一執行就會計算頁面瀏覽，而 script 是 `async`，
掛 `onload` 已經太遲。關掉自動計算之後，由我們在補丁就位後自行呼叫 `count()`。

**五個事件不受影響**：`get_data` 對顯式的 `vars.path` 優先於設定值，
所以 `count({path: 'event/notes_to_apply'})` 送出的仍然就是那個路徑。

驗證：`node --test tools/test_goatcounter.mjs`（含事件名稱的正反向釘選），
`tools/check_integration.sh` 會在覆寫檔消失或三個關鍵片段被刪時擋下來。

**GoatCounter 的隱私特性請照實描述**：依其官方說明，它不把 IP、完整 User-Agent
或追蹤識別碼寫進資料庫，瀏覽器端也不使用 cookie／localStorage；
但為了辨識重複造訪，會在**記憶體中暫時處理** site + IP + User-Agent，最長八小時。
對外文件不要寫成「GoatCounter 永久保存訪客 IP」——那是不正確的。

## 事件名稱

| 事件 | 用途 |
|---|---|
| `notes_to_academy` | 筆記庫前往物理學苑首頁 |
| `notes_to_sample` | 筆記庫前往試讀教材 |
| `notes_to_syllabus` | 筆記庫前往學習主線 |
| `notes_to_course` | 筆記庫前往課程介紹 |
| `notes_to_apply` | 筆記庫前往申請入班 |
| `academy_to_notes` | 物理學苑前往公開筆記；由 academy repo 實作 |

## 招生來源（first-touch attribution）

上面的 GoatCounter 事件回答「有多少人從筆記走向學苑」；它**不**回答「送出申請的那個家庭當初從哪裡來」。
後者由一個與 `kakau.tw` 共用的第一方 cookie `kakau_attr` 負責，本站也會寫入。
規則、契約與地雷見 [`attribution.md`](./attribution.md)——特別是：
`_data/kakau.yml` 那組 `utm_source=kakau_notes` 是**內部版位標籤**，
在 attribution 裡永遠不會被當成招生來源，兩站的實作都必須維持這一點。

## 維護規則

1. 不在文章內手寫新的 UTM；新增目的地時更新 `_data/kakau.yml`。
2. Contextual CTA 的文章 mapping 同樣放在 `_data/kakau.yml`。
3. 發布後在 GoatCounter 驗證 `event/notes_to_*` 是否收到資料。
4. 若未來改用支援跨網域工作階段的 analytics，可保留事件名稱，並在集中 hook 更換送出方式。

## Owner 待辦

- 確認 GoatCounter 後台允許並能顯示自訂 event path。
- `notes.kakau.tw` 上線後，把該 hostname 加入分析服務允許清單（若服務需要）。
- 每月觀察 Note → Sample／Syllabus／Course／Apply，而不是只看頁面瀏覽量。
