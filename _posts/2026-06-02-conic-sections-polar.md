---
layout: post
title: "圓錐曲線極坐標與克卜勒三定律：r = ℓ/(1+e cosθ) 的幾何根源"
date: 2026-06-02 01:00:00 +0800
categories: [大學物理, 天文物理]
tags: [克卜勒問題, 克卜勒定律, 圓錐曲線, 極坐標, 焦點-準線, Binet方程式, 軌道方程式, 大學物理]
math: true
description: "從焦點-準線定義推導圓錐曲線的極坐標方程式 r=ℓ/(1+ecosθ)，說明橢圓、拋物線、雙曲線如何統一在同一個公式中，並連結克卜勒三定律。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

[上一篇]({% post_url 2026-06-02-ellipse-geometry-intro %})用直角坐標處理橢圓。行星軌道問題卻天然地適合**極坐標**——以焦點（太陽）為原點，$r$ 是行星到太陽的距離，$\theta$ 是真近點角。這一篇推導極坐標下圓錐曲線的統一方程式。

---

## 1. 焦點-準線定義

圓錐曲線（conic section）可以用**焦點-準線**（focus-directrix）比值統一定義：

> 平面上到定點（焦點 $F$）的距離，與到定直線（準線 $\ell$）的距離之比為常數 $e$（離心率），則該點的軌跡是圓錐曲線。

設 $P$ 到準線的距離為 $d_P$，則：

$$\frac{PF}{d_P} = e$$

- $e < 1$：橢圓
- $e = 1$：拋物線
- $e > 1$：雙曲線

---

## 2. 推導極坐標方程式

以焦點為極點，準線在焦點左方距離 $d$ 處（即 $x = -d$ 直線）。

設 $P$ 的極坐標為 $(r, \theta)$，$P$ 到準線的距離：

$$d_P = d + r\cos\theta$$

由焦點-準線定義 $r = e \cdot d_P$：

$$r = e(d + r\cos\theta) = ed + er\cos\theta$$

$$r(1 - e\cos\theta) = ed$$

$$\boxed{r = \frac{ed}{1 - e\cos\theta}}$$

取 $\theta = 0$ 對應近焦點方向，若改寫為「近焦點在 $\theta=0$ 且 $r$ 最小」的慣用形式，令準線在右方，得：

$$r = \frac{\ell}{1 + e\cos\theta}$$

其中**半正焦弦**（semi-latus rectum）$\ell = ed$（$\theta=\pi/2$ 時 $r=\ell$，即通過焦點垂直長軸的弦之半）。

---

## 3. 連結直角坐標參數

對橢圓（$e<1$），比較直角坐標與極坐標方程式，可以推出：

$$\ell = \frac{b^2}{a} = a(1-e^2)$$

因此軌道方程式也常寫成：

$$r = \frac{a(1-e^2)}{1+e\cos\theta}$$

| 量                         | 公式                                                                    |
| -------------------------- | ----------------------------------------------------------------------- |
| 近焦點距離（$\theta=0$）   | $r_{\min} = \dfrac{\ell}{1+e} = a(1-e)$                                 |
| 遠焦點距離（$\theta=\pi$） | $r_{\max} = \dfrac{\ell}{1-e} = a(1+e)$                                 |
| 半長軸                     | $a = \dfrac{r_{\min}+r_{\max}}{2}$                                      |
| 半正焦弦                   | $\ell = \dfrac{2r_{\min}r_{\max}}{r_{\min}+r_{\max}}$（$r_{\min}$ 與 $r_{\max}$ 的調和平均） |

---

## 4. 三種圓錐曲線統一在一個方程式

$$r = \frac{\ell}{1+e\cos\theta}$$

| 離心率         | 曲線               | 特徵                           |
| -------------- | ------------------ | ------------------------------ |
| $0 \leq e < 1$ | 橢圓（$e=0$ 為圓） | $r$ 有界，軌道封閉             |
| $e = 1$        | 拋物線             | $\theta\to\pi$ 時 $r\to\infty$ |
| $e > 1$        | 雙曲線             | 有漸近線，只有一支對應此公式   |

行星（橢圓）、彗星（可能是拋物線或雙曲線）的軌道，都屬於這一族曲線。

---

## 5. Binet 方程式：從力推出軌道形狀

以上是純幾何。現在加入力學：給定連心力 $F(r)$，軌道形狀是什麼？

令 $u = 1/r$，角動量 $h = r^2\dot{\theta} = \text{const}$（連心力下角動量守恆），Binet 方程式為：

$$\dv[2]{u}{\theta} + u = -\frac{F(1/u)}{mh^2u^2}$$

對萬有引力 $F = -GMm/r^2 = -GMmu^2$（吸引力取負）：

$$\dv[2]{u}{\theta} + u = \frac{GM}{h^2}$$

這是**常係數非齊次線性 ODE**，通解為：

$$u(\theta) = \frac{GM}{h^2} + A\cos(\theta - \theta_0)$$

選 $\theta_0 = 0$（近焦點為 $\theta=0$），則：

$$\frac{1}{r} = \frac{GM}{h^2}(1 + e\cos\theta)$$

$$\boxed{r = \frac{h^2/GM}{1+e\cos\theta} = \frac{\ell}{1+e\cos\theta}}$$

其中 $\ell = h^2/(GM)$，$e = Ah^2/(GM)$ 由初始條件決定。

**結論**：萬有引力是平方反比力（inverse-square force，$F \propto 1/r^2$），對應的軌道方程式恰好是圓錐曲線的極坐標方程式。這是牛頓最重要的推導之一。

---

## 6. 克卜勒三定律

Binet 方程式的結果，加上能量分析，直接給出克卜勒三定律：

### 第一定律（軌道定律）

> 行星繞太陽的軌道是橢圓，太陽在橢圓的一個焦點上。

對應：Binet 方程式的解 $r=\ell/(1+e\cos\theta)$，$e<1$ 時為橢圓。

### 第二定律（面積定律）

> 行星與太陽的連線在等時間內掃過等面積。

對應：連心力下角動量守恆，

$$\dv{A}{t} = \frac{1}{2}r^2\dot{\theta} = \frac{h}{2} = \text{const}$$

面積速度恆為 $h/2$，與角度無關。

### 第三定律（週期定律）

> 行星週期的平方與半長軸的立方成正比：$T^2 \propto a^3$。

推導：橢圓面積 $\pi ab$ 等於面積速度乘以週期：

$$\pi ab = \frac{h}{2} T \implies T = \frac{2\pi ab}{h}$$

用 $b^2 = a^2(1-e^2)$，$\ell = a(1-e^2)$，$h^2 = GM\ell$：

$$T^2 = \frac{4\pi^2 a^2 b^2}{h^2} = \frac{4\pi^2 a^2 \cdot a^2(1-e^2)}{GM \cdot a(1-e^2)} = \frac{4\pi^2 a^3}{GM}$$

$$\boxed{T^2 = \frac{4\pi^2}{GM}a^3}$$

比例常數 $4\pi^2/(GM)$ 只依賴中心天體的質量，對太陽系所有行星相同。

---

## 7. 近日點與遠日點

地球軌道：$a = 1\,\text{AU}$，$e \approx 0.0167$。

$$r_{\min} = a(1-e) \approx 0.983\,\text{AU} \quad \text{（近日點，1月初）}$$
$$r_{\max} = a(1+e) \approx 1.017\,\text{AU} \quad \text{（遠日點，7月初）}$$

差距僅約 3%，所以「冬天離太陽近」不是季節成因（季節由地軸傾角決定）。

---

## 小結

- 焦點-準線定義給出 $r = \ell/(1+e\cos\theta)$，統一三種圓錐曲線
- 半正焦弦 $\ell = b^2/a = a(1-e^2) = h^2/(GM)$
- Binet 方程式：$d^2u/d\theta^2 + u = GM/h^2$，解即軌道方程式
- 克卜勒三定律均可從萬有引力 + 角動量守恆推出
- 第三定律：$T^2 = 4\pi^2 a^3/(GM)$

[下一篇]({% post_url 2026-06-02-newton-derives-kepler %})反過來看：克卜勒第一定律（橢圓軌道）如何**反推**出平方反比力 $F \propto 1/r^2$，這是牛頓的另一個偉大推導。

<div class="cta-box">
  <strong>還有問題嗎？</strong><br>
  <a href="/contact">→ 歡迎預約家教課，直接針對你的問題討論</a>
</div>
