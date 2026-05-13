---
layout: post
title: "分部積分法：乘法法則的積分版本"
date: 2026-05-12 04:24:44 +0800
categories: [大學數學, 微積分]
tags: [積分技巧, 分部積分, 大學微積分, LIATE]
math: true
description: "分部積分法是微分乘法法則的積分對應。理解它的來源，掌握 LIATE 選法，再看循環積分這個特別的情形。"
---

$$\require{physics}$$

分部積分法是微積分課最常用的積分技巧之一。它的公式看起來很抽象，但其實只是微分的**乘法法則**反過來寫。

---

## 一、來源：乘法法則反過來

設 $u = f(x)$，$v = g(x)$，兩者都可微。微分的乘法法則是：

$$
\dv{x}[uv] = u'v + uv'
$$

兩邊積分：

$$
uv = \int u'v \,\dd{x} + \int uv' \,\dd{x}
$$

整理一下：

$$
\boxed{\int u \,\dd{v} = uv - \int v \,\dd{u}}
$$

其中 $\dd{u} = u'\,\dd{x}$，$\dd{v} = v'\,\dd{x}$。

這就是**分部積分公式**。它把「難積的 $\int u\,\dd{v}$」轉換成「（希望）比較好積的 $\int v\,\dd{u}$」。

---

## 二、如何選 $u$：LIATE 原則

分部積分最關鍵的一步是**選誰當 $u$**。一般用 **LIATE** 記憶順序，愈靠前的優先選為 $u$：

| 順序  | 類型                       | 例子                     |
| :---: | -------------------------- | ------------------------ |
|   L   | 對數函數（Logarithm）      | $\ln x$，$\log_a x$      |
|   I   | 反三角函數（Inverse trig） | $\arctan x$，$\arcsin x$ |
|   A   | 代數函數（Algebraic）      | $x^n$，多項式            |
|   T   | 三角函數（Trigonometric）  | $\sin x$，$\cos x$       |
|   E   | 指數函數（Exponential）    | $e^x$，$a^x$             |

**直觀**：$u$ 選微分之後「變簡單」的，$\dd{v}$ 選積分之後「不爆炸」的。

---

## 三、例題

### 例題 1：$\displaystyle\int x e^x \,\dd{x}$

LIATE：代數 A 優先於指數 E，選 $u = x$。

$$
u = x,\quad \dd{v} = e^x\,\dd{x}
\implies
\dd{u} = \dd{x},\quad v = e^x
$$

$$
\int x e^x \,\dd{x} = x e^x - \int e^x \,\dd{x} = x e^x - e^x + C = e^x(x-1) + C
$$

### 例題 2：$\displaystyle\int x \sin x \,\dd{x}$

選 $u = x$（代數），$\dd{v} = \sin x\,\dd{x}$。

$$
u = x,\quad \dd{v} = \sin x\,\dd{x}
\implies
\dd{u} = \dd{x},\quad v = -\cos x
$$

$$
\int x \sin x \,\dd{x} = -x\cos x + \int \cos x \,\dd{x} = -x\cos x + \sin x + C
$$

### 例題 3：$\displaystyle\int \ln x \,\dd{x}$

$\ln x$ 沒辦法直接積分——但**分部積分可以處理它**。選 $u = \ln x$（對數，LIATE 第一優先），$\dd{v} = \dd{x}$。

$$
u = \ln x,\quad \dd{v} = \dd{x}
\implies
\dd{u} = \frac{\dd{x}}{x},\quad v = x
$$

$$
\int \ln x \,\dd{x} = x\ln x - \int x \cdot \frac{\dd{x}}{x} = x\ln x - \int \dd{x} = x\ln x - x + C
$$

這個結果值得記起來：$\displaystyle\int \ln x\,\dd{x} = x(\ln x - 1) + C$。

### 例題 4（循環積分）：$\displaystyle\int e^x \sin x \,\dd{x}$

這道題很特別。設 $I = \displaystyle\int e^x \sin x \,\dd{x}$，選 $u = \sin x$，$\dd{v} = e^x\,\dd{x}$：

$$
I = e^x \sin x - \int e^x \cos x \,\dd{x}
$$

對右邊的積分再做一次分部積分，選 $u = \cos x$，$\dd{v} = e^x\,\dd{x}$：

$$
\int e^x \cos x \,\dd{x} = e^x \cos x + \int e^x \sin x \,\dd{x} = e^x \cos x + I
$$

代回原式：

$$
I = e^x \sin x - (e^x \cos x + I) = e^x(\sin x - \cos x) - I
$$

$$
2I = e^x(\sin x - \cos x)
$$

$$
\boxed{\int e^x \sin x \,\dd{x} = \frac{e^x(\sin x - \cos x)}{2} + C}
$$

**關鍵**：$I$ 在兩邊都出現，直接解代數方程就能得到答案。這種「繞一圈回來」的情形稱為**循環積分**，只有在特定函數組合（指數 $\times$ 三角）才會發生。

---

## 四、定積分的分部積分

定積分版本只需對邊界項求值：

$$
\int_a^b u \,\dd{v} = \bigl[uv\bigr]_a^b - \int_a^b v \,\dd{u}
$$

**例題**：計算 $\displaystyle\int_1^e \ln x \,\dd{x}$。

由例題 3 的結果 $\int \ln x\,\dd{x} = x\ln x - x + C$：

$$
\int_1^e \ln x \,\dd{x} = \bigl[x\ln x - x\bigr]_1^e = (e \cdot 1 - e) - (1 \cdot 0 - 1) = 0 + 1 = 1
$$

---

## 五、降次遞迴

分部積分也可以用來建立**遞迴公式**，把 $\int \cos^n x \,\dd{x}$ 化簡成 $\int \cos^{n-2} x \,\dd{x}$，依此類推。

設 $I_n = \int \cos^n x \,\dd{x}$，令 $u = \cos^{n-1} x$，$\dd{v} = \cos x \,\dd{x}$，整理後得到：

$$
I_n = \frac{1}{n}\cos^{n-1} x \sin x + \frac{n-1}{n} I_{n-2}
$$

這個遞迴公式把 $n$ 次降成 $n-2$ 次，最終會歸結到 $\int \dd{x} = x + C$（$n$ 為奇數）或 $\int \cos 0\, x\,\dd{x}$（$n$ 為偶數）。

---

## 六、小結

分部積分的核心邏輯：

1. **來源**：乘法法則的積分版本，$\int u\,\dd{v} = uv - \int v\,\dd{u}$
2. **選法**：LIATE——對數、反三角、代數、三角、指數，靠前的優先選為 $u$
3. **特例**：指數 $\times$ 三角的組合會出現循環積分，透過解方程得到答案
4. **定積分**：只需對 $[uv]$ 代入上下限

分部積分本身是工具，難的是判斷什麼時候該用、$u$ 選誰最合適。多做幾道題，熟悉之後選法會變成直覺。

<div class="cta-box">
  <strong>還有問題嗎？</strong><br>
  <a href="/contact">→ 歡迎預約家教課，直接針對你的問題討論</a>
</div>
