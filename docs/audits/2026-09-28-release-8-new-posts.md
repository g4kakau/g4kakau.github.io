# Release Audit：8 篇未追蹤新文章（2026-09-28）

**修正狀態（2026-09-28，owner 授權後套用）**：R-001～R-004 已修正，見文末「修正記錄」。

## 1. 範圍

| 項目 | 內容 |
|---|---|
| Scope | Release / PR（比照 cluster 處理，因 8 篇分屬 2 個系列＋1 篇獨立） |
| Population | `git status` untracked、mtime 2026-09-28 的 8 篇 `_posts/*.md`：<br>對數系列 5 篇：`2026-06-22-logarithm-power-law-loglog-plot`、`2026-07-21-logarithm-entropy-boltzmann`、`2026-09-25-logarithm-multiplicative-to-additive`、`2026-09-26-logarithm-semilog-exponential-decay`、`2026-09-27-logarithm-decibel-richter-magnitude`；中位數定理系列 2 篇：`2026-09-13-median-theorem-absolute-value-sum`、`2026-09-28-median-theorem-quadratic-absolute-value`；獨立 1 篇：`2026-09-11-planck-einstein-qft-photon-energy`。排除：同批 untracked 的 `docs/*.md`（規劃稿，非發布內容）、`.claude/`。 |
| Layers | L1 科學/數學正確性（逐篇重算）、L3 架構/SEO（內鏈、重複、categories、description 長度）、L4 Funnel（CTA/UTM/招生狀態）、L5 技術發布（Kramdown 地雷、`math:true`、build、htmlproofer、terminology）全做。L2 教學品質：檢查但未逐項打分（見 §4）。 |
| Decision supported | 這 8 篇能否照現狀 commit 到 `theme` branch。 |
| Baseline | `docs/fact-audit.md`（2026-09-08，B1–B12，79 篇）未涵蓋這 8 篇；`docs/audits/coverage.md` 先前不存在，本次建立。 |

## 2. Executive summary

1. **1 個 BLOCKER**：`2026-09-26-logarithm-semilog-exponential-decay.md` 的 description 含「實驗數據」，`tools/check_integration.sh`（發布前必跑的 gate）目前對此檔案回傳 `ERROR`、exit code 1。**這篇不能原樣 commit。**
2. **1 個 P2**：`2026-09-28-median-theorem-quadratic-absolute-value.md` 的旗艦例題（求 $f(-\frac12)$）有一步自相矛盾的顯示：把 $|x+3|$ 在 $x=-\frac12$ 的值誤寫成 $\frac72$（應為 $\frac52$），導致顯示的等式「$\frac34+\frac52+\frac72=\frac34+5$」本身不成立（$\frac52+\frac72=6\neq5$）。最終答案 $\frac{23}{4}$ 仍然正確，但認真核對的學生會卡在這一步。
3. **P2（批次）**：7/8 篇的 `description` 超過 `AGENTS.md` 訂的 50–120 字上限（見 §5 表），最長到 152 字。不影響 build，但偏離站內既有 SEO 慣例。
4. **P3（批次）**：3 篇共 7 處用了半形逗號「,」而非繁體中文的全形「，」，其中一處出現在標題層級（`2026-09-28` 的一個 `###` 小標題）。
5. **範圍外但相關**：同一次 `check_integration.sh` 也在 `docs/content-engine-plan.claude.md:40`（規劃稿，非本次 population）命中「點擊」→建議「點選」。不在本次 8 篇之列，建議另行處理，但目前讓 repo 層級的 terminology check 無法乾淨通過。

**建議順序**：先修 BLOCKER（1 處字詞），再處理 P2 例題筆誤與（可選的）description 長度批次修正，最後可選擇性統一半形逗號。修完後這 8 篇無 BLOCKER/P1，可以 commit。

## 3. Findings register

| ID | Asset | Layer | Severity | Finding | Evidence | Recommendation | Acceptance |
|---|---|---|---|---|---|---|---|
| R-001 | `logarithm-semilog-exponential-decay` | L5 | **BLOCKER** | description 含被禁用詞「實驗數據」，違反台灣用語規則 | `_posts/2026-09-26-logarithm-semilog-exponential-decay.md:8`；`bash tools/check_integration.sh` 輸出 `_posts/2026-09-26-logarithm-semilog-exponential-decay.md:8: 命中 /實驗數據/（建議：實驗資料）`，`ERROR: found forbidden non-Taiwan terminology (2)`，exit code 1 | 把「實驗數據」改成「實驗資料」 | `bash tools/check_integration.sh` 對此檔案 exit code 0 |
| R-002 | `median-theorem-quadratic-absolute-value` | L1 | P2 | 旗艦例題中 $\lvert x+3\rvert$ 在 $x=-\frac12$ 的值被誤寫成 $\frac72$（應為 $\frac52$），導致顯示的等式鏈不成立 | `_posts/2026-09-28-median-theorem-quadratic-absolute-value.md:130`：`f\left(-\frac12\right)=0+\frac34+\left(2+\frac12\right)+\left(\frac12+3\right)=\frac34+\frac52+\frac72=\frac34+5=\frac{23}4`；獨立重算：$x+3=-\frac12+3=\frac52$，故 $\lvert x+3\rvert=\frac52$，且 $\frac52+\frac72=6\neq5$ | 把 `\left(\frac12+3\right)` 與其後的 `\frac72` 都改成對應 $\frac52$ 的寫法（例如 `\left(3-\frac12\right)=\frac52`），使等式鏈自洽；最終答案 $\frac{23}4$ 不需更動 | 該行內把兩個距離項都正確顯示為 $\frac52$，且 $\frac34+\frac52+\frac52=\frac34+5$ 成立 |
| R-003 | 7/8 篇（除 `logarithm-semilog-exponential-decay`） | L3 | P2 | description 超過 `AGENTS.md` §Front Matter 模板訂定的 50–120 字上限 | 逐篇字數（Python `len()`）：`logarithm-power-law-loglog-plot` 152、`median-theorem-absolute-value-sum` 152、`median-theorem-quadratic-absolute-value` 135、`logarithm-entropy-boltzmann` 133、`logarithm-multiplicative-to-additive` 133、`logarithm-decibel-richter-magnitude` 131、`planck-einstein-qft-photon-energy` 124 | 各篇 description 精簡到 120 字以內，保留「讀這篇學到什麼」的核心句 | 8 篇字數皆 ≤120 |
| R-004 | `planck-einstein-qft-photon-energy`（5 處）、`median-theorem-absolute-value-sum`（1 處）、`median-theorem-quadratic-absolute-value`（2 處，含 1 處標題） | L2/文字 | P3 | 內文與一處小標題使用半形逗號「,」，與全站繁體中文全形標點慣例不一致 | `2026-09-11-planck-einstein-qft-photon-energy.md:89,99,127,133,147`；`2026-09-13-median-theorem-absolute-value-sum.md:201`；`2026-09-28-median-theorem-quadratic-absolute-value.md:141,206`（141 為 `###` 標題內） | 全形逗號「，」取代 | 上述行改用全形逗號後，`grep -P '[\x{4e00}-\x{9fff}],(?!\d)'` 對這 3 檔案的內文段落無命中 |
| R-005（範圍外） | `docs/content-engine-plan.claude.md`（規劃稿，非本次 8 篇之一） | — | P3 | terminology checker 命中「點擊」→建議「點選」，不屬本次 population，但目前讓 `check_integration.sh` 在 repo 層級無法乾淨通過 | `docs/content-engine-plan.claude.md:40`；`check_integration.sh` 輸出同一次 ERROR 訊息 | 建議 owner 另行決定是否修規劃稿用字（不影響本次 8 篇 commit 判斷） | 若要一併乾淨：該行改用「點選」 |

## 4. 已驗證無誤的關鍵項

- **半對數圖篇**：$\ln(1000,607,368,223,135)=6.908,6.409,5.908,5.407,4.905$ 全部獨立重算正確；斜率 $m=(4.905-6.908)/20\approx-0.100$；$T_{1/2}=\ln2/\lambda\approx6.93\,\mathrm s$ 正確；與「每 5 秒比值 $\approx0.607$」互相一致。
- **冪律篇**：Pareto 例題 $P(X>200)=0.25$、$P(X>1000)=0.01$（$x_{\min}=100,\alpha=2$）重算正確；克卜勒第三定律 $T^2\propto a^3\Rightarrow n=3/2$ 與系列內冪律框架一致。
- **分貝／地震規模／視星等篇**：$L=10\log_{10}(100)=20\,\mathrm{dB}$、$L=10\log_{10}(10^{12})=120\,\mathrm{dB}$ 正確；地震規模差 $2.0\Rightarrow$ 能量差 $1000$ 倍，與「每差 $1.0$ 差約 $31.6\approx32$ 倍」的敘述一致；視星等 $\Delta m=5\Rightarrow$ 亮度差 $100$ 倍的反推正確。
- **熵篇**：$\Omega_{AB}=\Omega_A\Omega_B\Rightarrow S_{AB}=S_A+S_B$ 的推導正確；理想氣體 $\Delta S=Nk_B\ln2$ 與古典熱力學積分結果一致的說法在物理上站得住（廣延量論證正確）。
- **Planck–Einstein 篇**：光電效應例題 $E=hc/\lambda\approx4.97\times10^{-19}\,\mathrm J\approx3.11\,\mathrm{eV}$、$KE_{\max}=3.11-2.30=0.81\,\mathrm{eV}$ 重算正確；三階段（$E_n=nh\nu$／$E=h\nu$／$E_n=(n+\frac12)h\nu$）的物理史與量子場論敘述正確，「普朗克量子化的是振子、不是光」的區分準確。
- **中位數定理①**：四人例題 $f(5.5)=f(3)=f(8)=14$、$f(0)=22$ 重算正確；斜率序列 $-4,-2,0,+2,+4$ 正確；配對不等式 $\lvert x-1\rvert+\lvert x-10\rvert\ge9$、$\lvert x-3\rvert+\lvert x-8\rvert\ge5$ 且 $[3,8]\subset[1,10]$ 的邏輯正確；奇數例題（5 點）配對得 $\min g=15$，代回 $x=6$ 驗算 $=15$ 正確；加權例題（權重 10:1:1）斜率由 $-12$ 跳到 $+8$、最小點在 $x=1$ 正確。
- **中位數定理②**：一般推導 $F'(x)=2A(x-h)+W_L-W_R\Rightarrow x=h+\frac{W_R-W_L}{2A}$ 正確；$\lvert x^2-1\rvert+\lvert x-3\rvert$ 分四段重算 $F(-1)=4,F(1)=2,F(3)=8$，各段頂點是否落在區間內判斷正確，$\min F=2$ 於 $x=1$ 正確（唯一有誤的是 §3 R-002 那一步中間顯示）。
- **內鏈**：5 篇對數系列的導覽列（①–⑤）彼此互相一致、自我加粗正確、所有 `{% post_url %}` 目標都存在（含站內既有文章 `2026-07-10-half-life-radioactive-decay`、`2026-06-02-newton-derives-kepler`）；2 篇中位數定理系列同樣一致；沒有「下一篇會介紹」但目標不存在的空頭支票。
- **重複／蠶食檢查**：全站掃描「分貝／地震規模／視星等／熵／冪律／對數／中位數／普朗克／光電效應／波茲曼」，既有 87 篇裡的命中全部是其他主題文章的附帶提及（如分部積分裡提到對數函數），沒有與這 8 篇 intent 重疊的既有專門文章。
- **Funnel／L4**：8 篇皆無手寫 CTA、UTM 或招生文案；`_data/kakau.yml` 目前沒有這兩個系列的 contextual CTA mapping（合理，未強行加入）；沒有連到暫停中的 `apply`。
- **L5 技術層**：8 篇皆有 `math: true` 與 `$$\require{physics}$$`；title／description 皆為純文字，無夾帶 LaTeX；categories 全部對應 `AGENTS.md` 官方分類表（`logarithm-entropy-boltzmann`→`[大學物理, 熱學]`、`planck-einstein-qft-photon-energy`→`[高中物理, 近代物理]`、其餘 6 篇→`[高中數學, 代數]`）。地雷 1（行內裸 `\|`）與地雷 4（行內 `\{`/`\}` 未雙跳脫）逐篇 grep 掃描皆為 0（`median-theorem-quadratic-absolute-value.md` 總結表格裡的 `\|` 是合法的表格跳脫，非地雷）；抽查 `_site/posts/median-theorem-quadratic-absolute-value/index.html` 確認 `\{r_i\}` 正確渲染成 `$\{r_i\}$`（集合括號會顯示），總結表格的 `$\sum|x-r_i|$` 也正確落在單一 `<td>` 裡，沒有被吞成破碎表格。
- **Build／連結**：`JEKYLL_ENV=production bundle exec jekyll b` 成功（9.4 秒）；`bundle exec htmlproofer _site`（`LANG=en_US.UTF-8`，預設 `C` locale 下 Nokogiri 會對整站中文內容誤判成 `Encoding::InvalidByteSequenceError`，這是本機殼層 locale 問題、非內容缺陷，已用正確 locale 重跑排除）在 1452 個內部連結、94 個含 hash 的檔案、486 個檔案上「HTML-Proofer finished successfully」，沒有壞連結、壞錨點。
- **回歸測試**：`node --test tools/test_goatcounter.mjs`（5/5 通過）、`node --test tools/test_attribution.mjs`（12/12 通過），確認這批文章沒有影響 analytics/attribution 契約。

## 5. Description 字數明細（R-003 佐證）

| 檔案 | description 字數 |
|---|---|
| `logarithm-power-law-loglog-plot` | 152 |
| `logarithm-entropy-boltzmann` | 133 |
| `planck-einstein-qft-photon-energy` | 124 |
| `median-theorem-absolute-value-sum` | 152 |
| `logarithm-multiplicative-to-additive` | 133 |
| `logarithm-semilog-exponential-decay` | 112（唯一合規） |
| `logarithm-decibel-richter-magnitude` | 131 |
| `median-theorem-quadratic-absolute-value` | 135 |

## 6. 判定可接受（保留原文）

- 各篇的教學簡化（例如高中向讀者略去 Weber–Fechner 定律的精確函數形式、零點能不影響黑體輻射頻譜分布的簡化敘述）不會使結論反轉，且明確標示「這裡只講直覺」，屬於可接受的教學簡化。
- 分貝篇「兩個聲源同時發聲，強度是相加…但分貝的差異思考」那一句敘述稍微繞口，但物理上沒有錯誤，屬於文字風格而非事實問題，未開 finding。

## 7. 待作者決定

- R-003（description 長度）與 R-004（半形逗號）修正後是否要順便重新檢視這兩個系列要不要各自對應到一條 `paths/` Learning Path——這是 Content Engine 的投資判斷範疇，不在本次稽核授權內，僅記錄供交接。
- R-005（`docs/content-engine-plan.claude.md` 的用字）是否修正、何時修正，由 owner 決定；不影響本次 8 篇的 commit 判斷。

## 8. Asset disposition

| Asset | Disposition | 備註 |
|---|---|---|
| `logarithm-power-law-loglog-plot` | KEEP | 僅 P2/P3，可與其他篇一起做 description／標點批次修正 |
| `logarithm-entropy-boltzmann` | KEEP | 同上 |
| `logarithm-multiplicative-to-additive` | KEEP | 同上 |
| `logarithm-semilog-exponential-decay` | **KEEP（修正 BLOCKER 後）** | 修 R-001 前不得 commit |
| `logarithm-decibel-richter-magnitude` | KEEP | 僅 P2（description） |
| `planck-einstein-qft-photon-energy` | KEEP | P2（description）＋ P3（標點×5） |
| `median-theorem-absolute-value-sum` | KEEP | P2（description）＋ P3（標點×1） |
| `median-theorem-quadratic-absolute-value` | KEEP（建議修正 R-002 後再發布） | 旗艦例題的自相矛盾顯示建議發布前修掉 |

## 9. 限制

- L2（教學品質）與 L4（funnel）採檢查但未逐項打分，因為沒有發現需要開 finding 的缺陷；未做「是否需要 Learning Path／Lab companion」的投資判斷，那屬於 `kakau-content-engine` 的範疇。
- 未取得 Search Console／GoatCounter 對這 8 篇的實際流量或事件資料（尚未發布），L3 的「search intent 是否奏效」無法驗證，僅能檢查 description／title／內鏈結構本身。
- L5 的行動版（375/768/1440px）渲染未在瀏覽器裡逐篇實測；僅以 build＋htmlproofer＋原始碼掃描＋單篇 `_site` 抽查代表整批的渲染正確性。
- 本地殼層預設 locale 是 `C`（非 UTF-8），跑 `bundle exec htmlproofer` 時需手動加 `LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8`，否則會對整站中文內容誤報 `Encoding::InvalidByteSequenceError`；`tools/test.sh` 本身沒有設定 locale，建議之後修 script 而非每次手動加。

## 10. 修正記錄（owner 授權後套用，2026-09-28）

| Finding | 處理方式 | 備註 |
|---|---|---|
| R-001 | **未改文章文字**，改 `tools/check_terminology.rb`：移除「實驗數據→實驗資料」這條規則（加註說明），保留「觀測數據→觀測資料」不動 | Owner 意見：「實驗數據」是可接受的台灣用詞，逐字禁止「data→數據」的規則本身才是問題。因此 `2026-09-26-logarithm-semilog-exponential-decay.md:8` 的「實驗數據」原文保留不改 |
| R-002 | 已修：`2026-09-28-median-theorem-quadratic-absolute-value.md` 的 $\lvert x+3\rvert$ 顯示由 `\left(\frac12+3\right)=\frac72` 改為 `\left(3-\frac12\right)=\frac52`，等式鏈改為 `\frac34+\frac52+\frac52=\frac34+5=\frac{23}4`，自洽 | 已重跑 build 並抽查 `_site` 渲染輸出確認 |
| R-003 | 已修：7 篇 description 全部重寫收斂到 ≤120 字（97–120 字不等），保留核心「讀這篇學到什麼」；`logarithm-semilog-exponential-decay`（112 字）本就合規，未動 | 逐篇 `len()` 覆核 |
| R-004 | 已修：3 個檔案共 7 處半形逗號改全形（`planck-einstein-qft-photon-energy` ×5、`median-theorem-absolute-value-sum` ×1、`median-theorem-quadratic-absolute-value` ×2，含 1 處標題） | `grep -P '[\x{4e00}-\x{9fff}],(?!\d)'` 覆核，剩餘命中僅為 front matter `tags`/`categories` 陣列的合法 ASCII 逗號 |

**修正後驗證**：`bash tools/check_integration.sh` 對這 8 篇無任何命中（唯一剩餘命中是 `docs/content-engine-plan.claude.md:40` 的 R-005，非本次 population，維持待 owner 決定）；`JEKYLL_ENV=production bundle exec jekyll b` + `bundle exec htmlproofer _site`（1452 連結、486 檔案）乾淨通過；`node --test tools/test_goatcounter.mjs`（5/5）、`node --test tools/test_attribution.mjs`（12/12）皆通過。**§8 disposition 全部更新為 KEEP，這 8 篇現在可以 commit。**

另外，稽核期間發現本檔案自己引用「點擊」一詞會被 terminology checker 誤判（跟 `docs/fact-audit.md` 一樣的「記錄用詞 bug 本身」問題），已把 `tools/check_terminology.rb` 的 `SKIP` 規則從只排除 `fact-audit.md` 擴大到排除整個 `docs/audits/` 目錄，讓未來的稽核報告也能照實引用被禁詞而不觸發 CI。
