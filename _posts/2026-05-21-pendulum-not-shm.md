---
layout: post
title: "單擺為什麼不是簡諧運動？從能量守恆到精確週期公式"
date: 2026-05-21 00:00:00 +0800
categories: [大學物理, 力學]
tags: [單擺, 簡諧運動, 橢圓積分, 非線性振動, 大學物理, 普通物理]
math: true
description: "高中學到的單擺公式 T = 2pi*sqrt(L/g) 其實只是小角度近似。本文從牛頓力學出發，用能量守恆推導大角度單擺的精確週期積分，並透過半角代換推導出以第一類橢圓積分 K(k) 表達的精確公式 T = 4*sqrt(L/g)*K(sin(theta_0/2))。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

你大概記得高中物理的單擺公式：

$$T = 2\pi\sqrt{\frac{L}{g}}$$

它漂亮、對稱，而且和擺角完全無關——不管你把擺錘拉到 5° 還是 30°，週期都一樣。

但這個公式是**近似**。一旦擺角夠大，週期就會開始依賴振幅，而那個「精確版本」會導向一個本質上積不出來的積分。

---

## 運動方程式：非線性才是真實

考慮擺長 $L$、質量 $m$ 的理想單擺。取擺角 $\theta$（與鉛直方向的夾角）為廣義座標，對切線方向施用牛頓第二定律：

$$mL\ddot{\theta} = -mg\sin\theta$$

化簡：

$$\boxed{\ddot{\theta} + \frac{g}{L}\sin\theta = 0}$$

<!-- 📐 FIGURE: 單擺示意圖
     建議內容：畫出擺長 L 的單擺，標示 θ（與鉛直的夾角）、繩張力 T、重力 mg、
     切線分量 mg sinθ（回復力）和法線分量 mg cosθ（張力平衡）。
     格式：SVG 或 PNG，寬 350px 左右，附圖說「圖 1：單擺受力分析」。
-->

這就是非線性單擺方程。它看起來很簡單，但 $\sin\theta$ 的存在讓它無法用初等函數解析求解。

---

## 小角度近似：$T = 2\pi\sqrt{L/g}$ 從哪裡來？

當 $\theta$ 夠小時，泰勒展開給出

$$\sin\theta = \theta - \frac{\theta^3}{6} + \frac{\theta^5}{120} - \cdots \approx \theta$$

代入運動方程式：

$$\ddot{\theta} + \frac{g}{L}\theta = 0$$

這是標準的簡諧振動（SHM）方程式，解為

$$\theta(t) = \theta_0\cos\!\left(\sqrt{\frac{g}{L}}\,t + \varphi_0\right)$$

角頻率 $\omega_0 = \sqrt{g/L}$，週期

$$T_0 = \frac{2\pi}{\omega_0} = 2\pi\sqrt{\frac{L}{g}}$$

### 近似何時失效？

$\sin\theta$ 和 $\theta$ 的誤差來自三次項 $\theta^3/6$。在幾個代表角度下：

| $\theta_0$ | $\sin\theta_0$ | $\theta_0$（弧度） | 相對誤差 |
| :--------: | :------------: | :----------------: | :------: |
|   $10°$    |    $0.1736$    |      $0.1745$      | $0.5\%$  |
|   $30°$    |    $0.5000$    |      $0.5236$      | $4.7\%$  |
|   $60°$    |    $0.8660$    |      $1.0472$      | $20.9\%$ |
|   $90°$    |    $1.0000$    |      $1.5708$      | $57.1\%$ |

**表 1：** $\sin\theta$ 與 $\theta$（弧度）的比較。$\theta_0 \gtrsim 15°$ 後誤差開始明顯累積。
{: .fig-caption }

<!-- 📊 FIGURE: sin θ vs θ 比較圖
     建議內容：橫軸 θ（0 到 90°），畫 sin θ（藍線）和 θ 的弧度值（橘虛線），
     在 θ ≈ 15° 處標注「誤差 1%」分叉點。
     格式：matplotlib 生成 PNG，或互動式 Plotly；附圖說「圖 2：sin θ 與 θ（弧度）的差異」。
-->

---

## 精確推導：能量守恆法

不用近似，改用**能量守恆**。

取最低點（$\theta = 0$）為位能零點。擺角為 $\theta$ 時高度差為 $L(1 - \cos\theta)$，總力學能為

$$E = \frac{1}{2}mL^2\dot{\theta}^2 + mgL(1 - \cos\theta)$$

若最大擺角為 $\theta_0$（此處 $\dot{\theta} = 0$），則

$$E = mgL(1 - \cos\theta_0)$$

代入並整理：

$$\dot{\theta}^2 = \frac{2g}{L}(\cos\theta - \cos\theta_0)$$

分離變數，取 $\dot{\theta} > 0$（往上擺的半程）：

$$\dd{t} = \sqrt{\frac{L}{2g}}\,\frac{\dd{\theta}}{\sqrt{\cos\theta - \cos\theta_0}}$$

由對稱性，完整週期等於「從 $\theta = 0$ 擺到 $\theta = \theta_0$」所需時間的四倍：

$$T = 4\sqrt{\frac{L}{2g}}\int_0^{\theta_0} \frac{\dd{\theta}}{\sqrt{\cos\theta - \cos\theta_0}}$$

這是精確的週期積分，但被積函數在 $\theta \to \theta_0$ 時分母趨近零（可積的瑕點），而且沒有初等函數原函數——它需要一個「新的函數」來命名。

---

## 半角代換：化為標準橢圓積分

用半角公式化簡根號內：

$$\cos\theta - \cos\theta_0 = 2\!\left(\sin^2\!\frac{\theta_0}{2} - \sin^2\!\frac{\theta}{2}\right)$$

令

$$k = \sin\frac{\theta_0}{2}$$

再做代換

$$\sin\frac{\theta}{2} = k\sin\phi$$

微分關係為

$$\frac{1}{2}\cos\frac{\theta}{2}\,\dd{\theta} = k\cos\phi\,\dd{\phi}
\implies
\dd{\theta} = \frac{2k\cos\phi}{\sqrt{1 - k^2\sin^2\phi}}\,\dd{\phi}$$

根號項化為

$$\sqrt{\cos\theta - \cos\theta_0} = \sqrt{2\!\left(k^2 - k^2\sin^2\!\phi\right)} = \sqrt{2}\,k\cos\phi$$

兩者相除：

$$\frac{\dd{\theta}}{\sqrt{\cos\theta - \cos\theta_0}}
= \frac{2k\cos\phi\,\dd{\phi}/\!\sqrt{1 - k^2\sin^2\phi}}{\sqrt{2}\,k\cos\phi}
= \frac{\sqrt{2}\,\dd{\phi}}{\sqrt{1 - k^2\sin^2\phi}}$$

積分上下限：$\theta\colon 0 \to \theta_0$ 對應 $\phi\colon 0 \to \pi/2$。代入後：

$$T = 4\sqrt{\frac{L}{2g}} \cdot \sqrt{2}\int_0^{\pi/2}\frac{\dd{\phi}}{\sqrt{1 - k^2\sin^2\phi}}
= 4\sqrt{\frac{L}{g}}\int_0^{\pi/2}\frac{\dd{\phi}}{\sqrt{1 - k^2\sin^2\phi}}$$

右側積分就是**第一類完全橢圓積分** $K(k)$，最終結果為

$$\boxed{T = 4\sqrt{\frac{L}{g}}\,K\!\left(\sin\frac{\theta_0}{2}\right)}$$

---

## 小角度極限：回到 $T_0$

當 $\theta_0 \to 0$ 時，$k = \sin(\theta_0/2) \to 0$，而

$$K(0) = \int_0^{\pi/2}\frac{\dd{\phi}}{\sqrt{1}} = \frac{\pi}{2}$$

代入：

$$T = 4\sqrt{\frac{L}{g}} \cdot \frac{\pi}{2} = 2\pi\sqrt{\frac{L}{g}} = T_0 \checkmark$$

精確公式在小角度極限下自然退化為高中公式。$T_0$ 不是錯的，只是 $K(k)$ 在 $k \to 0$ 時的特殊情況。

---

## 大角度週期修正

| 最大擺角 $\theta_0$ | $k = \sin(\theta_0/2)$ |   $T/T_0$    | 誤差倍數 |
| :-----------------: | :--------------------: | :----------: | :------: |
|        $10°$        |        $0.0872$        |   $1.0019$   | $+0.2\%$ |
|        $30°$        |        $0.2588$        |   $1.0174$   | $+1.7\%$ |
|        $60°$        |        $0.5000$        |   $1.0732$   | $+7.3\%$ |
|        $90°$        |        $0.7071$        |   $1.1803$   | $+18\%$  |
|       $120°$        |        $0.8660$        |   $1.3729$   | $+37\%$  |
|       $150°$        |        $0.9659$        |   $1.7622$   | $+76\%$  |
|       $179°$        |       $0.99996$        |   $3.902$    | $+290\%$ |
|       $180°$        |          $1$           | $\to \infty$ |    —     |

**表 2：** 精確週期 $T$ 與小角度公式 $T_0$ 的比值。注意發散只發生在**恰好** $\theta_0=180°$（$k=1$）：即使在 $179°$，$K(k)$ 仍是有限的（$K\approx\ln(4/k')\approx6.13$，其中 $k'=\sqrt{1-k^2}$），週期只有小角度值的約 $3.9$ 倍。$K(k)$ 在 $k\to1$ 的發散是**對數式**的，非常慢。
{: .fig-caption }

<!-- 📈 FIGURE: T/T₀ vs θ₀ 曲線
     建議內容：橫軸 θ₀（0° 到 180°），縱軸 T/T₀（從 1 開始往上爆炸），
     用 scipy.special.ellipk 計算精確值，在 θ₀ = 90° 和 150° 標注對應數值，
     在 θ₀ → 180° 處用箭頭標「T → ∞」。
     格式：matplotlib PNG；附圖說「圖 3：單擺精確週期修正 T/T₀ 隨振幅的變化」。
     互動版：可做成 Observable/p5.js 讓學生拖動 θ₀ 看 T/T₀ 即時更新。
-->

越靠近 $\theta_0 = 180°$（倒立位置），週期趨近無限大——擺錘幾乎靜止在正上方，需要無限長時間才能決定往哪邊倒。

---

## 小結

|            | 小角度近似              | 精確公式                               |
| ---------- | ----------------------- | -------------------------------------- |
| 適用條件   | $\theta_0 \lesssim 15°$ | 任意 $\theta_0 \in (0°, 180°)$         |
| 週期公式   | $T_0 = 2\pi\sqrt{L/g}$  | $T = 4\sqrt{L/g}\,K(\sin(\theta_0/2))$ |
| 與振幅關係 | 無關                    | 隨 $\theta_0$ 增大而增大               |
| 數學本質   | 線性 ODE，解析可解      | 非線性 ODE，週期需橢圓積分             |

$K(k)$ 是什麼？為什麼它「積不出來」？[下一篇]({% post_url 2026-05-21-elliptic-integral-K %})會仔細定義它，並看它的行為與展開式。
