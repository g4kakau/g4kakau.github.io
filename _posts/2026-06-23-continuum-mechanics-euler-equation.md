---
layout: post
title: "連續體力學入門：從質點力學到 Euler 方程"
date: 2026-06-23 00:00:00 +0800
categories: [大學物理, 力學]
tags: [連續體力學, Euler方程, 物質導數, 質量守恆, 連續方程式, 白努利方程式, 應力張量, 流體力學, 大學物理, 普通物理]
math: true
description: "從連續體假設出發，建立密度、壓力、速度的場描述；推導物質導數、質量守恆連續方程式、無黏流體的 Euler 方程式，最後把白努利方程式作為 Euler 方程式沿流線積分的結果嚴格推導出來。"
---

$$\require{physics}$$

## 課程裡的流體力學空洞

台灣高中物理已刪去流體靜力學，大學普通物理通常只用一章涵蓋密度、靜液壓、帕斯卡、阿基米德、連續方程式、白努利——六個結論並列，看起來像六條獨立公式，卻沒有說清楚它們的共同根源。

其實這六件事都出自同一套框架：**連續體力學**。

連續體力學的基本問題是：

> 每一小塊流體受到什麼力？質量與動量如何隨時間演化？

回答這個問題只需要兩條守恆律——質量守恆與動量守恆——加上流體的材料性質。本篇把從「分子→連續體→場→守恆律→公式」的邏輯鏈完整走一遍。

---

## 連續體假設：從分子到場

流體在微觀上是離散的分子集合。但只要我們關心的空間尺度遠大於分子間距（空氣在常溫下約 $10^{-9}\,\text{m}$），就可以把流體視為**連續介質**：

> 取一個「巨觀上夠小、微觀上包含足夠多分子」的體積 $\Delta V$，對其中分子的物理量取統計平均，得到該位置的**場值**。

這樣，流體的狀態由場來描述：

- 密度場：$\rho(\vb{r},t)$
- 壓力場：$p(\vb{r},t)$
- 速度場：$\vb{v}(\vb{r},t)$

其中 $\vb{v}(\vb{r},t)$ 的意義是：在時刻 $t$、位置 $\vb{r}$ 處，流經此處的一小塊流體具有的速度。它**不是某顆固定分子的速度**，而是空間中每個位置的速度標籤。

---

## 兩種描述方式：Lagrange vs Euler

### Lagrange 描述（跟著流體走）

追蹤每一小團流體，記錄它在時間 $t$ 的位置：

$$\vb{r} = \vb{r}(\vb{a}, t)$$

其中 $\vb{a}$ 是這團流體的初始位置（標籤）。這和質點力學一樣：追蹤「誰跑到哪裡」。

### Euler 描述（固定位置觀察）

固定空間中的觀察點 $\vb{r}$，描述此處的場隨時間的變化。這是在問：

> 「這個位置現在流過的是怎樣的流體？」

流體力學主要用 Euler 描述，因為工程上我們更關心「管道截面上的流速」而不是「某顆水分子的軌跡」。

---

## 應力張量：流體接觸力的完整描述

### 超越純量壓力

國中的壓力 $p = F_\perp/A$ 只考慮法向力。但一般連續介質中，一個微小面還可能承受**切向力**（剪應力）。

在靜止流體中，由於流體無法維持剪應力（一受剪就流動），應力完全是各向同性的壓縮力：

$$\boldsymbol{\sigma} = -p\mathbf{I}$$

其中 $\mathbf{I}$ 是單位張量。這個等式的物理意義：靜止流體中任意方向的截面都受到相同的壓力，且方向垂直於截面、朝內壓縮。

這正是「帕斯卡原理」（壓力各向相同）的嚴格數學表述。

### 壓力梯度才是力

物體表面受到的壓力合力為：

$$\vb{F}_p = -\oint_{\partial V} p\,\vb{n}\,\dd{A} = -\int_V \nabla p\,\dd{V}$$

（最後一步用了散度定理。）

**結論**：產生淨力的是壓力梯度 $\nabla p$，而不是壓力本身。四周壓力均勻時，合力為零。

---

## 物質導數：跟著流體走的加速度

### 問題的來源

流體速度是場 $\vb{v}(\vb{r},t)$。一小塊流體的加速度怎麼算？

加速度 = 速度對時間的全導數，但這一小塊流體在移動，位置也在變：

$$\frac{\dd{\vb{v}}}{\dd{t}} = \frac{\partial \vb{v}}{\partial t} + \frac{\dd{\vb{r}}}{\dd{t}} \cdot \nabla \vb{v}$$

由於 $\dd{\vb{r}}/\dd{t} = \vb{v}$，得到：

$$\boxed{\frac{D\vb{v}}{Dt} = \frac{\partial \vb{v}}{\partial t} + (\vb{v}\cdot\nabla)\vb{v}}$$

這叫做**物質導數**（material derivative）或**隨體導數**，記作 $D/Dt$。

### 兩個加速度的直覺

$$\frac{D\vb{v}}{Dt} = \underbrace{\frac{\partial \vb{v}}{\partial t}}_{\text{局部加速度}} + \underbrace{(\vb{v}\cdot\nabla)\vb{v}}_{\text{對流加速度}}$$

- **局部加速度**：此位置的速度場本身隨時間改變
- **對流加速度**：這塊流體移動到速度不同的位置

**例子**：穩定水流（$\partial \vb{v}/\partial t = 0$）流入較窄的管道。每個位置的流速不隨時間改變，但一小團水往前移動時進入流速更快的區域——它仍在加速，加速度完全來自對流項。

物質導數對任何場量都適用：

$$\frac{D\rho}{Dt} = \frac{\partial \rho}{\partial t} + \vb{v}\cdot\nabla\rho$$

---

## 質量守恆：連續方程式

### 積分形式

取空間中一個**固定的**控制體積 $V$。$V$ 內的質量：

$$M = \int_V \rho\,\dd{V}$$

質量的增加率 = 流入量 − 流出量。流出通量為 $\rho \vb{v} \cdot \vb{n}$（每秒穿出單位面積的質量），所以：

$$\frac{\dd{M}}{\dd{t}} = -\oint_{\partial V} \rho \vb{v} \cdot \vb{n}\,\dd{A}$$

### 微分形式（連續方程式）

用散度定理把面積分換成體積分，因為 $V$ 任意，被積函數必須處處為零：

$$\boxed{\frac{\partial \rho}{\partial t} + \nabla\cdot(\rho\vb{v}) = 0}$$

用物質導數改寫：

$$\frac{D\rho}{Dt} + \rho\,\nabla\cdot\vb{v} = 0$$

### 不可壓縮流

若每小團流體在運動中密度不變（$D\rho/Dt = 0$），連續方程式化為：

$$\boxed{\nabla\cdot\vb{v} = 0}$$

普通物理的 $A_1 v_1 = A_2 v_2$ 是這個方程式在**穩定、一維管流**中的特例：

$$\nabla\cdot\vb{v} = 0 \;\xrightarrow{\text{穩定一維管流}}\; \frac{\dd{(Av)}}{\dd{s}} = 0 \;\Rightarrow\; A_1 v_1 = A_2 v_2$$

---

## 動量守恆：Euler 方程式

### 流體小塊受到的力

一小團流體受到兩類力：

**體力**（作用於整個體積，如重力）：

$$\vb{f}_\text{body} = \rho\vb{g}$$

**表面力**（周圍流體的應力）：

$$\vb{f}_\text{surface} = \nabla\cdot\boldsymbol{\sigma}$$

Newton 第二定律的局部形式（$F = ma$，對單位體積）：

$$\rho\frac{D\vb{v}}{Dt} = \nabla\cdot\boldsymbol{\sigma} + \rho\vb{g}$$

### 無黏流體：Euler 方程式

對無黏流體，代入 $\boldsymbol{\sigma} = -p\mathbf{I}$，則 $\nabla\cdot\boldsymbol{\sigma} = -\nabla p$，得到：

$$\boxed{\rho\frac{D\vb{v}}{Dt} = -\nabla p + \rho\vb{g}}$$

展開物質導數：

$$\boxed{\rho\left[\frac{\partial\vb{v}}{\partial t} + (\vb{v}\cdot\nabla)\vb{v}\right] = -\nabla p + \rho\vb{g}}$$

這就是 **Euler 方程式**，本質上是流體版本的 $F = ma$。

### $-\nabla p$ 為什麼是力？

想像一個微小方塊，$x$ 方向的兩個面：左面受壓力 $p(x)$，右面受壓力 $p(x+\dd{x})$。合力（$x$ 方向）為：

$$\dd{F}_x = [p(x) - p(x+\dd{x})]\,\dd{y}\,\dd{z} \approx -\frac{\partial p}{\partial x}\dd{x}\,\dd{y}\,\dd{z}$$

除以體積 $\dd{V}$：

$$\frac{\dd{F}_x}{\dd{V}} = -\frac{\partial p}{\partial x}$$

三個方向合起來：$\vb{f}_\text{pressure}/\dd{V} = -\nabla p$。壓力梯度就是單位體積的壓力合力。

### 靜液壓是 Euler 方程的靜態極限

流體靜止時 $\vb{v} = 0$，$D\vb{v}/Dt = 0$，Euler 方程化為：

$$0 = -\nabla p + \rho\vb{g} \;\Rightarrow\; \nabla p = \rho\vb{g}$$

沿 $z$ 方向積分，令 $\vb{g} = -g\hat{\vb{z}}$、深度 $h = z_0 - z$：

$$\boxed{p = p_0 + \rho g h}$$

國中靜液壓公式只是 Euler 方程在靜止、均勻密度、均勻重力場時的特例。

---

## 白努利方程式的推導

白努利方程式是 Euler 方程式在特定條件下**沿流線積分**的結果。

**條件**：穩定流（$\partial\vb{v}/\partial t = 0$）、無黏、不可壓縮（$\rho$ 為常數）、沿同一條流線、體力只有保守重力。

Euler 方程化為：

$$\rho(\vb{v}\cdot\nabla)\vb{v} = -\nabla p + \rho\vb{g}$$

沿流線取微小位移 $\dd{\vb{r}}$（方向與 $\vb{v}$ 平行），對方程兩側取內積：

$$\rho\,[(\vb{v}\cdot\nabla)\vb{v}]\cdot\dd{\vb{r}} = -\nabla p\cdot\dd{\vb{r}} + \rho\vb{g}\cdot\dd{\vb{r}}$$

逐一處理三項：

**壓力項**：$\nabla p \cdot \dd{\vb{r}} = \dd{p}$

**重力項**：$\vb{g}\cdot\dd{\vb{r}} = -g\,\dd{z}$

**慣性項**：可以證明，沿流線有

$$[(\vb{v}\cdot\nabla)\vb{v}]\cdot\dd{\vb{r}} = \dd\!\left(\frac{1}{2}v^2\right)$$

（關鍵：沿流線 $\dd{\vb{r}} = \hat{\vb{t}}\,\dd{s}$，而 $\vb{v} = v\hat{\vb{t}}$，推導後切向分量恰好給出 $v\,\dd{v}$。）

合併三項：

$$\rho\,\dd\!\left(\frac{1}{2}v^2\right) = -\dd{p} - \rho g\,\dd{z}$$

積分（$\rho$ 為常數）：

$$\boxed{p + \frac{1}{2}\rho v^2 + \rho g z = \text{const}\quad\text{（沿同一流線）}}$$

這就是**白努利方程式**。三項的能量意義：

| 項 | 意義 |
|---|---|
| $p$ | 流體的壓力能（流動功） |
| $\frac{1}{2}\rho v^2$ | 動能密度 |
| $\rho g z$ | 重力位能密度 |

### 「流速快、壓力低」的正確因果

$v_2 > v_1 \Rightarrow p_2 < p_1$（同高度），但**因果關係不是「流速快導致壓力低」**。

正確說法：沿流線的**壓力梯度**使流體加速——壓力由高往低，流體因此加快，壓力能轉化為動能。是壓力差驅動加速，不是速度決定壓力。

---

## 例題：文氏管（Venturi tube）

**題**：水平管道截面積由 $A_1 = 80\,\text{cm}^2$ 縮小為 $A_2 = 20\,\text{cm}^2$，入口流速 $v_1 = 1.0\,\text{m/s}$，水密度 $\rho = 1000\,\text{kg/m}^3$。求 (a) 出口流速 $v_2$，(b) 兩截面的壓力差 $p_1 - p_2$。

**解**：

(a) 由連續方程式（不可壓縮穩定管流）：

$$v_2 = v_1\frac{A_1}{A_2} = 1.0 \times \frac{80}{20} = 4.0\,\text{m/s}$$

(b) 水平管道 $z_1 = z_2$，由白努利方程式：

$$p_1 + \frac{1}{2}\rho v_1^2 = p_2 + \frac{1}{2}\rho v_2^2$$

$$p_1 - p_2 = \frac{1}{2}\rho(v_2^2 - v_1^2) = \frac{1}{2}(1000)(16 - 1) = 7500\,\text{Pa}$$

約 0.074 大氣壓。文氏流量計正是利用這個壓力差（用 U 形管量出來）反算流速，進而計算流量。

---

## 統整：從公式到根源

| 普通物理結論 | 更深的來源 |
|---|---|
| 壓力 $p = F/A$ | 應力張量的各向同性部分（靜止流體）|
| 帕斯卡原理 | 靜止流體 $\boldsymbol{\sigma} = -p\mathbf{I}$，壓力增量均勻傳播 |
| 靜液壓 $p = p_0 + \rho gh$ | Euler 方程式（$\vb{v}=0$ 極限） |
| 浮力 = 排開重量 | 靜液壓 $\nabla p = \rho\vb{g}$ 對物體表面積分 |
| $A_1 v_1 = A_2 v_2$ | 質量守恆連續方程式（不可壓縮穩定一維流） |
| 白努利方程式 | Euler 方程式沿流線積分（無黏、穩定、不可壓縮） |
| 黏滯力 | 應力張量的剪應力部分（需引入 Navier–Stokes 方程式）|

往上一層是 **Navier–Stokes 方程式**，即在 Euler 方程式中加入黏滯應力項（$\nabla\cdot(2\mu\mathbf{E})$，$\mathbf{E}$ 為應變率張量）。往下一層是**統計力學**，說明為什麼連續體假設在什麼條件下成立（Knudsen 數 $\ll 1$）。

流體力學的「空洞感」來自課程只教最後的特例公式，跳過了中間這一層：

$$\boxed{\text{連續體假設} \;\longrightarrow\; \text{守恆律（質量＋動量）} \;\longrightarrow\; \text{Euler/NS 方程式} \;\longrightarrow\; \text{靜液壓、浮力、白努利}}$$

上篇：[流體壓力與浮力的本質：從靜力平衡到阿基米德](/posts/fluid-pressure-and-buoyancy/)
