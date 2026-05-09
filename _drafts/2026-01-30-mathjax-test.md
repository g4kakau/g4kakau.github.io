---
title: MathJax 排版完整測試
description: 測試 Chirpy + MathJax 對高中／大學數學教學的支援程度
date: 2026-01-30 03:20:00 +0800
categories: [Math]
tags: [mathjax, test]
math: true
---

這篇文章用來測試 **Chirpy 主題下 MathJax 的數學排版能力**，  
內容涵蓋高中到大一常見的數學表示法，作為未來教學筆記的基準。

---

## 0. Extension 導入

導入 *[physics](https://docs.mathjax.org/en/latest/input/tex/extensions/physics.html)*、*[mhchem](https://docs.mathjax.org/en/latest/input/tex/extensions/mhchem.html)* 等實用 extensions。
詳參閱 MathJax 的 [TeX/LaTeX Extension List](https://docs.mathjax.org/en/latest/input/tex/extensions/index.html)


> 這下面應該沒有出現東西。如果有，通常代表 extension 載入有問題。

$$
\require{physics}
\require{mhchem}
\require{cancel}
\require{color}
\require{upgreek}
\require{braket}
\require{boldsymbol}
\require{mathtools}
\require{extpfeil}
\require{unicode}
\require{enclose}
\require{bbox}
$$

---

## 1. 行內數學（Inline Math）

行內公式用 `$...$`：

- 質能等價：$E = mc^2$
- 一次函數：$y = ax + b$
- 二次判別式：$\Delta = b^2 - 4ac$

---

## 2. 區塊公式（Display Math）

$$
\int_{-\infty}^{\infty} e^{-x^2}\,\dd{x} = \sqrt{\pi}
$$

上式刻意用 `\dd{x}`（**[physics](https://docs.mathjax.org/en/latest/input/tex/extensions/physics.html)**）測試 spacing。

---

## 3. 交互參照

$$
\begin{equation}
  \sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
  \label{eq:basel}
\end{equation}
$$

可以在文中使用 `\eqref{labelname}`，以引用方程式，像是這樣：\eqref{eq:basel}。

再補一個同頁多式引用：

$$
\begin{equation}
  e^{i\pi} + 1 = 0
  \label{eq:euler}
\end{equation}
$$

這是 \eqref{eq:euler}。再次引用 \eqref{eq:basel}。

---

## 4. 多行對齊（aligned 環境）

$$
\begin{aligned}
f(x) &= x^2 - 4x + 3 \\
     &= (x-1)(x-3)
\end{aligned}
$$

---

## 5. 分段函數（cases 環境）

$$
f(x)=
\begin{cases}
x^2, & x \ge 0 \\
-x,  & x < 0
\end{cases}
$$

---

## 6. 分數、根號、次方、括號

$$
\frac{1}{2},\quad
\sqrt{2},\quad
\sqrt[3]{2},\quad
\sqrt{x^2+y^2},\quad
x^{n-1},\quad
\left(\frac{1}{x}\right)^p
$$

---

## 7. 極限

$$
\lim_{x\to 0}\frac{\sin x}{x}=1
$$

---

## 8. 微分與積分（physics）

### 8.1 導數

$$
\dv{x}(x^n) = n x^{n-1}
$$

$$
\dv[2]{x}\sin x = -\sin x
$$

### 8.2 偏導數

$$
\pdv{u}{x},\quad
\pdv[2]{u}{x},\quad
\pdv{u}{x}{y},\quad
\pdv*{u}{x}
$$

### 8.3 積分

$$
\int x^n\,\dd{x} = \frac{x^{n+1}}{n+1} + C
$$

$$
\int_a^b f(x)\,\dd{x}
$$

### 8.4 求值

$$
\eval{\frac{\sin x}{x}}_{x\to 0} = 1
$$

---

## 9. 向量與線性代數

### 9.1 向量與內積

不使用 [physics](https://docs.mathjax.org/en/latest/input/tex/extensions/physics.html)

$$
\vec{a}=\begin{pmatrix}1\\2\end{pmatrix},\quad
\vec{b}=\begin{pmatrix}3\\4\end{pmatrix}
$$

$$
\vec{a}\cdot\vec{b}=1\cdot 3 + 2\cdot 4 = 11
$$

使用 [physics](https://docs.mathjax.org/en/latest/input/tex/extensions/physics.html)

$$
\vb{a} = \va{a} = \mqty(1\\2),\quad \vu{a} = \frac{1}{\sqrt{5}}\mqty(1\\2)
$$

$$
\vb{a}\vdot\vb{b} = 1\cdot 3 + 2\cdot 4 = 11
$$

### 9.2 矩陣與行列式

不使用 [physics](https://docs.mathjax.org/en/latest/input/tex/extensions/physics.html)

$$
A=
\begin{pmatrix}
1 & 2\\
3 & 4
\end{pmatrix}, \quad
\det(A) = \begin{vmatrix}
1 & 2\\
3 & 4
\end{vmatrix}
$$

使用 [physics](https://docs.mathjax.org/en/latest/input/tex/extensions/physics.html)

$$
A = \mqty(a & b \\ c & d), \quad \det(A) = \mqty|a & b \\ c & d|
$$

---

## 10. 聯立方程式

$$
\begin{cases}
2x+y=5\\
x-y=1
\end{cases}
$$

---

## 11. 常用符號測試

$$
\forall x\in\mathbb{R},\quad x^2\ge 0
$$

$$
\exists\,x\in\mathbb{R}\ \text{such that}\ x^2=2
$$

$$
\sum_{k=1}^{n}k=\frac{n(n+1)}{2}
$$

---

## 12. 向量微積分（physics）

使用 [physics](https://docs.mathjax.org/en/latest/input/tex/extensions/physics.html)

$$
\vb{E},\quad \vb{B},\quad
\grad \phi,\quad
\divergence{\vb{E}},\quad
\curl{\vb{B}},\quad \laplacian
$$

不使用 [physics](https://docs.mathjax.org/en/latest/input/tex/extensions/physics.html)

$$
\vec{E},\quad \nabla\phi,\quad \nabla\cdot \vec{E},\quad \nabla\times\vec{B}
,\quad \nabla^2
$$

---

## 13. Dirac 記號（physics）

量子力學常見：

$$
\ket{\psi},\quad \bra{\phi},\quad \braket{\phi|\psi}
$$

若使用 [braket](https://docs.mathjax.org/en/latest/input/tex/extensions/braket.html)：

$$
\bra{\phi}\ket{\psi} = \braket{\phi|\psi}
$$

$$
\Braket{\psi | \hat{H} | \psi}
$$

（若要更教科書風格，`\Braket{}` 通常比手打 `|` 更不容易出錯。）

---

## 14. 運算子（physics）

$$
\begin{array}{cccc}
\sin{x} & \sinh{x} & \arcsin{x} & \arcsin{x} \\
\exp{x} & \log{x} & \ln{x} & \tr \rho \\
\rank{A} & \erf{x} & \Res[f(z)] & \Re(z) + i\Im(z)
\end{array}
$$

---

## 15. 化學式與單位（mhchem）

[mhchem](https://docs.mathjax.org/en/latest/input/tex/extensions/mhchem.html) 可用來排版化學式、反應式

化學式（`\ce`）：

$$
\ce{H2O},\quad
\ce{SO4^2-},\quad
\ce{CO2 + C -> 2CO},\quad
\ce{2H2 + O2 -> 2H2O}
$$

也可輕鬆排印帶有單位的數值（`\pu`）：

$$
\pu{9.8 m/s^2},\quad
\pu{1.60e-19 C},\quad
\pu{3.00e8 m/s}
$$

---

## 16. 其他 extension

### 16.1 color

[color](https://docs.mathjax.org/en/latest/input/tex/extensions/color.html) 支援方程式局部染色。

$$
{\color{red} 2x^3} + {\color{green} 3x^2}  + {\color{blue} 7x}  + {\color{magenta} 7x}
$$

### 16.2 cancel

[cancel](https://docs.mathjax.org/en/latest/input/tex/extensions/cancel.html) 提供多種消去的記號。

$$
\cancel{x^2} = \cancel{x^2} + 1, \quad 
\cancelto{0}{x}, \quad 
\bcancel{x^2} = \bcancel{x^2} + 1, \quad
\xcancel{x^2} = \xcancel{x^2} + 1
$$



### 16.3 upgreek

[upgreek](https://docs.mathjax.org/en/latest/input/tex/extensions/upgreek.html) 可排印出**直立希臘字母**。

$$
\upalpha,\ \upbeta,\ \upgamma,\ \updelta
$$


### 16.4 boldsymbol


[boldsymbol](https://docs.mathjax.org/en/latest/input/tex/extensions/boldsymbol.html) 可排印出**粗體數學符號**，特別是**粗體希臘字母**，例如角速度 $\boldsymbol{\omega}$：

$$
\boldsymbol{\alpha},\ 
\boldsymbol{\nabla},\ 
\boldsymbol{\Sigma}
$$


### 16.5 mathtools

[mathtools](https://docs.mathjax.org/en/latest/input/tex/extensions/extpfeil.html) 提供增強版的數學表示。教學常用：`\coloneqq`、`\mathclap`、`\prescript`。

定義符號（比 `:=` 更好看）：

$$
f(x) \coloneqq x^2 + 1
$$

左上標（例如張量或同位素標記）：

$$
\prescript{A}{}{\vb{T}}
$$

### 16.6 extpfeil

[extpfeil](https://docs.mathjax.org/en/latest/input/tex/extensions/extpfeil.html) 提供帶註記的長箭頭，適用推導、對應、反應。

$$
A \xrightarrow{\text{整理}} B \xRightarrow{\text{代入 }(1)} C
$$

極限/趨近常用：

$$
f(x) \xrightarrow[x\to 0]{} 1
$$


### 16.7 unicode

[unicode](https://docs.mathjax.org/en/latest/input/tex/extensions/unicode.html) 的價值在於「不用再記一堆指令名」，直接打符號就好，對教學筆記非常友善。

例如：

$$
∀x∈ℝ,\quad x²≥0
$$

$$
∃x∈ℝ\ \text{使得}\ x²=2
$$

$$
α, β, γ, θ, λ, ω
$$

### 16.8 enclose

[enclose](https://docs.mathjax.org/en/latest/input/tex/extensions/enclose.html) 可排版出各種形狀的圈選標示。

圓圈標示：

$$
\enclose{circle}{x^2-1}
$$

方框標示：

$$
\enclose{box}{\frac{1}{n(n+1)}}
$$

斜線：

$$
\enclose{updiagonalstrike}{x+1}
$$

### 16.9 bbox

[bbox](https://docs.mathjax.org/en/latest/input/tex/extensions/bbox.html) 可以在方程式外圍出帶有背景色的方框，用以凸顯公式。

簡單背景色：

$$
\bbox[yellow]{E=mc^2}
$$

加邊距（比較好看）：

$$
\bbox[yellow,2pt]{\int_0^1 x^n\dd{x}=\frac{1}{n+1}x^{n+1}}
$$

框線：

$$
\bbox[5px, border: 2px solid red]{f'(c)=\frac{f(b)-f(a)}{b-a}}
$$


---

## 17. 教學文常見混排

> **平均值定理**
> 
> 若 $f(x)$ 在區間 $[a,b]$ 連續且可微，則存在 $c\in(a,b)$ 使得：
>
> $$
> f'(c)=\frac{f(b)-f(a)}{b-a}
> $$
{: .prompt-info }

---

## ✅ 結論（目前狀態）

- 行內／區塊數學正常
- `aligned / cases / matrix / eqref` 適合教學推導
- physics / mhchem 等 extensions 成功載入，物理、化學排版會舒服很多
