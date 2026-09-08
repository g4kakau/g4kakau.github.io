---
layout: post
title: "特徵值與特徵向量：矩陣的靈魂"
date: 2026-05-14 00:00:00 +0800
categories: [大學數學, 線性代數]
tags: [特徵值, 特徵向量, 線性代數, 矩陣對角化, 特徵多項式]
math: true
description: "特徵值（eigenvalue）與特徵向量（eigenvector）是線性代數最核心的概念。本文從「矩陣乘法只改變長度、不改變方向」的直覺出發，介紹特徵方程式、特徵多項式、特徵空間的求法，附完整計算例題與幾何詮釋。"
---

$$\require{physics}$$

把一個向量 $\vb{v}$ 乘上矩陣 $A$，一般來說方向和長度都會改變。但對某些特殊的向量，$A$ 只做一件事：**把它伸縮一個倍數**，方向完全不變。

$$A\vb{v} = \lambda\vb{v}$$

這樣的向量 $\vb{v}$ 叫**特徵向量**（eigenvector），對應的倍數 $\lambda$ 叫**特徵值**（eigenvalue）。它們是矩陣的「固有方向」與「固有伸縮率」——理解了特徵值，就理解了矩陣的本質行為。

---

## 定義

令 $A$ 是 $n \times n$ 方陣，$\vb{v}$ 是 $\mathbb{R}^n$ 中的非零向量。若存在純量 $\lambda$ 使得

$$\boxed{A\vb{v} = \lambda\vb{v}}$$

則稱 $\vb{v}$ 是 $A$ 的一個**特徵向量**，$\lambda$ 是對應的**特徵值**。

**幾個關鍵點：**

- $\vb{v}$ 必須是**非零向量**（零向量對任何 $\lambda$ 都滿足等式，沒有意義）
- $\lambda$ 可以是 $0$（此時 $A\vb{v} = \vb{0}$，即 $\vb{v}$ 在 $A$ 的零空間裡）
- $\lambda$ 可以是負數（方向反轉）或複數

### 驗證例

給定

$$A = \begin{bmatrix}5&2&1\\-2&1&-1\\2&2&4\end{bmatrix}, \qquad \vb{v} = \begin{bmatrix}1\\-1\\1\end{bmatrix}$$

驗證 $\vb{v}$ 是特徵向量。

$$A\vb{v} = \begin{bmatrix}5-2+1\\-2-1-1\\2-2+4\end{bmatrix} = \begin{bmatrix}4\\-4\\4\end{bmatrix} = 4\begin{bmatrix}1\\-1\\1\end{bmatrix} = 4\vb{v}$$

所以 $\vb{v}$ 是特徵向量，對應特徵值 $\lambda = 4$。

---

## 特徵空間

把 $A\vb{v} = \lambda\vb{v}$ 改寫：

$$
A\vb{v} - \lambda\vb{v} = \vb{0}
\implies (A - \lambda I)\vb{v} = \vb{0}
$$

這是一個**齊次線性聯立方程式**。$\vb{v}$ 是特徵向量，意思就是它是 $(A - \lambda I)\vb{x} = \vb{0}$ 的**非零解**。

所有這些解（包括零向量）構成的集合，稱為 $A$ 對應於特徵值 $\lambda$ 的**特徵空間**（eigenspace）——它正好是矩陣 $(A - \lambda I)$ 的零空間（null space）。

$$\text{特徵空間} = \operatorname{Null}(A - \lambda I)$$

---

## 如何求特徵值？特徵多項式

問題來了：如果只知道 $A$，怎麼找 $\lambda$？

$(A - \lambda I)\vb{x} = \vb{0}$ 有非零解的條件是：$(A - \lambda I)$ **不可逆**，等價於

$$\boxed{\det(A - \lambda I) = 0}$$

這就是 $A$ 的**特徵方程式**（characteristic equation）。

將行列式展開，得到一個關於 $\lambda$ 的多項式，稱為 $A$ 的**特徵多項式**（characteristic polynomial）。求解這個方程式的根，就得到所有特徵值。

$$
\underbrace{\det(A - \lambda I)}_{\text{特徵多項式}} = 0 \implies \text{求根得到所有特徵值 } \lambda
$$

---

## 完整求解流程

**步驟一：** 計算 $\det(A - \lambda I) = 0$，解出所有特徵值 $\lambda_1, \lambda_2, \ldots$

**步驟二：** 對每個特徵值 $\lambda_k$，解齊次聯立方程式 $(A - \lambda_k I)\vb{x} = \vb{0}$，求出特徵空間的基底（即特徵向量）

---

## 例題一（$2 \times 2$ 矩陣）

給定

$$A = \begin{bmatrix}-4&-3\\3&6\end{bmatrix}$$

求 $A$ 的特徵值和特徵向量。

**步驟一：** 特徵方程式

$$
\det(A - \lambda I) = \begin{vmatrix}-4-\lambda & -3 \\ 3 & 6-\lambda\end{vmatrix}
= (-4-\lambda)(6-\lambda) + 9
$$

$$
= \lambda^2 - 2\lambda - 24 + 9 = \lambda^2 - 2\lambda - 15 = (\lambda - 5)(\lambda + 3) = 0
$$

特徵值為 $\lambda_1 = 5$，$\lambda_2 = -3$。

**步驟二：** 求 $\lambda_1 = 5$ 的特徵向量

$$
A - 5I = \begin{bmatrix}-9&-3\\3&1\end{bmatrix}
\xrightarrow{\text{列化簡}} \begin{bmatrix}1 & 1/3 \\ 0 & 0\end{bmatrix}
$$

解：$x_1 = -\dfrac{1}{3}x_2$，令 $x_2 = 3$，得特徵向量

$$\vb{v}_1 = \begin{bmatrix}-1\\3\end{bmatrix}$$

**步驟二：** 求 $\lambda_2 = -3$ 的特徵向量

$$
A + 3I = \begin{bmatrix}-1&-3\\3&9\end{bmatrix}
\xrightarrow{\text{列化簡}} \begin{bmatrix}1 & 3 \\ 0 & 0\end{bmatrix}
$$

解：$x_1 = -3x_2$，令 $x_2 = 1$，得特徵向量

$$\vb{v}_2 = \begin{bmatrix}-3\\1\end{bmatrix}$$

**驗算：**

$$
A\vb{v}_1 = \begin{bmatrix}-4&-3\\3&6\end{bmatrix}\begin{bmatrix}-1\\3\end{bmatrix}
= \begin{bmatrix}4-9\\-3+18\end{bmatrix} = \begin{bmatrix}-5\\15\end{bmatrix} = 5\begin{bmatrix}-1\\3\end{bmatrix} \checkmark
$$

---

## 例題二（$3 \times 3$ 矩陣，重根）

給定

$$B = \begin{bmatrix}3&0&0\\0&1&2\\0&2&1\end{bmatrix}$$

求 $B$ 的特徵值。

$$
\det(B - \lambda I) = (3-\lambda)\begin{vmatrix}1-\lambda&2\\2&1-\lambda\end{vmatrix}
= (3-\lambda)\bigl[(1-\lambda)^2 - 4\bigr]
$$

因為 $(1-\lambda)^2 - 4 = \lambda^2 - 2\lambda - 3 = (\lambda-3)(\lambda+1)$，所以

$$
\det(B - \lambda I) = (3-\lambda)(\lambda-3)(\lambda+1) = -(\lambda-3)^2(\lambda+1)
$$

（注意 $3-\lambda=-(\lambda-3)$，所以整體帶一個負號。）令它為零：

$$
-(\lambda-3)^2(\lambda+1) = 0 \iff (\lambda-3)^2(\lambda+1) = 0
$$

特徵值：$\lambda_1 = 3$（**重數為 2**），$\lambda_2 = -1$。

---

## 幾何直覺

| $\lambda$ 的值 | $A\vb{v} = \lambda\vb{v}$ 的幾何意義 |
|:---:|---|
| $\lambda > 1$ | 沿特徵向量方向**拉伸** |
| $0 < \lambda < 1$ | 沿特徵向量方向**壓縮** |
| $\lambda = 1$ | 沿特徵向量方向**不動** |
| $\lambda = -1$ | 沿特徵向量方向**反向等長** |
| $\lambda < 0$ | 沿特徵向量方向**反向並伸縮** |
| $\lambda = 0$ | $\vb{v}$ 落在 $A$ 的零空間，被壓縮成零 |

旋轉矩陣

$$R_\theta = \begin{bmatrix}\cos\theta & -\sin\theta \\ \sin\theta & \cos\theta\end{bmatrix}$$

（$\theta \neq 0, \pi$）沒有**實數**特徵值——旋轉不存在「方向不動」的向量，只在複數域才有特徵值 $e^{\pm i\theta}$。

---

## 重要性質

### 相似矩陣有相同特徵多項式

若 $B = P^{-1}AP$（$P$ 可逆），則

$$
\det(B - \lambda I) = \det(P^{-1}AP - \lambda I) = \det(P^{-1}(A-\lambda I)P) = \det(A - \lambda I)
$$

**相似矩陣有相同的特徵值**（重數也相同）。這是矩陣對角化的基礎：若能找到可逆矩陣 $P$ 使得 $P^{-1}AP$ 是對角矩陣，對角線上就是特徵值。

### 跡與行列式

$n \times n$ 矩陣 $A$ 的特徵多項式是 $n$ 次多項式，展開後：

$$
\det(A - \lambda I) = (-\lambda)^n + \operatorname{tr}(A)(-\lambda)^{n-1} + \cdots + \det(A)
$$

- **跡**（trace）$= \lambda_1 + \lambda_2 + \cdots + \lambda_n$（重根重複計算）
- **行列式** $= \lambda_1 \cdot \lambda_2 \cdots \lambda_n$

這是快速驗算的好工具：求完特徵值，用跡和行列式做交叉驗證。

---

## 總結

| 概念 | 定義 / 求法 |
|---|---|
| 特徵值 $\lambda$ | $\det(A - \lambda I) = 0$ 的根 |
| 特徵向量 $\vb{v}$ | $(A - \lambda I)\vb{x} = \vb{0}$ 的非零解 |
| 特徵空間 | $\operatorname{Null}(A - \lambda I)$，包含零向量 |
| 特徵多項式 | $\det(A - \lambda I)$，$n$ 次多項式 |

求解流程：特徵方程式求 $\lambda$ → 對每個 $\lambda$ 解齊次聯立方程式求特徵向量。

特徵值是矩陣「本質行為」的縮影：它說明矩陣在哪些方向上只做拉伸或壓縮，是矩陣對角化、主成分分析（PCA）、常微分聯立方程式求解的核心工具。
