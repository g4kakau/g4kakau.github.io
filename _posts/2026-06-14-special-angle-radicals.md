---
layout: post
title: "特殊角三角函數的根式表達：為什麼 15°、18°、36° 都能用根式寫出來？"
date: 2026-06-14 12:45:00 +0800
categories: [高中數學, 三角函數]
tags: [三角函數, 特殊角, 根式, 黃金比例, 尺規作圖, 高中數學進階]
math: true
description: "cos30°=√3/2 大家都背得出來，但 cos15°、cos18°、cos36° 也都能寫成根式嗎？本文用複合角與倍角公式推導這些特殊角的根式表達，並說明哪些角度可以、哪些角度（如 cos20°）不可以，引出尺規作圖可作性的伏筆。"
---

$$\require{physics}$$

$\cos30^\circ=\dfrac{\sqrt3}{2}$、$\sin45^\circ=\dfrac{\sqrt2}{2}$，這些是課本表格裡的「標準答案」。但如果問題換成

$$
\cos15^\circ=?\qquad \cos36^\circ=?\qquad \cos18^\circ=?
$$

這些角度不在課本的「特殊角表」裡，但答案依然是**乾淨的根式**。這篇文章要做兩件事：第一，示範怎麼推導出這些根式；第二，告訴你一個出乎意料的事實——並不是所有角度都辦得到，例如 $\cos20^\circ$ 就**沒有**這種表達式，而這背後藏著一整套深刻的理論。

---

## 一、用複合角公式：15° 與 75°

$15^\circ=45^\circ-30^\circ$，兩個角都是課本特殊角，直接套差角公式：

$$
\cos15^\circ=\cos(45^\circ-30^\circ)=\cos45^\circ\cos30^\circ+\sin45^\circ\sin30^\circ
$$

$$
=\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2}+\frac{\sqrt2}{2}\cdot\frac12=\frac{\sqrt6+\sqrt2}{4}
$$

同理，$75^\circ=45^\circ+30^\circ$：

$$
\cos75^\circ=\cos45^\circ\cos30^\circ-\sin45^\circ\sin30^\circ=\frac{\sqrt6-\sqrt2}{4}
$$

注意 $75^\circ=90^\circ-15^\circ$，所以 $\cos75^\circ=\sin15^\circ$——這也是一個檢查答案的好方法。

這一類角度（已知特殊角的和、差、一半）都可以直接用**和差角公式**或**半角公式**處理，是最容易上手的情況。

---

## 二、用倍角公式：36° 與 18°（黃金比例）

$36^\circ$ 和 $18^\circ$ 沒辦法寫成課本特殊角的簡單加減，但有一個經典技巧：利用

$$
5\times36^\circ=180^\circ
$$

設 $\theta=36^\circ$，則 $2\theta=180^\circ-3\theta$，兩邊取 $\cos$：

$$
\cos2\theta=\cos(180^\circ-3\theta)=-\cos3\theta
$$

代入二倍角與三倍角公式

$$
\cos2\theta=2\cos^2\theta-1,\qquad \cos3\theta=4\cos^3\theta-3\cos\theta
$$

得到：

$$
2\cos^2\theta-1=-(4\cos^3\theta-3\cos\theta)
$$

整理成一個關於 $x=\cos\theta$ 的三次方程：

$$
4x^3+2x^2-3x-1=0
$$

直接代入 $x=-1$ 會發現它是一個根（對應 $\theta=180^\circ$ 這個「假解」），所以可以因式分解：

$$
4x^3+2x^2-3x-1=(x+1)(4x^2-2x-1)
$$

因為 $\cos36^\circ\neq-1$，真正有用的是

$$
4x^2-2x-1=0
$$

用公式解：

$$
x=\frac{2\pm\sqrt{4+16}}{8}=\frac{1\pm\sqrt5}{4}
$$

由於 $\cos36^\circ>0$，取正根：

$$
\boxed{\cos36^\circ=\frac{1+\sqrt5}{4}}
$$

等一下——這裡要小心係數。代回驗證：$\dfrac{1+\sqrt5}{4}\approx\dfrac{1+2.236}{4}\approx0.809$，而 $\cos36^\circ\approx0.809$，**數值對得上**。讀者可能注意到 $\dfrac{1+\sqrt5}{2}\approx1.618$ 正是**黃金比例 $\varphi$**，所以這個結果也常寫成

$$
\cos36^\circ=\frac{\varphi}{2},\qquad \varphi=\frac{1+\sqrt5}{2}
$$

這不是巧合：正五邊形的對角線與邊長之比就是 $\varphi$，而 $36^\circ$ 正是正十邊形的中心角一半、與正五邊形的幾何密不可分。

### 接著求 18°

利用 $18^\circ=72^\circ-54^\circ$ 不好處理，但有更快的路：

$$
\sin18^\circ=\cos72^\circ=2\cos^2 36^\circ-1
$$

代入 $\cos36^\circ=\dfrac{1+\sqrt5}{4}$：

$$
\sin18^\circ=2\left(\frac{1+\sqrt5}{4}\right)^2-1=2\cdot\frac{6+2\sqrt5}{16}-1=\frac{6+2\sqrt5}{8}-1=\frac{\sqrt5-1}{4}
$$

再用 $\cos^2\theta=1-\sin^2\theta$：

$$
\cos^2 18^\circ=1-\left(\frac{\sqrt5-1}{4}\right)^2=1-\frac{6-2\sqrt5}{16}=\frac{10+2\sqrt5}{16}
$$

$$
\boxed{\cos18^\circ=\frac{\sqrt{10+2\sqrt5}}{4}}
$$

這種「巢狀根式」（根號裡面還有根號）正是這類問題的典型特徵。

---

## 三、整理表：常見特殊角的根式表達

| 角度       | $\cos\theta$                                     | 備註                                |
| ---------- | ------------------------------------------------ | ----------------------------------- |
| $15^\circ$ | $\dfrac{\sqrt6+\sqrt2}{4}$                       | $45^\circ-30^\circ$                 |
| $18^\circ$ | $\dfrac{\sqrt{10+2\sqrt5}}{4}$                   | 黃金比例、巢狀根式                  |
| $30^\circ$ | $\dfrac{\sqrt3}{2}$                              | 課本特殊角                          |
| $36^\circ$ | $\dfrac{1+\sqrt5}{4}$（即 $\dfrac{\varphi}{2}$） | 黃金比例 $\varphi$                  |
| $45^\circ$ | $\dfrac{\sqrt2}{2}$                              | 課本特殊角                          |
| $54^\circ$ | $\dfrac{\sqrt{10+2\sqrt5}}{4}$                   | $=\sin36^\circ$，與 $18^\circ$ 互餘 |
| $60^\circ$ | $\dfrac12$                                       | 課本特殊角                          |
| $72^\circ$ | $\dfrac{\sqrt5-1}{4}$                            | $=\sin18^\circ$                     |
| $75^\circ$ | $\dfrac{\sqrt6-\sqrt2}{4}$                       | $45^\circ+30^\circ$                 |

觀察這張表，會發現一個規律：**所有 $3^\circ$ 的整數倍角度**（$15^\circ=5\times3^\circ$、$18^\circ=6\times3^\circ$、$36^\circ=12\times3^\circ$ 都是）似乎都逃不掉根式表達。這不是巧合。

---

## 四、哪些角度可以？哪些不可以？

### 可以的角度：3° 的整數倍

有一個一般性的判別法則（Gauss–Wantzel 定理）：

$$
\theta=\frac{180^\circ}{n}
$$

的 $\cos\theta$ 能寫成**純實數的巢狀根式**，若且唯若

$$
n=2^k\times(\text{互不相同的「費馬質數」之積})
$$

費馬質數目前已知的只有 $3,5,17,257,65537$ 五個。

關鍵結果是：$60=2^2\times3\times5$，其中 $3,5$ 都是費馬質數，所以 $\dfrac{180^\circ}{60}=3^\circ$ 可以寫成根式。而「可表達的角度」對加減法封閉，所以**所有 $3^\circ$ 的整數倍**——$3^\circ,6^\circ,9^\circ,\ldots,87^\circ$——都可以寫成（可能很複雜的）巢狀根式。這就解釋了為什麼 $15^\circ,18^\circ,36^\circ,72^\circ$（都是 $3^\circ$ 的倍數）都「剛好」有漂亮的表達式。

### 不可以的角度：casus irreducibilis

那 $\cos20^\circ$ 呢？$20^\circ$ 不是 $3^\circ$ 的整數倍。用三倍角公式：

$$
\cos60^\circ=4\cos^3 20^\circ-3\cos20^\circ=\frac12
$$

也就是說 $x=\cos20^\circ$ 滿足

$$
8x^3-6x-1=0
$$

這個三次方程在有理數範圍內**不可約**（無法分解成更簡單的因式），而且三個根都是實數（分別對應 $\cos20^\circ,\cos140^\circ,\cos260^\circ$）。這種「根都是實數，但解公式裡必然出現複數」的情況，數學上稱為 **casus irreducibilis（不可約情形）**：理論上的解公式（卡丹公式）存在，但公式裡會出現立方根下的複數，無法化簡成純實數的巢狀根式。

直觀理解：表中那些角度的推導，本質上都只用到**平方根**（解二次方程）。而 $\cos20^\circ$ 必須解一個**真正的三次方程**——這對應到「將 $60^\circ$ 三等分成 $20^\circ$」，而角度三等分正是古希臘三大幾何難題之一，一般情況下無法用尺規完成。$3^\circ$ 的倍數之所以特殊，正是因為它們從來不需要「三等分」這一步。

---

## 小結

| 問題                                                    | 答案                                                                                         |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| $15^\circ,75^\circ$                                     | 用 $45^\circ\pm30^\circ$ 和差角公式，直接得到 $\dfrac{\sqrt6\pm\sqrt2}{4}$                   |
| $36^\circ,18^\circ,72^\circ,54^\circ$                   | 用 $5\theta=180^\circ$ 的技巧化為二次方程，答案與黃金比例 $\varphi=\dfrac{1+\sqrt5}{2}$ 相關 |
| $3^\circ$ 的所有整數倍                                  | 理論上都可以寫成（可能很複雜的）純實數巢狀根式                                               |
| $20^\circ,40^\circ,80^\circ\ldots$（非 $3^\circ$ 倍數） | 對應不可約三次方程，**沒有**純實數根式表達——casus irreducibilis                              |

為什麼「能不能解二次方程」會決定一個角度有沒有根式解？為什麼三等分角一般不可能、但正十七邊形卻可以用尺規作圖？這些問題的答案，要靠**伽羅瓦理論（Galois theory）**——[下一篇](/posts/constructibility-gauss-wantzel/)會從「尺規作圖可作性」出發，正式介紹這套把代數方程與群的對稱性連結起來的理論。
