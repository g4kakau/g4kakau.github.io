---
layout: post
title: "拋體運動的曲率：最高點為什麼最彎？"
date: 2026-05-12 06:51:10 +0800
categories: [大學物理, 力學]
tags: [拋體運動, 曲率, 法向加速度, 微分幾何, 曲率半徑]
math: true
description: "用曲率 κ = a_n/v² 分析拋體運動：推導曲率隨時間的變化、嚴格證明曲率在最高點最大，以及為什麼速度越大反而路徑越直。"
---

$$\require{physics}$$

拋體運動軌跡是拋物線，但這條拋物線在不同位置彎曲程度不一樣——最高點附近「看起來最彎」。這個直覺是對的，而且可以用微分幾何的語言精確計算和證明。

前提知識：這篇建立在「向心力的幾何本質」那篇的基礎上。核心工具是 $a_n = \kappa v^2$，其中 $\kappa$ 是曲線的曲率。

---

## 一、設定

初速量值 $v_0$、仰角 $\alpha$，從原點發射，重力加速度 $g$ 向下。

位置的參數式：

$$
x(t) = v_0\cos\alpha\, t, \qquad y(t) = v_0\sin\alpha\, t - \frac{1}{2}gt^2
$$

速度：

$$
v_x = v_0\cos\alpha \equiv \text{常數}, \qquad v_y(t) = v_0\sin\alpha - gt
$$

$$
\vb{v}(t) = (v_x,\ v_y), \qquad |\vb{v}(t)| = \sqrt{v_x^2 + v_y^2}
$$

加速度（整個過程不變）：

$$
\vb{a} = (0, -g)
$$

---

## 二、把重力分解成切向與法向

重力同時在「加速/減速」物體（切向），以及「彎曲路徑」（法向）。具體分解如下。

**切向加速度**（改變速率）：

$$
a_t = \vb{a} \cdot \frac{\vb{v}}{|\vb{v}|} = (0,-g)\cdot\frac{(v_x, v_y)}{|\vb{v}|} = -g\frac{v_y}{|\vb{v}|}
$$

**法向加速度**（彎曲路徑）——用 $\lvert\vb{a}\rvert^2 = a_t^2 + a_n^2$ 求：

$$
a_n = \sqrt{g^2 - g^2\frac{v_y^2}{|\vb{v}|^2}} = g\frac{|v_x|}{|\vb{v}|} = g\frac{v_0\cos\alpha}{|\vb{v}(t)|}
$$

\begin{equation}\label{eq:projectile-normal-acceleration}
\boxed{a_n(t) = \frac{gv_0\cos\alpha}{|\vb{v}(t)|}}
\end{equation}

物理直覺：重力 $g$ 裡只有垂直於速度的那一部分在彎曲軌跡；平行於速度的部分只改變速率，不改變方向。

---

## 三、曲率與曲率半徑

由 $a_n = \kappa v^2$ 與 \eqref{eq:projectile-normal-acceleration}，可以直接得到軌跡的曲率：

$$
\kappa(t) = \frac{a_n}{|\vb{v}|^2} = \frac{gv_0\cos\alpha}{|\vb{v}(t)|^3}
$$

\begin{equation}\label{eq:projectile-curvature-time}
\boxed{\kappa(t) = \frac{gv_0\cos\alpha}{\left[(v_0\cos\alpha)^2 + (v_0\sin\alpha - gt)^2\right]^{3/2}}}
\end{equation}

曲率半徑：

$$
R(t) = \frac{1}{\kappa(t)} = \frac{|\vb{v}(t)|^3}{gv_0\cos\alpha}
$$

---

## 四、三個關鍵位置

### 發射瞬間（$t = 0$）

$$
|\vb{v}| = v_0, \qquad \kappa(0) = \frac{g\cos\alpha}{v_0^2}, \qquad R(0) = \frac{v_0^2}{g\cos\alpha}
$$

仰角越大，$\cos\alpha$ 越小，起始曲率越小（彎得越不明顯）。

### 最高點（$t = v_0\sin\alpha/g$，此時 $v_y = 0$）

$$
|\vb{v}| = v_x = v_0\cos\alpha, \qquad a_n = g
$$

$$
\boxed{\kappa_{\text{top}} = \frac{g}{v_0^2\cos^2\alpha}}, \qquad R_{\text{top}} = \frac{v_0^2\cos^2\alpha}{g}
$$

在最高點，速度方向是水平的，重力完全垂直於速度，因此**全部的 $g$ 都用來彎曲路徑**，沒有任何分量去改變速率。

### 下降末段（$\lvert\vb{v}\rvert$ 很大時）

$$
\kappa \propto \frac{1}{|\vb{v}|^3} \to 0
$$

速度越大，曲率越小——同樣的重力已不足以快速改變方向，路徑看起來越來越直。

---

## 五、嚴格證明：曲率在最高點達到最大值

這件事有直覺支持，但也可以用微分法嚴格證明。

令 $A = (v_0\cos\alpha)^2$（常數），$u(t) = v_0\sin\alpha - gt = v_y(t)$，則 \eqref{eq:projectile-curvature-time} 可寫成：

$$
\kappa(t) = C\,(A + u^2)^{-3/2}, \qquad C = gv_0\cos\alpha > 0
$$

對 $t$ 微分（$\dv{u}{t} = -g$）：

$$
\dv{\kappa}{t} = C\cdot\left(-\frac{3}{2}\right)(A+u^2)^{-5/2}\cdot 2u\cdot(-g)
= 3Cgu\,(A+u^2)^{-5/2}
$$

因為分母 $(A + u^2)^{5/2} > 0$ 且 $C,\,g > 0$，**$\kappa'(t)$ 的正負號完全由 $u(t) = v_y(t)$ 決定**。

$u(t) = v_0\sin\alpha - gt$ 是隨時間單調遞減的函數，因此：

- $t < t_{\text{top}}$ 時：$u > 0 \Rightarrow \kappa'> 0$（曲率遞增）
- $t > t_{\text{top}}$ 時：$u < 0 \Rightarrow \kappa' < 0$（曲率遞減）
- $t = t_{\text{top}}$ 時：$u = 0 \Rightarrow \kappa' = 0$（極值點）

$$
\boxed{\text{拋體運動的曲率在最高點（} v_y = 0 \text{）取得唯一最大值。}}
$$

最大曲率的物理解釋很簡潔：

> 最高點時 $v_y = 0$，重力完全垂直於速度，「全部的 $g$」都用來彎曲軌跡；而且此時速率最小（$\lvert v\rvert = v_x$），彎曲效果被 $v^2$ 放大得更明顯。

---

## 六、用 $y(x)$ 的曲率公式驗證

拋體軌跡的 $y(x)$ 表達式：

$$
y(x) = x\tan\alpha - \frac{g}{2v_0^2\cos^2\alpha}\,x^2
$$

計算導數：

$$
y'(x) = \tan\alpha - \frac{g}{v_0^2\cos^2\alpha}\,x, \qquad y''(x) = -\frac{g}{v_0^2\cos^2\alpha}\ \text{（常數）}
$$

平面曲線曲率公式：

$$
\kappa(x) = \frac{|y''|}{(1+y'^2)^{3/2}}
= \frac{\dfrac{g}{v_0^2\cos^2\alpha}}{\left[1+\left(\tan\alpha - \dfrac{g}{v_0^2\cos^2\alpha}x\right)^2\right]^{3/2}}
$$

把 $x = v_0\cos\alpha\cdot t$ 代回，結果與 \eqref{eq:projectile-curvature-time} 完全吻合——兩條路殊途同歸。

---

## 七、結語

| 位置 | $v_y$ | $a_n$ | 曲率 $\kappa$ |
|---|:---:|:---:|:---:|
| 發射瞬間 | $v_0\sin\alpha$ | $g\cos\alpha$ | $g\cos\alpha/v_0^2$ |
| **最高點** | $0$ | $g$（全部） | $g/(v_0^2\cos^2\alpha)$（**最大**） |
| 落地前 | 很負 | 趨近 0 | 趨近 0 |

曲率最大的地方，恰好也是速率最小、重力完全用來改變方向的地方。這不是巧合，而是 \eqref{eq:projectile-curvature-time} 背後的法向加速度關係 $a_n = \kappa v^2$ 的直接結果。
