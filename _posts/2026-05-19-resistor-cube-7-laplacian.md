---
layout: post
title: "正方體等效電阻（七）：從圖 Laplacian 到有效電阻公式"
date: 2026-05-19 00:00:00 +0800
categories: [大學數學, 線性代數]
tags: [等效電阻, 電阻網路, 圖Laplacian, 擬逆, 有效電阻, 特徵值, 節點電壓法, 線性代數, 競賽物理, 立方晶格]
math: true
description: "有了圖 Laplacian L，解電路問題等同於解 Lv=i。但 L 是奇異矩陣，本文介紹兩種處理方式：接地縮減法與 Moore–Penrose 擬逆。從擬逆推導出有效電阻閉合公式，再用 Python 一次驗算正方體三種連法，並展示立方體 Laplacian 的美麗特徵譜。立方晶格等效電阻系列第七篇。"
media_subpath: /assets/img/posts/cube-resistor
---

$$\require{physics}$$

<link rel="stylesheet" href="/assets/css/posts-custom.css">

> 《立方晶格等效電阻》系列：[第一篇](/posts/resistor-cube-1-node-voltage/) ｜ [第二篇](/posts/resistor-cube-2-kirchhoff/) ｜ [第三篇](/posts/resistor-cube-3-symmetry/) ｜ [第四篇](/posts/resistor-cube-4-group-theory/) ｜ [第五篇](/posts/resistor-cube-5-three-configurations/) ｜ [第六篇](/posts/resistor-cube-6-graph-theory/) ｜ **第七篇** ｜ [第八篇](/posts/resistor-cube-8-infinite-lattice/)

---

[第六篇](/posts/resistor-cube-6-graph-theory/)推導出電路方程式的矩陣形式：

$$L\mathbf{v} = \mathbf{i} \tag{$*$}\label{eq7:lvi}$$

其中 $L$ 是圖 Laplacian，$\mathbf{v}$ 是節點電位向量，$\mathbf{i}$ 是外部注入電流向量。

問題來了：$L$ 是**奇異矩陣**（$\ker L = \operatorname{span}\\{\mathbf{1}\\}$），所以直接取 $L^{-1}$ 並不存在。本文介紹兩種繞過這個障礙的方法，並推導出一個優雅的有效電阻閉合公式。

---

## 方法一：接地縮減法

**核心想法**：既然電壓是相對量，選一個節點當參考（接地），把它的電位強制設為零，就消除了不確定性。

設接地節點為 $b$（即 $v_b = 0$）。把第 $\eqref{eq7:lvi}$ 式的第 $b$ 列與第 $b$ 行同時刪去，得到一個 $(n-1)\times(n-1)$ 的**縮減 Laplacian** $L_\text{red}$：

$$L_\text{red}\,\mathbf{v}_\text{red} = \mathbf{i}_\text{red} \tag{1}\label{eq7:lred}$$

$L_\text{red}$ 是正定矩陣（連通圖 + 刪去一列一行），所以 $\eqref{eq7:lred}$ 有唯一解。

**計算 $R_\text{eff}(a,b)$** 的步驟：接地節點 $b$，在節點 $a$ 注入電流 $I$，解出 $\mathbf{v}_\text{red}$，則

$$R_\text{eff}(a,b) = \frac{v_a - v_b}{I} = \frac{v_a}{I}$$

### 與前五篇手算的對應

以正方體體對角線（$a=0$, $b=7$, $I=1$）為例。接地節點 7 後，把 $\tilde{L}$ 的第 8 列和第 8 行刪去，得到 $7\times7$ 的 $\tilde{L}_\text{red}$，右端向量 $\mathbf{i}_\text{red} = (1,0,0,0,0,0,0)^\top$。

其中節點 0 的那條方程式是：

$$3v_0 - v_1 - v_2 - v_4 = 1$$

節點 1（即座標 $(0,0,1)$，B 型）的方程式是：

$$-v_0 + 3v_1 - v_3 - v_5 = 0$$

這和[第一篇](/posts/resistor-cube-1-node-voltage/)手列的 KCL 完全一致——接地縮減法只是把同樣的物理方程式換了個矩陣的外衣。

---

## 方法二：Moore–Penrose 擬逆

接地法需要選定參考節點，而且每換一種連法就要重解一次線性聯立方程式。有沒有更通用的方式？

**答案是擬逆（pseudoinverse）**——對奇異矩陣定義一種「廣義逆」，保留非零特徵值方向上的逆，忽略零空間。

### 擬逆的定義

設 $n\times n$ 對稱矩陣 $L$ 的特徵分解為

$$L = Q\Lambda Q^\top, \qquad Q = [\mathbf{q}_0,\ldots,\mathbf{q}_{n-1}], \quad \Lambda = \operatorname{diag}(\lambda_0,\ldots,\lambda_{n-1})$$

其中 $Q$ 是正交矩陣（$Q^\top Q = I$），$\lambda_k$ 依大小排列，$\lambda_0 = 0$ 對應零空間方向的單位特徵向量 $\mathbf{q}_0 = \mathbf{1}/\sqrt{n}$（是常數向量，不是零向量），其餘 $\lambda_k > 0$。

**Moore–Penrose 擬逆** $L^+$ 定義為：把每個非零特徵值取倒數，零特徵值保留為零：

$$L^+ = Q\Lambda^+ Q^\top, \qquad (\Lambda^+)_{kk} = \begin{cases} 1/\lambda_k & \lambda_k \neq 0 \\ 0 & \lambda_k = 0 \end{cases}$$

### 關鍵性質

$$LL^+ = L^+L = I - \frac{1}{n}\mathbf{1}\mathbf{1}^\top =: P_\perp \tag{2}\label{eq7:proj}$$

$P_\perp$ 是「投影到 $\mathbf{1}$ 的正交補上」的投影矩陣。若 $\mathbf{x} \perp \mathbf{1}$（即 $\sum_i x_i = 0$），則 $P_\perp \mathbf{x} = \mathbf{x}$。

> **驗算式 $\eqref{eq7:proj}$**：$LL^+ = (Q\Lambda Q^\top)(Q\Lambda^+ Q^\top) = Q\Lambda\Lambda^+ Q^\top$。對角矩陣 $\Lambda\Lambda^+$ 的 $(k,k)$ 元素為 $\lambda_k \cdot (1/\lambda_k) = 1$（若 $\lambda_k\neq0$）或 $0 \cdot 0 = 0$（若 $\lambda_k=0$）。所以 $\Lambda\Lambda^+ = \operatorname{diag}(0,1,1,\ldots,1)$，即 $I - \mathbf{e}_0\mathbf{e}_0^\top$（以特徵向量為基底）。轉換回原始基底：$Q(I - \mathbf{e}_0\mathbf{e}_0^\top)Q^\top = I - \mathbf{q}_0\mathbf{q}_0^\top = I - \frac{1}{n}\mathbf{1}\mathbf{1}^\top$。$\square$

### 為什麼 $L^+\mathbf{i}$ 是 $L\mathbf{v}=\mathbf{i}$ 的解？

有效電阻問題的電流向量是 $\mathbf{i} = I(\mathbf{e}_a - \mathbf{e}_b)$，它的分量總和為零：

$$\sum_k i_k = I(1 - 1) = 0 \implies \mathbf{i} \perp \mathbf{1}$$

因此 $P_\perp\mathbf{i} = \mathbf{i}$，由式 $\eqref{eq7:proj}$：

$$L(L^+\mathbf{i}) = (LL^+)\mathbf{i} = P_\perp\mathbf{i} = \mathbf{i} \checkmark$$

所以 $\mathbf{v}^* := L^+\mathbf{i}$ 確實是 $L\mathbf{v} = \mathbf{i}$ 的一個解，且是**範數最小**（即「零均值電位」）的那個解。

### 有效電阻的閉合公式

設 $\mathbf{v}^* = L^+(I\cdot\chi)$，其中 $\chi = \mathbf{e}_a - \mathbf{e}_b$：

$$v^*_a - v^*_b = (\mathbf{e}_a - \mathbf{e}_b)^\top \mathbf{v}^* = \chi^\top L^+(I\chi) = I\cdot\chi^\top L^+\chi$$

因此：

$$\boxed{R_\text{eff}(a,b) = \frac{v_a - v_b}{I} = \chi^\top L^+\chi = (\mathbf{e}_a - \mathbf{e}_b)^\top L^+(\mathbf{e}_a - \mathbf{e}_b)}$$

對正方體（$L = \tilde{L}/R$），代入 $L^+ = R\tilde{L}^+$：

$$R_\text{eff}(a,b) = R\cdot(\mathbf{e}_a - \mathbf{e}_b)^\top \tilde{L}^+(\mathbf{e}_a - \mathbf{e}_b)$$

這個公式不需要對稱性假設，也不需要逐種連法重列方程——**有了 $\tilde{L}^+$，所有連法的答案都立即可讀**。

---

## Python 驗算

### 建立 $\tilde{L}$ 與擬逆

```python
import numpy as np

# 正方體節點 k ↔ 座標 (k₂, k₁, k₀)，k = 4k₂ + 2k₁ + k₀
n = 8
L = np.zeros((n, n))

for i in range(n):
    for j in range(i + 1, n):
        if (i ^ j) in (1, 2, 4):   # 恰好一個位元不同 → 相鄰
            L[i, j] = L[j, i] = -1.0
            L[i, i] += 1.0
            L[j, j] += 1.0

# Moore–Penrose 擬逆
L_plus = np.linalg.pinv(L)
```

### 兩種方法同時驗算

```python
def r_eff_pinv(a: int, b: int) -> float:
    """擬逆法：R_eff = χᵀ L⁺ χ（以 R 為單位）"""
    chi = np.zeros(n)
    chi[a], chi[b] = 1.0, -1.0
    return float(chi @ L_plus @ chi)

def r_eff_ground(a: int, b: int) -> float:
    """接地法：接地節點 b，注入電流 1 於節點 a"""
    keep = [k for k in range(n) if k != b]
    L_red = L[np.ix_(keep, keep)]
    rhs = np.zeros(n - 1)
    rhs[keep.index(a)] = 1.0
    v = np.linalg.solve(L_red, rhs)
    return float(v[keep.index(a)])

cases = [
    (0, 7, "體對角線 0→7", "5/6"),
    (0, 6, "面對角線 0→6", "3/4"),
    (0, 4, "稜邊     0→4", "7/12"),
]

print(f"{'連法':<18}  {'擬逆法':>9}  {'接地法':>9}  {'精確值':>8}")
print("-" * 52)
for a, b, name, exact in cases:
    print(f"{name:<18}  {r_eff_pinv(a,b):9.6f}  "
          f"{r_eff_ground(a,b):9.6f}  {exact:>8}")
```

輸出結果：

```
連法                  擬逆法       接地法       精確值
----------------------------------------------------
體對角線 0→7        0.833333   0.833333      5/6
面對角線 0→6        0.750000   0.750000      3/4
稜邊     0→4        0.583333   0.583333     7/12
```

兩種方法吻合，三種連法全部驗算正確。

### 全部 28 對節點

有了 `r_eff_pinv`，算出正方體全部 $\binom{8}{2} = 28$ 對節點的有效電阻只需幾行：

```python
from itertools import combinations

for a, b in combinations(range(n), 2):
    dist = bin(a ^ b).count('1')  # 漢明距離 = 圖距離
    r = r_eff_pinv(a, b)
    print(f"  {a}({a:03b})↔{b}({b:03b})  圖距離={dist}  R_eff={r:.6f} R")
```

觀察輸出後，有個美麗的規律：

| 圖距離（邊數） | $R_\text{eff}$ | 對數  |
| :------------: | :------------: | :---: |
|   1（稜邊）    |    $7R/12$     | 12 對 |
| 2（面對角線）  |     $3R/4$     | 12 對 |
| 3（體對角線）  |     $5R/6$     | 4 對  |

**$R_\text{eff}$ 只依賴圖距離，與節點的具體位置無關。** 這不是偶然：立方體圖是**距離遞移（distance-transitive）**的——對任意兩對圖距離相同的節點對 $(a,b)$ 和 $(a',b')$，存在圖自同構將前者送到後者，因此等效電阻必然相同。（只有頂點遞移是不夠的：那只保證每個頂點地位相同，不保證同距離的節點對彼此等價。）

---

## 正方體 Laplacian 的特徵譜

```python
eigs = np.sort(np.linalg.eigvalsh(L))
print(eigs.astype(int))  # 輸出：[0 2 2 2 4 4 4 6]
```

正方體的組合 Laplacian $\tilde{L}$ 的特徵值恰好是：

$$\lambda = 0^{(\times1)},\quad 2^{(\times3)},\quad 4^{(\times3)},\quad 6^{(\times1)}$$

這個整齊的結構源自正方體圖 $Q_3$（三維超立方體圖）的代數結構：$Q_3$ 是阿貝爾群 $(\mathbb{Z}_2)^3$ 的 Cayley 圖，其特徵值可由群的特徵標（characters）精確計算：

$$\lambda_{(a_1,a_2,a_3)} = \sum_{k=1}^{3}\bigl(1 - (-1)^{a_k}\bigr)$$

其中 $(a_1,a_2,a_3) \in (\mathbb{Z}_2)^3$ 索引特徵標。代入可得：
- $(0,0,0)$：$\lambda = 0$（常數模式，零空間）
- $(1,0,0),(0,1,0),(0,0,1)$：$\lambda = 2$（三重縮並）
- $(1,1,0),(1,0,1),(0,1,1)$：$\lambda = 4$（三重縮並）
- $(1,1,1)$：$\lambda = 6$（最高頻模式）

由此，$\tilde{L}^+$ 的非零特徵值為 $1/2, 1/4, 1/6$（各三重、三重、一重）。有效電阻公式的譜分解寫成：

$$R_\text{eff}(a,b) = R \sum_{\lambda_k \neq 0} \frac{1}{\lambda_k}\left[\mathbf{q}_k^\top(\mathbf{e}_a - \mathbf{e}_b)\right]^2$$

每一項都是「特徵模式 $\mathbf{q}_k$ 對電流向量 $\mathbf{e}_a - \mathbf{e}_b$ 的投影的平方，除以特徵值」。特徵值越大，對應的模式對 $R_\text{eff}$ 的貢獻越小——高頻模式（特徵值 6）對等效電阻影響最小。

---

## 小結

| 方法                       | 適用場景        | 計算量                 | 優點               |
| -------------------------- | --------------- | ---------------------- | ------------------ |
| 手算 KCL + 對稱性（篇①③⑤） | 小電路 + 高對稱 | $O(k^3)$，$k\ll n$     | 直覺清晰           |
| 接地縮減法                 | 單一連法        | $O(n^3)$（解線性系統） | 初學者易理解       |
| 擬逆法                     | 多種連法、通用  | $O(n^3)$（一次預算）   | 閉合公式，通用性強 |

三種方法在正確性上完全等價；擬逆法的優勢在於：**只需計算一次 $L^+$，就能回答任意連法的有效電阻問題**。

> **等效電阻的度量性質**：$R_\text{eff}$ 是頂點集上的**度量（metric）**：
> - $R_\text{eff}(a,a)=0$
> - $R_\text{eff}(a,b) = R_\text{eff}(b,a)$
> - 三角不等式：$R_\text{eff}(a,c) \leq R_\text{eff}(a,b) + R_\text{eff}(b,c)$
>
> 更深刻的結果：$\sqrt{R_\text{eff}}$ 可以等距嵌入到希爾伯特空間（Hilbert space）中，這讓它在機器學習與圖聚類中有廣泛應用。

**【系列待續】** 前七篇都在研究**有限**電路。[第八篇](/posts/resistor-cube-8-infinite-lattice/)將把問題推向極限：一個無限延伸的三維立方晶格，任意兩個相鄰節點之間的等效電阻是多少？這需要一套完全不同的工具——格點格林函數。
