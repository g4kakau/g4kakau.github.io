---
layout: post
title: "積分換元法：把難的積分換成簡單的"
date: 2026-05-15 00:00:00 +0800
categories: [大學數學, 微積分]
tags: [積分技巧, 換元法, 不定積分, 大學微積分]
math: true
description: "換元法是積分最核心的技巧。本文從「連鎖律倒過來用」的直覺出發，說明換元法的定理，介紹第一類（直接換元）與第二類（逆向換元）兩種操作，附多個從基本到進階的例題。"
---

$$\require{physics}$$

你看到這個積分：

$$
\int 2x\,e^{x^2}\dd{x}
$$

直接積行不通，分部積分也沒有明顯著力點。但如果你注意到 $2x$ 正好是 $x^2$ 的導數，就可以令 $u = x^2$，整個積分瞬間變成 $\int e^u \dd{u}$——答案就是 $e^{x^2} + C$。

這就是換元法（substitution）的核心：**把原積分變數換成新變數，讓積分變容易**。

---

## 為什麼換元法可行：連鎖律倒過來

回顧微分的連鎖律：

$$
\frac{\dd{}}{\dd{x}} F(g(x)) = F'(g(x)) \cdot g'(x)
$$

兩邊積分：

$$
F(g(x)) + C = \int F'(g(x)) \cdot g'(x)\dd{x}
$$

令 $u = g(x)$，$\dd{u} = g'(x)\dd{x}$，左邊是 $\int F'(u)\dd{u} = F(u) + C$。

所以：

$$
\boxed{\int f(g(x))\,g'(x)\dd{x} = \int f(u)\dd{u}\bigg|_{u = g(x)}}
$$

換元法就是連鎖律反向使用。

---

## 第一類換元：直接替換（湊微分）

### 操作方式

當被積函數可以寫成 $f(g(x)) \cdot g'(x)$ 的形式，令 $u = g(x)$，把 $g'(x)\dd{x}$ 整個換成 $\dd{u}$，積分就變成簡單的 $\int f(u)\dd{u}$。

**步驟：**

1. 辨識「內層函數」$g(x)$
2. 計算 $\dd{u} = g'(x)\dd{x}$，確認被積函數裡有 $g'(x)$
3. 全部換成 $u$
4. 對 $u$ 積分
5. 換回 $x$

---

### 例題一：$\displaystyle\int 2x\,e^{x^2}\dd{x}$

令 $u = x^2$，$\dd{u} = 2x\dd{x}$：

$$
\int e^u \dd{u} = e^u + C = e^{x^2} + C
$$

---

### 例題二：$\displaystyle\int \frac{x}{1+x^2}\dd{x}$

令 $u = 1 + x^2$，$\dd{u} = 2x\dd{x}$，即 $x\dd{x} = \dfrac{\dd{u}}{2}$：

$$
\int \frac{1}{u} \cdot \frac{\dd{u}}{2} = \frac{1}{2}\ln|u| + C = \frac{1}{2}\ln(1+x^2) + C
$$

（此處 $1 + x^2 > 0$，所以不需要絕對值。）

---

### 例題三：$\displaystyle\int \sin^3 x\cos x\dd{x}$

令 $u = \sin x$，$\dd{u} = \cos x\dd{x}$：

$$
\int u^3\dd{u} = \frac{u^4}{4} + C = \frac{\sin^4 x}{4} + C
$$

---

### 例題四：$\displaystyle\int \frac{\ln x}{x}\dd{x}$

令 $u = \ln x$，$\dd{u} = \dfrac{\dd{x}}{x}$：

$$
\int u\dd{u} = \frac{u^2}{2} + C = \frac{(\ln x)^2}{2} + C
$$

---

## 第二類換元：逆向代入

### 操作方式

當被積函數含有根號或複雜結構，直接湊微分不夠，改用「**令 $x = g(t)$**」，主動把 $x$ 換成新變數 $t$，讓結構變乾淨。

**步驟：**

1. 選定代換 $x = g(t)$（常見：三角代換、根號代換）
2. 計算 $\dd{x} = g'(t)\dd{t}$
3. 把 $x$ 和 $\dd{x}$ 全部換成 $t$
4. 對 $t$ 積分
5. 用 $t = g^{-1}(x)$ 換回 $x$

---

### 例題五：$\displaystyle\int \sqrt{1-x^2}\dd{x}$

令 $x = \sin t$，$\dd{x} = \cos t\dd{t}$，$\sqrt{1-x^2} = \cos t$：

$$
\int \cos^2 t\dd{t} = \int \frac{1+\cos 2t}{2}\dd{t} = \frac{t}{2} + \frac{\sin 2t}{4} + C
$$

換回 $x$：$t = \arcsin x$，$\sin 2t = 2\sin t\cos t = 2x\sqrt{1-x^2}$。

$$
\boxed{\int \sqrt{1-x^2}\dd{x} = \frac{\arcsin x}{2} + \frac{x\sqrt{1-x^2}}{2} + C}
$$

---

### 例題六：$\displaystyle\int \frac{1}{\sqrt{x}(1+x)}\dd{x}$

含有 $\sqrt{x}$，令 $x = t^2$（$t > 0$），$\dd{x} = 2t\dd{t}$：

$$
\int \frac{2t\dd{t}}{t(1+t^2)} = 2\int \frac{\dd{t}}{1+t^2} = 2\arctan t + C = 2\arctan\sqrt{x} + C
$$

---

## 定積分的換元法

對定積分使用換元法時，**積分上下限也要換成新變數的值**，不必換回原變數。

$$
\int_a^b f(g(x))\,g'(x)\dd{x} = \int_{g(a)}^{g(b)} f(u)\dd{u}
$$

### 例題七：$\displaystyle\int_0^1 \frac{x}{\sqrt{1+x^2}}\dd{x}$

令 $u = 1 + x^2$，$\dd{u} = 2x\dd{x}$。

換上下限：$x = 0 \Rightarrow u = 1$，$x = 1 \Rightarrow u = 2$。

$$
\int_1^2 \frac{\dd{u}}{2\sqrt{u}} = \frac{1}{2} \cdot 2\sqrt{u}\Big|_1^2 = \sqrt{2} - 1
$$

---

## 換元成功的條件

換元不是每次都有效。幾個判斷要點：

| 情況 | 對應換元 |
|---|---|
| 被積式含 $f(ax+b)$ | 令 $u = ax+b$ |
| 被積式含 $f(x^n) \cdot x^{n-1}$ | 令 $u = x^n$ |
| 被積式含 $f(\ln x) / x$ | 令 $u = \ln x$ |
| 被積式含 $f(e^x) \cdot e^x$ | 令 $u = e^x$ |
| 被積式含 $\sqrt{a^2 - x^2}$ | 令 $x = a\sin t$ |
| 被積式含 $\sqrt{a^2 + x^2}$ | 令 $x = a\tan t$ |
| 被積式含 $\sqrt{x^2 - a^2}$ | 令 $x = a\sec t$ |

辨識「內層函數」和「它的導數是否出現在被積式裡」，是第一類換元的關鍵眼力。

---

## 流程總結

```
看到積分
  ↓
能湊出 f(g(x))·g'(x) 的形式？
  ├─ 是 → 第一類：令 u = g(x)，換成 ∫f(u)du
  └─ 否 → 有根號或反三角結構？
             ├─ 是 → 第二類：令 x = g(t)，整個換新變數
             └─ 否 → 考慮分部積分或其他技巧
```

換元法是微積分積分技巧的地基。三角代換、有理函數積分、分部積分，遇到複雜被積函數時往往第一步都是換元。練熟「看到什麼換什麼」的直覺，積分的大多數問題就會迎刃而解。
