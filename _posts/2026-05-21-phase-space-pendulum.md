---
layout: post
title: "相空間入門：單擺的能量曲線、separatrix 與旋轉解"
date: 2026-05-21 03:00:00 +0800
categories: [大學物理, 力學]
tags: [相空間, 相圖, 單擺, separatrix, 哈密頓力學, 非線性振動, 大學物理]
math: true
description: "相空間把單擺所有可能的運動一次畫出來。本文介紹相平面的坐標、等能量曲線的三種類型（libration、separatrix、rotation），說明 separatrix 的方程式與物理意義，並連結到 K(k) 在 k→1 時的發散行為。"
---

$$\require{physics}$$
<link rel="stylesheet" href="/assets/css/posts-custom.css">

前三篇一直在問：「單擺的週期是多少？」相空間的觀點則是換一個問題：

> 「單擺有哪些可能的運動類型？每種類型在幾何上長什麼樣子？」

一張圖就能回答全部。

---

## 相平面：用 $(\theta, \omega)$ 描述狀態

單擺的運動方程式

$$\ddot{\theta} + \frac{g}{L}\sin\theta = 0$$

是二階 ODE，完整描述需要兩個初始條件：$\theta(0)$ 和 $\dot{\theta}(0)$。

令 $\omega = \dot{\theta}$（角速度），把二階方程改寫成兩個一階方程：

$$\dot{\theta} = \omega$$

$$\dot{\omega} = -\frac{g}{L}\sin\theta$$

在**相平面**（phase plane）中，每個點 $(\theta, \omega)$ 代表單擺在某一瞬間的完整狀態。時間演化對應狀態點在相平面上沿著某條曲線移動——這條曲線就是**相軌跡**（phase trajectory）。

> **備註：** 嚴格的哈密頓力學用 $(\theta, p_\theta)$ 作為相空間坐標，其中 $p_\theta = mL^2\omega$ 是廣義動量（角動量）。$(\theta, \omega)$ 和 $(\theta, p_\theta)$ 只差常數倍 $mL^2$，圖形形狀相同，只是縱軸單位不同。本篇用 $(\theta, \omega)$ 是為了物理直覺方便。

---

## 能量守恆 = 等高線

總力學能為

$$E = \frac{1}{2}mL^2\omega^2 + mgL(1 - \cos\theta)$$

因為能量守恆，相軌跡就是等能量曲線

$$\frac{1}{2}mL^2\omega^2 + mgL(1 - \cos\theta) = E = \text{const}$$

整理（令 $\omega_0^2 = g/L$）：

$$\omega^2 = \frac{2g}{L}\!\left[\frac{E}{mgL} - (1 - \cos\theta)\right]$$

這是相平面上的「等高線圖」：對不同的 $E$ 值，畫出對應的曲線，就得到**相圖**（phase portrait）。

---

## 相圖的三種軌道類型

### 類型一：Libration（擺動，$E < 2mgL$）

能量不足以讓擺錘到達最高點（$\theta = \pi$）。擺錘在左右兩側最高點之間來回擺動，相軌跡是**封閉曲線**。

能量越低，封閉曲線越小、越接近橢圓。在 $E \to 0$ 的極限下，

$$\frac{1}{2}mL^2\omega^2 + \frac{1}{2}mgL\theta^2 = E$$

這正是一個橢圓（小角度近似把 $1 - \cos\theta \approx \theta^2/2$ 代入）。也就是說，**小角度簡諧運動對應相平面上的橢圓**。

### 類型二：Separatrix（分界軌道，$E = 2mgL$）

臨界能量 $E_{\text{sep}} = 2mgL$ 恰好等於倒立位置 $\theta = \pi$ 的位能：

$$V(\pi) = mgL(1 - \cos\pi) = 2mgL$$

此時相軌跡是分隔「擺動」與「旋轉」的**臨界曲線**，稱為 **separatrix**（分離曲線）。

Separatrix 的方程式由能量守恆給出：

$$\frac{1}{2}mL^2\omega^2 + mgL(1 - \cos\theta) = 2mgL$$

整理：

$$\omega^2 = \frac{2g}{L}(1 + \cos\theta)$$

利用半角公式 $1 + \cos\theta = 2\cos^2(\theta/2)$：

$$\boxed{\omega = \pm 2\sqrt{\frac{g}{L}}\cos\frac{\theta}{2}}$$

在 $\theta \in (-\pi, \pi)$ 範圍內，separatrix 是兩條曲線（分別對應往左和往右的臨界軌道），在 $(\pm\pi, 0)$ 兩個倒立平衡點相交，形成「8 字形外框」。

**沿 separatrix 運動的時間：** 理論上，從任意點出發沿 separatrix 運動，需要**無限長時間**才能到達倒立平衡點 $(\pi, 0)$。這對應第二篇中 $k \to 1$ 時 $K(k) \to \infty$，週期發散的物理根源。

### 類型三：Rotation（旋轉，$E > 2mgL$）

能量足以越過最高點，擺錘持續旋轉。角度 $\theta$ 單調增加（或減少），相軌跡是**不封閉的開放曲線**。

注意：$\theta = \pi$ 和 $\theta = -\pi$ 在物理上是同一個位置（倒立），所以相平面「左右邊界是同一個地方」。更完整的幾何觀點是把相空間想成一個**圓柱面**（cylinder），$\theta$ 方向是週期性的。

---

## 平衡點分析

相圖上有兩類特殊點（$\dot{\theta} = 0$ 且 $\dot{\omega} = 0$）：

**穩定平衡點** $(\theta, \omega) = (0, 0)$：擺錘垂直向下靜止。附近的小擾動使狀態點繞著它做封閉軌跡（近似橢圓），對應稍微偏移的簡諧振動。

**不穩定平衡點** $(\theta, \omega) = (\pm\pi, 0)$：擺錘倒立在正上方。任何微小擾動都會讓狀態點沿著 separatrix 離開，擺錘倒下來。這些點在相圖中是**鞍點**（saddle point）：沿某些方向「往內穿過」，沿另一些方向「往外逃出」。

---

## 相圖的全貌

把上述三種類型疊在一起，相圖看起來像這樣：

- 中央是一圈圈同心封閉曲線（libration），越往外越扁
- 中心的極小能量曲線近似橢圓（SHM 極限）
- 最外圈封閉曲線與旋轉曲線之間有 separatrix
- Separatrix 以外是不封閉的波浪狀旋轉曲線
- $(\pm\pi, 0)$ 是 separatrix 的「交叉點」（不穩定平衡點）

<!-- 🖼️ FIGURE: 單擺相圖（本篇最核心的圖，強烈建議製作）
     建議內容：使用本篇末尾的 Python 程式碼生成，或改成互動版：
     - 藍色封閉曲線：多條 libration 軌道（E < 2mgL）
     - 紅色粗線：separatrix（E = 2mgL），標注「separatrix」
     - 橘色波浪線：多條 rotation 軌道（E > 2mgL）
     - 在 (0,0) 標注「stable equilibrium」，在 (±π, 0) 標注「saddle point」
     - 加上坐標軸標籤 θ（rad）和 ω（rad/s）
     互動版建議：Observable / p5.js，讓學生點擊相平面任意位置，
     看到對應初始條件的軌跡動畫（擺錘實際在擺動或旋轉）。
     格式：至少提供 matplotlib PNG；互動版為加分項。
     附圖說「圖 1：單擺相圖。藍色：擺動軌道；紅色：separatrix；橘色：旋轉軌道」。
-->

---

## 連結到橢圓積分

把 libration 軌道 $k = \sin(\theta_0/2)$ 整理一下：

- $k = 0$（最小振幅）：近似橢圓，週期 $T_0$
- $k < 1$（有限振幅）：封閉曲線，週期 $T = 4\sqrt{L/g}\,K(k)$
- $k = 1$（separatrix）：$K(1) = \infty$，週期 $\to \infty$
- $k > 1$（旋轉）：不再是週期積分的 libration 問題

因此，**第一類橢圓積分 $K(k)$ 對應的正是相圖中封閉 libration 軌道的週期**。$k \to 1$ 的發散，就是相軌跡趨近 separatrix 時週期無限延長的幾何現象。

---

## 數值模擬：Python 相圖

```python
import numpy as np
import matplotlib.pyplot as plt

g, L = 9.81, 1.0

theta = np.linspace(-np.pi, np.pi, 600)
omega = np.linspace(-5.5, 5.5, 600)
Theta, Omega = np.meshgrid(theta, omega)

# 能量（單位質量，L=1）
E = 0.5 * L**2 * Omega**2 + g * L * (1 - np.cos(Theta))

# Separatrix 能量
E_sep = 2 * g * L

fig, ax = plt.subplots(figsize=(8, 6))
ax.contour(Theta, Omega, E,
           levels=np.linspace(0.1, E_sep * 0.99, 12),
           colors='steelblue', linewidths=1.0)
ax.contour(Theta, Omega, E, levels=[E_sep],
           colors='crimson', linewidths=2.5)  # separatrix
ax.contour(Theta, Omega, E,
           levels=np.linspace(E_sep * 1.01, E_sep * 3, 8),
           colors='darkorange', linewidths=1.0)

ax.set_xlabel(r'$\theta$ (rad)', fontsize=12)
ax.set_ylabel(r'$\omega$ (rad/s)', fontsize=12)
ax.set_title('單擺相圖', fontsize=13)
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.annotate('stable\nequilibrium', xy=(0, 0),
            xytext=(0.4, 1.5), arrowprops=dict(arrowstyle='->'))
ax.annotate('separatrix', xy=(np.pi, 0),
            xytext=(1.8, 1.8), color='crimson',
            arrowprops=dict(arrowstyle='->', color='crimson'))
plt.tight_layout()
plt.show()
```

藍色：libration 封閉軌道；紅色：separatrix；橘色：rotation 旋轉軌道。

---

## 小結

| 軌道類型           | 能量       | 幾何特徵     | 週期                          |
| ------------------ | ---------- | ------------ | ----------------------------- |
| Libration（擺動）  | $E < 2mgL$ | 封閉曲線     | $T = 4\sqrt{L/g}\,K(k)$，有限 |
| Separatrix（臨界） | $E = 2mgL$ | 8 字形分界線 | $T \to \infty$                |
| Rotation（旋轉）   | $E > 2mgL$ | 不封閉波浪線 | 有限，公式不同                |

- 穩定平衡點 $(0,0)$：擺錘最低點，小角度近似成橢圓
- 不穩定平衡點 $(\pm\pi, 0)$：倒立點，鞍點，separatrix 的交叉處
- $K(k) \to \infty$ 在相空間中的意思：軌道趨近 separatrix，繞一圈需要的時間趨向無限大

[下一篇]({% post_url 2026-05-21-lagrangian-mechanics-pendulum %})用拉格朗日力學重新推導單擺運動方程，並看廣義坐標如何讓約束力自動消失。
