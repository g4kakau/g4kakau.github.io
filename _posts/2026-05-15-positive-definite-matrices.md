---
layout: post
title: "正定矩陣：矩陣的「都是正的」"
date: 2026-05-15 00:00:00 +0800
categories: [大學數學, 線性代數]
tags: [正定矩陣, 線性代數, 特徵值, 主子式, 二次型]
math: true
description: "正定矩陣（positive definite matrix）是線性代數中最重要的矩陣類型之一，出現在最佳化、統計、物理等領域。本文從二次型的幾何直覺出發，介紹正定的定義、三種等價判準（特徵值、主子式、Cholesky 分解），並附含參數的判別例題。"
---

$$\require{physics}$$

考慮一個簡單的二次函數 $f(x) = ax^2$：若 $a > 0$，函數有唯一的最小值在 $x = 0$；若 $a < 0$，則是最大值。

把這個問題推廣到多變數：對一個二次型（quadratic form）

$$
Q(\vb{x}) = \vb{x}^T A \vb{x}
$$

問：對所有非零向量 $\vb{x}$，$Q(\vb{x})$ 何時總是正的？

答案就是：**$A$ 是正定矩陣**（positive definite matrix）。

---

## 定義

設 $A$ 是 $n \times n$ 實對稱矩陣（$A = A^T$）。若對所有非零向量 $\vb{x} \in \mathbb{R}^n$，都有

$$
\boxed{\vb{x}^T A \vb{x} > 0}
$$

則稱 $A$ 為**正定矩陣**（positive definite）。

**相關定義：**

| 條件 | 名稱 |
|---|---|
| $\vb{x}^T A \vb{x} > 0$（$\vb{x} \neq \vb{0}$） | 正定（positive definite） |
| $\vb{x}^T A \vb{x} \geq 0$（$\vb{x} \neq \vb{0}$） | 半正定（positive semi-definite） |
| $\vb{x}^T A \vb{x} < 0$（$\vb{x} \neq \vb{0}$） | 負定（negative definite） |
| 有正有負 | 不定（indefinite） |

---

## 二次型的幾何意義

$2 \times 2$ 的情況最容易視覺化。設

$$
A = \begin{bmatrix}a & b \\ b & c\end{bmatrix}
$$

則

$$
\vb{x}^T A \vb{x} = ax_1^2 + 2bx_1 x_2 + cx_2^2
$$

這個函數的圖形是一個二次曲面：
- 若 $A$ 正定 → 曲面形如碗，最小值在原點
- 若 $A$ 負定 → 曲面形如倒碗，最大值在原點
- 若 $A$ 不定 → 曲面形如馬鞍，原點是鞍點

在最佳化問題中，判斷 Hessian 矩陣（二次導數矩陣）是否正定，就是在判斷臨界點是否為最小值。

---

## 三種等價判準

對實對稱矩陣 $A$，以下三個條件等價：

### 判準一：特徵值全正

$A$ 是正定 $\Leftrightarrow$ $A$ 的所有特徵值 $\lambda_i > 0$。

**直覺：** 在特徵向量方向上，$\vb{x}^T A \vb{x}$ 等於 $\lambda \|\vb{x}\|^2$——每個方向的「伸縮率」都要正。

---

### 判準二：順序主子式（leading principal minors）全正

$A$ 的**第 $k$ 個順序主子式** $D_k$ 是左上角 $k \times k$ 子矩陣的行列式：

$$
D_1 = a_{11}, \quad D_2 = \begin{vmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{vmatrix}, \quad \ldots, \quad D_n = \det(A)
$$

$A$ 是正定 $\Leftrightarrow$ 所有 $D_k > 0$（$k = 1, 2, \ldots, n$）。

這是手算最常用的判準，不需要求特徵值。

---

### 判準三：Cholesky 分解存在

$A$ 是正定 $\Leftrightarrow$ 存在唯一的下三角矩陣 $L$（對角線元素為正），使得

$$
A = LL^T
$$

這是正定矩陣的「平方根分解」，也說明了 $A = XX^T$ 的形式為何自然出現（詳見後文）。

---

## 例題：含參數的正定判別

給定矩陣

$$
Q = \begin{pmatrix} 2 & -1 & b \\ -1 & 2 & -1 \\ b & -1 & 2 \end{pmatrix}
$$

求使 $Q$ 為正定的 $b$ 的範圍。

**解：** 計算三個順序主子式。

**$D_1$：**

$$D_1 = 2 > 0 \quad \checkmark$$

**$D_2$：**

$$D_2 = \begin{vmatrix}2&-1\\-1&2\end{vmatrix} = 4 - 1 = 3 > 0 \quad \checkmark$$

**$D_3$：**

按第一列展開：

$$
D_3 = 2(4-1) - (-1)(-2-(-1)b) + b(1-2b)
= 6 - (b-2) + b - 2b^2
= 4 + 2b - 2b^2
$$

正定要求 $D_3 > 0$：

$$
4 + 2b - 2b^2 > 0
\implies b^2 - b - 2 < 0
\implies (b-2)(b+1) < 0
$$

$$
\boxed{-1 < b < 2}
$$

---

## 半正定矩陣與分解 $Q = XX^T$

若 $Q$ 是**對稱且半正定**（positive semi-definite），即特徵值 $\lambda_i \geq 0$，則 $Q$ 可以分解為

$$
Q = XX^T
$$

**推導：** 由實對稱矩陣的譜定理，$Q = V\Lambda V^T$，其中 $V$ 是正交矩陣（列是特徵向量），$\Lambda = \operatorname{diag}(\lambda_1, \ldots, \lambda_n)$。

因為 $\lambda_i \geq 0$，可以定義 $\sqrt{\Lambda} = \operatorname{diag}(\sqrt{\lambda_1}, \ldots, \sqrt{\lambda_n})$。令

$$
X = V\sqrt{\Lambda}
$$

則

$$
XX^T = V\sqrt{\Lambda}(V\sqrt{\Lambda})^T = V\sqrt{\Lambda}\sqrt{\Lambda}V^T = V\Lambda V^T = Q
$$

**注意：** 若 $\lambda_i > 0$（嚴格正定），這個分解唯一且對角元素全正，就是 Cholesky 分解（乘以適當旋轉）。若有零特徵值（半正定），$Q$ 不可逆，分解仍然存在但不唯一。

---

## 正定矩陣的重要性質

| 性質 | 說明 |
|---|---|
| $\det(A) > 0$ | 必可逆 |
| $A^{-1}$ 也正定 | 逆矩陣的特徵值 $= 1/\lambda_i > 0$ |
| $A + B$ 正定（若 $A$、$B$ 正定） | 正定矩陣的和還是正定 |
| $c A$ 正定（若 $c > 0$） | 正數倍還是正定 |
| $B^T AB$ 半正定（任意 $B$） | 若 $B$ 可逆則正定 |

---

## 在最佳化中的角色

設 $f: \mathbb{R}^n \to \mathbb{R}$ 是二次可微函數，$\vb{x}^*$ 是臨界點（$\nabla f(\vb{x}^*) = \vb{0}$）。

Hessian 矩陣

$$
H_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}\bigg|_{\vb{x}^*}
$$

若 $H$ **正定**，則 $\vb{x}^*$ 是**局部最小值**；若 $H$ **負定**，則是**局部最大值**；若 $H$ **不定**，則是鞍點。

這是多變數微積分中判斷極值類型的標準工具，而判斷 Hessian 是否正定，正是用本文介紹的主子式方法。

---

## 總結

| 判準 | 條件 |
|---|---|
| 定義 | $\vb{x}^T A \vb{x} > 0$ 對所有 $\vb{x} \neq \vb{0}$ |
| 特徵值 | 所有特徵值 $\lambda_i > 0$ |
| 主子式 | 所有 $D_k > 0$（最常用於手算） |
| 分解 | $A = LL^T$（Cholesky 分解存在） |

遇到「某矩陣是否正定」的問題，手算時直接用**主子式法**；若已知特徵值則直接看正負；若需要數值分解則用 Cholesky。三種方法殊途同歸。

{% include cta.html %}
