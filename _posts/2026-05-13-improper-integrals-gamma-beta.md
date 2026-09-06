---
layout: post
title: "從瑕積分到 Gamma 函數與 Beta 函數"
date: 2026-05-13 00:00:00 +0800
categories: [大學數學, 微積分]
tags: [瑕積分, Gamma函數, Beta函數, 特殊函數, 大學微積分]
math: true
description: "瑕積分（improper integral）處理積分區間無窮或被積函數不連續的情形。本文說明兩類瑕積分的定義與收斂判斷，再介紹由瑕積分定義的兩個特殊函數：Gamma 函數（廣義階乘）與 Beta 函數，並展示兩者的關係與應用。"
---

$$\require{physics}$$

我們定義定積分 $\int_a^b f(x)\,\dd{x}$ 時，通常假設：

- 積分區間 $[a,b]$ 是**有限**的
- 被積函數 $f$ 在 $[a,b]$ 上**連續**（或至少有界）

如果這兩個條件有任一個不成立，就進入**瑕積分**（improper integral）的領域。

---

## 第一類：積分端點在無窮遠

### 定義

$$\int_a^{\infty} f(x)\,\dd{x} := \lim_{t \to \infty} \int_a^t f(x)\,\dd{x}$$

若這個極限存在（且有限），稱積分**收斂**（converges）；否則稱**發散**（diverges）。

類似地：

$$\int_{-\infty}^b f(x)\,\dd{x} := \lim_{t \to -\infty} \int_t^b f(x)\,\dd{x}$$

兩端都到無窮時，選任意中間點 $a$ 拆開：

$$\int_{-\infty}^{\infty} f(x)\,\dd{x} = \int_{-\infty}^a f(x)\,\dd{x} + \int_a^{\infty} f(x)\,\dd{x}$$

**兩個分項都必須收斂**，整體才算收斂。

### 例題

**例 1：** $\displaystyle\int_1^{\infty} \frac{1}{x^p}\,\dd{x}$ 何時收斂？

$$\int_1^t \frac{1}{x^p}\,\dd{x} = \begin{cases} \dfrac{t^{1-p}-1}{1-p} & p \neq 1 \\ \ln t & p = 1 \end{cases}$$

令 $t \to \infty$：

- $p > 1$：$t^{1-p} \to 0$，收斂，積分值為 $\dfrac{1}{p-1}$
- $p \leq 1$：發散

$$\boxed{\int_1^{\infty} \frac{1}{x^p}\,\dd{x} \text{ 收斂} \iff p > 1}$$

**例 2：** $\displaystyle\int_{-\infty}^{\infty} \frac{1}{1+x^2}\,\dd{x}$

$$\int_0^t \frac{1}{1+x^2}\,\dd{x} = \arctan t \xrightarrow{t\to\infty} \frac{\pi}{2}$$

同理另一半也等於 $\dfrac{\pi}{2}$，故

$$\int_{-\infty}^{\infty} \frac{1}{1+x^2}\,\dd{x} = \pi$$

---

## 第二類：被積函數在端點或區間內不連續

若 $f$ 在 $b$ 點不連續（趨近無窮），定義：

$$\int_a^b f(x)\,\dd{x} := \lim_{t \to b^-} \int_a^t f(x)\,\dd{x}$$

若不連續點 $c$ 在區間內部，拆開處理：

$$\int_a^b f(x)\,\dd{x} = \int_a^c f(x)\,\dd{x} + \int_c^b f(x)\,\dd{x}$$

**兩部分都必須收斂。**

### 例題

**例 3：** $\displaystyle\int_2^5 \frac{1}{\sqrt{x-2}}\,\dd{x}$

被積函數在 $x=2$ 處趨向無窮：

$$\int_{2+\varepsilon}^5 \frac{1}{\sqrt{x-2}}\,\dd{x} = \left[2\sqrt{x-2}\right]_{2+\varepsilon}^5 = 2\sqrt{3} - 2\sqrt{\varepsilon} \xrightarrow{\varepsilon\to 0^+} 2\sqrt{3}$$

收斂，積分值為 $2\sqrt{3}$。

**例 4：** $\displaystyle\int_0^3 \frac{1}{x-1}\,\dd{x}$（不連續點在 $x=1$ 的內部）

分成兩段：

$$\int_0^1 \frac{1}{x-1}\,\dd{x} = \lim_{t\to 1^-} \left[\ln|x-1|\right]_0^t = \lim_{t\to 1^-} \ln|t-1| - \ln 1 = -\infty$$

第一段發散，故整個積分**發散**。（注意：不能直接用 $[\ln\lvert x-1\rvert]_0^3$，那會漏掉不連續點。）

**例 5：** $\displaystyle\int_0^1 \ln x\,\dd{x}$

$$\int_\varepsilon^1 \ln x\,\dd{x} = \left[x\ln x - x\right]_\varepsilon^1 = -1 - (\varepsilon\ln\varepsilon - \varepsilon)$$

由於 $\lim_{\varepsilon\to 0^+} \varepsilon\ln\varepsilon = 0$（$\ln$ 趨向 $-\infty$ 的速度比 $1/\varepsilon$ 慢），得

$$\int_0^1 \ln x\,\dd{x} = -1$$

---

## Gamma 函數

### 定義

**Gamma 函數**（$\Gamma$ function）是一個瑕積分定義的特殊函數：

\begin{equation}\label{eq:gamma-definition}
\boxed{\Gamma(z) = \int_0^{\infty} t^{z-1} e^{-t}\,\dd{t}, \quad \operatorname{Re}(z) > 0}
\end{equation}

它又稱為**歐拉第二類積分**（Euler integral of the second kind）。

### 關鍵性質

**遞推關係：** 對 $\Gamma(z)$ 做分部積分：

$$\Gamma(z+1) = \int_0^{\infty} t^z e^{-t}\,\dd{t} = \left[-t^z e^{-t}\right]_0^{\infty} + z\int_0^{\infty} t^{z-1} e^{-t}\,\dd{t} = z\,\Gamma(z)$$

\begin{equation}\label{eq:gamma-recurrence}
\boxed{\Gamma(z+1) = z\,\Gamma(z)}
\end{equation}

**與階乘的關係：** 由於 $\Gamma(1) = \int_0^{\infty} e^{-t}\,\dd{t} = 1$，反覆應用遞推關係：

$$\Gamma(n) = (n-1)!, \quad n \in \mathbb{N}$$

Gamma 函數是把階乘**推廣到非整數**的自然方式——例如可由 \eqref{eq:gamma-recurrence} 算出 $\Gamma(3.5) = 2.5! = \frac{5}{2}\cdot\frac{3}{2}\cdot\frac{1}{2}\cdot\sqrt{\pi}$。

**特殊值：** $\Gamma\!\left(\dfrac{1}{2}\right) = \sqrt{\pi}$

這個結果來自高斯積分：

$$\Gamma\!\left(\tfrac{1}{2}\right) = \int_0^{\infty} t^{-1/2} e^{-t}\,\dd{t} \xlongequal{t=u^2} 2\int_0^{\infty} e^{-u^2}\,\dd{u} = \sqrt{\pi}$$

由此可以計算所有半整數的 Gamma 值：

$$\Gamma\!\left(\tfrac{3}{2}\right) = \tfrac{1}{2}\Gamma\!\left(\tfrac{1}{2}\right) = \frac{\sqrt{\pi}}{2}, \quad \Gamma\!\left(\tfrac{5}{2}\right) = \tfrac{3}{2}\cdot\tfrac{1}{2}\cdot\sqrt{\pi} = \frac{3\sqrt{\pi}}{4}, \quad \ldots$$

### 計算例題

**例 6：** 計算 $\displaystyle\int_0^{\infty} x^3 e^{-x}\,\dd{x}$。由 \eqref{eq:gamma-definition}：

$$\int_0^{\infty} x^3 e^{-x}\,\dd{x} = \Gamma(4) = 3! = 6$$

**例 7：** 計算 $\displaystyle\int_0^{\infty} x^3 e^{-2x}\,\dd{x}$

令 $u = 2x$，$\dd{x} = \dd{u}/2$：

$$\int_0^{\infty} \left(\frac{u}{2}\right)^3 e^{-u} \frac{\dd{u}}{2} = \frac{1}{16}\int_0^{\infty} u^3 e^{-u}\,\dd{u} = \frac{\Gamma(4)}{16} = \frac{6}{16} = \frac{3}{8}$$

**一般化公式：**

$$\int_0^{\infty} x^{\alpha-1} e^{-x/\beta}\,\dd{x} = \beta^{\alpha}\,\Gamma(\alpha)$$

---

## Beta 函數

### 定義

**Beta 函數**（$\mathrm{B}$ function）定義為：

\begin{equation}\label{eq:beta-definition}
\boxed{\mathrm{B}(x,y) = \int_0^1 t^{x-1}(1-t)^{y-1}\,\dd{t}, \quad x,y > 0}
\end{equation}

### 關鍵性質

**對稱性：**

$$\mathrm{B}(x,y) = \mathrm{B}(y,x)$$

（令 $t \mapsto 1-t$ 即得）

**與 Gamma 函數的關係：**

\begin{equation}\label{eq:beta-gamma-relation}
\boxed{\mathrm{B}(x,y) = \frac{\Gamma(x)\,\Gamma(y)}{\Gamma(x+y)}}
\end{equation}

這個等式的證明需要二重積分換元（雅可比行列式），結論是：$\Gamma(x)\cdot\Gamma(y) = \mathrm{B}(x,y)\cdot\Gamma(x+y)$。

**三角積分形式：** 令 $t = \sin^2\theta$：

$$\mathrm{B}(x,y) = 2\int_0^{\pi/2} (\sin\theta)^{2x-1}(\cos\theta)^{2y-1}\,\dd{\theta}$$

這讓很多含三角冪次的定積分可以用 Beta 函數直接計算。

### 計算例題

**例 8：** 計算 $\displaystyle\int_0^1 x^4(1-x)^6\,\dd{x}$。套用 \eqref{eq:beta-definition} 與 \eqref{eq:beta-gamma-relation}：

$$\int_0^1 x^4(1-x)^6\,\dd{x} = \mathrm{B}(5,7) = \frac{\Gamma(5)\,\Gamma(7)}{\Gamma(12)} = \frac{4!\cdot 6!}{11!} = \frac{24 \times 720}{39916800} \approx 4.33 \times 10^{-4}$$

**例 9：** 計算 $\displaystyle\int_0^{\pi/2} \sin^5\theta\,\dd{\theta}$

對應 $x = 3, y = 1/2$（由 $2x-1 = 5$，$2y-1 = 0$）：

$$\int_0^{\pi/2} \sin^5\theta\,\dd{\theta} = \frac{1}{2}\mathrm{B}(3, \tfrac{1}{2}) = \frac{\Gamma(3)\,\Gamma(1/2)}{2\,\Gamma(7/2)} = \frac{2!\cdot\sqrt{\pi}}{2 \cdot \frac{15}{8}\sqrt{\pi}} = \frac{2}{15/4} = \frac{8}{15}$$

---

## 兩者的關係圖

$$\Gamma(z+1) = z\,\Gamma(z) \quad \longleftrightarrow \quad \text{階乘的推廣}$$

$$\mathrm{B}(x,y) = \frac{\Gamma(x)\Gamma(y)}{\Gamma(x+y)} \quad \longleftrightarrow \quad \text{把乘積轉為單一函數}$$

Beta 函數的實際用途：把 $\int_0^1 t^m(1-t)^n\,\dd{t}$ 這類積分，不需要展開計算，直接用組合公式讀出答案。

---

## 附錄：Gabriel's Horn（趣味應用）

Gabriel's Horn（加百列之角）是曲線 $y = 1/x$（$x \geq 1$）繞 $x$ 軸旋轉所得的旋轉體。

它有個看似矛盾的性質：

$$\text{體積} = \pi\int_1^{\infty} \frac{1}{x^2}\,\dd{x} = \pi \quad (\text{收斂})$$

$$\text{表面積} = 2\pi\int_1^{\infty} \frac{1}{x}\sqrt{1+\frac{1}{x^4}}\,\dd{x} > 2\pi\int_1^{\infty} \frac{1}{x}\,\dd{x} = \infty \quad (\text{發散})$$

體積有限，但表面積無窮大——「可以裝滿油漆，卻無法塗滿它的表面」。這個悖論其實說明的是：「體積有限」和「表面積有限」是兩個獨立的條件，互不蘊含。
