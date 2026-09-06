---
layout: post
title: "由單擺進入拉格朗日力學"
date: 2026-05-22 09:00:00 +0800
categories: [大學物理, 力學]
tags: [拉格朗日力學, 分析力學, 廣義坐標, 歐拉－拉格朗日方程式, 單擺, 大學物理]
math: true
description: "牛頓力學用力向量描述運動；拉格朗日力學改用能量差。本文以單擺為例，介紹廣義坐標的概念，推導歐拉－拉格朗日方程式，並說明為何張力（約束力）在這個框架中自動消失。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

[前一篇]({% post_url 2026-05-21-phase-space-pendulum %})從能量的角度畫出了單擺的相圖，看到三種運動類型。這一篇要換一種視角重新推導同樣的運動方程式——用**拉格朗日力學**（Lagrangian mechanics）。

---

## 為什麼需要另一套力學？

牛頓力學的核心是 $\vb{F} = m\vb{a}$，非常直接。但實際問題常常有**約束**（constraint）：繩子把擺錘固定在圓弧上、小球在碗裡滾、珠子在導線上滑。

牛頓做法需要把約束力（張力、法向力）一起寫進方程式，然後再消去它。步驟繁瑣，而且約束力本身往往是我們不關心的量。

**拉格朗日力學**換了一個問題：

> 用「最少數量的坐標」描述系統，讓約束自動內建進去，再對「動能 − 位能」做變分，就能得到運動方程式，約束力自然不出現。

---

## 廣義坐標

考慮一個有 $n$ 個自由度的系統。**廣義坐標**（generalized coordinates）$q_1, q_2, \ldots, q_n$ 是描述系統所需的最少獨立變數，不一定是 $x, y, z$。

**單擺的例子：** 擺錘在平面上運動，受繩子約束在半徑 $L$ 的圓弧上。$x$ 和 $y$ 都不是獨立的（因為 $x^2 + y^2 = L^2$），只需*一個廣義坐標*：

$$q_1 = \theta \quad \text{（擺角）}$$

整個運動完全由 $\theta(t)$ 決定，不需要另外處理繩子的張力。

---

## 拉格朗日量

**拉格朗日量**（Lagrangian）定義為動能減位能：

$$
\begin{equation}
  \mathcal{L}(q, \dot{q}, t) = T - V
  \label{eq:lagrangian}
\end{equation}
$$

對單擺，擺錘的位置為

$$x = L\sin\theta, \qquad y = -L\cos\theta$$

速度大小的平方：

$$v^2 = \dot{x}^2 + \dot{y}^2 = L^2\dot{\theta}^2$$

動能：

$$T = \frac{1}{2}mL^2\dot{\theta}^2$$

取最低點（$\theta = 0$）為位能零點，高度差 $h = L(1 - \cos\theta)$，位能：

$$V = mgL(1 - \cos\theta)$$

因此

$$
\begin{equation}
  \boxed{\mathcal{L}(\theta, \dot{\theta}) = \frac{1}{2}mL^2\dot{\theta}^2 - mgL(1 - \cos\theta)}
  \label{eq:lagrangian-pendulum}
\end{equation}
$$

---

## 歐拉－拉格朗日方程式

對每個廣義坐標 $q_i$，運動方程式由 **歐拉－拉格朗日方程式（Euler–Lagrange equation，簡稱 E-L 方程式）**給出：

$$
\begin{equation}
  \dv{t} \pdv{\mathcal{L}}{\dot{q}_i} - \pdv{\mathcal{L}}{q_i} = 0
  \label{eq:euler-lagrange}
\end{equation}
$$

這個公式的推導來自**最小作用量原理**（principle of least action）：系統沿著讓作用量 $S = \int \mathcal{L}\,\dd{t}$ 取極值的路徑演化。這是比 $\vb{F} = m\vb{a}$ 更深層的物理原理，但本篇先把它當成「用能量推導運動方程的食譜」。

### 應用到單擺

利用單擺的拉格朗日量（式 $\eqref{eq:lagrangian-pendulum}$），計算各偏導數：

$$\frac{\partial \mathcal{L}}{\partial \dot{\theta}} = mL^2\dot{\theta}$$

$$\dv{t}\pdv{\mathcal{L}}{\dot{\theta}} = mL^2\ddot{\theta}$$

$$\frac{\partial \mathcal{L}}{\partial \theta} = -mgL\sin\theta$$

代入 E-L 方程式（式 $\eqref{eq:euler-lagrange}$）：

$$mL^2\ddot{\theta} - (-mgL\sin\theta) = 0$$

即

$$
\begin{equation}
  \boxed{\ddot{\theta} + \frac{g}{L}\sin{\theta} = 0}
  \label{eq:euler-lagrange-pendulum}
\end{equation}
$$

和第一篇的牛頓法結果完全一致——但整個推導中**從未出現繩子的張力**。張力是約束力，不對廣義坐標 $\theta$ 做功，在拉格朗日框架中自然隱去。

---

## 廣義動量與守恆律

對應廣義坐標 $q_i$ 的**廣義動量**（generalized momentum）定義為：

$$
\begin{equation}
  p_i = \frac{\partial \mathcal{L}}{\partial \dot{q}_i}
  \label{eq:generalized-momentum}
\end{equation}
$$

對單擺：

$$p_\theta = \frac{\partial \mathcal{L}}{\partial \dot{\theta}} = mL^2\dot{\theta}$$

這正是**角動量**。E–L 方程式可以改寫成：

$$\dot{p}_i = \frac{\partial \mathcal{L}}{\partial q_i}$$

如果 $\mathcal{L}$ 不顯含某個廣義坐標 $q_i$，就稱為**循環坐標**（cyclic coordinate），則 $\partial\mathcal{L}/\partial q_i = 0$，對應的廣義動量守恆：

$$\dot{p}_i = 0 \implies p_i = \text{const}$$

**範例：** 在連心力場中，若 $\mathcal{L}$ 不依賴極角 $\phi$（旋轉對稱），則角動量守恆——這正是**諾特定理**（Noether's theorem）的最簡單例子：對稱性 $\Leftrightarrow$ 守恆律。

---

## 小角度極限

把 $\sin\theta \approx \theta$ 代入，運動方程式變成：

$$\ddot{\theta} + \frac{g}{L}\theta = 0$$

解為 $\theta(t) = \theta_0\cos(\omega_0 t)$，角頻率 $\omega_0 = \sqrt{g/L}$。

在拉格朗日觀點裡，這等價於把位能近似為

$$V \approx \frac{1}{2}mgL\theta^2$$

此時 $\mathcal{L} \approx \frac{1}{2}mL^2\dot{\theta}^2 - \frac{1}{2}mgL\theta^2$，這是一個「彈簧系統」的拉格朗日量，其中「等效彈簧常數」為 $k_{\text{eff}} = mgL$。

---

## 拉格朗日 vs 牛頓：比較

|          | 牛頓力學                           | 拉格朗日力學                    |
| -------- | ---------------------------------- | ------------------------------- |
| 基本量   | 力 $\vb{F}$ （向量）               | 能量 $T - V$ （純量）           |
| 方程式   | $\vb{F} = m\vb{a}$（每個方向一條） | E-L 方程式（每個自由度一條）    |
| 約束處理 | 需要列出約束力                     | 約束自動內建於廣義坐標中        |
| 適用情境 | 簡單幾何，力好計算                 | 複雜幾何、旋轉系統、場論        |
| 單擺     | 需要分析張力                       | $\theta$ 一個方程式，張力不出現 |

拉格朗日力學的真正威力在複雜系統（多體、旋轉、場論）中才完全顯現。對單擺來說，兩種方法都能做到；但拉格朗日方法更容易推廣——例如雙擺、球面擺、廣義相對論的測地方程都用同一套架構。

---

## 小結

- 廣義坐標 $q_i$：描述系統最少的獨立自由度，約束自動內建
- 拉格朗日量 $\mathcal{L} = T - V$：用純量能量描述動力學
- E–L 方程式：每個廣義坐標一條，見式 $\eqref{eq:euler-lagrange}$
- 廣義動量：循環坐標對應守恆量，定義見式 $\eqref{eq:generalized-momentum}$
- 對單擺：$\mathcal{L} = \frac{1}{2}mL^2\dot{\theta}^2 - mgL(1-\cos\theta)$，張力在推導中自動消失

[下一篇]({% post_url 2026-05-21-hamiltonian-mechanics-pendulum %})從拉格朗日量出發，透過勒壤得變換（Legendre transform）建立哈密頓力學，並看哈密頓量如何自然地給出相空間的幾何結構。
