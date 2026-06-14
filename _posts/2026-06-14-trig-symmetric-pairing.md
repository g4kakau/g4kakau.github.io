---
layout: post
title: "三角函數的對稱配對：為什麼 cos2°+cos4°+⋯+cos360°=0？"
date: 2026-06-14 00:00:00 +0800
categories: [高中數學, 三角函數]
tags: [三角函數, 對稱性, 單位圓, 學測, 高中數學]
math: true
description: "從 cos2°+cos4°+⋯+cos360°=0 出發，用單位圓的對稱性解釋三角函數和式為什麼會抵消。涵蓋 sin、cos、tan 的不同對稱規則，以及 sin²1°+⋯+sin²90°=91/2 這類餘角配對題的萬用模板，並附分層練習。"
---

$$\require{physics}$$

來看一個式子：

$$
S=\cos2^\circ+\cos4^\circ+\cos6^\circ+\cdots+\cos360^\circ
$$

一共 180 項，每項都不是 0，但答案卻是

$$
\boxed{S=0}
$$

如果一項一項算，這題永遠做不完。但如果看穿背後的**對稱性**，這題用眼睛就能看出答案。這篇文章要建立一套看穿「三角函數和式對稱性」的直覺，順便整理高中最愛考的幾種變形。

---

## 直覺：單位圓上的等分點

$\cos\theta$ 是什麼？是單位圓上、角度為 $\theta$ 的點的 $x$ 座標。

$$
2^\circ,\ 4^\circ,\ 6^\circ,\ \ldots,\ 360^\circ
$$

這 180 個角度，是把整個圓**平均切成 180 份**的等分點（因為 $360^\circ=180\times2^\circ$）。

把這 180 個點畫在圓上，你會發現：**每個點都有一個正好相差 $180^\circ$ 的「對面點」**。例如 $2^\circ$ 的對面是 $182^\circ$，$4^\circ$ 的對面是 $184^\circ$，以此類推。

而對面點的 $x$ 座標恰好是**相反數**——這就是

$$
\cos(\theta+180^\circ)=-\cos\theta
$$

的幾何意義。180 個點兩兩配成 90 對，每對的 $x$ 座標相加都是 0，所以總和是 0。

> **更直觀的說法**：這 180 個等分點均勻分布在整個圓上，它們的「重心」就是圓心，也就是原點 $(0,0)$。重心的 $x$ 座標當然是 0——而所有點的 $x$ 座標平均值，正是 $\cos\theta$ 的平均。

---

## 正式推導：對稱配對法

把 $S$ 的 180 項兩兩配對：

$$
(\cos2^\circ+\cos182^\circ)+(\cos4^\circ+\cos184^\circ)+\cdots+(\cos178^\circ+\cos358^\circ)+\cos180^\circ+\cos360^\circ
$$

利用 $\cos(\theta+180^\circ)=-\cos\theta$：

$$
\cos2^\circ+\cos182^\circ=\cos2^\circ-\cos2^\circ=0
$$

每一對都是 0。剩下 $\cos180^\circ=-1$ 和 $\cos360^\circ=1$，相加也是 0。所以

$$
S=0
$$

### 推廣：什麼時候可以這樣配對？

關鍵不是「360 的因數」，而是：

> **這些角度在圓周上等間隔分布，而且恰好繞滿一圈。**

設角度是等差數列 $d,2d,\ldots,nd$，且 $nd=360^\circ$。這代表每隔 $d$ 取一個點，總共取了 $n$ 個點，剛好繞完一圈——也就是圓的 $n$ 等分點。

只要 $n$ 是**偶數**，每個點 $\theta$ 都能找到對面點 $\theta+180^\circ$ 也在這 $n$ 個點之中，於是

$$
\cos\theta+\cos(\theta+180^\circ)=0
$$

兩兩抵消，總和為 0。

**反例提醒**：

$$
\cos7^\circ+\cos14^\circ+\cdots+\cos357^\circ
$$

雖然 $357^\circ=51\times7^\circ$，但 $51$ 是奇數，而且 $357^\circ\neq360^\circ$——這串角度**沒有繞滿一圈**，也不是偶數個等分點，不能直接套用上面的結論。判斷「能不能秒殺」之前，務必先確認：是不是等差數列？最後一項是不是恰好回到 $360^\circ$（或繞了整數圈）？等分點總數是不是偶數？

---

## sin 和 tan 呢？

同樣的問題換成 $\sin$ 和 $\tan$，結果完全不同。原因在於三個函數在「平移 $180^\circ$」下的行為不一樣：

| 函數 | $f(\theta+180^\circ)$ | 在等分點和式中的行為 |
|---|---|---|
| $\sin$ | $-\sin\theta$ | 兩兩抵消，和為 0 |
| $\cos$ | $-\cos\theta$ | 兩兩抵消，和為 0 |
| $\tan$ | $\tan\theta$（**不變**） | 無法用此法消去 |

### sin 的情況

完全同理：

$$
\sin2^\circ+\sin4^\circ+\cdots+\sin360^\circ=0
$$

幾何上更直接——$\sin\theta$ 是 $y$ 座標，180 個等分點的重心在原點，所有 $y$ 座標加總自然是 0。

### tan 的陷阱

$$
\tan2^\circ+\tan4^\circ+\cdots+\tan360^\circ
$$

這個和式中含有 $\tan90^\circ$ 與 $\tan270^\circ$，而**正切函數在這兩點沒有定義**。所以這個式子根本**沒有意義**，答案不是 0，而是「未定義」。這是命題者最愛的陷阱之一。

如果避開這些奇點，例如

$$
\tan10^\circ+\tan20^\circ+\cdots+\tan170^\circ
$$

則可以改用

$$
\tan(180^\circ-\theta)=-\tan\theta
$$

把 $\tan10^\circ$ 與 $\tan170^\circ$ 配對成 0，最後總和仍是 0——但配對的規則和 $\sin,\cos$ 不同，要特別小心。

---

## 另一種對稱：餘角配對

高中考題中還有一類經典題型，例如：

$$
S=\sin^2 1^\circ+\sin^2 2^\circ+\cdots+\sin^2 90^\circ
$$

這次用的不是「平移 $180^\circ$」，而是**餘角關係**

$$
\sin(90^\circ-\theta)=\cos\theta
$$

### 推導

把 $S$ 倒過來寫一次：

$$
S=\sin^2 1^\circ+\sin^2 2^\circ+\cdots+\sin^2 89^\circ+\sin^2 90^\circ
$$

$$
S=\sin^2 90^\circ+\cos^2 1^\circ+\cos^2 2^\circ+\cdots+\cos^2 89^\circ
$$

（因為 $\sin89^\circ=\cos1^\circ$，$\sin88^\circ=\cos2^\circ$，依此類推）

兩式相加：

$$
2S=\left(\sin^2 90^\circ+\sin^2 90^\circ\right)+\sum_{k=1}^{89}\left(\sin^2 k^\circ+\cos^2 k^\circ\right)
$$

利用畢氏關係 $\sin^2\theta+\cos^2\theta=1$：

$$
2S=2+89\times1=91 \implies S=\frac{91}{2}
$$

### 更快的配對法

把 $1^\circ$ 到 $89^\circ$ 配成 44 對：

$$
(1^\circ,89^\circ),(2^\circ,88^\circ),\ldots,(44^\circ,46^\circ)
$$

每對 $\sin^2k^\circ+\sin^2(90^\circ-k^\circ)=\sin^2k^\circ+\cos^2k^\circ=1$，共 44 對 $=44$。再加上中間的 $\sin^2 45^\circ=\dfrac12$ 與最後的 $\sin^2 90^\circ=1$：

$$
S=44+\frac12+1=\frac{91}{2}
$$

### 萬用模板

只要你的和式形如

$$
S=\sum_{k=1}^{89}f(k^\circ)
$$

並且能找到一個常數 $C$ 使得

$$
f(\theta)+f(90^\circ-\theta)=C
$$

那麼配對後就能秒殺。最常見的例子：

$$
\sin^2\theta+\cos^2\theta=1,\qquad \tan\theta\tan(90^\circ-\theta)=1
$$

很多看起來很長的三角函數和式或積式，其實都在考你能不能找到 $90^\circ-\theta$、$180^\circ-\theta$、$\theta+180^\circ$ 這些**對稱角**。一旦看穿，計算量通常瞬間掉到十分之一。

---

## 總結：三種對稱關係一覽

| 對稱關係 | 公式 | 典型用途 |
|---|---|---|
| 平移 $180^\circ$ | $\cos(\theta+180^\circ)=-\cos\theta$，$\sin(\theta+180^\circ)=-\sin\theta$，$\tan(\theta+180^\circ)=\tan\theta$ | 等分點和式抵消（$\cos$、$\sin$ 可消，$\tan$ 不可） |
| 餘角 $90^\circ-\theta$ | $\sin(90^\circ-\theta)=\cos\theta$，$\tan(90^\circ-\theta)=\cot\theta$ | $\sin^2+\cos^2=1$ 型配對 |
| 補角 $180^\circ-\theta$ | $\sin(180^\circ-\theta)=\sin\theta$，$\cos(180^\circ-\theta)=-\cos\theta$，$\tan(180^\circ-\theta)=-\tan\theta$ | $\tan$ 系列和式的配對工具 |

---

## 練習題

**A. 基礎抵消型**（皆等於 0，留意是否繞滿整圈）

1. $\cos1^\circ+\cos2^\circ+\cdots+\cos360^\circ$
2. $\sin10^\circ+\sin20^\circ+\cdots+\sin360^\circ$
3. $\cos15^\circ+\cos30^\circ+\cdots+\cos360^\circ$

**B. 平方配對型**

4. $\sin^2 1^\circ+\sin^2 2^\circ+\cdots+\sin^2 89^\circ$
5. $\sin^2 10^\circ+\sin^2 20^\circ+\cdots+\sin^2 80^\circ$
6. $\cos^2 1^\circ+\cos^2 3^\circ+\cdots+\cos^2 89^\circ$

**C. 乘積配對型**

7. $\tan1^\circ\tan2^\circ\cdots\tan89^\circ$
8. $\tan5^\circ\tan10^\circ\cdots\tan85^\circ$

**D. 正負號陷阱型**

9. $\tan10^\circ+\tan20^\circ+\cdots+\tan170^\circ$
10. $\tan2^\circ+\tan4^\circ+\cdots+\tan360^\circ$（先檢查是否有意義）

**E. 給程度好的挑戰題**

11. $\sin^2 1^\circ+\sin^2 2^\circ+\cdots+\sin^2 179^\circ$
12. $\cos^2 10^\circ+\cos^2 20^\circ+\cdots+\cos^2 360^\circ$

---

### 答案

1. $0$
2. $0$
3. $0$
4. $44$
5. $4$
6. $\dfrac{45}{2}$
7. $1$
8. $1$
9. $0$
10. 無意義（含 $\tan90^\circ$ 與 $\tan270^\circ$）
11. $89$
12. $18$
