---
layout: post
title: "有效位能與軌道分類：不解方程式，一眼看清橢圓、拋物線、雙曲線"
date: 2026-06-02 03:00:00 +0800
categories: [大學物理, 天文物理]
tags: [克卜勒問題, 有效位能, 軌道分類, 離心率, 能量, 角動量, 大學物理, 天文物理]
math: true
description: "引入有效位能概念，將二維軌道問題化為一維能量分析。從 V_eff 的極值結構，直接讀出圓形、橢圓、拋物線、雙曲線軌道的物理條件，並推導 e² = 1 + 2εh²/(GM)²，其中 ε 為單位質量能量。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

[上一篇]({% post_url 2026-06-02-newton-derives-kepler %})從力學推導軌道形狀。這一篇換一個視角：**不解方程式，只看能量**。透過「有效位能」這個工具，我們能在一張圖上同時看清所有可能的運動類型。

---

## 1. 化二維為一維

在[上一篇]({% post_url 2026-06-02-conic-sections-polar %})已知，連心力下角動量守恆：

$$h = r^2\dot{\theta} = \text{const}$$

以下使用**單位質量能量**（specific energy）$\varepsilon$，也就是總能量除以質量 $m$：

$$\varepsilon = \frac{1}{2}(\dot{r}^2 + r^2\dot{\theta}^2) - \frac{GM}{r}$$

用 $\dot{\theta} = h/r^2$ 把 $\dot{\theta}$ 消掉：

$$\varepsilon = \frac{1}{2}\dot{r}^2 + \frac{h^2}{2r^2} - \frac{GM}{r}$$

定義**有效位能**（effective potential）：

$$V_{\text{eff}}(r) = \frac{h^2}{2r^2} - \frac{GM}{r}$$

則：

$$\varepsilon = \frac{1}{2}\dot{r}^2 + V_{\text{eff}}(r)$$

這是一個形式上的**一維能量守恆方程式**，$r$ 就像一維粒子的「位置」。

---

## 2. 有效位能的結構

$$V_{\text{eff}}(r) = \underbrace{\frac{h^2}{2r^2}}_{\text{離心障壁}} - \underbrace{\frac{GM}{r}}_{\text{重力阱}}$$

- 短距離：$\sim 1/r^2$ 項主導，$V_{\text{eff}} \to +\infty$（離心障壁排斥）
- 長距離：$\sim -1/r$ 項主導，$V_{\text{eff}} \to 0^-$
- 中間有一個**極小值**

極小值位置，令 $dV_{\text{eff}}/dr = 0$：

$$-\frac{h^2}{r^3} + \frac{GM}{r^2} = 0 \implies r_0 = \frac{h^2}{GM}$$

極小值：

$$V_{\text{eff}}(r_0) = -\frac{(GM)^2}{2h^2}$$

---

## 3. 軌道類型由能量決定

**轉折點**（turning point）是 $\dot{r}=0$ 的點，即 $\varepsilon = V_{\text{eff}}(r)$。

| 能量 $\varepsilon$                     | 轉折點數                             | 軌道類型              |
| -------------------------------------- | ------------------------------------ | --------------------- |
| $\varepsilon < V_{\text{eff,min}}$     | 無解                                 | 不可能                |
| $\varepsilon = V_{\text{eff,min}}$     | 1（重根）                            | 圓形軌道（$r = r_0$） |
| $V_{\text{eff,min}} < \varepsilon < 0$ | 2（$r_{\min}$，$r_{\max}$）          | 橢圓                  |
| $\varepsilon = 0$                      | 1（$r_{\min}$，$r_{\max}\to\infty$） | 拋物線（剛好逃逸）    |
| $\varepsilon > 0$                      | 1（$r_{\min}$，無上界）              | 雙曲線（過剩能量）    |

**關鍵直覺**：能量水平線切 $V_{\text{eff}}$ 曲線的位置，就是 $r$ 的允許範圍。

---

## 4. 離心率公式

從能量和角動量，可以直接算出離心率 $e$，不需要解運動方程式。

從[上一篇]({% post_url 2026-06-02-conic-sections-polar %})的 Binet 方程式解：$r=\ell/(1+e\cos\theta)$，轉折點發生在 $\theta=0$ 和 $\theta=\pi$：

$$r_{\min} = \frac{\ell}{1+e}, \quad r_{\max} = \frac{\ell}{1-e}$$

用能量方程式在轉折點（$\dot{r}=0$）：

$$\varepsilon = V_{\text{eff}}(r_{\min}) = \frac{h^2}{2r_{\min}^2} - \frac{GM}{r_{\min}}$$

代入 $\ell = h^2/(GM)$，$r_{\min} = \ell/(1+e)$ 做代數整理（略去過程），得：

$$\boxed{e^2 = 1 + \frac{2\varepsilon h^2}{(GM)^2}}$$

這裡的 $e$ 是離心率；$\varepsilon$ 是單位質量能量，兩者不是同一個符號。

| $\varepsilon$                       | $e$            | 軌道   |
| ----------------------------------- | -------------- | ------ |
| $\varepsilon < 0$                   | $0 \leq e < 1$ | 橢圓   |
| $\varepsilon = 0$                   | $e = 1$        | 拋物線 |
| $\varepsilon > 0$                   | $e > 1$        | 雙曲線 |
| $\varepsilon = \varepsilon_{\min}$ | $e = 0$        | 圓形   |

---

## 5. 圓形軌道的穩定性

圓形軌道 $r=r_0$ 是 $V_{\text{eff}}$ 的極小值，小擾動會讓 $r$ 在 $r_0$ 附近振盪——圓形軌道是**穩定**的。

這與 $V_{\text{eff}} \propto -1/r^n$ 的冪次有關。可以證明：對 $F \propto 1/r^n$，穩定圓形軌道要求 $n < 3$。萬有引力 $n=2$ 滿足此條件（$n=3$ 時 $V_{\text{eff}}$ 無極小值，無穩定圓形軌道）。

---

## 6. 逃逸速度

在距中心 $r$ 處，「剛好逃逸」對應 $\varepsilon = 0$：

$$\frac{1}{2}mv_{\text{esc}}^2 - \frac{GMm}{r} = 0 \implies v_{\text{esc}} = \sqrt{\frac{2GM}{r}}$$

地表：$r=R_\oplus$，$v_{\text{esc}} \approx 11.2\,\text{km/s}$。

逃逸速度是拋物線軌道對應的速度。速度大於此值 $\Rightarrow$ 雙曲線；小於此值 $\Rightarrow$ 橢圓。

---

## 小結

- 有效位能 $V_{\text{eff}}(r) = h^2/(2r^2) - GM/r$，把二維問題化為一維
- $V_{\text{eff}}$ 的極小值 $r_0 = h^2/(GM)$ 對應圓形軌道
- 能量 $\varepsilon$ 決定軌道類型：$\varepsilon<0$ 橢圓，$=0$ 拋物線，$>0$ 雙曲線
- 離心率公式：$e^2 = 1 + 2\varepsilon h^2/(GM)^2$（直接連結單位質量能量、角動量與形狀）
- 逃逸速度 $v_{\text{esc}} = \sqrt{2GM/r}$ 對應 $\varepsilon=0$

[下一篇]({% post_url 2026-06-02-kepler-energy-angular-momentum %})深入能量守恆和角動量守恆的計算細節：vis-viva 方程式、半長軸與能量的關係，以及橢圓軌道幾何量之間的代數關係。

<div class="cta-box">
  <strong>還有問題嗎？</strong><br>
  <a href="/contact">→ 歡迎預約家教課，直接針對你的問題討論</a>
</div>
