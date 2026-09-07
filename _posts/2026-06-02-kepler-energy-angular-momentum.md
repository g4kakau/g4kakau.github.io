---
layout: post
title: "能量守恆與角動量守恆：vis-viva 方程式與橢圓軌道幾何量的完整關係"
date: 2026-06-02 04:00:00 +0800
categories: [大學物理, 天文物理]
tags: [克卜勒問題, vis-viva方程式, 角動量, 能量守恆, 橢圓軌道, 近日點, 遠日點, 大學物理, 天文物理]
math: true
description: "推導 vis-viva 方程式 v²=GM(2/r-1/a)，建立橢圓軌道單位質量能量 ε=-GM/(2a)、角動量 h²=GMa(1-e²) 與幾何量的完整關係。計算近日點與遠日點速度。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

這一篇整理克卜勒軌道的核心守恆律計算。守恆律是解軌道問題的利器——知道能量和角動量，幾乎所有幾何量都可以直接算出來，不需要解微分方程式。

---

## 1. 兩個守恆量

萬有引力是**保守力**，且是**連心力**，因此同時有：

- **能量守恆**：$E = \frac{1}{2}mv^2 - \frac{GMm}{r} = \text{const}$
- **角動量守恆**：$\vb{L} = m\vb{r}\times\vb{v}$，大小 $L = mh = mr^2\dot{\theta} = \text{const}$

（以下用單位質量量：$\varepsilon = E/m$，$h = L/m = r^2\dot{\theta}$）

---

## 2. 能量與半長軸的關係

軌道方程式 $r = \ell/(1+e\cos\theta)$，半長軸：

$$a = \frac{r_{\min}+r_{\max}}{2} = \frac{\ell}{1+e}\cdot\frac{1}{2} + \frac{\ell}{1-e}\cdot\frac{1}{2} = \frac{\ell}{1-e^2}$$

在近日點（$\theta=0$，$\dot{r}=0$，$v=r_{\min}\dot{\theta}$），速度最大，記為 $v_p$：

$$\varepsilon = \frac{1}{2}v_p^2 - \frac{GM}{r_{\min}}$$

在遠日點（$\theta=\pi$，$\dot{r}=0$），速度最小，記為 $v_a$：

$$\varepsilon = \frac{1}{2}v_a^2 - \frac{GM}{r_{\max}}$$

做代數整理（用 $r_{\min}+r_{\max}=2a$、$r_{\min}r_{\max}=a^2(1-e^2)=b^2$，以及角動量守恆 $r_{\min}v_p=r_{\max}v_a=h$），最終得到：

$$\boxed{\varepsilon = -\frac{GM}{2a}}$$

**能量只由半長軸決定**，與離心率無關。同樣半長軸的橢圓，無論多扁，總能量相同。

---

## 3. 角動量與幾何量的關係

面積速度：

$$\dv{A}{t} = \frac{h}{2}$$

橢圓面積 $\pi ab$，週期 $T$：

$$\pi ab = \frac{h}{2}T \implies h = \frac{2\pi ab}{T}$$

用 $T^2 = 4\pi^2 a^3/(GM)$：

$$h^2 = \frac{4\pi^2 a^2 b^2}{T^2} = \frac{4\pi^2 a^2 b^2 \cdot GM}{4\pi^2 a^3} = \frac{GMb^2}{a}$$

又 $b^2 = a^2(1-e^2)$，所以：

$$\boxed{h^2 = GMa(1-e^2) = GM\ell}$$

半正焦弦 $\ell = h^2/(GM)$，與上一篇的 Binet 方程式結果一致。

---

## 4. vis-viva 方程式

結合能量守恆 $\varepsilon = v^2/2 - GM/r$ 和 $\varepsilon = -GM/(2a)$：

$$\frac{v^2}{2} - \frac{GM}{r} = -\frac{GM}{2a}$$

$$\boxed{v^2 = GM\!\left(\frac{2}{r} - \frac{1}{a}\right)}$$

這就是 **vis-viva 方程式**（活力方程式）。給定軌道（$a$ 已知），只要知道當前位置 $r$，就能直接算速度大小，不需要方向。

**特例**：

- $r = r_{\min} = a(1-e)$：$v_p^2 = GM\dfrac{1+e}{a(1-e)}$（近日點速度最大）
- $r = r_{\max} = a(1+e)$：$v_a^2 = GM\dfrac{1-e}{a(1+e)}$（遠日點速度最小）
- $r = a$（此時 $P$ 位於**短軸端點**，該處到焦點的距離恰為 $a$）：$v^2 = GM/a$（等於半徑 $a$ 的圓形軌道速度）

---

## 5. 近日點與遠日點速度的比值

$$\frac{v_p}{v_a} = \frac{r_{\max}}{r_{\min}} = \frac{1+e}{1-e}$$

（這來自角動量守恆：$r_{\min}v_p = r_{\max}v_a = h$）

地球：$e \approx 0.0167$，$v_p/v_a \approx 1.034$——1月（近日點）比7月快約3.4%。

---

## 6. 完整參數表

| 量                 | 公式                                    | 說明                 |
| ------------------ | --------------------------------------- | -------------------- |
| 半長軸             | $a$                                     | 基本量               |
| 離心率             | $e$                                     | 基本量               |
| 半短軸             | $b = a\sqrt{1-e^2}$                     |                      |
| 半焦距             | $c = ae$                                |                      |
| 半正焦弦           | $\ell = a(1-e^2) = b^2/a$               |                      |
| 近日距             | $r_{\min} = a(1-e)$                     |                      |
| 遠日距             | $r_{\max} = a(1+e)$                     |                      |
| 能量（單位質量）   | $\varepsilon = -GM/(2a)$                | 只依賴 $a$           |
| 角動量（單位質量） | $h = \sqrt{GM\ell} = \sqrt{GMa(1-e^2)}$ | 依賴 $a$、$e$        |
| 週期               | $T = 2\pi a^{3/2}/\sqrt{GM}$            | 只依賴 $a$           |
| vis-viva           | $v^2 = GM(2/r - 1/a)$                   | 任意位置速度         |
| 角動量守恆         | $rv_\perp = h$                          | $v_\perp$ 為切向速度 |
| 離心率公式         | $e^2 = 1 + 2\varepsilon h^2/(GM)^2$     | 連結能量與形狀       |

---

## 7. 應用範例：霍曼轉移軌道

太空船從地球（$r_1=1\,\text{AU}$）轉移到火星（$r_2=1.52\,\text{AU}$）的最省燃料方案是**霍曼轉移**（Hohmann transfer）：沿橢圓軌道，近日點在地球軌道，遠日點在火星軌道。

$$a_H = \frac{r_1+r_2}{2} = \frac{1+1.52}{2} = 1.26\,\text{AU}$$

在 $r_1$ 處所需速度（vis-viva）：

$$v_1 = \sqrt{GM_\odot\!\left(\frac{2}{r_1} - \frac{1}{a_H}\right)}$$

相比地球公轉速度 $v_E = \sqrt{GM_\odot/r_1}$，需要額外 $\Delta v = v_1 - v_E \approx 2.9\,\text{km/s}$。

轉移時間（半個週期）：$t_H = T_H/2 = \pi a_H^{3/2}/\sqrt{GM_\odot} \approx 259\,\text{days}$。

---

## 小結

- 能量 $\varepsilon = -GM/(2a)$：**只依賴半長軸**，不管離心率
- 角動量 $h^2 = GMa(1-e^2)$：**依賴半長軸和離心率**
- vis-viva：$v^2 = GM(2/r-1/a)$，任意位置速度的萬用公式
- 近/遠日點速度比 $= r_{\max}/r_{\min} = (1+e)/(1-e)$（角動量守恆）
- 離心率公式 $e^2 = 1+2\varepsilon h^2/(GM)^2$ 把能量、角動量、軌道形狀全部連結

[下一篇]({% post_url 2026-06-14-kepler-period-integral %})將進入橢圓軌道的週期積分——用哈密頓–雅可比方法推導精確解，並說明為什麼這個積分不需要橢圓積分。
