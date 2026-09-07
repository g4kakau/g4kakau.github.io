---
layout: post
title: "哈密頓力學入門：從拉格朗日到正則方程，哈密頓量的幾何意義"
date: 2026-05-22 10:00:00 +0800
categories: [大學物理, 力學]
tags: [哈密頓力學, 分析力學, 哈密頓量, 正則方程, 相空間, 單擺, Legendre變換, 大學物理]
math: true
description: "拉格朗日力學用位形空間描述運動；哈密頓力學升維到相空間，把動力學變成相空間中的流。本文從 Legendre 變換建立哈密頓量，推導正則方程，並說明哈密頓力學如何自然地給出單擺相圖的幾何結構。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

[上一篇]({% post_url 2026-05-21-lagrangian-mechanics-pendulum %})用拉格朗日力學推導了單擺方程式，廣義座標是 $\theta$，方程式是一條二階 ODE。

哈密頓力學換了一個視角：把二階 ODE **拆成兩條一階方程式**，然後在**相空間**裡描述運動。相空間的好處，我們在[第四篇]({% post_url 2026-05-21-phase-space-pendulum %})已經嘗過了——一張圖就能看清所有可能的運動類型。這一篇說明這個框架如何從拉格朗日力學自然長出來。

---

## Legendre 變換：從速度到動量

拉格朗日力學的狀態空間是「位形空間」（configuration space）：$(\theta, \dot{\theta})$，變數是廣義座標和廣義速度。

哈密頓力學把廣義速度 $\dot{\theta}$ 換成廣義動量 $p_\theta$。這個變數替換稱為 **Legendre 變換**（Legendre transform）。

廣義動量的定義來自拉格朗日量：

$$p_\theta = \frac{\partial \mathcal{L}}{\partial \dot{\theta}} = mL^2\dot{\theta}$$

對單擺，$p_\theta$ 就是**角動量**。從 $p_\theta$ 反解 $\dot{\theta}$：

$$\dot{\theta} = \frac{p_\theta}{mL^2}$$

**哈密頓量**（Hamiltonian）定義為：

$$H(\theta, p_\theta) = p_\theta\dot{\theta} - \mathcal{L}(\theta, \dot{\theta})$$

其中右側的 $\dot{\theta}$ 用 $p_\theta/mL^2$ 替換，讓 $H$ 完全以 $(\theta, p_\theta)$ 表達。

### 單擺的哈密頓量

代入單擺的拉格朗日量 $\mathcal{L} = \frac{1}{2}mL^2\dot{\theta}^2 - mgL(1-\cos\theta)$：

$$H = p_\theta \cdot \frac{p_\theta}{mL^2} - \left[\frac{1}{2}mL^2\left(\frac{p_\theta}{mL^2}\right)^2 - mgL(1-\cos\theta)\right]$$

$$H = \frac{p_\theta^2}{mL^2} - \frac{p_\theta^2}{2mL^2} + mgL(1-\cos\theta)$$

$$\boxed{H(\theta, p_\theta) = \frac{p_\theta^2}{2mL^2} + mgL(1-\cos\theta)}$$

這正是**總力學能** $T + V$（而拉格朗日量 $T - V$ 不是能量）。要注意這裡有兩件常被混為一談的事：$H=T+V$ 需要的是**座標變換不顯含時間**（本例的 $x=L\sin\theta$ 確實如此）且位能不依賴速度；而 $H$ 本身不顯含時間，保證的是 $H$ **守恆**。兩個條件都成立時，$H$ 才既等於總能量、又是守恆量。

---

## 哈密頓正則方程

給定哈密頓量 $H(q, p)$，運動方程式由**正則方程**（canonical equations）給出：

$$\dot{\theta} = \frac{\partial H}{\partial p_\theta}, \qquad \dot{p}_\theta = -\frac{\partial H}{\partial \theta}$$

對單擺計算偏導數：

$$\frac{\partial H}{\partial p_\theta} = \frac{p_\theta}{mL^2}, \qquad \frac{\partial H}{\partial \theta} = mgL\sin\theta$$

代入正則方程：

$$\dot{\theta} = \frac{p_\theta}{mL^2}$$

$$\dot{p}_\theta = -mgL\sin\theta$$

用 $\omega = \dot{\theta}$ 和 $p_\theta = mL^2\omega$ 改寫，得到和前幾篇一樣的方程式：

$$\ddot{\theta} + \frac{g}{L}\sin\theta = 0 \checkmark$$

三種形式主義——牛頓、拉格朗日、哈密頓——給出同一條方程式。差別在於它們「看」這個問題的幾何視角。

<!-- 📊 FIGURE: 哈密頓相空間流圖
     建議內容：在 (θ, p_θ) 相平面上畫出向量場（流場），箭頭方向由
     θ̇ = ∂H/∂p_θ = p_θ/(mL²) 和 ṗ_θ = -∂H/∂θ = -mgL sinθ 決定。
     疊加幾條等 H 曲線（libration 和 rotation），讓學生直觀看到「軌跡沿等
     哈密頓量曲線流動」。可用 matplotlib streamplot。
     格式：matplotlib PNG；附圖說「圖 1：單擺相空間的哈密頓流。
     箭頭為速度場，曲線為等能量軌跡」。
-->

---

## 相空間：哈密頓力學的舞台

哈密頓力學的狀態是相空間中的一點 $(\theta, p_\theta)$。時間演化是相空間中的「流」（flow）：

$$\frac{d}{dt}\begin{pmatrix}\theta \\ p_\theta\end{pmatrix} = \begin{pmatrix}\partial H/\partial p_\theta \\ -\partial H/\partial\theta\end{pmatrix}$$

因為 $H$ 不顯含時間，沿軌跡 $H = \text{const}$，軌跡就是等能量曲線。這正是[第四篇]({% post_url 2026-05-21-phase-space-pendulum %})相圖的幾何根源：**相空間軌跡 = 等哈密頓量曲線**。

### 辛結構

哈密頓力學之所以特別，是因為正則方程具有一種幾何對稱性：$(\theta, p_\theta) \mapsto (q, p)$ 的任意正則變換（canonical transformation）會保持相空間中「面積」不變——這稱為**辛幾何**（symplectic geometry）。Liouville 定理說：相空間中的體積元素在哈密頓流下守恆。

這個幾何結構在量子力學（對易關係 $[q, p] = i\hbar$）和統計力學（相空間中的測度）中都有深刻對應。

---

## 哈密頓–雅可比方程（一瞥）

哈密頓力學還有第三種更深的形式：哈密頓–雅可比（Hamilton-Jacobi）方程。目標是尋找一個生成函數 $S(\theta, t)$，使得

$$H\!\left(\theta,\,\frac{\partial S}{\partial \theta}\right) + \frac{\partial S}{\partial t} = 0$$

對單擺，$H$ 不含時，令 $S(\theta, t) = W(\theta) - Et$，則

$$H\!\left(\theta,\,\dv{W}{\theta}\right) = E$$

即

$$\frac{1}{2mL^2}\left(\dv{W}{\theta}\right)^2 + mgL(1-\cos\theta) = E$$

解出：

$$\dv{W}{\theta} = p_\theta = \sqrt{2mL^2\big[E - mgL(1-\cos\theta)\big]}$$

因此

$$W(\theta; E) = \int^\theta \sqrt{2mL^2\big[E - mgL(1-\cos\theta')\big]}\,\dd{\theta'}$$

這個積分正是前幾篇反覆出現的橢圓積分。哈密頓–雅可比觀點告訴我們：**計算橢圓積分 = 求單擺系統的生成函數**——運動的時間解和橢圓積分是同一件事的不同面向。

---

## 三種力學形式主義對照

|          | 拉格朗日力學                          | 哈密頓力學                  | 哈密頓–雅可比         |
| -------- | ------------------------------------- | --------------------------- | --------------------- |
| 狀態空間 | 位形空間 $(\theta, \dot{\theta})$     | 相空間 $(\theta, p_\theta)$ | 作用量 $S(\theta, t)$ |
| 核心量   | $\mathcal{L} = T - V$                 | $H = T + V$                 | 生成函數 $S$          |
| 方程形式 | E-L 二階 ODE                          | 正則方程一階組              | PDE                   |
| 幾何意義 | 廣義速度描述動力學                    | 相空間流、等能量曲線        | 作用量波面            |
| 單擺結果 | $\ddot{\theta} + (g/L)\sin\theta = 0$ | 相圖封閉曲線                | 橢圓積分 $W(\theta)$  |

三者描述同一個物理，但強調不同的幾何結構，在不同問題中各有優勢。

---

## 小結

- 哈密頓量 $H = p_\theta\dot{\theta} - \mathcal{L}$，透過 Legendre 變換從 $\mathcal{L}$ 推導出
- 對單擺：$H = p_\theta^2/(2mL^2) + mgL(1-\cos\theta) = $ 總能量
- 正則方程：$\dot{\theta} = \partial H/\partial p_\theta$，$\dot{p}_\theta = -\partial H/\partial\theta$
- 相空間軌跡 = 等 $H$ 曲線，哈密頓力學自然給出相圖的幾何結構
- 哈密頓–雅可比方程的解 $W(\theta)$ 就是橢圓積分，把「求解運動」與「計算特殊函數」統一在一起

[下一篇]({% post_url 2026-05-21-elliptic-integral-E %})暫時離開力學，回到積分本身的幾何根源：橢圓積分為什麼叫「橢圓」？從橢圓弧長推導第二類橢圓積分 $E(k)$。
