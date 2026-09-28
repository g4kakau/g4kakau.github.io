# 跨子網域 first-touch attribution（筆記站這一側）

## 為什麼筆記站要管這件事

Kakau 的招生 funnel 不只 `kakau.tw`。社群貼文可以直接 deep-link 到本站文章，讀者再由文章
走向 Sample／Syllabus／Course／Apply。如果只有學苑捕捉來源，這條路徑上的每一個人都會漏掉——
他抵達學苑時 referrer 已經是 `notes.kakau.tw`，自家網域，不算 acquisition，
最後那份申請會落在 direct／unknown。

## 做法

本站與 `kakau.tw` 共用**一個**第一方 cookie，scope 在可註冊的父網域：

```
kakau_attr=<urlencoded JSON>; Path=/; Domain=kakau.tw; Max-Age=2592000; SameSite=Lax; Secure
```

`kakau.tw` 是註冊網域而非 public suffix，所以這是一般的第一方 cookie。
**不是** cross-site advertising identity：沒有 device fingerprint、沒有閱讀內容、沒有學生 PII，
也沒有任何第三方 tracker。存的只有八個欄位：四個 `utm_*`、`landing_path`、
`referrer_host`（只有網域名）、`first_seen_at`、`attribution_version`。

規則的重點：

- **first touch 為準。** 30 日內既有記錄不被覆蓋、也不續期。
- **純 direct 首訪不寫入。** 寫一筆「direct」會擋掉日後真正帶人回來的 campaign。
- **`kakau_academy` / `kakau_notes` 永不算 acquisition。** 那是雙站旅程的版位標籤
  （見 `analytics.md`），不是帶人進來的管道。
- **讀回時一律重新 sanitise。** cookie 是訪客可寫的。
- **不改網址列。** UTM 留在 URL 上，canonical／OG／back button／分享網址都不受影響。

## 檔案

| 檔案 | 角色 |
|---|---|
| `_includes/kakau-attribution.html` | 唯一的 capture 實作（inline `<script data-kakau-attribution>`） |
| `_includes/footer.html` | 全站收錄點；Chirpy 的 footer 涵蓋 452／453 頁 |
| `tutoring-plans/index.html` | footer 到不了的那一頁（`layout: null` 舊路徑轉址殼），在 `location.replace` 前先 capture |
| `tools/test_attribution.mjs` | 12 個 node:test 案例，抽出 script 在 stub 過的 `document`／`window` 上跑完整規格 |
| `tools/check_integration.sh` | 釘住共用常數、擋掉白名單外的欄位、確認兩個 ingress 仍收錄 capture |

```bash
node --test tools/test_attribution.mjs
bash tools/check_integration.sh
```

兩者都在 `.github/workflows/pages.yml` 的 build job 裡跑。

## 契約：不可單邊改動

`kakau.tw` 那一側的 `src/lib/attribution.ts`（repo `qavit/kakau-front`）是 **source of truth**，
本站的 include 是同一組規則的小 adapter——技術棧不同，這裡沒有 TypeScript build。

兩個實作之間沒有 build-time 連結，所以**改一邊而不改另一邊不會失敗**，
只會安靜地產生兩份永遠不會相遇的 first touch。以下必須逐字一致：
cookie 名稱 `kakau_attr`、`attribution_version = 1`、八個欄位、30 日視窗、
內部 source 清單、四組長度上限、以及 sanitise 規則。

完整契約寫在學苑 repo 的 `docs/ATTRIBUTION_CROSS_SITE.md`。**要改就在同一個變更裡改兩邊。**

## 寫這段 JS 的地雷

Chirpy 的 `compress_html` 會把 inline `<script>` 內的**所有換行壓成空白**
（production build 實測 0 個換行）。因此：

- 註解只能用 `/* */`，`//` 會把整支檔案吃掉（integration check 有一條專門擋這件事）。
- 語句不能依賴 ASI，每一句都要有分號。

## 已知限制

1. **記錄裡沒有「哪一站」這一欄。** 欄位白名單是硬性契約，不為此擴張；
   實務上 `landing_path` 是 `/posts/...` 就是從本站進來的。
2. **本站是 PWA，service worker 對頁面 cache-first。** 部署後，*已經*造訪過本站的訪客
   可能還會拿到一次舊的快取頁（沒有 capture），直到新的 service worker 啟用。
   對本功能鎖定的流量（第一次接觸的社群新訪客，本來就沒有快取）沒有影響。
3. **本站目前沒有隱私政策連結。** 學苑的 `/privacy` 第五節已描述 `kakau_attr`，
   但文字寫的是「僅由本學苑自有網域（`kakau.tw` 及其子網域）**讀取**」，
   未涵蓋「本站也會**寫入**」，本站也沒有任何指向該政策的連結。
   這是法律文件，需由營運者決定措辭與是否在本站加上連結。
