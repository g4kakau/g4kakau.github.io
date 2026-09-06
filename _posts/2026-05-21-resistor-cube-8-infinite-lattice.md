---
layout: post
title: "正方體等效電阻（八）：無限晶格——對稱性讓積分消失"
date: 2026-05-21 00:00:00 +0800
categories: [大學物理, 電磁學]
tags: [等效電阻, 電阻網路, 無限晶格, 格點格林函數, 離散傅立葉變換, 對稱性, 固態物理, 立方晶格, 競賽物理]
math: true
description: "把立方電阻網路無限延伸，兩個相鄰節點的等效電阻是多少？本文用疊加原理給出無需積分的優雅答案 R/3，再用格點格林函數與離散傅立葉變換推導出三重積分，最後用對稱性論證讓積分精確消去。立方晶格等效電阻系列第八篇。"
---

$$\require{physics}$$

<link rel="stylesheet" href="/assets/css/posts-custom.css">

> 《立方晶格等效電阻》系列：[第一篇](/posts/resistor-cube-1-node-voltage/) ｜ [第二篇](/posts/resistor-cube-2-kirchhoff/) ｜ [第三篇](/posts/resistor-cube-3-symmetry/) ｜ [第四篇](/posts/resistor-cube-4-group-theory/) ｜ [第五篇](/posts/resistor-cube-5-three-configurations/) ｜ [第六篇](/posts/resistor-cube-6-graph-theory/) ｜ [第七篇](/posts/resistor-cube-7-laplacian/) ｜ **第八篇**

---

前七篇的立方體有 8 個節點、12 條電阻，結構清晰有界。現在想像把它沿三個方向都無限延伸：每個節點有 6 個相鄰節點，每條邊一個電阻 $R$，晶格延伸到無窮遠。

問：兩個相鄰節點 $\mathbf{0} = (0,0,0)$ 與 $\mathbf{e}_1 = (1,0,0)$ 之間的等效電阻是多少？

這個問題在固態物理裡有實際意義：真實晶體遠離邊界的內部，電阻網路就近似這種無限均勻晶格。答案是 $R/3$，而達到它的兩條路——疊加論證與格點格林函數（lattice Green's function）——分別代表兩種截然不同的思維方式。

---

## 數值觀察：有限晶格的收斂

先用第七篇的 Python 工具做數值探索。在 $n \times n \times n$ 的有限晶格中，取最靠近中心的一對相鄰節點，計算等效電阻：

```python
import numpy as np

def build_laplacian(n):
    N = n**3
    L = np.zeros((N, N))
    for i in range(n):
        for j in range(n):
            for k in range(n):
                v = i*n**2 + j*n + k
                for di, dj, dk in [(1,0,0),(-1,0,0),(0,1,0),(0,-1,0),(0,0,1),(0,0,-1)]:
                    ni2, nj2, nk2 = i+di, j+dj, k+dk
                    if 0 <= ni2 < n and 0 <= nj2 < n and 0 <= nk2 < n:
                        u = ni2*n**2 + nj2*n + nk2
                        L[v,u] -= 1; L[v,v] += 1
    return L

def r_eff_pinv(L, a, b):
    chi = np.zeros(L.shape[0]); chi[a], chi[b] = 1, -1
    return float(chi @ np.linalg.pinv(L) @ chi)

for n in [2, 3, 4, 5, 6, 7, 8]:
    L = build_laplacian(n)
    c = n // 2
    if n % 2 == 0:
        a = (c-1)*n**2 + (c-1)*n + (c-1)   # (c-1, c-1, c-1)
        b =    c *n**2 + (c-1)*n + (c-1)   # (  c, c-1, c-1)
    else:
        a =  c*n**2 +  c*n + c             # (c, c, c)
        b = (c+1)*n**2 + c*n + c           # (c+1, c, c)
    print(f"n={n}: {r_eff_pinv(L, a, b):.6f} R")
```

輸出：

```
n=2: 0.583333 R   （= 7R/12，與第五篇的稜邊結果一致）
n=3: 0.383598 R
n=4: 0.352504 R
n=5: 0.341007 R
n=6: 0.337677 R
n=7: 0.335801 R
n=8: 0.335004 R
          ↓
極限：  0.333333 R  （= R/3）
```

$n=2$ 就是原始的 $1\times1\times1$ 正方體，稜邊結果 $7R/12$。晶格越大，中心節點「感受」到的邊界效應越弱，$R_\text{eff}$ 單調下降並收斂到 $R/3$。

---

## 疊加論證——不需要積分

精確答案 $R/3$ 可以用疊加原理一步得出，完全不需要積分。

論證只需要兩個情境和一個加法。

**情境一**：在節點 $A$ 注入電流 $I$，讓它均勻流向無窮遠。

無限均勻晶格中，$A$ 的 6 個鍵完全等價（立方對稱），因此電流均等分配：每條鍵各流出 $I/6$。特別地，$A$ 到相鄰節點 $B$ 的那條鍵上電流為 $I/6$。由歐姆定律：

$$V_A^{(1)} - V_B^{(1)} = \frac{I}{6} \cdot R = \frac{IR}{6} \tag{1}\label{eq8:v1}$$

**情境二**：從無窮遠均勻注入電流 $I$，在節點 $B$ 移除。

由相同的對稱性，$B$ 的 6 個鍵各從鄰居均等流入 $I/6$，所以 $A$ 到 $B$ 的鍵上電流為 $I/6$（從 $A$ 流向 $B$）。由歐姆定律：

$$V_A^{(2)} - V_B^{(2)} = \frac{I}{6} \cdot R = \frac{IR}{6} \tag{2}\label{eq8:v2}$$

**疊加**：情境一加上情境二，「在無窮遠的移除」與「從無窮遠的注入」正好抵消，淨效果是：

$$\text{在 } A \text{ 注入電流 } I,\quad \text{在 } B \text{ 移除電流 } I$$

這正是定義 $R_\text{eff}(A, B)$ 的設定。由疊加原理（電位對電流線性）：

$$V_A - V_B = \frac{IR}{6} + \frac{IR}{6} = \frac{IR}{3}$$

$$\boxed{R_\text{eff}(A,\, B) = \frac{V_A - V_B}{I} = \frac{R}{3}} \tag{3}\label{eq8:result}$$

> **這個論證的前提**：無限均勻晶格中，節點 $A$ 的 6 個鍵完全等價。這不是額外的假設，而是 KCL 加上無限晶格的平移對稱性與立方對稱性的必然結果——與第三篇的唯一性定理 + 對稱操作論證完全相同。
{: .prompt-info }

---

## 格點傅立葉方法——積分公式的推導

疊加論證已給出答案，但如果要推廣到非相鄰節點、或不同晶格幾何，需要一個系統化的工具：**格點傅立葉變換**（discrete Fourier transform on lattice）。

### 無限晶格的 Laplacian 特徵值

無限三維立方晶格中，每個節點 $\mathbf{r} \in \mathbb{Z}^3$ 的 KCL（單位電阻 $R = 1$，後面乘回去）：

$$(L\mathbf{v})_{\mathbf{r}} = \sum_{\mathbf{r}' \sim \mathbf{r}} (V_{\mathbf{r}} - V_{\mathbf{r}'}) = I_{\mathbf{r}} \tag{4}\label{eq8:kcl}$$

這個算子 $L$ 作用在無限維空間 $\ell^2(\mathbb{Z}^3)$ 上，無法直接取矩陣擬逆，但它在傅立葉空間裡對角化。

以波向量 $\mathbf{k} = (k_1, k_2, k_3) \in [-\pi, \pi]^3$（布里淵區，Brillouin zone）為變數，每個平面波 $\psi_{\mathbf{k}}(\mathbf{r}) = e^{i\mathbf{k}\cdot\mathbf{r}}$ 是 $L$ 的特徵函數：

$$\begin{aligned}
(L\psi_{\mathbf{k}})_{\mathbf{r}} &= \sum_{\boldsymbol{\delta}\in\{\pm\mathbf{e}_1, \pm\mathbf{e}_2, \pm\mathbf{e}_3\}} \bigl(e^{i\mathbf{k}\cdot\mathbf{r}} - e^{i\mathbf{k}\cdot(\mathbf{r}+\boldsymbol{\delta})}\bigr) \\
&= e^{i\mathbf{k}\cdot\mathbf{r}} \bigl[6 - 2\cos k_1 - 2\cos k_2 - 2\cos k_3\bigr]
\end{aligned}$$

特徵值為：

$$\lambda(\mathbf{k}) = 2(3 - \cos k_1 - \cos k_2 - \cos k_3) \tag{5}\label{eq8:eigenval}$$

$\lambda(\mathbf{k}) = 0$ 只在 $\mathbf{k} = \mathbf{0}$ 時成立，對應常數電位（零模），與有限晶格的情形完全對應。

### 格點格林函數

類比第七篇的擬逆，定義無限晶格的格點格林函數（排除零模）：

$$G(\mathbf{r}) = \frac{1}{(2\pi)^3} \int_{[-\pi,\pi]^3} \frac{e^{i\mathbf{k}\cdot\mathbf{r}}}{\lambda(\mathbf{k})} \, d^3k \quad (\text{排除 }\mathbf{k}=\mathbf{0}\text{ 零模}) \tag{6}\label{eq8:green}$$

> **為什麼 3D 收斂而 1D、2D 不收斂？** 近 $\mathbf{k}=\mathbf{0}$ 時 $\lambda(\mathbf{k}) \approx k^2$，積分 $\int_{0}^{\epsilon} dk/k^2$ 在 3D 中是 $\int_{0}^{\epsilon} k^2 dk / k^2 = \int_{0}^{\epsilon} dk$，有限；但在 1D 中是 $\int_0^\epsilon dk/k^2$，發散。因此 3D 晶格的格林函數存在，1D/2D 的隨機遊走是「回歸的（recurrent）」，需要額外處理。
{: .prompt-info }

有效電阻公式（類比第七篇的 $R_\text{eff} = \boldsymbol{\chi}^\top L^+ \boldsymbol{\chi}$，在無限晶格由平移對稱性化簡）：

$$R_\text{eff}(\mathbf{0}, \mathbf{e}_1) = 2R\,\bigl[G(\mathbf{0}) - G(\mathbf{e}_1)\bigr] \tag{7}\label{eq8:reff}$$

### 推導出三重積分

計算 $G(\mathbf{0}) - G(\mathbf{e}_1)$：

$$G(\mathbf{0}) - G(\mathbf{e}_1) = \frac{1}{(2\pi)^3}\int_{[-\pi,\pi]^3} \frac{1 - \cos k_1}{\lambda(\mathbf{k})}\,d^3k$$

被積函數對 $k_i \to -k_i$ 均為偶函數，可將積分域折疊到 $[0,\pi]^3$：

$$= \frac{8}{(2\pi)^3} \int_0^\pi\!\int_0^\pi\!\int_0^\pi \frac{1 - \cos k_1}{2(3-\cos k_1-\cos k_2-\cos k_3)}\,dk_1\,dk_2\,dk_3 = \frac{1}{2\pi^3}\,I$$

其中

$$I = \int_0^\pi\!\int_0^\pi\!\int_0^\pi \frac{1 - \cos k_1}{3-\cos k_1-\cos k_2-\cos k_3}\,dk_1\,dk_2\,dk_3$$

代入式 $\eqref{eq8:reff}$（$2R \times \dfrac{1}{2\pi^3} \times I$）：

$$\boxed{R_\text{eff}(\mathbf{0}, \mathbf{e}_1) = \frac{R}{\pi^3} \int_0^\pi\!\int_0^\pi\!\int_0^\pi \frac{1 - \cos k_1}{3 - \cos k_1 - \cos k_2 - \cos k_3} \, dk_1 \, dk_2 \, dk_3} \tag{8}\label{eq8:integral}$$

---

## 對稱性讓積分消失

式 $\eqref{eq8:integral}$ 中的三重積分看起來困難，但可以用純粹的對稱性在不算任何積分的情況下得到精確值。

分母 $3 - \cos k_1 - \cos k_2 - \cos k_3$ 對三個變數完全對稱；分子 $1 - \cos k_1$ 只依賴 $k_1$。把分子換成三個方向的平均：

$$I = \frac{1}{3} \int_0^\pi\!\int_0^\pi\!\int_0^\pi \frac{(1-\cos k_1) + (1-\cos k_2) + (1-\cos k_3)}{3-\cos k_1-\cos k_2-\cos k_3}\,dk_1\,dk_2\,dk_3$$

（三個積分分別把 $k_1, k_2, k_3$ 置換到分子，再取平均；由 $k_1, k_2, k_3$ 的積分域完全相同，三個積分值相等，因此平均等於原積分。）

此時分子恰好等於分母：

$$(1-\cos k_1) + (1-\cos k_2) + (1-\cos k_3) = 3 - \cos k_1 - \cos k_2 - \cos k_3$$

因此：

$$I = \frac{1}{3} \int_0^\pi\!\int_0^\pi\!\int_0^\pi \frac{3-\cos k_1-\cos k_2-\cos k_3}{3-\cos k_1-\cos k_2-\cos k_3}\,dk_1\,dk_2\,dk_3 = \frac{1}{3}\int_0^\pi\!\int_0^\pi\!\int_0^\pi 1\,dk_1\,dk_2\,dk_3 = \frac{\pi^3}{3}$$

代入式 $\eqref{eq8:integral}$：

$$R_\text{eff}(\mathbf{0}, \mathbf{e}_1) = \frac{R}{\pi^3} \cdot \frac{\pi^3}{3} = \frac{R}{3}$$

與疊加論證結果完全一致。

> **為什麼分子和分母能相消？** 分子「$1-\cos k_1$」對應「電流從節點 $\mathbf{0}$ 沿 $k_1$ 方向流出的不對稱性」；分母對應「Laplacian 的傳播核」。三個方向加總後，不對稱性正好填滿傳播核，兩者相消。本質上，這是疊加論證的積分版本：三個方向等價，每個方向貢獻 $1/3$。
{: .prompt-tip }

---

## Python 數值驗證

```python
import numpy as np
from scipy import integrate

def integrand(k1, k2, k3):
    return (1 - np.cos(k1)) / (3 - np.cos(k1) - np.cos(k2) - np.cos(k3))

result, error = integrate.tplquad(
    integrand,
    0, np.pi,
    lambda x: 0, lambda x: np.pi,
    lambda x, y: 0, lambda x, y: np.pi,
    epsabs=1e-8, epsrel=1e-8
)
print(f"(1/π³) × 積分 = {result / np.pi**3:.8f}")  # 0.33333333
print(f"誤差估計: {error:.2e}")
```

```
(1/π³) × 積分 = 0.33333333
誤差估計: 3.96e-08
```

---

## 一般化：配位數為 $z$ 的無限晶格

疊加論證對任意**頂點遞移（vertex-transitive）**的無限晶格都適用。設每個節點有 $z$ 個等價相鄰節點（配位數），情境一和情境二各貢獻電壓降 $IR/z$，疊加後：

$$\boxed{R_\text{eff}(\text{相鄰節點}) = \frac{2R}{z}} \tag{9}\label{eq8:general}$$

| 晶格 | 維度 | 配位數 $z$ | $R_\text{eff}$ | 備註 |
|---|:---:|:---:|:---:|---|
| 一維無限鏈 | 1D | 2 | $R$ | 繞道路徑無限長，等效開路，全部電流走直路 |
| 二維方格晶格 | 2D | 4 | $R/2$ | 著名結果；亦可由雙重積分精確推導 |
| 三維立方晶格 | 3D | 6 | $R/3$ | 本篇主題 |
| 三維面心立方（fcc） | 3D | 12 | $R/6$ | 每個節點有 12 個等距鄰居 |

> **1D 的直覺**：從節點 $A$ 出發，往右走一步到 $B$，另一條路是往左走無限長再繞回來——電阻無限大，等效開路。因此所有電流只走直接那條鍵，$R_\text{eff} = R$。配位數公式 $2R/z = 2R/2 = R$ 給出相同答案。

---

## 系列回顧

八篇文章從同一個問題出發——一個正方體的等效電阻——一路往上走：

| 篇次 | 核心工具 | 主要結果 |
|:---:|---|---|
| ① | 節點電壓法 + 對稱假設 | 體對角線 $R_\text{eq} = 5R/6$ |
| ② | KCL 的物理根源 | 電荷守恆 ↔ Kirchhoff 定律 |
| ③ | 唯一性定理 + 對稱操作 | 對稱節點等電位的嚴格證明 |
| ④ | 群論入門 | $S_3$ 作用、軌道、置換群的語言 |
| ⑤ | 三種連法 | 體對角線 $5R/6$、面對角線 $3R/4$、稜邊 $7R/12$ |
| ⑥ | 圖論 / 矩陣語言 | 鄰接矩陣、圖 Laplacian、$L\mathbf{v} = \mathbf{i}$ |
| ⑦ | Moore–Penrose 擬逆 | $R_\text{eff} = \boldsymbol{\chi}^\top L^+ \boldsymbol{\chi}$；特徵值 $0,2,2,2,4,4,4,6$ |
| ⑧ | 疊加 + 格點傅立葉 | 無限晶格 $R_\text{eff} = R/3$；積分 = $\pi^3/3$ |

從 $5R/6$（有限正方體，體對角線）到 $R/3$（無限晶格，相鄰節點）：同樣是「電阻網路上兩點間等效電阻」，所需的數學從中學 KCL 走到了群論、線性代數、固態物理的傅立葉方法。問題本身沒有變，視野擴大了。
