---
title: "質心運動"
description: "質點系統、質心、質心速度、質心加速度"
date: 2026-01-30 12:00:00 +0800
categories: [Physics]
tags: []
math: true
---

$\require{physics}\require{bbox}$


## 問題設定

> **讀完這一節你會學到什麼？**
>
> * 什麼是「質點系統」與「質心」？
> * 如何計算一維、二維、三維的質心位置？
> * 為什麼「質心的動量 = 系統的總動量」？
> * 為什麼系統的質心運動只跟外力有關？
> {: .prompt-tip }

---

## 核心觀念

### 質點、質點系統與質心

#### 定義：質點

> **質點**（particle）：
> 在討論物體的運動時，若物體的大小、形狀、轉動都可以忽略，
> 就可以把整個物體視為「質量集中在一點」的模型，稱為質點。
{: .prompt-info }

#### 定義：質點系統

> **質點系統**（system of particles）：
> 由多個質點組成的整體，稱為質點系統。
> 系統中的質點之間可能存在作用力（內力），
> 系統也可能受到外界施力（外力）。
{: .prompt-info }

---

### 質心位置

#### 兩個質點、一維

考慮兩個質點：

* 質量：$m_1, m_2$
* 位置（一維）：$x_1, x_2$

定義質心位置 $x_{\text{cm}}$ 為：

$$
\begin{equation}\label{eq:xcm-2par-1d}
x_{\text{cm}} = \frac{m_1 x_1 + m_2 x_2}{m_1 + m_2}
\end{equation}
$$

下標 $\text{cm}$ 代表 <b><u>c</u></b>enter of <b><u>m</u></b>ass（質心）。

👉 **這是一個「加權平均」（weighted average）**，也與數線上分點公式形式雷同。
質量越大，對質心位置的影響越大。

---

#### 兩個質點、向量形式

把位置改寫成向量 $\vb{r}_1, \vb{r}_2$：

$$
\begin{equation}\label{eq:xcm-2par-vector}
\vb{r}_{\text{cm}} = \frac{m_1 \vb{r}_1 + m_2 \vb{r}_2}{m_1 + m_2}
\end{equation}
$$

這一式 **同時適用於一維、二維、三維**。

---

#### $N$ 個質點、向量形式（最一般的定義）

> 假設一系統有 $N$ 個質點。
> 規定：
> 
> * 第 $i$ 個質點的質量為 $m_i$
> * 第 $i$ 個質點的位置向量在 $\vb{r}_i$
> 
> 則系統的質點位置為
> 
> $$
> \begin{equation}\label{eq:xcm}
> \bbox[5px, border: 2px solid grey]{\large
> \vb{r}_{\text{cm}} = \frac{
>  m_1 \vb{r}_1 + m_2 \vb{r}_2 + \cdots + m_N \vb{r}_N}{
>  m_1 + m_2 + \cdots + m_N} 
> }
> \end{equation}
> $$
>
> 其中 $M = m_1 + m_2 + \cdots + m_N$ 等於系統的總質量。
{: .prompt-info }

使用求和符號 $\sum$ 的話[^summation]，可以大幅簡化 \eqref{eq:xcm} 式：
$$
\begin{equation}\label{eq:xcm-summation} \large
\vb{r}_{\text{cm}} = \frac{ \sum^{N}_{i=1}{m_i \vb{r}_i} }{  \sum^{N}_{i=1}{m_i} } 
\end{equation}
$$
或更簡單的寫法（省略質點總數 $N$ 與指標的起點 $i$）：
$$
\begin{equation}\label{eq:xcm-summation-shorthand} 
\bbox[5px, border: 2px solid grey]{\large
\vb{r}_{\text{cm}} = \frac{\sum m_i \vb{r}_i }{ \sum m_i }}
\end{equation}
$$

[^summation]: 若你對 $\sum$ 不熟，可先看[[求和記號]]的補充筆記。

---

#### $N$ 個質點、分量形式

\eqref{eq:xcm} 式表達的是概念。計算時，我們可由各質點的分量來計算質心的分量。

在二維平面上，質心位置的公式是

$$
\vb{r}_{\text{cm}} = (x_{\text{cm}}, y_{\text{cm}})
$$

其中

$$
x_{\text{cm}} = \frac{\sum m_i x_i}{\sum m_i}, \quad
y_{\text{cm}} = \frac{\sum m_i y_i}{\sum m_i}
$$

在三維平面中，質心位置的公式是

$$
\vb{r}_{\text{cm}} = (x_{\text{cm}}, y_{\text{cm}}, z_{\text{cm}})
$$

其中

$$
x_{\text{cm}} = \frac{\sum m_i x_i}{\sum m_i}, \quad
y_{\text{cm}} = \frac{\sum m_i y_i}{\sum m_i}, \quad
z_{\text{cm}} = \frac{\sum m_i z_i}{\sum m_i}
$$

👉 所以說，計算時，永遠是**分量各算各的**，不要把向量符號嚇到了。

---

### 質心速度

既然系統中的各質點隨著時間運動，質心當然也會運動。所以我們來定義質心速度 $\vb{v}_{\text{cm}}$。

由質心位置 $\vb{r}_{\text{cm}}$ 對時間 $t$ 微分：

$$
\vb{v}_{\text{cm}} = \lim_{\Delta t \to 0}{\frac{\Delta\vb{r}_{\text{cm}}}{\Delta t}}
= \dv{\vb{r}_{\text{cm}}}{t}
$$

代入質心位置的定義 \eqref{eq:xcm}：

$$
\begin{split} 
\vb{v}_{\text{cm}} 
&= \lim_{\Delta t \to 0}{\left(\frac{1}{\Delta t} 
  \frac{m_1 \Delta\vb{r}_1 + m_2 \Delta\vb{r}_2 + \cdots + m_N \Delta\vb{r}_N}{
  m_1 + m_2 + \cdots + m_N}\right)} \\
&= \lim_{\Delta t \to 0}{\left(\frac{1}{\Delta t} 
  \frac{m_1 \Delta\vb{r}_1 + m_2 \Delta\vb{r}_2 + \cdots + m_N \Delta\vb{r}_N}{M}\right)} \\
&= \frac{1}{M}\lim_{\Delta t \to 0}{ 
  \frac{m_1 \Delta\vb{r}_1 + m_2 \Delta\vb{r}_2 + \cdots + m_N \Delta\vb{r}_N}{\Delta t}} \\ 
&= \frac{1}{M}\lim_{\Delta t \to 0}{\left(
  m_1 \frac{\Delta\vb{r}_1}{\Delta t} + m_2 \frac{\Delta\vb{r}_2}{\Delta t} + \cdots 
  + m_N \frac{\Delta\vb{r}_N}{\Delta t} \right)} \\
& = \frac{1}{M} \left( 
  m_1\lim_{\Delta t \to 0}{\frac{\Delta\vb{r}_1}{\Delta t}} + 
  m_2\lim_{\Delta t \to 0}{\frac{\Delta\vb{r}_2}{\Delta t}} + \cdots +
  m_N\lim_{\Delta t \to 0}{\frac{\Delta\vb{r}_N}{\Delta t}} \right) \\
& = \frac{1}{M}\left(m_1 \vb{v}_1 + m_2 \vb{v}_2 + \cdots + m_N \vb{v}_N\right) \\
& = \frac{m_1 \vb{v}_1 + m_2 \vb{v}_2 + \cdots + m_N \vb{v}_N}{m_1 + m_2 + \cdots + m_N}
\end{split}
$$

過程中我們多次使用分配率，以及極限的線性性質。

如果你覺得過程太冗長，或是你已經熟悉求和記號和導數的運算，以下提供比較簡潔的推導給你。

$$
\begin{split} 
\vb{v}_{\text{cm}} &= \dv{\vb{r}_{\text{cm}}}{t} \\
&= \dv{t}\left(\frac{\sum m_i \vb{r}_i}{\sum m_i}\right) =
   \dv{t}\left(\frac{\sum m_i \vb{r}_i}{M}\right) \\
& = \frac{1}{M} \dv{t}\left(\sum m_i \vb{r}_i\right) = 
    \frac{1}{M} \left(\sum m_i \dv{\vb{r}_i}{t}\right) \\
& = \frac{1}{M} \left(\sum m_i \vb{v}_i\right) =
    \frac{\sum m_i \vb{v}_i}{\sum m_i} 
\end{split}
$$

因此，質心速度 $\vb{v}_{\text{cm}}$ 的公式為

$$
\begin{equation}\label{eq:vcm}
\bbox[5px, border: 2px solid grey]{\large
\vb{v}_{\text{cm}} = \frac{
  m_1 \vb{v}_1 + + m_2 \vb{v}_2 + \cdots + m_N \vb{v}_N}{
  m_1 + m_2 + \cdots + m_N} 
}
\end{equation}
$$

或 

$$
\begin{equation}\label{eq:vcm-summation}
\bbox[5px, border: 2px solid grey]{\large 
\vb{v}_{\text{cm}} = \frac{\sum m_i \vb{v}_i}{\sum m_i}}
\end{equation}
$$

---

### 系統總動量

系統總動量即是各質點動量的加總：

$$
\begin{equation}\label{eq:total-momentum}
\vb{P} = \vb{p}_1 + \vb{p}_2 + \cdots + \vb{p}_N = \sum \vb{p}_i
\end{equation}
$$

依據動量的定義

$$
\vb{P} = m_1\vb{v}_1 + m_2\vb{v}_2 + \cdots + m_N\vb{v}_N = \sum m_i\vb{v}_i
$$

但 \eqref{eq:vcm} 或 \eqref{eq:vcm-summation} 告訴我們

$$
m_1\vb{v}_1 + m_2\vb{v}_2 + \cdots + m_N\vb{v}_N = \sum m_i\vb{v}_i = M \vb{v}_{\text{cm}} 
$$

因此

$$
\begin{equation}\label{total-momentum-vcm}
\bbox[5px, border: 2px solid grey]{
\vb{P} = M \vb{v}_{\text{cm}}
}
\end{equation}
$$

按照我們的假想，
- 系統中所有質點的質量 $M$ 都集中在一個點（質心）上，
- 這個點以速度 $\vb{v}_{\text{cm}}$ 運動，
- 這個點的動量，即是系統總動量 $\vb{P}$。

> **這是一個極重要的結果**。
> 它把「多個質點的運動」簡化成「一個等效質點的運動」。
{: .prompt-warning }

---

### 質心加速度

將質心速度對 $t$ 再微分一次，就可以導出質心加速度 $\vb{a}_{\text{cm}}$ 的定義。

這裡只提供簡潔的推導。

$$
\begin{split} 
\vb{a}_{\text{cm}} &= \dv{\vb{v}_{\text{cm}}}{t} \\
&= \dv{t}\left(\frac{\sum m_i \vb{v}_i}{\sum m_i}\right) =
   \dv{t}\left(\frac{\sum m_i \vb{v}_i}{M}\right) \\
& = \frac{1}{M} \dv{t}\left(\sum m_i \vb{v}_i\right) = 
    \frac{1}{M} \left(\sum m_i \dv{\vb{v}_i}{t}\right) \\
& = \frac{1}{M} \left(\sum m_i \vb{a}_i\right) =
    \frac{\sum m_i \vb{a}_i}{\sum m_i} 
\end{split}
$$

因此，質心加速度 $\vb{a}_{\text{cm}}$ 的公式為

$$
\begin{equation}\label{eq:acm}
\bbox[5px, border: 2px solid grey]{\large
\vb{a}_{\text{cm}} = \frac{
  m_1 \vb{a}_1 + + m_2 \vb{a}_2 + \cdots + m_N \vb{a}_N}{
  m_1 + m_2 + \cdots + m_N} 
}
\end{equation}
$$

或 

$$
\begin{equation}\label{eq:acm-summation}
\bbox[5px, border: 2px solid grey]{\large 
\vb{a}_{\text{cm}} = \frac{\sum m_i \vb{a}_i}{\sum m_i}}
\end{equation}
$$

### 質點系統的牛頓運動定律

#### 兩個質點

假設有兩個質點 $m_1$ 與 $m_2$

$$
m_1 \vb{a}_1 = \vb{F}_{1,\text{ext}} + \vb{F}_{12}
$$

$$
m_2 \vb{a}_2 = \vb{F}_{2,\text{ext}} + \vb{F}_{21}
$$

相加後：

* 根據牛頓第三運動定律， $\vb{F}_{12} = -\vb{F}_{21}$，故內力 $\vb{F}_{12}$ 與 $\vb{F}_{21}$ 互相抵消
* 只剩外力

---

#### $N$ 個質點

$$
\sum_{i=1}^{N} m_i \vb{a}_i
= \sum \vb{F}*{\text{ext}}
$$

左邊等於：

$$
M \vb{a}_{\text{cm}}
$$

因此得到：

$$
\boxed{
M \vb{a}*{\text{cm}} = \sum \vb{F}_{\text{ext}}
}
$$


> **質心的運動只取決於「外力」**
> 系統內部再怎麼拉扯、碰撞、爆炸，
> 只要外力一定，質心的運動就固定。
{: .prompt-warning }

---

## 小結

> * 質心是「質量加權平均的位置」
> * 質心速度對應系統總動量
> * 質心加速度由系統外力決定
>
> 這些結果，將直接導向下一節的 **動量守恆律**。
{: .prompt-info }

