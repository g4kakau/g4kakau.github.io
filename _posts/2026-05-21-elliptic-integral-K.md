---
layout: post
title: "積不出來的積分：第一類橢圓積分 K(k) 的定義與性質"
date: 2026-05-21 01:00:00 +0800
categories: [大學數學, 微積分]
tags: [橢圓積分, 第一類橢圓積分, 特殊函數, 大學微積分, 單擺]
math: true
description: "第一類完全橢圓積分 K(k) 出現在大角度單擺的精確週期公式中。本文定義 K(k)，說明它為何不能用初等函數表示，討論其在 k=0 和 k→1 時的行為，並給出冪級數展開式，讓單擺週期修正一目瞭然。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

[上一篇]({% post_url 2026-05-21-pendulum-not-shm %})推導出大角度單擺的精確週期：

$$T = 4\sqrt{\frac{L}{g}}\,K\!\left(\sin\frac{\theta_0}{2}\right)$$

但 $K(k)$ 是什麼？它為什麼不能像 $\ln x$ 或 $\arcsin x$ 那樣用初等函數表示？

---

## 定義

**第一類完全橢圓積分**（complete elliptic integral of the first kind）定義為

$$\boxed{K(k) = \int_0^{\pi/2} \frac{\dd{\phi}}{\sqrt{1 - k^2\sin^2\phi}}, \qquad 0 \le k < 1}$$

<!-- 📈 FIGURE: K(k) vs k 函數圖
     建議內容：橫軸 k（0 到 0.999），縱軸 K(k)，展示 K(0) = π/2 的起點，
     以及 k → 1 時的對數發散。可在圖上疊加對數近似 ln(4/√(1-k²))，
     標注 k = sin(15°/2)、sin(30°/2)、sin(90°/2) 等幾個物理意義點。
     格式：matplotlib PNG；附圖說「圖 1：K(k) 隨模數 k 的變化，k → 1 時對數發散」。
-->

其中 $k$ 稱為**模數**（modulus）。

這個積分形式來自上一篇半角代換的結尾。直觀上，被積函數

$$\frac{1}{\sqrt{1 - k^2\sin^2\phi}}$$

在 $k = 0$ 時退化成 $1$（積分 $= \pi/2$）；$k$ 越大，函數在 $\phi = \pi/2$ 附近越高，積分值也越大。

### 等價形式

透過代換 $x = \sin\phi$，可以把 $K(k)$ 改寫成代數形式：

$$K(k) = \int_0^1 \frac{\dd{x}}{\sqrt{(1 - x^2)(1 - k^2 x^2)}}$$

被積函數的分母是**兩個二次多項式乘積的根號**——這正是橢圓積分的一般特徵。Liouville 在 19 世紀嚴格證明：此類積分不能用初等函數表示（類比 $\int e^{-x^2}\dd{x}$ 無初等原函數，但更難）。因此 $K(k)$ 需要獨立命名，成為**特殊函數**（special function）的一員。

---

## 在 $k = 0$：回到 $\pi/2$

$$K(0) = \int_0^{\pi/2}\dd{\phi} = \frac{\pi}{2}$$

代入單擺公式：

$$T = 4\sqrt{\frac{L}{g}} \cdot \frac{\pi}{2} = 2\pi\sqrt{\frac{L}{g}} = T_0$$

小角度公式只是 $K(0) = \pi/2$ 的特例。

---

## 在 $k \to 1^-$：週期趨向無限大

當 $k \to 1^-$，被積函數在 $\phi = \pi/2$ 處

$$\frac{1}{\sqrt{1 - k^2\sin^2\phi}} \xrightarrow{\phi \to \pi/2} \frac{1}{\sqrt{1 - k^2}} \to \infty$$

積分值發散：

$$K(k) \xrightarrow{k \to 1^-} +\infty$$

精確行為是對數發散：

$$K(k) \approx \ln\frac{4}{\sqrt{1 - k^2}}, \qquad k \to 1^-$$

**物理意義：** $k = \sin(\theta_0/2) \to 1$ 對應 $\theta_0 \to 180°$，也就是擺錘幾乎被推到正上方。在倒立不穩定平衡點附近，擺錘的速度趨近零，週期發散——這是相空間中 separatrix 的物理對應（第四篇會細說）。

---

## 冪級數展開

對 $\lvert k \rvert < 1$，可以對被積函數做二項式展開再逐項積分：

$$\frac{1}{\sqrt{1 - u}} = \sum_{n=0}^\infty \binom{2n}{n} \frac{u^n}{4^n}, \qquad \lvert u\rvert < 1$$

令 $u = k^2\sin^2\phi$，代入並利用 Wallis 積分

$$\int_0^{\pi/2}\sin^{2n}\phi\,\dd{\phi} = \frac{\pi}{2}\cdot\frac{(2n-1)!!}{(2n)!!}
= \frac{\pi}{2}\cdot\left[\frac{(2n)!}{4^n (n!)^2}\right]$$

逐項積分後：

$$K(k) = \frac{\pi}{2}\sum_{n=0}^\infty \left[\frac{(2n)!}{4^n (n!)^2}\right]^2 k^{2n}$$

展開前幾項：

$$\boxed{K(k) = \frac{\pi}{2}\!\left[1 + \frac{1}{4}k^2 + \frac{9}{64}k^4 + \frac{25}{256}k^6 + \cdots\right]}$$

係數規律：第 $n$ 項係數為

$$\left(\frac{(2n-1)!!}{(2n)!!}\right)^2 = \left(\frac{1\cdot3\cdot5\cdots(2n-1)}{2\cdot4\cdot6\cdots(2n)}\right)^2$$

### 對應的週期修正公式

把 $k = \sin(\theta_0/2)$ 代回，對小角度展開（$k \approx \theta_0/2$）：

$$T = 2\pi\sqrt{\frac{L}{g}}\!\left[1 + \frac{1}{16}\theta_0^2 + \frac{11}{3072}\theta_0^4 + \cdots\right]$$

其中 $\theta_0$ 以弧度計。這是「大角度週期修正」的標準展開式。

---

## 數值表與收斂速度

| $k$ | $K(k)$（精確）| 級數取到 $k^2$ 項 | 級數取到 $k^4$ 項 |
|:---:|:---:|:---:|:---:|
| $0$ | $1.5708$ | $1.5708$ | $1.5708$ |
| $0.2$ | $1.5747$ | $1.5747$ | $1.5747$ |
| $0.5$ | $1.6858$ | $1.6877$ | $1.6858$ |
| $0.7$ | $1.8457$ | $1.8631$ | $1.8465$ |
| $0.9$ | $2.2806$ | $2.3953$ | $2.2999$ |
| $0.99$ | $3.3566$ | $3.8797$ | $3.4246$ |

**表 1：** $K(k)$ 精確值與冪級數截斷值的比較。$k$ 越靠近 $1$，需要越多項才能收斂。
{: .fig-caption }

$k < 0.5$ 時，取到 $k^4$ 項已經非常準確。$k$ 接近 $1$ 時冪級數收斂變慢，這時需要別的演算法——[下一篇]({% post_url 2026-05-21-elliptic-integral-AGM %})介紹的 AGM 演算法可以在幾步之內達到機器精度。

---

## 「橢圓」積分名稱的由來

$K(k)$ 的姊妹函數是**第二類完全橢圓積分**：

$$E(k) = \int_0^{\pi/2}\sqrt{1 - k^2\sin^2\phi}\,\dd{\phi}$$

橢圓

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$$

的周長可以寫成 $4a\,E(e)$，其中 $e = \sqrt{1 - b^2/a^2}$ 是離心率——這正是「橢圓積分」名稱的來源。「橢圓積分」指的是這一類積分的數學形式，不是積分路徑是橢圓的意思。第七篇會詳細推導 $E(k)$ 與橢圓弧長的關係。

---

## 三類橢圓積分一覽

| 類別 | 定義 | 物理來源 |
|---|---|---|
| 第一類 $K(k)$ | $\int_0^{\pi/2}(1-k^2\sin^2\phi)^{-1/2}\dd{\phi}$ | 單擺精確週期 |
| 第二類 $E(k)$ | $\int_0^{\pi/2}(1-k^2\sin^2\phi)^{+1/2}\dd{\phi}$ | 橢圓弧長 |
| 第三類 $\Pi(n,k)$ | $\int_0^{\pi/2}[(1-n\sin^2\phi)\sqrt{1-k^2\sin^2\phi}]^{-1}\dd{\phi}$ | 廣義擺、天線輻射 |

本系列主要聚焦 $K(k)$，第七篇補充 $E(k)$。

---

## 小結

- $K(k)$ 是無法用初等函數表示的定積分，需要獨立命名
- $K(0) = \pi/2$，對應小角度單擺的 $T_0$
- $K(k) \to \infty$（對數發散）當 $k \to 1$，對應週期趨向無限大
- 冪級數 $K(k) = \frac{\pi}{2}[1 + k^2/4 + 9k^4/64 + \cdots]$ 在 $k$ 不太靠近 $1$ 時收斂良好
- 要在 $k \approx 1$ 附近高效率地計算，需要 AGM 演算法
