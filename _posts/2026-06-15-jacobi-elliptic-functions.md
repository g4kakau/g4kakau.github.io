---
layout: post
title: "雅可比橢圓函數 sn, cn, dn：單擺的精確解與小行星的翻滾"
date: 2026-06-15 10:00:00 +0800
categories: [大學數學, 微積分]
tags: [橢圓函數, 雅可比橢圓函數, 第一類橢圓積分, 單擺, 歐拉方程式, 剛體轉動, 大學數學, 微積分]
math: true
description: "第一類橢圓積分K(k)的反函數，定義出sn、cn、dn三個雅可比橢圓函數。本文從反函數出發建立它們的基本性質，推出單擺的精確解，並說明剛體自由轉動的歐拉方程式如何用同一套函數描述。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

[上一篇]({% post_url 2026-06-15-elliptic-integrals-celestial-mechanics %})整理了天體力學中橢圓積分真正出現的地方，並預告了一個尚未解決的問題：一個不受外力矩的剛體（自由翻滾的小行星），它的自轉怎麼描述？答案不是初等函數，也不只是 $K(k)$ 或 $E(k)$ 這兩個數字——而是一整套**函數**：雅可比橢圓函數 $\mathrm{sn},\mathrm{cn},\mathrm{dn}$。

這篇文章要做兩件事：第一，把這三個函數「生出來」——它們其實就是[第一篇]({% post_url 2026-05-21-elliptic-integral-K %})介紹的那個橢圓積分（的不完全形式）的反函數，跟 $\sin$ 是 $\int\dd{x}/\sqrt{1-x^2}$ 的反函數是同一個套路。第二，用它們把單擺的運動方程**完全解出來**——回到整個系列最初的起點，給出一個閉合形式的 $\theta(t)$。

---

## 一、反函數的套路：從 $\arcsin$ 到 $\mathrm{sn}$

回憶一下 $\sin$ 是怎麼定義的（從積分的角度）：

$$
u=\int_0^x\frac{\dd{t}}{\sqrt{1-t^2}}=\arcsin x \quad\Longleftrightarrow\quad x=\sin u
$$

也就是說，$\sin$ 是「$\arcsin$ 這個積分」的反函數。

[第一篇]({% post_url 2026-05-21-elliptic-integral-K %})定義的 $K(k)$ 是**完全**橢圓積分（積分到 $\pi/2$）。它有一個**不完全**版本：

$$
\boxed{u=F(\varphi,k)=\int_0^\varphi\frac{\dd{\theta}}{\sqrt{1-k^2\sin^2\theta}}}
$$

當 $\varphi=\pi/2$ 時，$F(\pi/2,k)=K(k)$。

現在套用跟 $\arcsin\to\sin$ 完全一樣的想法：把 $\varphi$ 看成 $u$ 的函數，定義**振幅函數**（amplitude）

$$
\varphi=\mathrm{am}(u,k)
$$

然後定義三個**雅可比橢圓函數**（Jacobi, 1829）：

$$
\boxed{\mathrm{sn}(u,k)=\sin\big(\mathrm{am}(u,k)\big),\qquad \mathrm{cn}(u,k)=\cos\big(\mathrm{am}(u,k)\big),\qquad \mathrm{dn}(u,k)=\sqrt{1-k^2\,\mathrm{sn}^2(u,k)}}
$$

直覺地說：$\mathrm{sn}$ 是「廣義化的 $\sin$」——它就是 $\sin\varphi$，只是 $\varphi$ 和 $u$ 之間不是線性關係 $\varphi=u$，而是由 $F(\varphi,k)=u$ 這個橢圓積分關係連結。$k=0$ 時 $F(\varphi,0)=\varphi$，於是 $\mathrm{sn}(u,0)=\sin u$——退化回我們熟悉的三角函數。

---

## 二、退化極限：三角函數與雙曲函數之間

$k$ 的取值範圍是 $0\le k<1$（$k=1$ 是臨界情形）。兩個端點分別退化成熟悉的函數：

| $k$ | $\mathrm{sn}(u,k)$ | $\mathrm{cn}(u,k)$ | $\mathrm{dn}(u,k)$ |
|:---:|:---:|:---:|:---:|
| $k=0$ | $\sin u$ | $\cos u$ | $1$ |
| $k=1$ | $\tanh u$ | $\mathrm{sech}\,u$ | $\mathrm{sech}\,u$ |
| $0<k<1$ | 介於兩者之間的週期函數 | | |

可以這樣理解：**雅可比橢圓函數是三角函數（$k=0$）與雙曲函數（$k=1$）之間的「插值」**。$k=0$ 對應 $K(0)=\pi/2$（單擺小角度極限）；$k=1$ 對應 $K(1)\to\infty$（單擺週期發散，剛好停在倒立點的臨界軌道）。

<!-- 📈 FIGURE: sn, cn, dn 隨 k 變化
     建議內容：三張小圖（或一張圖三條線），畫出 k=0, k=0.9, k→1 時
     sn(u,k) 的波形：k=0 是標準正弦波；k 增加後波形變「方」（在峰值附近停留更久）；
     k→1 時趨近 tanh(u)（單調趨近 ±1，不再週期）。
     格式：matplotlib PNG；附圖說「圖 1：sn(u,k) 從正弦波（k=0）到 tanh（k=1）的過渡」。
-->

---

## 三、基本恆等式與微分關係

雅可比橢圓函數滿足一組跟三角函數平行的恆等式：

$$
\mathrm{sn}^2+\mathrm{cn}^2=1 \qquad\text{（類比 }\sin^2+\cos^2=1\text{）}
$$

$$
\mathrm{dn}^2+k^2\mathrm{sn}^2=1
$$

兩式相減：$\mathrm{dn}^2-k^2\mathrm{cn}^2=1-k^2\equiv k'^2$，其中 $k'=\sqrt{1-k^2}$ 稱為**互補模數**。

微分關係（這是它們真正「好用」的地方）：

$$
\dv{\mathrm{sn}}{u}=\mathrm{cn}\cdot\mathrm{dn},\qquad \dv{\mathrm{cn}}{u}=-\mathrm{sn}\cdot\mathrm{dn},\qquad \dv{\mathrm{dn}}{u}=-k^2\mathrm{sn}\cdot\mathrm{cn}
$$

跟 $\dv{}{u}\sin u=\cos u$ 比較，可以看到 $\mathrm{dn}$ 扮演了「修正因子」的角色——當 $k\to0$ 時 $\mathrm{dn}\to1$，上面三式就退化成 $\sin,\cos$ 的微分關係。

最後，$\mathrm{sn}(u,k)$ 對 $u$ 是週期函數，週期是 $4K(k)$：

$$
\mathrm{sn}(u+4K,k)=\mathrm{sn}(u,k)
$$

這個 $4K(k)$ 不是巧合——它直接來自 $F(\varphi,k)$ 在 $\varphi$ 走一圈 $[0,2\pi]$ 時，$u$ 累積的總量恰好是 $4K(k)$（$[0,\pi/2]$ 對應 $K(k)$，由對稱性乘以 4）。**這正是單擺週期公式 $T=4\sqrt{L/g}\,K(k)$ 裡那個「4」的來源**。

---

## 四、單擺的精確解

現在把這套工具用在單擺上。[第一篇]({% post_url 2026-05-21-elliptic-integral-K %})推出能量守恆給出

$$
\dot\theta^2=\frac{2g}{L}(\cos\theta-\cos\theta_0)
$$

令 $\omega_0=\sqrt{g/L}$，用半角公式 $\cos\theta=1-2\sin^2(\theta/2)$：

$$
\dot\theta^2=4\omega_0^2\left[\sin^2\frac{\theta_0}{2}-\sin^2\frac{\theta}{2}\right]
$$

令 $k=\sin(\theta_0/2)$。**關鍵的代換**：

$$
\boxed{\sin\frac{\theta}{2}=k\,\mathrm{sn}(\omega_0 t,k)}
$$

兩邊對 $t$ 微分，左邊用鏈鎖律，右邊用上一節的微分關係（$u=\omega_0 t$）：

$$
\frac12\cos\frac{\theta}{2}\,\dot\theta=k\,\omega_0\,\mathrm{cn}(\omega_0 t,k)\,\mathrm{dn}(\omega_0 t,k)
$$

而 $\cos(\theta/2)=\sqrt{1-\sin^2(\theta/2)}=\sqrt{1-k^2\mathrm{sn}^2}=\mathrm{dn}(\omega_0 t,k)$（用第二節的恆等式）。代入後 $\mathrm{dn}$ 恰好消掉：

$$
\dot\theta=2k\omega_0\,\mathrm{cn}(\omega_0 t,k)
$$

驗算一下：$\dot\theta^2=4k^2\omega_0^2\,\mathrm{cn}^2=4\omega_0^2 k^2(1-\mathrm{sn}^2)=4\omega_0^2(k^2-k^2\mathrm{sn}^2)=4\omega_0^2\left[\sin^2\frac{\theta_0}{2}-\sin^2\frac{\theta}{2}\right]$ ✓ 跟原方程一致。

於是單擺的**精確解**是：

$$
\boxed{\theta(t)=2\arcsin\big[k\,\mathrm{sn}(\omega_0 t,k)\big],\qquad k=\sin\frac{\theta_0}{2},\quad \omega_0=\sqrt{\frac{g}{L}}}
$$

這就是這個系列從第一篇開始追的東西：一個**閉合形式**的 $\theta(t)$。檢查極限：

- $k\to0$（小角度）：$\mathrm{sn}(u,0)=\sin u$，所以 $\theta(t)\approx 2\cdot k\sin(\omega_0 t)=\theta_0\sin(\omega_0 t)$——回到簡諧運動。
- $k\to1$（臨界，$\theta_0\to\pi$）：$\mathrm{sn}(u,1)=\tanh u$ 不是週期函數，$\theta(t)\to\pi$ 但永遠到不了——這正是 separatrix 上「無限時間接近倒立點」的行為，跟[第四篇相空間]({% post_url 2026-05-21-phase-space-pendulum %})的描述一致。

週期：$\mathrm{sn}$ 的週期是 $4K(k)$（在 $u=\omega_0t$ 的尺度下），所以 $t$ 的週期是 $4K(k)/\omega_0=4\sqrt{L/g}\,K(k)$——正是[第一篇]({% post_url 2026-05-21-elliptic-integral-K %})的公式。**整個系列的週期公式、相圖、能量分析，現在都統一在這一條 $\theta(t)$ 裡。**

---

## 五、剛體的自由轉動：另一個 $\mathrm{sn,cn,dn}$ 的舞台

[上一篇]({% post_url 2026-06-15-elliptic-integrals-celestial-mechanics %})提到，自由翻滾的小行星（不受外力矩）由**歐拉方程式**描述。設三個主慣性矩 $I_1<I_2<I_3$，角速度分量 $\Omega_1,\Omega_2,\Omega_3$ 滿足

$$
I_1\dot\Omega_1=(I_2-I_3)\Omega_2\Omega_3,\qquad I_2\dot\Omega_2=(I_3-I_1)\Omega_3\Omega_1,\qquad I_3\dot\Omega_3=(I_1-I_2)\Omega_1\Omega_2
$$

這個系統有兩個保守量：

$$
2E=I_1\Omega_1^2+I_2\Omega_2^2+I_3\Omega_3^2 \qquad(\text{能量}),\qquad L^2=I_1^2\Omega_1^2+I_2^2\Omega_2^2+I_3^2\Omega_3^2 \qquad(\text{角動量大小})
$$

這兩個式子是 $\Omega_1^2,\Omega_2^2,\Omega_3^2$ 的線性聯立方程式，可以解出 $\Omega_2^2,\Omega_3^2$ 都是 $\Omega_1^2$ 的線性函數。代回歐拉方程式第一式：

$$
\dot\Omega_1^2=\left(\frac{I_2-I_3}{I_1}\right)^2\Omega_2^2\Omega_3^2
$$

右邊是「$\Omega_1^2$ 的線性函數」乘以「$\Omega_1^2$ 的線性函數」，所以 $\dot\Omega_1^2$ 是 $\Omega_1^2$ 的二次函數——也就是說，$\dot\Omega_1^2$ 是 $\Omega_1$ 的**四次多項式**（只含偶次方）。

這正是 $\mathrm{sn},\mathrm{cn},\mathrm{dn}$ 的「原生棲息地」：回想第三節的恆等式 $\mathrm{sn}^2+\mathrm{cn}^2=1$、$\mathrm{dn}^2+k^2\mathrm{sn}^2=1$，微分後就會給出 $(\mathrm{sn}')^2=(1-\mathrm{sn}^2)(1-k^2\mathrm{sn}^2)$——同樣是「變數平方」的四次多項式形式。歐拉方程式化簡出來的 $\dot\Omega_1^2$ 方程，跟這個形式完全對應。

完整解出來的結果（Landau & Lifshitz, *Mechanics*）是三個分量分別對應 $\mathrm{sn},\mathrm{cn},\mathrm{dn}$ 中的一個：

$$
\Omega_1(t)\propto\mathrm{cn}(\tau t,k),\qquad \Omega_2(t)\propto\mathrm{sn}(\tau t,k),\qquad \Omega_3(t)\propto\mathrm{dn}(\tau t,k)
$$

其中 $\tau$ 和 $k$ 由 $E,L^2,I_1,I_2,I_3$ 決定。轉動週期是 $4K(k)/\tau$——跟單擺週期 $4K(k)/\omega_0$ 是同一個結構，只是 $\omega_0$ 換成了由轉動慣量和能量決定的 $\tau$。

**物理意義**：像小行星 4179 Toutatis 或彗星核 67P/Churyumov–Gerasimenko 這類形狀不規則的天體，它們的自轉並不是繞單一軸的勻速旋轉，而是三個角速度分量都隨時間以 $\mathrm{sn},\mathrm{cn},\mathrm{dn}$ 的方式振盪——這就是「翻滾」（tumbling）。額外值得一提的是**中間軸不穩定性**（網球拍定理）：如果初始轉動軸接近中間慣性矩 $I_2$ 的主軸，轉動會劇烈翻轉，這也可以從 $k\to1$（$\mathrm{sn}\to\tanh$，不再週期）的極限看出端倪。

---

## 小結

- $\mathrm{sn}(u,k)=\sin(\mathrm{am}(u,k))$、$\mathrm{cn}=\cos(\mathrm{am})$、$\mathrm{dn}=\sqrt{1-k^2\mathrm{sn}^2}$，其中 $\mathrm{am}(u,k)$ 由 $F(\varphi,k)=u$ 定義——這是第一類橢圓積分**不完全形式** $F(\varphi,k)$ 的反函數（完全形式 $K(k)=F(\pi/2,k)$ 只是它的一個特殊值），跟 $\sin=\arcsin^{-1}$ 同一個套路。
- $k=0\to$ 三角函數；$k=1\to$ 雙曲函數；$0<k<1$ 是兩者之間的週期函數，週期 $4K(k)$。
- 單擺精確解：$\theta(t)=2\arcsin[k\,\mathrm{sn}(\omega_0t,k)]$，$k=\sin(\theta_0/2)$——整個系列的週期公式、相圖、能量分析統一在這一條曲線裡。
- 剛體自由轉動（歐拉方程式）化簡後同樣是「變數平方的四次多項式」結構，角速度三分量分別對應 $\mathrm{cn},\mathrm{sn},\mathrm{dn}$——翻滾的小行星、彗星核都是這套函數的真實舞台。

雅可比橢圓函數背後還有更深的故事：它們在複平面上其實是**雙週期函數**，對應到一個環面（torus）的幾何，這條線會一路通向橢圓曲線與複分析——這是另一篇文章的主題了。這個系列從單擺出發、繞了一圈天體力學，最終在這裡畫上一個閉合形式的句點。
