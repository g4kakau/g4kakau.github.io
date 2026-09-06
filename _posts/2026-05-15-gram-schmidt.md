---
layout: post
title: "Gram–Schmidt 正交化：把歪的基底拉直"
date: 2026-05-15 00:00:00 +0800
categories: [大學數學, 線性代數]
tags: [Gram-Schmidt, 正交化, 線性代數, QR分解, 正交基底]
math: true
description: "一組線性獨立的向量，如何變成正交（甚至標準正交）基底？Gram–Schmidt 正交化流程提供了系統性的答案。本文從幾何直覺出發，介紹投影、去除分量、正規化三個步驟，附完整例題與 QR 分解的連結。"
---

$$\require{physics}$$

給你一組線性獨立的向量 $\vb{v}_1, \vb{v}_2, \vb{v}_3$——它們可以張成某個子空間，但方向彼此歪斜，用起來很麻煩。

能不能把它們「拉直」，換成一組方向互相垂直的向量，而且張成同樣的空間？

可以。這就是 **Gram–Schmidt 正交化**的目的。

---

## 為什麼要正交基底？

一組**正交基底**（orthogonal basis）有一個決定性的優點：在正交基底下，任何向量的坐標都可以用**內積直接求出**，不需要解方程組。

若 $\{\vb{e}_1, \vb{e}_2, \ldots, \vb{e}_n\}$ 是標準正交基底（orthonormal basis，兩兩正交且長度為 1），則

$$
\vb{x} = (\vb{x}\cdot\vb{e}_1)\vb{e}_1 + (\vb{x}\cdot\vb{e}_2)\vb{e}_2 + \cdots + (\vb{x}\cdot\vb{e}_n)\vb{e}_n
$$

每個係數只要做一次內積，非常簡潔。這是 Gram–Schmidt 在數值計算、QR 分解、最小平方法中大量使用的原因。

---

## 核心工具：正交投影

在正式介紹流程之前，先定義**向量 $\vb{a}$ 在向量 $\vb{b}$ 方向上的正交投影**（orthogonal projection）：

$$
\operatorname{proj}_{\vb{b}} \vb{a} = \frac{\vb{a} \cdot \vb{b}}{\vb{b} \cdot \vb{b}}\,\vb{b}
$$

幾何意義：從 $\vb{a}$ 的終點往 $\vb{b}$ 所在直線作垂線，垂足對應的向量就是 $\operatorname{proj}_{\vb{b}} \vb{a}$。

**殘差**（residual）$\vb{a} - \operatorname{proj}_{\vb{b}} \vb{a}$ 就是 $\vb{a}$ 扣掉在 $\vb{b}$ 方向的分量，必定與 $\vb{b}$ 正交。

---

## Gram–Schmidt 流程

給定線性獨立的向量 $\vb{v}_1, \vb{v}_2, \ldots, \vb{v}_k$，輸出正交向量 $\vb{u}_1, \vb{u}_2, \ldots, \vb{u}_k$（張成同一子空間）：

$$
\vb{u}_1 = \vb{v}_1
$$

$$
\vb{u}_2 = \vb{v}_2 - \operatorname{proj}_{\vb{u}_1}\vb{v}_2
$$

$$
\vb{u}_3 = \vb{v}_3 - \operatorname{proj}_{\vb{u}_1}\vb{v}_3 - \operatorname{proj}_{\vb{u}_2}\vb{v}_3
$$

一般地：

$$
\boxed{\vb{u}_j = \vb{v}_j - \sum_{i=1}^{j-1} \operatorname{proj}_{\vb{u}_i}\vb{v}_j}
$$

**直覺：** $\vb{u}_j$ 等於 $\vb{v}_j$ 減掉它在所有已有正交方向上的投影，剩下的就是「全新的方向」——必然與所有已有的 $\vb{u}_i$ 正交。

若需要**標準正交基底**（ONB），最後再正規化：

$$
\vb{e}_j = \frac{\vb{u}_j}{\|\vb{u}_j\|}
$$

---

## 例題一：$\mathbb{R}^2$ 中的正交化

給定

$$
\vb{v}_1 = \begin{bmatrix}3\\1\end{bmatrix}, \qquad \vb{v}_2 = \begin{bmatrix}2\\2\end{bmatrix}
$$

**步驟一：** $\vb{u}_1 = \vb{v}_1$

$$
\vb{u}_1 = \begin{bmatrix}3\\1\end{bmatrix}
$$

**步驟二：** 計算 $\vb{v}_2$ 在 $\vb{u}_1$ 方向的投影並扣除

$$
\operatorname{proj}_{\vb{u}_1}\vb{v}_2 = \frac{\vb{v}_2\cdot\vb{u}_1}{\vb{u}_1\cdot\vb{u}_1}\,\vb{u}_1 = \frac{6+2}{9+1}\begin{bmatrix}3\\1\end{bmatrix} = \frac{8}{10}\begin{bmatrix}3\\1\end{bmatrix} = \begin{bmatrix}12/5\\4/5\end{bmatrix}
$$

$$
\vb{u}_2 = \vb{v}_2 - \operatorname{proj}_{\vb{u}_1}\vb{v}_2 = \begin{bmatrix}2\\2\end{bmatrix} - \begin{bmatrix}12/5\\4/5\end{bmatrix} = \begin{bmatrix}-2/5\\6/5\end{bmatrix}
$$

**驗算：** $\vb{u}_1 \cdot \vb{u}_2 = 3(-2/5) + 1(6/5) = -6/5 + 6/5 = 0$ ✓

**正規化（若需要 ONB）：**

$$
\vb{e}_1 = \frac{1}{\sqrt{10}}\begin{bmatrix}3\\1\end{bmatrix}, \qquad \vb{e}_2 = \frac{1}{\sqrt{40/25}}\begin{bmatrix}-2/5\\6/5\end{bmatrix} = \frac{1}{\sqrt{8/5}}\begin{bmatrix}-2/5\\6/5\end{bmatrix}
$$

化簡：$\|\vb{u}_2\| = \sqrt{4/25 + 36/25} = \sqrt{40/25} = 2\sqrt{10}/5$，

$$
\vb{e}_2 = \frac{5}{2\sqrt{10}}\begin{bmatrix}-2/5\\6/5\end{bmatrix} = \frac{1}{\sqrt{10}}\begin{bmatrix}-1\\3\end{bmatrix}
$$

---

## 例題二：$\mathbb{R}^3$ 中的正交化

給定

$$
\vb{v}_1 = \begin{bmatrix}1\\1\\0\end{bmatrix}, \qquad \vb{v}_2 = \begin{bmatrix}1\\0\\1\end{bmatrix}, \qquad \vb{v}_3 = \begin{bmatrix}0\\1\\1\end{bmatrix}
$$

**步驟一：**

$$
\vb{u}_1 = \begin{bmatrix}1\\1\\0\end{bmatrix}
$$

**步驟二：**

$$
\operatorname{proj}_{\vb{u}_1}\vb{v}_2 = \frac{1+0+0}{1+1+0}\begin{bmatrix}1\\1\\0\end{bmatrix} = \frac{1}{2}\begin{bmatrix}1\\1\\0\end{bmatrix}
$$

$$
\vb{u}_2 = \begin{bmatrix}1\\0\\1\end{bmatrix} - \frac{1}{2}\begin{bmatrix}1\\1\\0\end{bmatrix} = \begin{bmatrix}1/2\\-1/2\\1\end{bmatrix}
$$

**步驟三：**

$$
\operatorname{proj}_{\vb{u}_1}\vb{v}_3 = \frac{0+1+0}{2}\begin{bmatrix}1\\1\\0\end{bmatrix} = \frac{1}{2}\begin{bmatrix}1\\1\\0\end{bmatrix}
$$

$$
\operatorname{proj}_{\vb{u}_2}\vb{v}_3 = \frac{0\cdot\frac{1}{2}+1\cdot(-\frac{1}{2})+1\cdot 1}{\frac{1}{4}+\frac{1}{4}+1}\begin{bmatrix}1/2\\-1/2\\1\end{bmatrix} = \frac{1/2}{3/2}\begin{bmatrix}1/2\\-1/2\\1\end{bmatrix} = \frac{1}{3}\begin{bmatrix}1/2\\-1/2\\1\end{bmatrix}
$$

$$
\vb{u}_3 = \begin{bmatrix}0\\1\\1\end{bmatrix} - \frac{1}{2}\begin{bmatrix}1\\1\\0\end{bmatrix} - \frac{1}{3}\begin{bmatrix}1/2\\-1/2\\1\end{bmatrix}
= \begin{bmatrix}0 - 1/2 - 1/6\\1 - 1/2 + 1/6\\1 - 0 - 1/3\end{bmatrix}
= \begin{bmatrix}-2/3\\2/3\\2/3\end{bmatrix}
$$

**驗算：** $\vb{u}_1\cdot\vb{u}_3 = -2/3 + 2/3 + 0 = 0$ ✓，$\vb{u}_2\cdot\vb{u}_3 = -1/3 - 1/3 + 2/3 = 0$ ✓

---

## 與 QR 分解的關係

把 $n$ 個線性獨立的行向量排成矩陣 $A = [\vb{v}_1 \mid \vb{v}_2 \mid \cdots \mid \vb{v}_n]$。

Gram–Schmidt 正交化本質上在做 **QR 分解**：

$$
A = QR
$$

其中 $Q$ 的行是正規化後的 $\vb{e}_1, \ldots, \vb{e}_n$（標準正交矩陣），$R$ 是上三角矩陣（記錄每一步扣掉的投影係數）。

QR 分解在數值線性代數裡極為重要：用於最小平方法的穩定求解、特徵值演算法（QR 迭代），以及線性方程組的數值解法。

---

## 流程總結

$$
\vb{u}_1 = \vb{v}_1, \qquad
\vb{u}_j = \vb{v}_j - \sum_{i=1}^{j-1}\operatorname{proj}_{\vb{u}_i}\vb{v}_j, \qquad
\vb{e}_j = \frac{\vb{u}_j}{\|\vb{u}_j\|}
$$

| 步驟  | 動作                                        |
| :---: | ------------------------------------------- |
|   1   | 第一個正交向量直接取 $\vb{v}_1$             |
|  $j$  | 扣掉 $\vb{v}_j$ 在前 $j-1$ 個正交方向的投影 |
| 最後  | 各向量除以自身長度，得標準正交基底（ONB）   |

**關鍵公式：**

$$
\operatorname{proj}_{\vb{u}}\vb{v} = \frac{\vb{v}\cdot\vb{u}}{\vb{u}\cdot\vb{u}}\,\vb{u}
$$

每一步的邏輯永遠一樣：新向量扣掉在所有已有正交方向上的分量，剩下的純粹新方向就是下一個正交基底向量。
