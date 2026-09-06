---
layout: post
title: "泰勒展開：為什麼任何函數都可以用多項式近似？"
date: 2026-05-11 22:17:45 +0800
categories: [大學數學, 微積分]
tags: [泰勒展開, 泰勒級數, 馬克勞林級數, 冪級數, 大學微積分]
math: true
description: "從「在一點接觸」的直覺出發，推導泰勒展開的係數公式，並整理 e^x、sin x、cos x 等常見馬克勞林級數。大學微積分必讀。"
---

多項式是最好算的函數：加法、乘法、微分、積分，全部都可以用代數完成。

所以數學家很早就問了一個問題：**能不能把複雜的函數（像 $e^x$、$\sin x$）也「寫成」多項式？**

泰勒展開的答案是：可以——只要你允許多項式有無窮多項。

---

## 一、先從直覺出發

考慮最簡單的情況：用一個多項式 $P(x)$ 去近似某個函數 $f(x)$，而且我們要在 $x=a$ 這個點附近讓它「接觸得最好」。

「接觸得好」是什麼意思？至少要：

- $P(a) = f(a)$（函數值相等）
- $P'(a) = f'(a)$（斜率相等）
- $P''(a) = f''(a)$（彎曲程度相等）
- $P'''(a) = f'''(a)$（更高階的變化也相等）
- ……

**強迫多項式的每一階導數都等於 $f$ 在 $a$ 點的對應導數**，就能讓它在 $a$ 附近逼近得越來越好。

---

## 二、推導係數

設 $f(x)$ 在 $x=a$ 附近有冪級數表示：

$$f(x) = \sum_{n=0}^{\infty} c_n(x-a)^n = c_0 + c_1(x-a) + c_2(x-a)^2 + c_3(x-a)^3 + \cdots$$

把 $x=a$ 代入，所有含 $(x-a)$ 的項都消失：

$$f(a) = c_0$$

對 $f(x)$ 微分一次，再代 $x=a$：

$$f'(x) = c_1 + 2c_2(x-a) + 3c_3(x-a)^2 + \cdots \implies f'(a) = c_1$$

微分兩次，代 $x=a$：

$$f''(x) = 2c_2 + 6c_3(x-a) + 12c_4(x-a)^2 + \cdots \implies f''(a) = 2c_2$$

微分三次：

$$f'''(x) = 6c_3 + \cdots \implies f'''(a) = 6c_3$$

觀察到規律：

$$c_n = \frac{f^{(n)}(a)}{n!}$$

其中 $f^{(n)}(a)$ 是 $f$ 在 $a$ 點的第 $n$ 階導數，$n! = 1 \times 2 \times 3 \times \cdots \times n$（$0! = 1$）。

---

## 三、泰勒級數定義

將係數公式代回冪級數，得到：

$$\boxed{f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n = f(a) + \frac{f'(a)}{1!}(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + \cdots}$$

這就是函數 $f$ 在點 $a$ 的**泰勒級數**（Taylor series）。

**特別情況**：若展開點取 $a = 0$，稱為**馬克勞林級數**（Maclaurin series）：

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}x^n = f(0) + \frac{f'(0)}{1!}x + \frac{f''(0)}{2!}x^2 + \cdots$$

---

## 四、具體計算：$e^x$ 的展開

$e^x$ 的每一階導數都是它自己：$\left(e^x\right)^{(n)} = e^x$。

所以在 $a=0$ 代入：$f^{(n)}(0) = e^0 = 1$。

因此：

$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots$$

這個級數對所有實數 $x$ 都收斂。

驗證：取 $x=1$，得到 $e \approx 1 + 1 + \frac{1}{2} + \frac{1}{6} + \frac{1}{24} + \frac{1}{120} + \cdots \approx 2.71828\ldots$ ✓

---

## 視覺化：親眼看收斂

拖動滑桿，觀察增加項數如何讓近似曲線越來越貼近原函數。切換函數可比較不同展開的收斂速度。

<div style="border:1px solid #ddd;border-radius:8px;padding:1rem 1rem 0.75rem;margin:1.5rem 0;background:#fafafa;">
<div style="display:flex;gap:1.5rem;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;">
  <span style="font-size:0.9rem;color:#555;font-weight:600;">函數：</span>
  <label style="cursor:pointer;font-size:0.9rem;user-select:none;"><input type="radio" name="tf-func" value="0" checked> sin <em>x</em></label>
  <label style="cursor:pointer;font-size:0.9rem;user-select:none;"><input type="radio" name="tf-func" value="1"> cos <em>x</em></label>
  <label style="cursor:pointer;font-size:0.9rem;user-select:none;"><input type="radio" name="tf-func" value="2"> e<sup>x</sup></label>
</div>
<div id="taylor-viz" style="line-height:0;"></div>
<div style="display:flex;align-items:center;gap:0.75rem;margin-top:0.6rem;">
  <span style="font-size:0.85rem;color:#555;white-space:nowrap;">項數 <em>n</em> =</span>
  <input type="range" id="tf-n" min="1" max="10" value="1" style="flex:1;">
  <span id="tf-n-val" style="font-size:0.95rem;font-weight:700;min-width:1.5rem;text-align:right;">1</span>
</div>
</div>

<script defer src="/assets/js/posts/taylor-viz.js"></script>

---

## 五、常用馬克勞林級數速查

以下是考試和計算中最常用的幾個，建議背熟：

| 函數 | 馬克勞林級數 | 收斂範圍 |
|---|---|---|
| $\dfrac{1}{1-x}$ | $\displaystyle\sum_{n=0}^{\infty} x^n = 1 + x + x^2 + x^3 + \cdots$ | $\|x\| < 1$ |
| $\dfrac{1}{1+x}$ | $\displaystyle\sum_{n=0}^{\infty} (-1)^n x^n = 1 - x + x^2 - x^3 + \cdots$ | $\|x\| < 1$ |
| $e^x$ | $\displaystyle\sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$ | $x \in \mathbb{R}$ |
| $\sin x$ | $\displaystyle\sum_{n=0}^{\infty} (-1)^n \frac{x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$ | $x \in \mathbb{R}$ |
| $\cos x$ | $\displaystyle\sum_{n=0}^{\infty} (-1)^n \frac{x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$ | $x \in \mathbb{R}$ |

---

## 六、兩個常見應用

### 6.1 計算極限

當 $x \to 0$ 時，$\sin x \approx x - \dfrac{x^3}{6}$，所以：

$$\lim_{x \to 0} \frac{\sin x - x}{x^3} = \lim_{x \to 0} \frac{\left(x - \frac{x^3}{6} + \cdots\right) - x}{x^3} = \lim_{x \to 0} \frac{-\frac{x^3}{6} + \cdots}{x^3} = -\frac{1}{6}$$

比 L'Hôpital 法則算三次導數快得多。

### 6.2 計算難積分

$\int e^{-x^2}\, dx$ 沒有初等形式，但可以展開再逐項積分：

$$e^{-x^2} = \sum_{n=0}^{\infty} \frac{(-x^2)^n}{n!} = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{n!}$$

$$\int_0^t e^{-x^2}\, dx = \sum_{n=0}^{\infty} \frac{(-1)^n}{n!} \cdot \frac{t^{2n+1}}{2n+1}$$

這是數值積分和機率統計（常態分布）的基礎。

---

## 七、一個重要注意事項：展開不一定等於函數本身

泰勒級數**存在**和**等於原函數**是兩件事。

技術上，如果拉格朗日餘項（Lagrange remainder）$R_n(x) \to 0$，泰勒級數才真的收斂到 $f(x)$。對 $e^x$、$\sin x$、$\cos x$ 這些分析函數（analytic functions）這是成立的；但存在一些病態函數，泰勒級數存在但完全不等於原函數。

入門階段不必深究，但心裡要有這個概念：**可微分不等於可以泰勒展開**。

---

## 總結

| 概念 | 要記什麼 |
|---|---|
| 泰勒係數 | $c_n = f^{(n)}(a)/n!$ |
| 泰勒級數 | $\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$ |
| 馬克勞林 | 展開點取 $a=0$ 的特例 |
| 核心應用 | 近似計算、極限、難積分 |

這個架構是大學微積分第二學期最核心的內容之一。學會之後，後續的 Fourier 分析、數值方法、物理中的小角近似，全部都會用到。
