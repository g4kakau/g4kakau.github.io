---
layout: post
title: "積分技巧：部分分式法（把複雜分式拆開再積分）"
date: 2026-05-13 00:00:00 +0800
categories: [大學數學, 微積分]
tags: [積分技巧, 部分分式, 有理函數, 大學微積分]
math: true
description: "有理函數積分的系統解法：部分分式法（partial fractions）。將複雜的有理分式依分母結構拆成四種情況，逐項積分。含完整分解規則、求係數技巧與五道例題。"
---

$$\require{physics}$$

遇到這種積分時，你會怎麼做？

$$\int \frac{3x+5}{(x-1)(x+2)}\,\dd{x}$$

分母是乘積形式，分子次數比分母低。沒有直接可套的公式——但有一個系統解法：**先把它拆開**。

$$\frac{3x+5}{(x-1)(x+2)} = \frac{A}{x-1} + \frac{B}{x+2}$$

如果能求出 $A$、$B$，右邊兩項分別都只需要 $\int \frac{1}{x-c}\,\dd{x} = \ln\lvert x-c\rvert + C$，積分立刻完成。

這就是**部分分式法**（integration by partial fractions）。

---

## 前置：有理函數與真分式

**有理函數**（rational function）是兩個多項式的比值：

$$f(x) = \frac{P(x)}{Q(x)}, \quad Q(x) \neq 0$$

**真分式**的條件是 $\deg P < \deg Q$。只有真分式才能直接做部分分式分解。

若 $\deg P \geq \deg Q$，先做**多項式長除法**，分出整式部分，剩下的餘數再處理。例如：

$$\frac{x^3+1}{x^2-1} = x + \frac{x+1}{x^2-1}$$

分出的 $x$ 直接積分，餘數 $\dfrac{x+1}{x^2-1}$ 再做部分分式。

---

## 四種情況的分解規則

根據分母 $Q(x)$ 的因式結構，分解方式分四類。

### 情況 I：不同的線性因子

$$Q(x) = (x-a_1)(x-a_2)\cdots(x-a_n), \quad a_i \text{ 互不相同}$$

分解為：

$$\frac{P(x)}{Q(x)} = \frac{A_1}{x-a_1} + \frac{A_2}{x-a_2} + \cdots + \frac{A_n}{x-a_n}$$

**求係數的快速方法（掩蓋法）：** 兩邊乘以 $(x-a_k)$ 後令 $x = a_k$，即可直接讀出 $A_k$。

### 情況 II：重複的線性因子

若 $(x-a)^k$ 整除 $Q(x)$（重數為 $k$），對應項展開為 $k$ 個分式：

$$\frac{A_1}{x-a} + \frac{A_2}{(x-a)^2} + \cdots + \frac{A_k}{(x-a)^k}$$

每一項積分時：$\int \dfrac{1}{(x-a)^m}\,\dd{x}$ 對 $m \geq 2$ 給出 $\dfrac{-1}{(m-1)(x-a)^{m-1}}$。

### 情況 III：不重複的不可約二次因子

若 $x^2 + bx + c$（判別式 $b^2 - 4c < 0$，即在實數上不可再分解）是因子，對應項為：

$$\frac{Ax + B}{x^2 + bx + c}$$

分子必須是**一次式**，因為分母是二次，分子只能比分母低一次。積分時：

$$\int \frac{Ax+B}{x^2+bx+c}\,\dd{x} = \frac{A}{2}\ln(x^2+bx+c) + \frac{B - Ab/2}{\sqrt{c - b^2/4}}\arctan\frac{x + b/2}{\sqrt{c-b^2/4}} + C$$

實際操作通常是將分子拆成 $\frac{d}{dx}(x^2+bx+c)$ 的倍數加上餘數，分別積分。

### 情況 IV：重複的不可約二次因子

若 $(x^2+bx+c)^k$ 是因子，對應有 $k$ 項：

$$\frac{A_1 x+B_1}{x^2+bx+c} + \frac{A_2 x+B_2}{(x^2+bx+c)^2} + \cdots + \frac{A_k x+B_k}{(x^2+bx+c)^k}$$

高次項 $\int \frac{Ax+B}{(x^2+bx+c)^m}\,\dd{x}$（$m \geq 2$）通常需要降次遞推，或搭配三角代換。

---

## 例題

### 例題 1（情況 I）

$$\int \frac{3x+5}{(x-1)(x+2)}\,\dd{x}$$

**解：** 設 $\dfrac{3x+5}{(x-1)(x+2)} = \dfrac{A}{x-1} + \dfrac{B}{x+2}$，通分後：

$$3x+5 = A(x+2) + B(x-1)$$

令 $x=1$：$8 = 3A$，得 $A = \dfrac{8}{3}$。

令 $x=-2$：$-1 = -3B$，得 $B = \dfrac{1}{3}$。

$$\int \frac{3x+5}{(x-1)(x+2)}\,\dd{x} = \frac{8}{3}\ln|x-1| + \frac{1}{3}\ln|x+2| + C$$

---

### 例題 2（情況 II）

$$\int \frac{x^2+1}{(x-1)^2(x+2)}\,\dd{x}$$

**解：** 設

$$\frac{x^2+1}{(x-1)^2(x+2)} = \frac{A}{x-1} + \frac{B}{(x-1)^2} + \frac{C}{x+2}$$

令 $x=1$：$\dfrac{2}{3} = B$，得 $B = \dfrac{2}{3}$。

令 $x=-2$：$\dfrac{5}{9} = C$，得 $C = \dfrac{5}{9}$。

比較 $x^2$ 的係數：$1 = A + C$，得 $A = 1 - \dfrac{5}{9} = \dfrac{4}{9}$。

$$\int \frac{x^2+1}{(x-1)^2(x+2)}\,\dd{x} = \frac{4}{9}\ln|x-1| - \frac{2}{3(x-1)} + \frac{5}{9}\ln|x+2| + C$$

---

### 例題 3（情況 III，純二次分母）

$$\int \frac{2x+3}{x^2+4}\,\dd{x}$$

**解：** 分母 $x^2+4$ 已是不可約二次式，分子拆開：

$$\int \frac{2x}{x^2+4}\,\dd{x} + \int \frac{3}{x^2+4}\,\dd{x}$$

第一項：令 $u = x^2+4$，得 $\ln(x^2+4)$。

第二項：$\dfrac{3}{4}\int \dfrac{1}{(x/2)^2+1}\,\dd{x} = \dfrac{3}{2}\arctan\dfrac{x}{2}$。

$$\int \frac{2x+3}{x^2+4}\,\dd{x} = \ln(x^2+4) + \frac{3}{2}\arctan\frac{x}{2} + C$$

---

### 例題 4（情況 III，混合線性與二次因子）

$$\int \frac{2x+3}{(x-1)(x^2+1)}\,\dd{x}$$

**解：** 設

$$\frac{2x+3}{(x-1)(x^2+1)} = \frac{A}{x-1} + \frac{Bx+C}{x^2+1}$$

通分後比較係數：

$$2x+3 = A(x^2+1) + (Bx+C)(x-1)$$

$$\begin{cases} x^2: & A + B = 0 \\ x^1: & -B + C = 2 \\ x^0: & A - C = 3 \end{cases}$$

由 $A + B = 0$ 得 $B = -A$；代入第三式得 $A - C = 3$；加上第二式 $-B+C = 2 \Rightarrow A+C = 2$；兩式相加 $2A = 5$，所以 $A = \dfrac{5}{2}$，$B = -\dfrac{5}{2}$，$C = -\dfrac{1}{2}$。

分別積分：

$$
\begin{aligned}
\int \frac{2x+3}{(x-1)(x^2+1)}\,\dd{x}
&= \frac{5}{2}\ln|x-1| + \int\frac{-\frac{5}{2}x - \frac{1}{2}}{x^2+1}\,\dd{x} \\
&= \frac{5}{2}\ln|x-1| - \frac{5}{4}\ln(x^2+1) - \frac{1}{2}\arctan x + C
\end{aligned}
$$

---

### 例題 5（情況 IV）

$$\int \frac{x^2+2x+1}{(x^2+1)^2}\,\dd{x}$$

**解：** 分子次數（2）小於分母次數（4），直接做部分分式：

$$\frac{x^2+2x+1}{(x^2+1)^2} = \frac{Ax+B}{x^2+1} + \frac{Cx+D}{(x^2+1)^2}$$

比較係數（通分後比較）：

$$x^2+2x+1 = (Ax+B)(x^2+1) + Cx + D$$

- $x^3$：$A = 0$
- $x^2$：$B = 1$
- $x^1$：$A + C = 2 \Rightarrow C = 2$
- $x^0$：$B + D = 1 \Rightarrow D = 0$

因此分解為 $\dfrac{1}{x^2+1} + \dfrac{2x}{(x^2+1)^2}$，分別積分：

$$\int \frac{1}{x^2+1}\,\dd{x} = \arctan x + C_1$$

$$\int \frac{2x}{(x^2+1)^2}\,\dd{x} = -\frac{1}{x^2+1} + C_2$$

$$\int \frac{x^2+2x+1}{(x^2+1)^2}\,\dd{x} = \arctan x - \frac{1}{x^2+1} + C$$

---

## 總結

| 分母型式 | 分解項型式 | 積分工具 |
|---|---|---|
| $(x-a_1)\cdots(x-a_n)$，各異 | $\dfrac{A_k}{x-a_k}$ | $\ln$ |
| $(x-a)^k$ 重複 | $\dfrac{A_j}{(x-a)^j}$，$j=1\ldots k$ | $\ln$ + 負次冪 |
| $x^2+bx+c$ 不可約 | $\dfrac{Ax+B}{x^2+bx+c}$ | $\ln$ + $\arctan$ |
| $(x^2+bx+c)^k$ 重複 | $\dfrac{A_j x+B_j}{(x^2+bx+c)^j}$ | 遞推公式 |

**操作流程：**
1. 確認是真分式（否則先長除法）
2. 將 $Q(x)$ 完全因式分解
3. 按四種情況寫出分解格式
4. 求未知係數（掩蓋法 + 比較係數）
5. 逐項積分
