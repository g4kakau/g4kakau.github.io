---
layout: post
title: "橢圓積分為什麼叫橢圓？從弧長積分到第二類橢圓積分 E(k)"
date: 2026-05-22 11:00:00 +0800
categories: [大學數學, 微積分]
tags: [橢圓積分, 第二類橢圓積分, 弧長, 橢圓周長, 特殊函數, 大學微積分]
math: true
description: "橢圓積分的名稱來自橢圓弧長——計算橢圓周長時自然出現一個無法用初等函數表示的積分，這就是第二類完全橢圓積分 E(k)。本文從弧長公式推導 E(k)，說明它和 K(k) 的關係，並介紹 Legendre 關係式。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

本系列到目前為止，橢圓積分 $K(k)$ 的舞台是單擺。但「橢圓積分」這個名字從何而來？答案是橢圓的**弧長**。

計算橢圓周長時，自然出現一個比 $K(k)$ 更簡單（但同樣無法用初等函數表示）的積分，稱為**第二類完全橢圓積分** $E(k)$。

---

## 圓的周長很簡單，橢圓的不是

圓的周長是 $2\pi r$，有解析公式。橢圓的周長呢？

考慮標準橢圓

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1, \qquad a \ge b > 0$$

參數化：

$$x = a\cos t, \qquad y = b\sin t, \qquad t \in [0, 2\pi]$$

弧長微元：

$$\dd{s} = \sqrt{\dot{x}^2 + \dot{y}^2}\,\dd{t} = \sqrt{a^2\sin^2 t + b^2\cos^2 t}\,\dd{t}$$

橢圓的完整周長（利用四倍對稱）：

$$C = 4\int_0^{\pi/2}\sqrt{a^2\sin^2 t + b^2\cos^2 t}\,\dd{t}$$

把根號內提出 $a^2$：

$$C = 4a\int_0^{\pi/2}\sqrt{1 - \left(1 - \frac{b^2}{a^2}\right)\sin^2 t}\,\dd{t}$$

定義橢圓的**離心率**（eccentricity）：

$$e = \sqrt{1 - \frac{b^2}{a^2}}, \qquad 0 \le e < 1$$

（$e = 0$ 是圓，$e \to 1$ 是極度扁的橢圓。）

周長化為：

$$\boxed{C = 4a\int_0^{\pi/2}\sqrt{1 - e^2\sin^2 t}\,\dd{t} = 4a\,E(e)}$$

<!-- 📐 FIGURE: 橢圓弧長示意圖
     建議內容：畫一個明顯扁平的橢圓，標出半長軸 a、半短軸 b，
     用不同顏色標出四分之一弧長（對應 t ∈ [0, π/2]），
     標注離心率 e = √(1 - b²/a²)。可旁邊放一個圓作對比（b = a 時 e = 0，C = 2πa）。
     格式：SVG 或 matplotlib PNG；附圖說「圖 1：橢圓周長 C = 4a E(e)。
     E(k) 的名稱正源於此弧長積分」。
-->

其中

$$\boxed{E(k) = \int_0^{\pi/2}\sqrt{1 - k^2\sin^2\phi}\,\dd{\phi}, \qquad 0 \le k < 1}$$

這就是**第二類完全橢圓積分**（complete elliptic integral of the second kind）。**橢圓積分的名稱就來自這裡。**

---

## 為什麼積不出來？

被積函數 $\sqrt{1 - k^2\sin^2\phi}$ 看起來比 $K(k)$ 的被積函數更「友好」（根號在分子而非分母），但它同樣無法用初等函數表示——這是 Liouville 的定理。直觀上，含有 $\sin^2\phi$ 的二次多項式在根號下，原函數就「跑出」初等函數的範疇。

特殊情況下：

$$E(0) = \int_0^{\pi/2}\dd{\phi} = \frac{\pi}{2}$$

對應 $e = 0$（圓），周長 $= 4a \cdot \pi/2 = 2\pi a$，正確。

$$E(1) = \int_0^{\pi/2}\cos\phi\,\dd{\phi} = 1$$

對應極度扁的橢圓（退化成線段），周長 $= 4a \cdot 1 = 4a$（來回走兩遍長軸），正確。

---

## 冪級數展開

類似 $K(k)$ 的推導，對 $E(k)$ 做二項式展開再逐項積分：

$$E(k) = \frac{\pi}{2}\sum_{n=0}^\infty \left[\frac{(2n)!}{4^n(n!)^2}\right]^2 \frac{k^{2n}}{1-2n}$$

更常見的寫法是：

$$E(k) = \frac{\pi}{2}\!\left[1 - \left(\frac{1}{2}\right)^{\!2}\!\frac{k^2}{1} - \left(\frac{1\cdot3}{2\cdot4}\right)^{\!2}\!\frac{k^4}{3} - \left(\frac{1\cdot3\cdot5}{2\cdot4\cdot6}\right)^{\!2}\!\frac{k^6}{5} - \cdots\right]$$

展開前幾項：

$$\boxed{E(k) = \frac{\pi}{2}\!\left[1 - \frac{1}{4}k^2 - \frac{3}{64}k^4 - \frac{5}{256}k^6 - \cdots\right]}$$

比較 $K(k)$ 的展開式（每項都是**加**）：

$$K(k) = \frac{\pi}{2}\!\left[1 + \frac{1}{4}k^2 + \frac{9}{64}k^4 + \frac{25}{256}k^6 + \cdots\right]$$

可以看到 $E(k)$ 和 $K(k)$ 的係數差一個正負號——$E(k)$ 是遞減函數，$K(k)$ 是遞增函數。

---

## 數值表

| $k$ | $E(k)$（精確）| $K(k)$（精確）|
|:---:|:---:|:---:|
| $0$ | $1.5708$ | $1.5708$ |
| $0.3$ | $1.5348$ | $1.6080$ |
| $0.5$ | $1.4675$ | $1.6858$ |
| $0.7$ | $1.3557$ | $1.8457$ |
| $0.9$ | $1.1717$ | $2.2805$ |
| $0.99$ | $1.0285$ | $3.3566$ |
| $1$ | $1.0000$ | $\to\infty$ |

**表 1：** $E(k)$ 和 $K(k)$ 的數值比較。$k \to 1$ 時 $E(k) \to 1$，$K(k) \to \infty$，兩者行為截然相反。
{: .fig-caption }

<!-- 📈 FIGURE: E(k) 與 K(k) 對比圖
     建議內容：橫軸 k（0 到 1），畫 E(k)（藍線，單調遞減從 π/2 到 1）
     和 K(k)（橘線，單調遞增從 π/2 到 ∞），兩條線從同一點 (0, π/2) 出發，
     往相反方向走。在 k = 1 處標注 E(1) = 1 和 K(1) → ∞。
     格式：matplotlib PNG；附圖說「圖 2：E(k) 和 K(k) 的對比。
     兩者從 k=0 的共同值 π/2 出發，行為截然相反」。
-->

---

## Legendre 關係式

$E(k)$ 和 $K(k)$ 之間有一個深刻的恆等式，稱為 **Legendre 關係式**：

$$\boxed{E(k)\,K(k') + E(k')\,K(k) - K(k)\,K(k') = \frac{\pi}{2}}$$

其中 $k' = \sqrt{1 - k^2}$ 是補模數。

取特殊值 $k = k' = 1/\sqrt{2}$ 驗算：

$$2E\!\left(\frac{1}{\sqrt{2}}\right)K\!\left(\frac{1}{\sqrt{2}}\right) - \left[K\!\left(\frac{1}{\sqrt{2}}\right)\right]^2 = \frac{\pi}{2}$$

數值代入（$K(1/\sqrt{2}) \approx 1.8541$，$E(1/\sqrt{2}) \approx 1.3506$）：

$$2 \times 1.3506 \times 1.8541 - 1.8541^2 \approx 5.0084 - 3.4376 = 1.5708 = \frac{\pi}{2} \checkmark$$

這個關係式在數值計算和理論分析中都很有用；它其實是 $K$ 與 $E$ 所滿足的 Picard–Fuchs（超幾何型）微分方程的 Wronskian 恆等式。

---

## 橢圓周長的近似公式

實際工程中常需要快速估算橢圓周長。幾個常用近似：

**Ramanujan 第一近似**（1914 年）：

$$C \approx \pi\big[3(a+b) - \sqrt{(3a+b)(a+3b)}\big]$$

**Ramanujan 第二近似**（精度更高）：

$$C \approx \pi(a+b)\!\left[1 + \frac{3h}{10 + \sqrt{4-3h}}\right], \quad h = \frac{(a-b)^2}{(a+b)^2}$$

兩者在 $a/b$ 不太極端時誤差都在 $10^{-7}$ 以內。精確值則永遠需要 $4a\,E(e)$。

---

## $E(k)$、$K(k)$ 與三類橢圓積分

三類橢圓積分整理如下：

| 類別 | 定義 | 特殊值 | 在本系列的角色 |
|---|---|---|---|
| $K(k)$ | $\int_0^{\pi/2}(1-k^2\sin^2\phi)^{-1/2}\dd{\phi}$ | $K(0)=\pi/2$，$K(1)=\infty$ | 單擺精確週期 |
| $E(k)$ | $\int_0^{\pi/2}(1-k^2\sin^2\phi)^{+1/2}\dd{\phi}$ | $E(0)=\pi/2$，$E(1)=1$ | 橢圓弧長（本篇）|
| $\Pi(n,k)$ | $\int_0^{\pi/2}[(1-n\sin^2\phi)\sqrt{1-k^2\sin^2\phi}]^{-1}\dd{\phi}$ | — | 廣義問題（本系列不深入）|

兩者滿足 Legendre 關係式，是「對偶」的一對積分。

---

## 小結

- **橢圓積分的名稱**來自橢圓弧長：$C = 4a\,E(e)$
- $E(k) = \int_0^{\pi/2}\sqrt{1-k^2\sin^2\phi}\,\dd{\phi}$，單調遞減，$E(0)=\pi/2$，$E(1)=1$
- 冪級數：$E(k) = \frac{\pi}{2}[1 - k^2/4 - 3k^4/64 - \cdots]$（係數全為負）
- Legendre 關係式：$E(k)K(k') + E(k')K(k) - K(k)K(k') = \pi/2$
- $K(k)$ 隨 $k$ 遞增趨向無限大；$E(k)$ 隨 $k$ 遞減趨向有限值 $1$

[下一篇]({% post_url 2026-06-15-elliptic-integrals-celestial-mechanics %})回到物理：橢圓積分如何出現在天體力學中，並對照克卜勒橢圓軌道的積分為什麼不需要橢圓積分。
