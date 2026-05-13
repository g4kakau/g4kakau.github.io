---
layout: post
title: "用複數看穿幾何：正三角形外接圓的弦積極值"
date: 2026-05-13 00:00:00 +0800
categories: [大學數學, 複數幾何]
tags: [複數, 幾何極值, 單位根, 外接圓, 競賽數學]
math: true
description: "正三角形 ABC 有外接圓，動點 P 在圓上，求 PA×PB×PC 的最大值。本文展示四種解法：幾何對稱、三角代換、座標參數化、複數法，最後用單位圓距離給出最優雅的詮釋，答案是 2r³。"
---

$$\require{physics}$$

正三角形 $ABC$ 的外接圓半徑為 $r$，點 $P$ 在圓上移動。

**問：$\overline{PA} \times \overline{PB} \times \overline{PC}$ 的最大值是多少？**

這道題有四種解法，從幾何直覺到複數代數，最精彩的版本只需要三行。

---

## 解法一：幾何對稱法（直覺先行）

先不計算，從直覺出發。

當 $P$ 趨近 $A$、$B$、$C$ 中任一頂點時，乘積趨近 $0$。所以極大值出現在 $P$ **盡量遠離三個頂點**的位置。

正三角形有三重旋轉對稱。對稱性告訴我們：極大值應在 $P$ 位於某段劣弧的**中點**時達到，例如弧 $\widehat{BC}$ 的中點 $M$。

此時的幾何關係清晰可算：

- $\overline{MA}$ 是直徑（$M$ 在弧 $\widehat{BC}$ 中點，與 $A$ 相對），故 $\overline{MA} = 2r$
- $\angle MBA = \angle MCA = 90°$（直徑所對圓周角）
- 弧 $\widehat{MB}$ 的圓心角為 $60°$（正三角形弧 $\widehat{BC}$ 的一半），圓周角 $\angle MAB = 30°$
- 在直角三角形 $\triangle MBA$ 中，$\overline{MB} = \overline{MA} \sin 30° = r$，同理 $\overline{MC} = r$

$$\overline{MA} \times \overline{MB} \times \overline{MC} = 2r \cdot r \cdot r = 2r^3$$

這個解法快，但「極值在弧中點」的判斷是靠對稱直覺，沒有嚴格證明。以下三種方法將**計算整個函數**，從而確認。

---

## 解法二：三角代換（嚴謹但繁）

令 $\theta = \angle BAP$。由共弧圓周角與正弦定理：

$$\overline{PB} = 2r\sin\theta, \qquad \overline{PC} = 2r\sin(60°-\theta)$$

再用餘弦定理求出 $\overline{PA}$，最終需要應用三角恆等式：

$$
\sin\alpha \cdot \sin(60°+\alpha) \cdot \sin(60°-\alpha) = \frac{1}{4}\sin 3\alpha
$$

才能把乘積化簡為

$$
\overline{PA} \times \overline{PB} \times \overline{PC} = 2r^3 \left|\sin\frac{3\theta}{2}\right|
$$

最大值在 $\sin\frac{3\theta}{2} = \pm 1$ 時達到，即 $\boxed{2r^3}$。

---

## 解法三：座標參數化

將外接圓圓心置於原點，令

$$z_A = r,\quad z_B = re^{i \cdot 2\pi/3},\quad z_C = re^{i \cdot 4\pi/3}$$

動點 $P = (r\cos x, r\sin x)$，距離公式給出：

$$
\overline{PA} = 2r\left|\sin\frac{x}{2}\right|, \quad
\overline{PB} = 2r\left|\sin\!\left(\frac{x}{2}+60°\right)\right|, \quad
\overline{PC} = 2r\left|\sin\!\left(\frac{x}{2}+120°\right)\right|
$$

乘積為：

$$
f(x) = 8r^3\left|\sin\frac{x}{2} \cdot \sin\!\left(\frac{x}{2}+60°\right) \cdot \sin\!\left(\frac{x}{2}+120°\right)\right|
$$

再次套用上面的恆等式（令 $\alpha = x/2$），得

$$
f(x) = 2r^3\left|\sin\frac{3x}{2}\right|
$$

最大值仍為 $2r^3$，並可用繪圖軟體驗算（紫色曲線 $y = 2r^3\lvert\sin(3x/2)\rvert$ 的峰值）。

---

## 解法四：複數法（最優雅）

把三個頂點和動點都用複數表示：

$$z_A = r,\quad z_B = re^{i \cdot 2\pi/3},\quad z_C = re^{i \cdot 4\pi/3},\quad z_P = re^{i\theta}$$

乘積寫成複數模的乘積：

$$
\overline{PA}\times\overline{PB}\times\overline{PC}
= r^3\left|(e^{i\theta}-1)\!\left(e^{i\theta}-e^{i \cdot 2\pi/3}\right)\!\left(e^{i\theta}-e^{i \cdot 4\pi/3}\right)\right|
$$

**關鍵一步：** $1,\, e^{i \cdot 2\pi/3},\, e^{i \cdot 4\pi/3}$ 正是方程 $z^3 = 1$ 的三個根（三次單位根），所以：

$$
(z-1)\!\left(z-e^{i \cdot 2\pi/3}\right)\!\left(z-e^{i \cdot 4\pi/3}\right) = z^3 - 1
$$

代入 $z = e^{i\theta}$，整個乘積瞬間化簡：

$$
\boxed{\overline{PA}\times\overline{PB}\times\overline{PC} = r^3\left|e^{3i\theta} - 1\right|}
$$

---

## 幾何再詮釋：一眼看出極值

$\lvert e^{3i\theta} - 1\rvert$ 的幾何意義是什麼？

這是複數平面上**單位圓的動點 $e^{3i\theta}$ 到固定點 $(1,0)$ 的距離**。

隨著 $\theta$ 變化，$e^{3i\theta}$ 可以繞單位圓轉到任意位置：

- **最短距離**：$0$（當 $e^{3i\theta} = 1$，即 $P$ 趨近頂點）
- **最長距離**：$2$（當 $e^{3i\theta} = -1$，即對徑點）

不需要任何三角化簡，極值直接從幾何讀出：

$$
\max\!\left(\overline{PA}\times\overline{PB}\times\overline{PC}\right) = r^3 \times 2 = \boxed{2r^3}
$$

---

## 四種解法比較

| 解法 | 核心工具 | 計算量 | 嚴謹度 |
|---|---|---|---|
| 幾何對稱 | 對稱性、圓周角 | 最少 | 需補證「極值在弧中點」 |
| 三角代換 | 正弦定理、三角恆等式 | 多 | 嚴謹 |
| 座標參數化 | 距離公式、三角恆等式 | 中 | 嚴謹 |
| **複數法** | **單位根分解 $z^3-1$** | **最少** | **嚴謹，且最具一般性** |

複數法最漂亮的地方：它把「三段距離的乘積」直接化為「一個複數的模」，再用單位圓的幾何看出極值，整個推導不超過十行。

這正是複數在幾何問題中的威力——它能把多個距離的乘積，透過代數恆等式，壓縮成一個式子。

{% include cta.html %}
