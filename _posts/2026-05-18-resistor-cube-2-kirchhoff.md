---
layout: post
title: "正方體等效電阻（二）：克希荷夫定律的物理根源"
date: 2026-05-18 00:00:00 +0800
categories: [大學物理, 電路學]
tags: [克希荷夫定律, KCL, KVL, 節點電壓法, 電路分析, 電荷守恆, 電位, 競賽物理]
math: true
description: "克希荷夫定律不是憑空定義的電路規則，而是從電荷守恆與電場保守性推導出來的。本文說明 KCL 與 KVL 的物理根源，以及它們如何讓我們系統性地列出電路方程式。立方晶格等效電阻系列第二篇。"
---

$$\require{physics}$$

> 《立方晶格等效電阻》系列：[第一篇](/posts/resistor-cube-1-node-voltage/) ｜ **第二篇** ｜ [第三篇](/posts/resistor-cube-3-symmetry/) ｜ [第四篇](/posts/resistor-cube-4-group-theory/)

---

在[第一篇](/posts/resistor-cube-1-node-voltage/)，我們用了兩條規則：

1. 每條電阻上的電流等於兩端電位差除以電阻值。
2. 每個內部節點，流入的電流等於流出的電流。

第一條是歐姆定律（Ohm's law），大家都熟悉。第二條——**克希荷夫電流定律（Kirchhoff's current law，KCL）**——感覺很直觀，但它到底是從哪裡來的？能不能更嚴格地說清楚？

而且解電路還常用到另一條：**克希荷夫電壓定律（Kirchhoff's voltage law，KVL）**——繞一個迴路一圈，電壓降的總和為零。

這兩條定律的物理根源，分別是**電荷守恆**和**電場的保守性**。

---

## 克希荷夫電流定律（KCL）

### 物理根源：電荷守恆

電荷不能憑空產生或消失。在**穩態**（steady state）電路中——也就是電流不隨時間變化的情況——電荷也不能在節點處積累。

如果節點 $i$ 有電荷持續流入卻不流出，這個節點就會越來越帶電，電位也會跟著改變，電路就不再「穩定」了。反過來說，一旦電路達到穩態，每個節點的電荷量不再改變，所以流入該節點的電荷速率（即電流）必須等於流出的電流。

**KCL 的正式敘述：**

對電路中任意節點 $i$，流入節點的電流總和等於零：

$$\sum_{j \sim i} I_{j \to i} = 0 \tag{1}\label{eq2:kcl}$$

其中求和遍歷所有與 $i$ 相鄰的節點 $j$，$I_{j \to i}$ 代表從 $j$ 流向 $i$ 的電流（可以為負，表示實際方向相反）。

用電位表示，從 $j$ 到 $i$ 流過電阻 $R_{ij}$ 的電流是

$$I_{j \to i} = \frac{V_j - V_i}{R_{ij}} \tag{2}\label{eq2:ohm}$$

代入式 $\eqref{eq2:kcl}$：

$$\sum_{j \sim i} \frac{V_j - V_i}{R_{ij}} = 0 \tag{3}\label{eq2:kcl-node}$$

這就是**節點電壓法**（node voltage method）的核心方程式。每個未知電位的節點列一條這樣的方程式，就能解出整個電路。

![KCL 節點流入流出示意圖](/assets/img/posts/cube-resistor-fig2-kcl-zh-light.svg){: .light w="760" }
![KCL 節點流入流出示意圖](/assets/img/posts/cube-resistor-fig2-kcl-zh-dark.svg){: .dark w="760" }
<p class="text-center"><em>圖 2-1：KCL 的核心圖像：穩態節點不累積電荷，因此流入電流總和等於流出電流總和。</em></p>

### 與馬克士威方程組的關係

更深層地說，KCL 是馬克士威方程組中電流連續性方程式（continuity equation）在穩態下的推論：

$$\frac{\partial \rho}{\partial t} + \nabla \cdot \vb{J} = 0 \tag{4}\label{eq2:continuity}$$

穩態時 $\partial \rho / \partial t = 0$，所以 $\nabla \cdot \vb{J} = 0$：電流密度的散度為零，也就是「電流線不會無端消失或冒出」。對任一節點積分，就得到式 $\eqref{eq2:kcl}$。

![連續性方程式控制體積示意圖](/assets/img/posts/cube-resistor-fig2-continuity-zh-light.svg){: .light w="760" }
![連續性方程式控制體積示意圖](/assets/img/posts/cube-resistor-fig2-continuity-zh-dark.svg){: .dark w="760" }
<p class="text-center"><em>圖 2-2：把節點附近看成一個控制體積，連續性方程式說明電荷流入與流出不能任意失衡；穩態時就化為 KCL。</em></p>

---

## 克希荷夫電壓定律（KVL）

### 物理根源：電場是保守場

靜電場（以及穩態電場）是**保守場（conservative field）**：從點 $A$ 到點 $B$ 做的功與路徑無關，只取決於兩端點。等價地說，沿任意**閉合路徑**（迴路）做的功為零：

$$\oint \vb{E} \cdot \dd{\vb{l}} = 0 \tag{5}\label{eq2:conservative}$$

電位（電壓）正是電場的位能：$V = -\int \vb{E} \cdot \dd{\vb{l}}$。所以沿閉合路徑走一圈，電位的變化量為零——這就是 KVL。

**KVL 的正式敘述：**

沿電路中任意閉合迴路，所有元件兩端電壓降的代數和為零：

$$\sum_{\text{迴路中的元件}} V_k = 0 \tag{6}\label{eq2:kvl}$$

「電壓降」指的是沿著選定的行進方向，元件高電位端減去低電位端的差值（若行進方向與電流方向相同，電阻有正的電壓降 $IR$；若反向，則為 $-IR$）。

![KVL 閉合迴路示意圖](/assets/img/posts/cube-resistor-fig2-kvl-zh-light.svg){: .light w="760" }
![KVL 閉合迴路示意圖](/assets/img/posts/cube-resistor-fig2-kvl-zh-dark.svg){: .dark w="760" }
<p class="text-center"><em>圖 2-3：KVL 關心的是沿閉合迴路走一圈後，電位變化的總和必須回到零。</em></p>

### KVL 適用的條件

KVL 要求電場是保守場，也就是空間中沒有**時變磁場**穿過迴路（法拉第定律：$\oint \vb{E} \cdot \dd{\vb{l}} = -\dv{\Phi_B}{t}$）。在直流電路或低頻交流電路中，這個條件通常滿足。含有電感（inductor）或快速變化電流的電路需要更小心。

![時變磁通使一般 KVL 失效的示意圖](/assets/img/posts/cube-resistor-fig2-kvl-faraday-zh-light.svg){: .light w="760" }
![時變磁通使一般 KVL 失效的示意圖](/assets/img/posts/cube-resistor-fig2-kvl-faraday-zh-dark.svg){: .dark w="760" }
<p class="text-center"><em>圖 2-4：若閉合迴路中穿過時變磁通，感應電場不再是保守場，一般形式的 KVL 必須改用法拉第定律修正。</em></p>

## KCL 與 KVL 的互補關係

對一個有 $n$ 個節點、$b$ 條支路的電路：

- KCL 可以列出 $n - 1$ 條獨立方程式（其中一個節點的方程式是其餘節點方程式之和，不獨立）。
- KVL 可以列出 $b - n + 1$ 條獨立方程式（對應獨立迴路數）。

兩者合起來恰好有 $b$ 條方程式——等於支路電流的個數，剛好可以完全解出電路。

**節點電壓法**選擇只用 KCL（配合歐姆定律），直接以節點電位為未知數，省去了繁瑣的迴路選取。這是解複雜電路最常用的系統方法。

---

## 例：惠斯通電橋

考慮一個四節點電路：

$$
A \xrightarrow{R_1} B \xrightarrow{R_3} D, \quad A \xrightarrow{R_2} C \xrightarrow{R_4} D, \quad B \xrightarrow{R_5} C
$$

![惠斯通電橋平衡示意圖](/assets/img/posts/cube-resistor-fig2-wheatstone-zh-light.svg){: .light w="760" }
![惠斯通電橋平衡示意圖](/assets/img/posts/cube-resistor-fig2-wheatstone-zh-dark.svg){: .dark w="760" }
<p class="text-center"><em>圖 2-5：惠斯通電橋平衡時，$B$ 與 $C$ 電位相同，因此中間支路 $R_5$ 沒有電流。</em></p>

設 $V_A = V$，$V_D = 0$，求各節點電位。

用節點電壓法，對節點 $B$ 列 KCL：

$$\frac{V - V_B}{R_1} = \frac{V_B - V_D}{R_3} + \frac{V_B - V_C}{R_5} \tag{7}\label{eq2:wb}$$

對節點 $C$ 列式 $\eqref{eq2:kcl-node}$：

$$\frac{V - V_C}{R_2} + \frac{V_B - V_C}{R_5} = \frac{V_C - V_D}{R_4} \tag{8}\label{eq2:wc}$$

兩條方程式，兩個未知數 $V_B, V_C$，解出後就能求任意支路電流。

**特別情況：** 若 $R_1 R_4 = R_2 R_3$，可以驗算出 $V_B = V_C$，電橋中間那條支路（$R_5$）沒有電流流過。這就是**惠斯通電橋（Wheatstone bridge）的平衡條件**，也是一種對稱性的體現。

---

## 第一篇的再詮釋

回顧[第一篇](/posts/resistor-cube-1-node-voltage/)的立方體問題。我們設起點 A 電位為 $1$，終點 H 電位為 $0$，然後對 B 型和 C 型節點各列一條 KCL 方程式：

對 B 型節點（代表 $(1,0,0)$，電位 $b$，3 個鄰居電位分別為 $1, c, c$），套用式 $\eqref{eq2:kcl-node}$（即[第一篇的式 (1)](/posts/resistor-cube-1-node-voltage/)）：

$$\frac{1-b}{R} + \frac{c-b}{R} + \frac{c-b}{R} = 0$$

這就是式 $\eqref{eq2:kcl}$——流入該節點的電流總和為零。

起點 A 不是內部節點，不能對它列 KCL（它連接著外部電源，會有外加電流注入）。但一旦解出 $b$ 和 $c$，我們能計算從 A 流出的電流 $I$，再得到 $R_{\text{eq}} = 1/I$。

**這裡隱含了一個 KVL 的應用：** 從 A 經任意路徑到 H，電位差的總和都是 $V_A - V_H = 1$。不管走哪條路，結果相同——這保證了「等效電阻」的概念是良好定義的。

---

## 總結

| 定律 | 物理根源         | 數學表達                  | 應用                       |
| ---- | ---------------- | ------------------------- | -------------------------- |
| KCL  | 電荷守恆（穩態） | 式 $\eqref{eq2:kcl-node}$ | 對每個內部節點列一條方程式 |
| KVL  | 電場保守性       | 式 $\eqref{eq2:kvl}$      | 驗算解、分析平衡條件       |

節點電壓法的精神：**選電位為未知數，用 KCL 列方程式，聯立求解**。不需要猜電流方向，也不需要選迴路，是處理多節點電路最系統的方法。

下一篇探討：在立方體問題裡，我們「感覺上」把等價節點的電位設成相同——這個直覺有沒有更嚴格的根據？答案來自**對稱性**的精確數學語言。
