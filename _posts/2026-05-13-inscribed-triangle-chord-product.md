---
layout: post
title: "用複數看穿幾何：正三角形外接圓的弦積極值"
date: 2026-05-13 00:00:00 +0800
categories: [高中數學, 複數]
tags: [複數, 幾何極值, 單位根, 外接圓, 競賽數學]
math: true
description: "正三角形 ABC 有外接圓，動點 P 在圓上，求 PA×PB×PC 的最大值。從幾何觀察、三角代換、坐標繪圖一路發現複數法，最後用單位根看穿答案 2r³。"
image:
  path: /assets/img/posts/equilateral-chord-product-setup.png
  alt: "正三角形 ABC 的外接圓上有動點 P，連接 PA、PB、PC 形成三條弦。"
---

$$\require{physics}$$

正三角形 $ABC$ 的外接圓半徑為 $r$，點 $P$ 在圓上移動。

**問：$\overline{PA} \times \overline{PB} \times \overline{PC}$ 的最大值是多少？**

這題一開始不必急著算。真正有趣的是：我們能不能先從圖形猜到答案，再一步步找出背後的理由？

---

## 解法一：幾何對稱法（先觀察）

先把半徑取為 $r=1$。拖動 $P$，觀察 $PA$、$PB$、$PC$ 和乘積的變化。

<div class="chord-viz chord-viz--observe" id="chord-observation-viz" data-cpv-mode="observe">
  <div class="chord-viz__stage" aria-label="正三角形外接圓弦積觀察圖"></div>
  <div class="chord-viz__controls">
    <label>角度 $\theta$</label>
    <input type="range" min="0" max="360" value="180" step="1" data-cpv-theta>
    <output data-cpv-theta-value>180°</output>
  </div>
  <div class="chord-viz__stats" aria-live="polite">
    <span>$PA=$ <strong data-cpv-pa>2.000</strong></span>
    <span>$PB=$ <strong data-cpv-pb>1.000</strong></span>
    <span>$PC=$ <strong data-cpv-pc>1.000</strong></span>
  </div>
  <div class="chord-viz__product" aria-live="polite">
    <div class="chord-viz__product-row">
      <span>$PA\cdot PB\cdot PC$</span>
      <strong data-cpv-product>2.000</strong>
    </div>
    <div class="chord-viz__bar" aria-hidden="true">
      <div class="chord-viz__bar-fill" data-cpv-product-bar></div>
    </div>
    <div class="chord-viz__bar-labels" aria-hidden="true">
      <span>0</span>
      <span>最大值 2</span>
    </div>
  </div>
</div>

圖形會暗示兩件事：

- 當 $P$ 跑到 $A$、$B$、$C$ 任一點時，乘積變成 $0$。
- 乘積最大時，$P$ 似乎落在某一段劣弧的中點，例如弧 $\widehat{BC}$ 的中點。

這個猜測很自然：正三角形有三重旋轉對稱，最大值應該出現在一個對三個頂點都「最公平」的位置。

設 $M$ 是劣弧 $\widehat{BC}$ 的中點。此時：

- $\overline{MA}$ 是外接圓直徑，所以 $\overline{MA}=2r$。
- $\angle MBA=\angle MCA=90^\circ$，因為直徑所對圓周角是直角。
- 弧 $\widehat{MB}$ 的圓心角是 $60^\circ$，所以 $\angle MAB=30^\circ$。
- 因此 $\triangle MBA$ 是 $30^\circ$-$60^\circ$-$90^\circ$ 直角三角形，$\overline{MB}=r$；同理 $\overline{MC}=r$。

所以這個特殊位置給出

$$
\overline{MA}\times\overline{MB}\times\overline{MC}
=2r\cdot r\cdot r
=2r^3.
$$

到這裡，我們得到一個漂亮猜測：

$$
\begin{equation}\label{eq:geometric-guess}
\max(\overline{PA}\,\overline{PB}\,\overline{PC}) \stackrel{?}{=} 2r^3.
\end{equation}
$$

但幾何直覺還不是完整證明。接下來我們用三角代換把整個函數算出來，檢查 \eqref{eq:geometric-guess} 這個猜測是否正確。

---

## 解法二：三角代換（把直覺補成證明）

因為圖形具有三重對稱，只要先討論 $P$ 在劣弧 $\widehat{BC}$ 上的情形即可。令

$$
\theta=\angle BAP,\qquad 0\leq \theta\leq 60^\circ.
$$

這時 $\angle CAP=60^\circ-\theta$。

### 2.1 先算 $PB$ 與 $PC$

在 $\triangle PBC$ 中，因為 $A,B,P,C$ 共圓，圓內接四邊形對角互補，所以

$$
\angle BPC=180^\circ-\angle BAC=120^\circ.
$$

又因為同弦所對圓周角相等：

$$
\angle BCP=\angle BAP=\theta,
\qquad
\angle CBP=\angle CAP=60^\circ-\theta.
$$

正三角形 $ABC$ 的邊長為

$$
\overline{BC}=\sqrt{3}r.
$$

對 $\triangle PBC$ 使用正弦定理：

$$
\frac{\overline{BC}}{\sin120^\circ}
=\frac{\overline{PB}}{\sin\theta}
=\frac{\overline{PC}}{\sin(60^\circ-\theta)}.
$$

由於 $\sin120^\circ=\dfrac{\sqrt3}{2}$，所以

$$
\frac{\overline{BC}}{\sin120^\circ}
=\frac{\sqrt3 r}{\sqrt3/2}
=2r.
$$

因此

$$
\overline{PB}=2r\sin\theta,
\qquad
\overline{PC}=2r\sin\qty(60^\circ-\theta).
$$

### 2.2 再算 $PA$

在 $\triangle ABP$ 中，

$$
\angle BAP=\theta.
$$

而 $\angle APB$ 對到的是弧 $\widehat{AB}$，正三角形的外接圓上，弧 $\widehat{AB}$ 的圓心角是 $120^\circ$，所以

$$
\angle APB=60^\circ.
$$

因此

$$
\angle ABP
=180^\circ-\theta-60^\circ
=120^\circ-\theta.
$$

再對 $\triangle ABP$ 用正弦定理：

$$
\frac{\overline{PA}}{\sin\qty(120^\circ-\theta)}
=\frac{\overline{AB}}{\sin60^\circ}
=\frac{\sqrt3 r}{\sqrt3/2}
=2r.
$$

所以

$$
\overline{PA}=2r\sin\qty(120^\circ-\theta).
$$

### 2.3 乘起來並化簡

令

$$
\alpha=60^\circ-\theta.
$$

則三段長分別可以寫成

$$
\overline{PB}=2r\sin\qty(60^\circ-\alpha),
$$

$$
\overline{PC}=2r\sin\alpha,
$$

$$
\overline{PA}=2r\sin\qty(60^\circ+\alpha).
$$

所以乘積為

$$
\begin{aligned}
\overline{PA}\,\overline{PB}\,\overline{PC}
&=8r^3
\sin\alpha
\sin\qty(60^\circ+\alpha)
\sin\qty(60^\circ-\alpha).
\end{aligned}
$$

接著使用一個三角乘積恆等式：

$$
\begin{equation}\label{eq:trig-product-identity}
\sin\alpha\sin\qty(60^\circ+\alpha)\sin\qty(60^\circ-\alpha)
=\frac14\sin3\alpha.
\end{equation}
$$

如果這個公式看起來有點突然，不用把它當成冷門公式硬背；它可以從基本的和差角公式與三倍角公式導出，見後面的附錄 \eqref{eq:trig-product-identity-derived}。

把 \eqref{eq:trig-product-identity} 代回乘積：

$$
\begin{equation}\label{eq:trig-product-result}
\overline{PA}\,\overline{PB}\,\overline{PC}
=8r^3\cdot\frac14\sin3\alpha
=2r^3\sin3\alpha.
\end{equation}
$$

因為 $0\leq\alpha\leq60^\circ$，所以 $0\leq3\alpha\leq180^\circ$，因此 \eqref{eq:trig-product-result} 的最大值為

$$
\boxed{2r^3}.
$$

等號在 $\sin3\alpha=1$ 時成立，也就是

$$
3\alpha=90^\circ
\quad\Rightarrow\quad
\alpha=30^\circ
\quad\Rightarrow\quad
\theta=30^\circ.
$$

這正是我們一開始觀察到的弧 $\widehat{BC}$ 中點。

---

## 解法三：坐標參數化（用圖形發現規律）

另一條路是完全代數化。把外接圓圓心放在原點：

$$
A=(r,0),\quad
B=\left(-\frac r2,\frac{\sqrt3 r}{2}\right),\quad
C=\left(-\frac r2,-\frac{\sqrt3 r}{2}\right),
$$

並令

$$
P=(r\cos x,r\sin x).
$$

用弦長公式，圓上兩點夾角若為 $\phi$，距離就是 $2r\abs{\sin\qty(\dfrac{\phi}{2})}$。因此

$$
\overline{PA}=2r\abs{\sin\frac{x}{2}},
$$

$$
\overline{PB}=2r\abs{\sin\qty(\frac{x}{2}-60^\circ)},
$$

$$
\overline{PC}=2r\abs{\sin\qty(\frac{x}{2}-120^\circ)}.
$$

所以

$$
\begin{aligned}
f(x)
&=\overline{PA}\,\overline{PB}\,\overline{PC}\\
&=8r^3\abs{
\sin\frac{x}{2}\cdot
\sin\qty(\frac{x}{2}-60^\circ)\cdot
\sin\qty(\frac{x}{2}-120^\circ)
}.
\end{aligned}
$$

套用同一個三角恆等式 \eqref{eq:trig-product-identity}，可得

$$
\begin{equation}\label{eq:coordinate-product-result}
f(x)=2r^3\abs{\sin\frac{3x}{2}}.
\end{equation}
$$

這裡很值得停一下。坐標法的好處不只是「能算」，還能讓我們用繪圖看見規律：原本三段弦長的乘積，最後竟然變成一條簡單的正弦曲線。

<iframe src="https://www.desmos.com/calculator/jab1cl56wv?embed" width="400" height="400" style="border: 1px solid #ccc; max-width: 100%;" frameborder="0"></iframe>

紫色曲線的峰值就是 $2r^3$。但 \eqref{eq:coordinate-product-result} 也帶出一個新問題：為什麼三個距離的乘積，會突然收斂成 $\sin(3x/2)$ 這種「三倍角」結構？

這正是複數法要回答的事。

---

## 解法四：複數法（看見背後的結構）

前面的坐標法讓我們懷疑：這題背後應該有某種三重對稱的代數結構。複數剛好可以把「圓上的旋轉」和「距離」放在同一個語言裡。

把三個頂點和動點都用複數表示：

$$
z_A=r,\quad
z_B=re^{i2\pi/3},\quad
z_C=re^{i4\pi/3},\quad
z_P=re^{i\theta}.
$$

線段長就是複數差的模：

$$
\overline{PA}=r\abs{e^{i\theta}-1},
$$

$$
\overline{PB}=r\abs{e^{i\theta}-e^{i2\pi/3}},
$$

$$
\overline{PC}=r\abs{e^{i\theta}-e^{i4\pi/3}}.
$$

所以

$$
\boxed{
\overline{PA}\,\overline{PB}\,\overline{PC}
=r^3
\abs{\left(e^{i\theta}-1\right)\left(e^{i\theta}-e^{i2\pi/3}\right)\left(e^{i\theta}-e^{i4\pi/3}\right)}
}
$$

現在關鍵來了：

$$
1,\ e^{i2\pi/3},\ e^{i4\pi/3}
$$

正是方程式 $z^3=1$ 的三個根，所以

$$
(z-1)\left(z-e^{i2\pi/3}\right)\left(z-e^{i4\pi/3}\right)=z^3-1.
$$

令 $z=e^{i\theta}$，得到

$$
\begin{equation}\label{eq:complex-product-result}
\overline{PA}\,\overline{PB}\,\overline{PC}
=r^3\abs{e^{i3\theta}-1}.
\end{equation}
$$

這就是整題最漂亮的一步：三條弦長的乘積，被壓縮成單位圓上兩點之間的一條距離。

<div class="chord-viz chord-viz--complex" id="chord-product-viz" data-cpv-mode="complex">
  <div class="chord-viz__stage" aria-label="複數法弦積互動圖"></div>
  <div class="chord-viz__controls">
    <label>角度 $\theta$</label>
    <input type="range" min="0" max="360" value="180" step="1" data-cpv-theta>
    <output data-cpv-theta-value>180°</output>
  </div>
  <div class="chord-viz__stats" aria-live="polite">
    <span>$PA=$ <strong data-cpv-pa>2.000</strong></span>
    <span>$PB=$ <strong data-cpv-pb>1.000</strong></span>
    <span>$PC=$ <strong data-cpv-pc>1.000</strong></span>
    <span>$\abs{z^3-1}=$ <strong data-cpv-cubic>2.000</strong></span>
  </div>
  <div class="chord-viz__product" aria-live="polite">
    <div class="chord-viz__product-row">
      <span>$PA\cdot PB\cdot PC$</span>
      <strong data-cpv-product>2.000</strong>
    </div>
    <div class="chord-viz__bar" aria-hidden="true">
      <div class="chord-viz__bar-fill" data-cpv-product-bar></div>
    </div>
    <div class="chord-viz__bar-labels" aria-hidden="true">
      <span>0</span>
      <span>最大值 2</span>
    </div>
  </div>
</div>

<script defer src="/assets/js/posts/chord-product-viz.js"></script>

從右圖看，\eqref{eq:complex-product-result} 的 $e^{i3\theta}$ 仍在單位圓上跑，而 $1$ 是固定點。單位圓上離 $1$ 最遠的點是 $-1$，距離就是直徑 $2$。

因此

$$
\abs{e^{i3\theta}-1}\leq2,
$$

所以

$$
\boxed{
\max(\overline{PA}\,\overline{PB}\,\overline{PC})=2r^3.
}
$$

---

## 附錄：三角恆等式怎麼來？

前面用到的 \eqref{eq:trig-product-identity} 不需要硬背。它其實只是在做兩件事：先把 $\sin\qty(60^\circ+\alpha)\sin\qty(60^\circ-\alpha)$ 合併，再用三倍角公式。

由和差角公式：

$$
\begin{aligned}
\sin\qty(60^\circ+\alpha)
&=\sin60^\circ\cos\alpha+\cos60^\circ\sin\alpha,\\
\sin\qty(60^\circ-\alpha)
&=\sin60^\circ\cos\alpha-\cos60^\circ\sin\alpha.
\end{aligned}
$$

兩式相乘，利用 $(u+v)(u-v)=u^2-v^2$：

$$
\begin{aligned}
\sin\qty(60^\circ+\alpha)\sin\qty(60^\circ-\alpha)
&=\sin^260^\circ\cos^2\alpha-\cos^260^\circ\sin^2\alpha\\
&=\frac34\cos^2\alpha-\frac14\sin^2\alpha\\
&=\frac34\qty(1-\sin^2\alpha)-\frac14\sin^2\alpha\\
&=\frac34-\sin^2\alpha.
\end{aligned}
$$

再乘上一個 $\sin\alpha$：

$$
\begin{aligned}
\sin\alpha\sin\qty(60^\circ+\alpha)\sin\qty(60^\circ-\alpha)
&=\sin\alpha\qty(\frac34-\sin^2\alpha)\\
&=\frac14\qty(3\sin\alpha-4\sin^3\alpha).
\end{aligned}
$$

最後用三倍角公式

$$
\sin3\alpha=3\sin\alpha-4\sin^3\alpha,
$$

就得到

$$
\begin{equation}\label{eq:trig-product-identity-derived}
\sin\alpha\sin\qty(60^\circ+\alpha)\sin\qty(60^\circ-\alpha)
=\frac14\sin3\alpha.
\end{equation}
$$

所以這個看似冷門的公式，其實只是和差角公式加上三倍角公式。

---

## 四種解法比較

| 解法       | 一開始看見什麼       | 核心工具         | 特色                       |
| ---------- | -------------------- | ---------------- | -------------------------- |
| 幾何對稱   | 最大點應在弧中點     | 對稱性、圓周角   | 最有直覺，但需要補證       |
| 三角代換   | 把弦長逐一算出來     | 正弦定理、三倍角 | 嚴謹，能證明猜測           |
| 坐標參數化 | 乘積像一條正弦曲線   | 弦長公式、繪圖   | 讓規律浮現                 |
| 複數法     | 三個頂點是三次單位根 | $z^3-1$          | 最能解釋為什麼會出現三倍角 |

這題最有意思的地方，不只是答案 $2r^3$。更重要的是解題路線本身：先用圖形猜，再用三角法驗證，再由坐標圖形發現三倍角，最後用複數和單位根看穿整個結構。
