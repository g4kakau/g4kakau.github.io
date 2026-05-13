---
layout: post
title: "雙曲函數：sinh 和 cosh 是什麼？"
date: 2026-05-12 04:25:38 +0800
categories: [大學數學, 微積分]
tags: [雙曲函數, sinh, cosh, 積分技巧, 懸鏈線]
math: true
description: "sinh 和 cosh 從哪裡來？它們和三角函數的關係、恆等式、導函數，以及為何在積分和物理裡反覆出現。"
---

$$\require{physics}$$

第一次看到 $\sinh{x}$ 和 $\cosh{x}$，大多數人的反應是：這是什麼？跟 $\sin{x}$、$\cos{x}$ 長得像，但前面為什麼多了一個「h」？

這篇從幾何動機出發，說清楚雙曲函數是什麼、它們的性質，以及為什麼在微積分和物理裡到處出現。

---

## 一、從單位圓到單位雙曲線

三角函數從單位圓定義：

$$
x^2 + y^2 = 1, \qquad x = \cos\theta,\quad y = \sin\theta
$$

參數 $\theta$ 在幾何上是「角度」，但也可以理解為**面積**：$\theta$ 等於圓心角 $\theta$ 圍住的扇形面積的兩倍（$A = \theta/2$，$\theta = 2A$）。

雙曲函數做同樣的事，但換成**單位雙曲線**：

$$
x^2 - y^2 = 1, \qquad x = \cosh t,\quad y = \sinh t
$$

參數 $t$ 同樣有面積意義：它是從原點到雙曲線上的點圍住的雙曲扇形面積的兩倍。

這就是為什麼名字長這樣：**hyperbolic sine / cosine**，雙曲正弦／餘弦，縮寫時在 sin/cos 後加 h。

---

## 二、用指數函數定義

雙曲函數最常用的定義是：

$$
\sinh{x} = \frac{e^x - e^{-x}}{2}
\qquad
\cosh{x} = \frac{e^x + e^{-x}}{2}
$$

其他雙曲函數由此衍生：

$$
\tanh x = \frac{\sinh{x}}{\cosh{x}} = \frac{e^x - e^{-x}}{e^x + e^{-x}}
$$

$$
\operatorname{sech} x = \frac{1}{\cosh{x}} = \frac{2}{e^x + e^{-x}}
$$

$$
\operatorname{csch} x = \frac{1}{\sinh{x}} = \frac{2}{e^x - e^{-x}} \quad (x \neq 0)
$$

$$
\coth x = \frac{\cosh{x}}{\sinh{x}} = \frac{e^x + e^{-x}}{e^x - e^{-x}} \quad (x \neq 0)
$$

注意：$\cosh{x}$ 是偶函數（$e^x + e^{-x}$ 的平均），$\sinh{x}$ 是奇函數（$e^x - e^{-x}$ 的平均）。

---

## 三、基本恆等式

雙曲函數最重要的恆等式是：

$$
\cosh^2 x - \sinh^2 x = 1
$$

**驗證**：代入定義

$$
\cosh^2 x - \sinh^2 x
= \left(\frac{e^x + e^{-x}}{2}\right)^2 - \left(\frac{e^x - e^{-x}}{2}\right)^2
= \frac{(e^x + e^{-x})^2 - (e^x - e^{-x})^2}{4}
$$

展開分子：$(e^{2x} + 2 + e^{-2x}) - (e^{2x} - 2 + e^{-2x}) = 4$。所以結果等於 $4/4 = 1$。✓

這個恆等式和三角的 $\cos^2\theta + \sin^2\theta = 1$ 相似，差別只在符號。

其他常用恆等式：

| 三角函數                            | 雙曲函數                              |
| ----------------------------------- | ------------------------------------- |
| $\cos^2 x + \sin^2 x = 1$           | $\cosh^2 x - \sinh^2 x = 1$           |
| $\sin 2x = 2\sin{x}\cos{x}$         | $\sinh 2x = 2\sinh{x}\cosh{x}$        |
| $\cos 2x = \cos^2 x - \sin^2 x$     | $\cosh 2x = \cosh^2 x + \sinh^2 x$    |
| $\cos^2 x = \dfrac{1 + \cos 2x}{2}$ | $\cosh^2 x = \dfrac{\cosh 2x + 1}{2}$ |
| $\sin^2 x = \dfrac{1 - \cos 2x}{2}$ | $\sinh^2 x = \dfrac{\cosh 2x - 1}{2}$ |

規律：把三角恆等式裡的 $\sin^2$ 換成 $-\sinh^2$（或等價地把 $-1$ 換成 $+1$），大致就能得到雙曲版本。這個規律有更深的來源——見下文的複數關係。

---

## 四、導函數

$$
\dv{x} \sinh{x} = \cosh{x} 
$$

$$
\dv{x} \cosh{x} = \sinh{x}
$$

**驗證**：

$$
\dv{x}\frac{e^x - e^{-x}}{2} = \frac{e^x + e^{-x}}{2} = \cosh{x}
$$

注意和三角函數的差異：$(\sin{x})' = \cos{x}$，$(\cos{x})' = -\sin{x}$（有負號）；但雙曲函數的鏈就**沒有負號**：$(\cosh{x})' = \sinh{x}$（不是 $-\sinh{x}$）。

$$
\dv{x} \tanh{x} = \sech^2 x = 1 - \tanh^2 x
$$

---

## 五、反雙曲函數

反雙曲函數可以用對數表示，這是雙曲函數和三角函數很不同的一點（反三角函數無法用對數表示）：

$$
\sinh^{-1} x = \operatorname{arsinh}\, x = \ln\!\left(x + \sqrt{x^2 + 1}\right)
$$

$$
\cosh^{-1} x = \operatorname{arcosh}\, x = \ln\!\left(x + \sqrt{x^2 - 1}\right), \quad x \geq 1
$$

$$
\tanh^{-1} x = \operatorname{artanh}\, x = \frac{1}{2}\ln\frac{1+x}{1-x}, \quad \lvert x\rvert < 1
$$

**推導**（以 arsinh 為例）：設 $y = \sinh{x} = \dfrac{e^x - e^{-x}}{2}$，令 $u = e^x$，則

$$
y = \frac{u - 1/u}{2} \implies u^2 - 2yu - 1 = 0 \implies u = y + \sqrt{y^2 + 1}
$$

（取正根，因為 $u = e^x > 0$）所以 $x = \ln(y + \sqrt{y^2+1})$。

這些反雙曲函數在積分中很常出現，例如：

$$
\int \frac{\dd{x}}{\sqrt{x^2 + a^2}} = \sinh^{-1}\!\frac{x}{a} + C = \ln\!\left(x + \sqrt{x^2 + a^2}\right) + C
$$

---

## 六、與三角函數的關係：複數

如果你學過複數，可以直接看到兩者的關係。歐拉公式：

$$
e^{i\theta} = \cos\theta + i\sin\theta
$$

代入 $i\theta$（用虛數角度）：

$$
\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2},\quad \sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}
$$

對比雙曲函數定義：

$$
\cosh{x} = \frac{e^{x} + e^{-x}}{2},\quad \sinh{x} = \frac{e^{x} - e^{-x}}{2}
$$

只是把 $i\theta$ 換成 $x$（實數）。更精確地說：

$$
\cosh(ix) = \cos{x}, \qquad \sinh(ix) = i\sin{x}
$$

或反過來：

$$
\cos(ix) = \cosh{x}, \qquad \sin(ix) = i\sinh{x}
$$

這就是為什麼雙曲恆等式和三角恆等式長得很像：它們是同一個複數關係在不同情況下的表現。符號上的差異（$+$ 和 $-$）都來自 $i^2 = -1$。

---

## 七、在哪裡會遇到雙曲函數

**1. 懸鏈線（catenary）**

一條均勻繩子兩端固定自然下垂，形狀是：

$$
y = a\cosh\frac{x}{a}
$$

這是高中物理「繩子下垂」直觀的精確數學形式。$\cosh$ 的圖形就是懸鏈曲線。

**2. 積分代換（雙曲代換）**

三角代換消掉 $\sqrt{a^2 - x^2}$ 型根號；雙曲代換消掉 $\sqrt{a^2 + x^2}$ 和 $\sqrt{x^2 - a^2}$：

|      根號形式      | 雙曲代換       |       恆等式消掉根號        |
| :----------------: | -------------- | :-------------------------: |
| $\sqrt{x^2 + a^2}$ | $x = a\sinh t$ | $\cosh^2 t - \sinh^2 t = 1$ |
| $\sqrt{x^2 - a^2}$ | $x = a\cosh t$ | $\cosh^2 t - \sinh^2 t = 1$ |

**3. 微分方程**

很多物理問題（波動、熱傳導）的解含有 $\cosh$ 和 $\sinh$，就像一般振盪含有 $\cos$ 和 $\sin$。

**4. 相對論與量子力學**

Lorentz boost 用的是雙曲角（rapidity）：$\cosh\phi = \gamma$，$\sinh\phi = \beta\gamma$。

---

## 八、三角 vs. 雙曲：快速對照

|                 |                    三角函數                    |                            雙曲函數                            |
| --------------- | :--------------------------------------------: | :------------------------------------------------------------: |
| 曲線            |             單位圓 $x^2 + y^2 = 1$             |                   單位雙曲線 $x^2 - y^2 = 1$                   |
| 定義            |                  角度（幾何）                  |                          指數（代數）                          |
| 基本恆等式      |             $\cos^2 + \sin^2 = 1$              |                    $\cosh^2 - \sinh^2 = 1$                     |
| $(\cdot)'$ 的鏈 | $\sin \to \cos \to -\sin \to -\cos \to \cdots$ |           $\sinh \leftrightarrow \cosh$（正號循環）            |
| 週期性          |                  $2\pi$ 週期                   |      無週期（有界嗎？$\cosh{x} \geq 1$，$\sinh{x}$ 無界）      |
| 反函數          |       $\arcsin, \arctan$（無 log 表示）        | $\operatorname{arsinh}, \operatorname{arcosh}$（可用 ln 表示） |

---

雙曲函數不是憑空製造的新東西——它們是 $e^x$ 的偶數部分和奇數部分，是對稱與反對稱的分解。一旦接受這個角度，一切性質都變得自然。

<div class="cta-box">
  <strong>還有問題嗎？</strong><br>
  <a href="/contact">→ 歡迎預約家教課，直接針對你的問題討論</a>
</div>
