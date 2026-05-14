---
layout: post
title: "行列式的幾何意義：面積與體積"
date: 2026-05-12 03:48:34 +0800
categories: [大學數學, 線性代數]
tags: [行列式, 線性代數, 線性變換, 幾何意義]
math: true
description: "行列式不只是「判斷可逆性」的工具。它衡量向量張出的平行四邊形面積與平行六面體體積，並且告訴你線性變換如何縮放空間。"
---

高中數學介紹行列式時，通常會提到：$2 \times 2$ 行列式

$$
\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc
$$

代表兩個向量張出的平行四邊形面積。這個直觀是對的，但通常只輕輕帶過。

進到大學線代，行列式往往又退回到「判斷矩陣可逆性」的代數工具，面積的詮釋反而消失了。

這篇把幾何意義說清楚：行列式是**有向面積／體積**，也是線性變換的**空間縮放倍率**。兩個身份合在一起，才是行列式的完整圖像。

---

## 一、$2 \times 2$ 行列式 = 平行四邊形面積

設兩個平面向量 $\mathbf{u} = (u_1, u_2)^T$，$\mathbf{v} = (v_1, v_2)^T$。

**主張：** 由 $\mathbf{u}$ 和 $\mathbf{v}$ 張出的平行四邊形面積等於

$$
\text{面積} = \left\lvert\det\begin{pmatrix} u_1 & v_1 \\ u_2 & v_2 \end{pmatrix}\right\rvert = \lvert u_1 v_2 - u_2 v_1 \rvert
$$

**推導思路：** 先考慮最簡單的情況：$\mathbf{u}$ 沿 $x$ 軸、$\mathbf{v}$ 沿 $y$ 軸，也就是 $\mathbf{u}' = (c, 0)^T$、$\mathbf{v}' = (0, d)^T$。此時平行四邊形就是矩形，面積 $= c \cdot d$，正好等於

$$
\det\begin{pmatrix} c & 0 \\ 0 & d \end{pmatrix} = cd
$$

接下來用兩個行列式性質把一般情況化為這個特例：

1. **列對調變號**：

   $$\det\begin{pmatrix} c & d \\ a & b \end{pmatrix} = -\det\begin{pmatrix} a & b \\ c & d \end{pmatrix}$$

2. **某列加上另一列的倍數，行列式不變**：這對應到「斜切（shear）不改變面積」

用這兩個性質，可以把任意 $\mathbf{u}$、$\mathbf{v}$ 化回沿軸方向的矩形，完成推導。

$$
\boxed{\text{由 } \mathbf{u},\, \mathbf{v} \text{ 張出的平行四邊形面積} = \left\lvert\det\begin{pmatrix} \mathbf{u} & \mathbf{v} \end{pmatrix}\right\rvert}
$$

### 例題

求由 $\mathbf{u} = (-2, 3)^T$、$\mathbf{v} = (1, 5)^T$ 張出的平行四邊形面積。

$$
\det\begin{pmatrix} -2 & 1 \\ 3 & 5 \end{pmatrix} = (-2)(5) - (1)(3) = -13
$$

面積 $= \lvert -13 \rvert = 13$。

（負號表示 $\mathbf{u}$、$\mathbf{v}$ 的排列方向是順時針；取絕對值後得面積。）

---

## 二、$3 \times 3$ 行列式 = 平行六面體體積

三維的情況完全類比：由三個向量 $\mathbf{u}$、$\mathbf{v}$、$\mathbf{w}$ 張出的**平行六面體**（三組平行平面圍成的立體，長方體的推廣）體積為

$$
\text{體積} = \left\lvert\det\begin{pmatrix} \mathbf{u} & \mathbf{v} & \mathbf{w} \end{pmatrix}\right\rvert
$$

### 例題

由 $\mathbf{u} = (1,1,1)^T$、$\mathbf{v} = (1,-2,1)^T$、$\mathbf{w} = (1,0,-1)^T$ 張出的平行六面體體積。

沿第一列餘因子展開：

$$
\det\begin{pmatrix}1&1&1\\1&-2&0\\1&1&-1\end{pmatrix}
= 1\cdot\det\begin{pmatrix}-2&0\\1&-1\end{pmatrix}
- 1\cdot\det\begin{pmatrix}1&0\\1&-1\end{pmatrix}
+ 1\cdot\det\begin{pmatrix}1&-2\\1&1\end{pmatrix}
$$

$$
= 1\cdot(2) - 1\cdot(-1) + 1\cdot(3) = 6
$$

體積 $= \lvert 6 \rvert = 6$。

---

## 三、插曲：餘因子展開有多慢？

計算行列式最直覺的方法是**餘因子展開**——把 $n \times n$ 行列式拆成 $n$ 個 $(n-1)\times(n-1)$ 子行列式，遞迴下去。

代價是：計算量約 $e \cdot n!$ 次乘法。

拿一台每秒能做 $10^9$ 次運算的電腦來算 $20 \times 20$ 矩陣：

$$
\frac{e \cdot 20!}{10^9} \approx \frac{2.718 \times 2.43 \times 10^{18}}{10^9} \approx 6.6 \times 10^{9} \text{ 秒} \approx \mathbf{209 \text{ 年}}
$$

這就是為什麼實際計算行列式時不用餘因子展開，而是先做**高斯消去法**把矩陣化成上三角矩陣，再把對角線元素相乘——計算量從 $O(n!)$ 降到 $O(n^3)$，差了天文數字。

> 三角矩陣的行列式 $=$ 對角線元素乘積。高斯消去的每一步只是列加法，根據行列式性質，這不改變行列式的值（除了列對調會改變符號）。

---

## 四、旋轉不改變行列式的直觀

旋轉矩陣的行列式恆為 $1$：

$$
\det\begin{pmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{pmatrix} = \cos^2\theta + \sin^2\theta = 1
$$

直觀：旋轉只改變方向，不改變大小，所以面積倍率是 $1$。

一般的等距變換（isometry，如旋轉、反射）滿足 $\lvert\det A\rvert = 1$。其中旋轉的 $\det A = +1$，反射的 $\det A = -1$——正負號紀錄了方向是否翻轉。

---

## 五、線性變換如何縮放面積

行列式的幾何意義有一個重要推論：**線性變換 $T$（標準矩陣為 $A$）會把所有面積縮放 $\lvert\det A\rvert$ 倍**。

$$
\text{面積}\bigl(T(\Omega)\bigr) = \lvert\det A\rvert \times \text{面積}(\Omega)
$$

對 $\mathbb{R}^n$ 完全類比——$n$ 維體積同樣縮放 $\lvert\det A\rvert$ 倍。

直觀上：任何區域可以切成很多小平行四邊形，每個小平行四邊形在 $T$ 下都縮放 $\lvert\det A\rvert$ 倍，整個區域自然也縮放同樣倍率。

幾個特殊情況：

- $\lvert\det A\rvert = 1$：保面積（旋轉、反射、斜切）
- $\lvert\det A\rvert = 2$：面積變成兩倍
- $\lvert\det A\rvert = 0$：矩陣不可逆，整個平面「壓扁」到低維，面積歸零

最後一點正好解釋了「$\det A = 0 \iff A$ 不可逆」：行列式為 0 意思是這個變換把空間壓扁了，無法還原。

---

## 六、總結：行列式的三重身份

| 角色 | 內容 |
|---|---|
| **代數工具** | 判斷可逆性；計算特徵值 $\det(A - \lambda I) = 0$ |
| **幾何量** | 向量張出的有向面積／體積 |
| **縮放比** | 線性變換把 $n$ 維體積縮放 $\lvert\det A\rvert$ 倍 |

三個身份是同一件事的不同面向。下次計算行列式時，腦子裡同時有「這個數代表空間被壓縮了多少」，理解就深了一層。

---

**延伸：wedge product**

行列式的面積／體積詮釋，可以被 **exterior algebra（外代數）** 中的 **wedge product（楔積）** $\mathbf{u} \wedge \mathbf{v}$ 說得更精確。這個語言把「有向面積」變成一個代數物件，不只能處理平行四邊形，還能直接定義任意維度的「有向體積元」。這是下一篇的主題。

{% include cta.html %}
