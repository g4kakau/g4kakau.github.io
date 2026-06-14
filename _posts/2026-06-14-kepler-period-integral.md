---
layout: post
title: "克卜勒問題⑤：用積分求橢圓軌道的精確週期——為什麼這裡不需要橢圓積分？"
date: 2026-06-14 05:00:00 +0800
categories: [大學物理, 天文物理]
tags: [克卜勒問題, 克卜勒方程, 離心近點角, 平近點角, 哈密頓-雅可比方程, 橢圓積分, vis-viva, 大學物理, 天文物理]
math: true
description: "克卜勒第三定律 T²∝a³ 怎麼從第一原理證明？本文從哈密頓-雅可比方法出發，把週期寫成一個積分，用離心近點角代換求出克卜勒方程，並說明為什麼這個積分是初等的——不像單擺，完全不需要橢圓積分。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

[上一篇]({% post_url 2026-06-02-kepler-energy-angular-momentum %})用到了一個公式：

$$
T^2=\frac{4\pi^2a^3}{GM}
$$

但這個公式是怎麼來的？克卜勒第三定律「週期平方比半長軸三次方」，背後一定藏著一個積分——畢竟「週期」的定義就是「繞一圈所花的時間」，而時間是速度的積分。這篇文章要把這個積分**做出來**。

更有趣的是：橢圓軌道的周長本身需要**第二類橢圓積分 $E(k)$** 才能算出來，單擺的週期也需要**第一類橢圓積分 $K(k)$**。那麼克卜勒軌道的週期呢？答案會讓你意外——**完全不需要橢圓積分**。這背後的原因，正是這篇文章的重點。

---

## 一、把週期寫成一個積分

### 1.1 哈密頓-雅可比的視角

在哈密頓-雅可比理論中，若哈密頓量不顯含時間，可以把作用函數寫成

$$
S(q,t)=W(q)-Et
$$

其中 $W(q)=\displaystyle\int\sqrt{2m(E-V(q))}\,\dd{q}$。Hamilton-Jacobi 方程的一個核心結果是：時間與能量的關係由

$$
t-t_0=\frac{\partial W}{\partial E}
$$

給出。這句話的意思是：**只要把「位置對能量的積分」做出來，再對能量微分一次，就得到時間**。

### 1.2 化成 vis-viva 的形式

[在系列③]({% post_url 2026-06-02-effective-potential-orbits %})中，我們已經把二維軌道問題化為一維的有效位能問題：

$$
\varepsilon=\frac{1}{2}\dot r^2+V_{\text{eff}}(r),\qquad V_{\text{eff}}(r)=\frac{h^2}{2r^2}-\frac{GM}{r}
$$

解出 $\dot r$：

$$
\dot r=\sqrt{2\left(\varepsilon-V_{\text{eff}}(r)\right)}
$$

於是

$$
\dd{t}=\frac{\dd{r}}{\dot r}=\frac{\dd{r}}{\sqrt{2(\varepsilon-V_{\text{eff}}(r))}}
$$

這正是 $t-t_0=\partial W/\partial\varepsilon$ 的具體寫法（$W=\int\sqrt{2(\varepsilon-V_{\text{eff}})}\,\dd{r}$，對 $\varepsilon$ 微分後被積函數恰好是 $1/\sqrt{2(\varepsilon-V_{\text{eff}})}$）。

**週期**就是 $r$ 從近日點 $r_{\min}$ 走到遠日點 $r_{\max}$ 再走回來的時間，由對稱性，等於這段單程時間的兩倍：

$$
T=2\int_{r_{\min}}^{r_{\max}}\frac{\dd{r}}{\sqrt{2(\varepsilon-V_{\text{eff}}(r))}}
$$

到這裡，問題變成：**這個積分能不能算出來？**

---

## 二、把被積函數化簡成完全平方

把 $\dot r^2=2(\varepsilon-V_{\text{eff}}(r))$ 展開：

$$
\dot r^2=2\varepsilon-\frac{h^2}{r^2}+\frac{2GM}{r}=\frac{1}{r^2}\left(2\varepsilon r^2+2GMr-h^2\right)
$$

[由系列④]({% post_url 2026-06-02-kepler-energy-angular-momentum %})，能量與角動量可以用半長軸 $a$ 與離心率 $e$ 表示：

$$
\varepsilon=-\frac{GM}{2a},\qquad h^2=GMa(1-e^2)
$$

代入括號內：

$$
2\varepsilon r^2+2GMr-h^2=-\frac{GM}{a}r^2+2GMr-GMa(1-e^2)=-\frac{GM}{a}\left[r^2-2ar+a^2(1-e^2)\right]
$$

括號裡的式子可以配方：

$$
r^2-2ar+a^2(1-e^2)=(r-a)^2-a^2e^2
$$

所以

$$
2\varepsilon r^2+2GMr-h^2=\frac{GM}{a}\left[a^2e^2-(r-a)^2\right]
$$

於是

$$
\boxed{\dot r^2=\frac{GM}{ar^2}\left[a^2e^2-(r-a)^2\right]}
$$

這個式子很值得停下來看一眼：$a^2e^2-(r-a)^2\geq0$ 正好給出 $r\in[a(1-e),a(1+e)]=[r_{\min},r_{\max}]$——這就是橢圓軌道 $r$ 的允許範圍，和[系列③的轉折點分析]({% post_url 2026-06-02-effective-potential-orbits %})完全一致。而 $[a^2e^2-(r-a)^2]$ 這個結構，是「圓」的方程式 $a^2e^2=(r-a)^2+(\cdots)^2$ 的影子——這就是接下來代換的線索。

---

## 三、離心近點角代換

看到 $a^2e^2-(r-a)^2$ 這種「常數平方減去某項平方」的形式，最自然的代換就是三角代換。令

$$
r=a(1-e\cos\psi)
$$

這個 $\psi$ 稱為**離心近點角**（eccentric anomaly）。幾何上，它是把橢圓沿短軸方向「拉伸」成一個圓之後，對應的圓心角——這也是為什麼橢圓軌道的參數常常用一個「輔助圓」來理解。

代入 $(r-a)=-ae\cos\psi$：

$$
a^2e^2-(r-a)^2=a^2e^2-a^2e^2\cos^2\psi=a^2e^2\sin^2\psi
$$

代回 $\dot r^2$：

$$
\dot r^2=\frac{GM}{ar^2}\cdot a^2e^2\sin^2\psi=\frac{GMae^2\sin^2\psi}{r^2}
$$

取正根（$r$ 從 $r_{\min}$ 增加到 $r_{\max}$ 的這一段）：

$$
\dot r=\frac{e\sqrt{GMa}\,\sin\psi}{r}
$$

另一方面，從 $r=a(1-e\cos\psi)$ 直接微分：

$$
\dd{r}=ae\sin\psi\,\dd{\psi}
$$

兩式相除，$\sin\psi$ 恰好消掉：

$$
\dd{t}=\frac{\dd{r}}{\dot r}=\frac{ae\sin\psi\,\dd{\psi}\cdot r}{e\sqrt{GMa}\sin\psi}=\sqrt{\frac{a}{GM}}\,r\,\dd{\psi}=\sqrt{\frac{a^3}{GM}}(1-e\cos\psi)\,\dd{\psi}
$$

**這一步是整個推導的關鍵**：$\sin\psi$ 完全消失了，剩下的 $(1-e\cos\psi)\,\dd{\psi}$ 是一個**初等函數**，可以直接積分。

---

## 四、克卜勒方程與第三定律

直接積分：

$$
t=\sqrt{\frac{a^3}{GM}}\int_0^\psi(1-e\cos\psi')\,\dd{\psi'}=\sqrt{\frac{a^3}{GM}}\left(\psi-e\sin\psi\right)
$$

（取 $t=0$ 對應 $\psi=0$，也就是近日點 $r=a(1-e)=r_{\min}$。）

定義**平均角速度**（mean motion）$\omega\equiv\sqrt{GM/a^3}$，以及**平近點角**（mean anomaly）$M\equiv\omega t$，上式就是天體力學中最著名的方程之一——**克卜勒方程**（Kepler's equation）：

$$
\boxed{M=\psi-e\sin\psi}
$$

它把「時間 $t$」（藏在 $M$ 裡）和「位置」（藏在 $\psi$ 裡，可進一步換算成 $r,\theta$）連結起來。

### 求週期

行星繞完一整圈，$\psi$ 從 $0$ 跑到 $2\pi$（$r$ 從 $r_{\min}$ 增加到 $r_{\max}$ 再回到 $r_{\min}$，對應 $\psi:0\to\pi\to2\pi$），此時 $\sin(2\pi)=0$，所以

$$
\omega T=2\pi-0=2\pi
$$

也就是

$$
\boxed{T=\frac{2\pi}{\omega}=2\pi\sqrt{\frac{a^3}{GM}}}
$$

這就是克卜勒第三定律 $T^2=4\pi^2a^3/(GM)$——而且是**從積分直接推出來的**，不是套公式。

---

## 五、為什麼這裡不需要橢圓積分？

這是整篇文章最值得深思的地方。

在橢圓積分系列中，單擺的週期積分是

$$
T=4\sqrt{\frac{l}{g}}\int_0^{\pi/2}\frac{\dd{\phi}}{\sqrt{1-k^2\sin^2\phi}}=4\sqrt{\frac{l}{g}}K(k)
$$

這個積分**沒有初等反導函數**——$K(k)$ 是一個獨立定義的特殊函數。而橢圓周長的積分 $E(k)$ 也是同樣的故事。

但克卜勒問題的週期積分

$$
T=2\int_{r_{\min}}^{r_{\max}}\frac{\dd{r}}{\sqrt{2(\varepsilon-V_{\text{eff}}(r))}}
$$

經過離心近點角代換後，竟然完全化簡成初等函數 $\psi-e\sin\psi$。明明兩者外觀都長得「差不多」（都是某種根號下的積分，都跟橢圓有關），結果卻天差地遠：一個需要特殊函數，一個是初等函數。

**關鍵在於被積函數的結構**。單擺的位能 $V(\theta)=-mgl\cos\theta$ 是 $\cos\theta$，代換後被積函數變成 $\sqrt{1-k^2\sin^2\phi}$——這是一個「真正的」橢圓型根式，無法用初等函數消掉。而克卜勒問題的有效位能

$$
V_{\text{eff}}(r)=\frac{h^2}{2r^2}-\frac{GM}{r}
$$

恰好是 $1/r$ 與 $1/r^2$ 的組合，使得 $2(\varepsilon-V_{\text{eff}}(r))$ 展開後是 $r$ 的**二次式除以 $r^2$**——這種形式在三角代換下，根號裡的東西會自動變成完全平方 $\sin^2\psi$，根號直接開掉。

這不是偶然。萬有引力 $\propto 1/r^2$（也就是 $V\propto1/r$）是少數幾種能讓所有**有界軌道都是封閉曲線**的中心力場之一（另一個是簡諧振子 $V\propto r^2$）。這種特殊性背後，藏著一個額外的守恆量——**Laplace–Runge–Lenz 向量**，它讓克卜勒問題擁有比一般中心力問題更多的對稱性（數學上稱為「超可積」）。下一篇會正式介紹這個向量，以及它如何解釋橢圓軌道為什麼不會像單擺的相圖那樣需要橢圓積分。

---

## 六、數值範例：哈雷彗星

哈雷彗星的半長軸約 $a\approx17.8\,\text{AU}$。用克卜勒第三定律（取太陽質量、AU、年為單位，使 $GM_\odot=4\pi^2$）：

$$
T=2\pi\sqrt{\frac{a^3}{GM_\odot}}=\sqrt{a^3}=\sqrt{17.8^3}\approx\sqrt{5640}\approx75.1\,\text{年}
$$

與觀測值（約 76 年）相符。**週期本身是初等公式，秒算**——但若要問「哈雷彗星在某個特定時刻 $t$ 距太陽多遠」，就必須先解克卜勒方程 $M=\psi-e\sin\psi$ 求出 $\psi$。這是一個**超越方程**（transcendental equation），$\psi$ 無法用初等函數表示成 $M$ 的封閉式，通常用牛頓法數值求解。

> 換句話說：**週期**（繞一圈的總時間）是初等的，但**任意時刻的位置**不是。這正好和橢圓積分的情況相反——橢圓的周長需要 $E(k)$，但橢圓本身的方程式是初等的。兩種「不初等」，發生在問題的不同層面。

---

## 小結

| 量 | 結果 | 是否初等 |
|---|---|---|
| 週期積分 $T=2\displaystyle\int_{r_{\min}}^{r_{\max}}\dfrac{\dd{r}}{\sqrt{2(\varepsilon-V_{\text{eff}})}}$ | 經離心近點角代換後 $=2\pi\sqrt{a^3/GM}$ | ✅ 初等（克卜勒第三定律） |
| 克卜勒方程 $M=\psi-e\sin\psi$ | 連結時間與位置 | ✅ 方程本身初等，但反解 $\psi(M)$ 是超越方程，需數值解 |
| 單擺週期 $T=4\sqrt{l/g}\,K(k)$ | $K(k)$ 為第一類橢圓積分 | ❌ 非初等 |
| 橢圓周長 | $4aE(k)$，$E(k)$ 為第二類橢圓積分 | ❌ 非初等 |

從哈密頓-雅可比方法出發，週期不過是「位置對能量的積分」再對能量微分一次；而克卜勒問題的特殊之處，在於這個積分恰好可以被一個巧妙的三角代換完全初等化。這種「恰好可以」背後的對稱性，就是下一篇 Laplace–Runge–Lenz 向量要揭開的故事。

<div class="cta-box">
  <strong>還有問題嗎？</strong><br>
  <a href="/contact">→ 歡迎預約家教課，直接針對你的問題討論</a>
</div>
