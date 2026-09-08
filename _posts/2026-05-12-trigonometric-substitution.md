---
layout: post
title: "三角代換法：把根號變掉"
date: 2026-05-12 04:00:11 +0800
categories: [大學數學, 微積分]
tags: [積分技巧, 三角代換, 換元法, 大學微積分]
math: true
description: "根號積分讓你卡關？三角代換把 sqrt(a²-x²)、sqrt(x²-a²)、sqrt(x²+a²) 等三種根號一次解決。從橢圓面積推導直覺，附策略表與例題。"
---

$$\require{physics}$$

有一類積分，看起來就讓人卡住：

$$
\int \frac{1}{\sqrt{9 - x^2}}\dd{x}, \qquad \int \frac{\sqrt{x^2+4}}{x^2}\dd{x}, \qquad \int x^2\sqrt{x^2 - 1}\dd{x}
$$

共同特徵：被積函數裡有根號，而且根號裡是 $x$ 的二次式。

普通換元法行不通，因為你換不掉根號。分部積分也沒有著力點。

三角代換的核心思路是：**先把根號變成三角函數，積完之後再換回來**。三角恆等式正好提供消掉根號所需要的平方差結構。

---

## 一、直觀來源：橢圓面積

先看一個自然的例子，建立直觀。

橢圓 $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ 的面積是多少？

$$
A = 4\int_0^a \frac{b}{a}\sqrt{a^2 - x^2}\dd{x}
$$

被積函數有 $\sqrt{a^2 - x^2}$。令 $x = a\sin\theta$，$\dd{x} = a\cos\theta\,\dd{\theta}$，則

$$
\sqrt{a^2 - x^2} = \sqrt{a^2 - a^2\sin^2\theta} = a\cos\theta
$$

根號消失了！積分變成

$$
A = \frac{4b}{a}\int_0^{\pi/2} a\cos\theta \cdot a\cos\theta\,\dd{\theta} = 4ab\int_0^{\pi/2}\cos^2\theta\,\dd{\theta}
$$

用半角公式 $\cos^2\theta = \frac{1+\cos 2\theta}{2}$：

$$
A = 4ab \cdot \frac{\pi}{4} = \pi ab
$$

這就是橢圓面積公式的來源。關鍵動作是代換 $x = a\sin\theta$，讓 $\sqrt{a^2 - x^2}$ 變成 $a\cos\theta$。

---

## 二、三類代換：策略表

根號的形式決定用哪類代換：

|      根號形式      | 代換              | 用到的恆等式                      | 根號化簡結果  |
| :----------------: | ----------------- | --------------------------------- | :-----------: |
| $\sqrt{a^2 - x^2}$ | $x = a\sin\theta$ | $1 - \sin^2\theta = \cos^2\theta$ | $a\cos\theta$ |
| $\sqrt{a^2 + x^2}$ | $x = a\tan\theta$ | $1 + \tan^2\theta = \sec^2\theta$ | $a\sec\theta$ |
| $\sqrt{x^2 - a^2}$ | $x = a\sec\theta$ | $\sec^2\theta - 1 = \tan^2\theta$ | $a\tan\theta$ |

記法：「**減用 sin，加用 tan，x² 在前用 sec**」。

各類代換的 $\theta$ 取值範圍對應到反三角函數的值域：$\arcsin$ 取 $[-\pi/2, \pi/2]$，$\arctan$ 取 $(-\pi/2, \pi/2)$，$\text{arcsec}$ 取 $[0, \pi/2) \cup [\pi, 3\pi/2)$。

---

## 三、第一類：$\sqrt{a^2 - x^2}$，代換 $x = a\sin\theta$

### 例題：$\displaystyle\int \frac{\sqrt{9-x^2}}{x^2}\dd{x}$

令 $x = 3\sin\theta$，$\dd{x} = 3\cos\theta\,\dd{\theta}$，$\sqrt{9-x^2} = 3\cos\theta$。

$$
\int \frac{3\cos\theta}{9\sin^2\theta} \cdot 3\cos\theta\,\dd{\theta} = \int \frac{\cos^2\theta}{\sin^2\theta}\,\dd{\theta} = \int \cot^2\theta\,\dd{\theta}
$$

用 $\cot^2\theta = \csc^2\theta - 1$：

$$
= -\cot\theta - \theta + C
$$

最後換回 $x$：$\sin\theta = x/3$，所以 $\cot\theta = \dfrac{\sqrt{9-x^2}}{x}$，$\theta = \arcsin(x/3)$。

$$
\boxed{\int \frac{\sqrt{9-x^2}}{x^2}\dd{x} = -\frac{\sqrt{9-x^2}}{x} - \arcsin\frac{x}{3} + C}
$$

---

## 四、第二類：$\sqrt{a^2 + x^2}$，代換 $x = a\tan\theta$

### 例題 1：$\displaystyle\int \frac{1}{a^2 + x^2}\dd{x}$

令 $x = a\tan\theta$，$\dd{x} = a\sec^2\theta\,\dd{\theta}$，$a^2 + x^2 = a^2\sec^2\theta$。

$$
\int \frac{a\sec^2\theta}{a^2\sec^2\theta}\,\dd{\theta} = \frac{1}{a}\int \dd{\theta} = \frac{\theta}{a} + C = \frac{1}{a}\arctan\frac{x}{a} + C
$$

$$
\boxed{\int \frac{1}{a^2+x^2}\dd{x} = \frac{1}{a}\arctan\frac{x}{a} + C}
$$

這個結果很重要，直接背起來。

### 例題 2：$\displaystyle\int \frac{1}{x^2\sqrt{x^2+4}}\dd{x}$

令 $x = 2\tan\theta$，$\sqrt{x^2+4} = 2\sec\theta$：

$$
\int \frac{2\sec^2\theta}{4\tan^2\theta \cdot 2\sec\theta}\,\dd{\theta} = \frac{1}{4}\int \frac{\sec\theta}{\tan^2\theta}\,\dd{\theta} = \frac{1}{4}\int \frac{\cos\theta}{\sin^2\theta}\,\dd{\theta}
$$

令 $u = \sin\theta$：

$$
= \frac{1}{4} \cdot \frac{-1}{\sin\theta} + C = -\frac{1}{4\sin\theta} + C
$$

換回 $x$：$\tan\theta = x/2$，故 $\sin\theta = \dfrac{x}{\sqrt{x^2+4}}$。

$$
\boxed{\int \frac{1}{x^2\sqrt{x^2+4}}\dd{x} = -\frac{\sqrt{x^2+4}}{4x} + C}
$$

---

## 五、第三類：$\sqrt{x^2 - a^2}$，代換 $x = a\sec\theta$

### 例題：$\displaystyle\int \frac{1}{\sqrt{x^2 - a^2}}\dd{x}$

令 $x = a\sec\theta$，$\dd{x} = a\sec\theta\tan\theta\,\dd{\theta}$，$\sqrt{x^2-a^2} = a\tan\theta$。

$$
\int \frac{a\sec\theta\tan\theta}{a\tan\theta}\,\dd{\theta} = \int \sec\theta\,\dd{\theta}
$$

$\displaystyle\int \sec\theta\,\dd{\theta}$ 需要一個小技巧：分子分母同乘 $(\sec\theta + \tan\theta)$，然後令 $u = \sec\theta + \tan\theta$：

$$
\int \sec\theta\,\dd{\theta} = \ln|\sec\theta + \tan\theta| + C
$$

換回 $x$：$\sec\theta = x/a$，$\tan\theta = \sqrt{x^2-a^2}/a$。

$$
\boxed{\int \frac{1}{\sqrt{x^2 - a^2}}\dd{x} = \ln\left|x + \sqrt{x^2 - a^2}\right| + C}
$$

---

## 六、常用結果速查

| 積分                                                 | 結果                                       |
| ---------------------------------------------------- | ------------------------------------------ |
| $\displaystyle\int \frac{1}{\sqrt{a^2 - x^2}}\dd{x}$ | $\arcsin\dfrac{x}{a} + C$                  |
| $\displaystyle\int \frac{1}{a^2 + x^2}\dd{x}$        | $\dfrac{1}{a}\arctan\dfrac{x}{a} + C$      |
| $\displaystyle\int \frac{1}{\sqrt{a^2 + x^2}}\dd{x}$ | $\ln\left\|x + \sqrt{x^2+a^2}\right\| + C$ |
| $\displaystyle\int \frac{1}{\sqrt{x^2 - a^2}}\dd{x}$ | $\ln\left\|x + \sqrt{x^2-a^2}\right\| + C$ |

---

## 七、流程總結

遇到根號積分時，判斷順序：

1. 看根號裡的形式（$a^2 - x^2$、$a^2 + x^2$、$x^2 - a^2$）
2. 查表選對應的三角代換
3. 計算 $\dd{x}$ 和根號的化簡結果
4. 代入積分，消掉根號
5. 對新的三角函數積分
6. 換回原變數 $x$（畫直角三角形輔助）

**最容易卡的一步**是第 6 步。建議每次做完代換後，馬上在旁邊畫個直角三角形標出 $\sin\theta = x/a$ 或 $\tan\theta = x/a$ 的關係，這樣最後換回來時就不需要從頭推。

三角代換是一個「先把問題變難，再讓它好算」的技巧——中間的三角積分雖然繁，但路徑清楚，而且最終能算出來。學會之後會發現，很多看起來完全不可能的積分，都能用這個方法打開。
