---
layout: post
title: "黎曼積分：定積分到底在定義什麼？"
date: 2026-05-17 00:00:00 +0800
categories: [大學數學, 微積分]
tags: [黎曼積分, 定積分, 微積分基本定理, 大學微積分, 可積性]
math: true
description: "定積分不只是「反導數代入上下限」——它的真正定義來自黎曼和的極限。本文從面積直覺出發，介紹黎曼和、下和與上和、可積性的意義，再連結到微積分基本定理，幫你補上教科書常常跳過的那一段。"
---

$$\require{physics}$$

你可以算出 $\int_0^1 x^2 \dd{x} = \frac{1}{3}$，但你知道這個 $\frac{1}{3}$ 是怎麼被**定義**出來的嗎？

反導數的那套方法（找 $F(x)$，代 $F(b) - F(a)$）是計算工具，不是定義。定積分的真正定義來自一個更基本的問題：**曲線下面積是什麼意思**？這就是黎曼積分（Riemann integral）要回答的問題。

---

## 從逼近開始：黎曼和

最樸素的想法是用**矩形來逼近面積**。

取 $f(x) = x^2$，區間 $[0, 1]$。把 $[0,1]$ 切成 $n$ 等份，每小格寬度 $\Delta x = 1/n$。用每個子區間**右端點**的函數值作為矩形高度，面積和為：

$$
R_n = \frac{1}{n} \cdot \left(\frac{1}{n}\right)^2 + \frac{1}{n} \cdot \left(\frac{2}{n}\right)^2 + \cdots + \frac{1}{n} \cdot \left(\frac{n}{n}\right)^2 = \frac{1}{n^3}\sum_{k=1}^{n} k^2
$$

用平方和公式 $\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6}$，得：

$$
R_n = \frac{(n+1)(2n+1)}{6n^2}
$$

用**左端點**同樣算，得 $L_n = \dfrac{(n-1)(2n-1)}{6n^2}$。

不管用左端點還是右端點，當 $n \to \infty$ 時：

$$
\lim_{n\to\infty} R_n = \lim_{n\to\infty} L_n = \frac{1}{3}
$$

面積 $S = \frac{1}{3}$ 就這樣被「夾出來」了。

---

## 樣本點可以任選：黎曼和的一般形式

切得更一般：不要求等份，也不規定選哪個端點。

**分割**（partition）：把 $[a, b]$ 切成 $n$ 個子區間 $[x_0, x_1], [x_1, x_2], \ldots, [x_{n-1}, x_n]$，其中 $x_0 = a < x_1 < \cdots < x_n = b$。

每個子區間寬度 $\Delta x_i = x_i - x_{i-1}$，在裡面任取**樣本點**（sample point）$x_i^* \in [x_{i-1}, x_i]$。

**黎曼和**（Riemann sum）定義為：

$$
\boxed{S = \sum_{i=1}^{n} f(x_i^*)\,\Delta x_i}
$$

幾何意義：$n$ 個矩形的面積加總，每個矩形寬 $\Delta x_i$、高 $f(x_i^*)$。

---

## 可積性：不管怎麼切，極限都一樣

直覺上，只要矩形切得夠細，面積和應該趨向同一個值——不管怎麼切、怎麼選樣本點。

**分割的細度**用最寬子區間的寬度來衡量，稱為**網格大小**（mesh size，記作 $\|\mathcal{P}\|$）：

$$
\|\mathcal{P}\| = \max_i \Delta x_i
$$

**定義（黎曼可積）：** 若對任意 $\varepsilon > 0$，存在 $\delta > 0$，使得只要 $\|\mathcal{P}\| < \delta$，對所有樣本點選法，黎曼和都滿足

$$
\left|\sum_{i=1}^{n} f(x_i^*)\,\Delta x_i - I\right| < \varepsilon
$$

則稱 $f$ 在 $[a,b]$ 上**黎曼可積**（Riemann-integrable），極限值 $I$ 就是**定積分**：

$$
\int_a^b f(x)\,\dd{x} = I
$$

**關鍵結論：在 $[a,b]$ 上連續的函數一定黎曼可積。** 分段連續（只有有限個跳躍點）也可積。

---

## 上和與下和：更嚴格的視角

除了任意選樣本點，也可以取「最保守」和「最樂觀」的估計：

在每個子區間 $[x_{i-1}, x_i]$ 上，令

$$
m_i = \inf_{x\in[x_{i-1},x_i]} f(x), \qquad M_i = \sup_{x\in[x_{i-1},x_i]} f(x)
$$

**下和**（lower sum，下達布和）：$L(f,\mathcal{P}) = \displaystyle\sum_{i=1}^n m_i \,\Delta x_i$

**上和**（upper sum，上達布和）：$U(f,\mathcal{P}) = \displaystyle\sum_{i=1}^n M_i \,\Delta x_i$

對任何樣本點選法，黎曼和都被夾在下和與上和之間：

$$
L(f,\mathcal{P}) \leq \sum_{i=1}^n f(x_i^*)\,\Delta x_i \leq U(f,\mathcal{P})
$$

**達布可積判準：** $f$ 可積 $\iff$ $\inf_{\mathcal{P}} U(f,\mathcal{P}) = \sup_{\mathcal{P}} L(f,\mathcal{P})$。兩邊夾到同一個值，那就是積分值。

---

## 積分的基本性質

設 $f, g$ 在 $[a,b]$ 可積，$c \in (a,b)$，$\alpha, \beta \in \mathbb{R}$：

**線性性：**

$$\int_a^b \bigl[\alpha f(x) + \beta g(x)\bigr]\dd{x} = \alpha\int_a^b f(x)\dd{x} + \beta\int_a^b g(x)\dd{x}$$

**子區間可加：**

$$\int_a^b f(x)\dd{x} = \int_a^c f(x)\dd{x} + \int_c^b f(x)\dd{x}$$

**單調性：** 若 $f(x) \leq g(x)$ 在 $[a,b]$ 上，則 $\displaystyle\int_a^b f\,\dd{x} \leq \int_a^b g\,\dd{x}$。

**絕對值不等式：**

$$\left|\int_a^b f(x)\dd{x}\right| \leq \int_a^b \lvert f(x)\rvert\,\dd{x}$$

---

## 微積分基本定理：積分與微分的橋樑

黎曼積分的定義看起來繁瑣，為什麼不直接用「反導數」算呢？因為微積分基本定理告訴我們兩種觀點的連結：

**第一部分（微分微積分基本定理）：**

若 $f$ 在 $[a,b]$ 連續，定義累積面積函數

$$F(x) = \int_a^x f(t)\,\dd{t}$$

則 $F$ 在 $[a,b]$ 可微，且 $F'(x) = f(x)$。

**幾何直覺：** $F(x)$ 是從 $a$ 到 $x$ 的面積。$F(x + \Delta x) - F(x)$ 就是那一小條矩形的面積 $\approx f(x) \cdot \Delta x$，所以 $F'(x) = f(x)$。

**第二部分（牛頓–萊布尼茲公式）：**

若 $f$ 在 $[a,b]$ 連續，$F$ 是 $f$ 的任一反導數（$F' = f$），則

$$\boxed{\int_a^b f(x)\dd{x} = F(b) - F(a)}$$

這就是為什麼計算時只需要找反導數代入上下限——它是黎曼積分定義的**推論**，不是定義本身。

---

## 例題

### 例題一：從黎曼和推導 $\int_0^1 x\,\dd{x}$

將 $[0,1]$ 等分成 $n$ 份，取右端點 $x_k^* = k/n$：

$$
S_n = \sum_{k=1}^n \frac{k}{n} \cdot \frac{1}{n} = \frac{1}{n^2}\sum_{k=1}^n k = \frac{1}{n^2} \cdot \frac{n(n+1)}{2} = \frac{n+1}{2n}
$$

$$
\int_0^1 x\,\dd{x} = \lim_{n\to\infty} \frac{n+1}{2n} = \frac{1}{2}
$$

（也可以直覺：這是底為 1、高為 1 的三角形，面積 $= \frac{1}{2}$。）

### 例題二：用基本定理計算

$$\int_1^4 \frac{1}{x}\dd{x} = \bigl[\ln x\bigr]_1^4 = \ln 4 - \ln 1 = \ln 4$$

### 例題三：可積性判斷

函數 $f(x)$ 在 $[0,1]$ 上定義為：$x$ 有理時 $f(x)=1$，$x$ 無理時 $f(x)=0$（狄利克雷函數）。

任意分割下，每個子區間都含有理數也含無理數，所以上和恆等於 $1$、下和恆等於 $0$，兩者不相等。**狄利克雷函數黎曼不可積。**

---

## 總結

| 概念 | 定義 |
|---|---|
| 黎曼和 | $\displaystyle\sum_{i=1}^n f(x_i^*)\,\Delta x_i$，矩形逼近面積 |
| 黎曼可積 | 不管怎麼切、怎麼選樣本點，黎曼和趨向同一極限 |
| 下和 / 上和 | 用每個子區間的最小值 / 最大值作高的矩形和 |
| 連續 ⟹ 可積 | 在 $[a,b]$ 連續必黎曼可積 |
| 基本定理 | $F'=f \Rightarrow \int_a^b f\,\dd{x} = F(b)-F(a)$ |

黎曼積分的思路很簡單：用矩形逼近，讓矩形無限細，看極限是否存在。微積分基本定理說明，對連續函數，這個極限可以用反導數代入上下限來算——這才是那個「$F(b)-F(a)$」公式成立的真正理由。
