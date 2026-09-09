# Kakau 跨站分析約定

## 現況

筆記庫使用 GoatCounter（site id：`g4kakau`）。所有由筆記庫前往 `kakau.tw` 的共用連結集中在 `_data/kakau.yml`，並帶有：

- `utm_source=kakau_notes`
- `utm_medium=referral`
- `utm_campaign=content_flywheel`

頁面上的跨站連結另有 `data-kakau-event`。`_includes/kakau-analytics.html` 會在 GoatCounter 可用時送出自訂事件；分析服務被阻擋時不影響導覽。

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
