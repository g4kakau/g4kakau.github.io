---
layout: post
title: "Trigonometric Symmetry Pairing: Why Does cos 2° + cos 4° + ... + cos 360° Equal 0?"
date: 2026-06-14 11:52:00 +0800
categories: [High School Math, Trigonometry]
tags: [trigonometry, symmetry, unit circle, high school math]
math: true
lang: en
translation_id: trig-symmetric-pairing
permalink: /en/posts/trig-symmetric-pairing/
description: "Starting from cos 2° + cos 4° + ... + cos 360° = 0, this article uses unit-circle symmetry to explain why long trigonometric sums cancel, how sine, cosine, and tangent behave differently, and how complementary-angle pairing solves common high-school problems."
---

$$\require{physics}$$

Chinese version: [三角函數的對稱配對](/posts/trig-symmetric-pairing/)

Consider the sum

$$
S=\cos2^\circ+\cos4^\circ+\cos6^\circ+\cdots+\cos360^\circ.
$$

There are 180 terms. None of them is individually zero, but the answer is

$$
\boxed{S=0}.
$$

If you try to compute the terms one by one, the problem is hopelessly long. But if you see the symmetry behind the expression, the answer becomes visible almost immediately. This article builds a useful intuition for symmetry in trigonometric sums, and then organizes several common high-school variations.

---

## Intuition: Equally Spaced Points on the Unit Circle

What is $\cos\theta$? It is the $x$-coordinate of the point at angle $\theta$ on the unit circle.

The angles

$$
2^\circ,\ 4^\circ,\ 6^\circ,\ \ldots,\ 360^\circ
$$

divide the circle into 180 equal parts, because $360^\circ=180\times2^\circ$.

Now picture these 180 points on the circle. Every point has an opposite point exactly $180^\circ$ away. For example, the point at $2^\circ$ is paired with the point at $182^\circ$, the point at $4^\circ$ is paired with the point at $184^\circ$, and so on.

The $x$-coordinates of opposite points are negatives of each other. This is the geometric meaning of

$$
\cos(\theta+180^\circ)=-\cos\theta.
$$

So the 180 points form 90 opposite pairs, and each pair contributes zero to the sum of the $x$-coordinates. Therefore the whole sum is zero.

Another way to say the same thing: the 180 equally spaced points are uniformly distributed around the circle, so their center of mass is the center of the circle, $(0,0)$. The average $x$-coordinate is zero, and the average $x$-coordinate is exactly the average of the cosine values.

---

## Formal Derivation: Pairing by Symmetry

Pair the terms in $S$ like this:

$$
(\cos2^\circ+\cos182^\circ)+(\cos4^\circ+\cos184^\circ)+\cdots+(\cos178^\circ+\cos358^\circ)+\cos180^\circ+\cos360^\circ.
$$

Using $\cos(\theta+180^\circ)=-\cos\theta$,

$$
\cos2^\circ+\cos182^\circ
=\cos2^\circ-\cos2^\circ
=0.
$$

Every opposite pair cancels. The two remaining terms are also harmless:

$$
\cos180^\circ+\cos360^\circ=-1+1=0.
$$

Therefore

$$
S=0.
$$

### When Does This Trick Work?

The key is not merely that a number divides $360$. The key is:

> The angles are equally spaced around the circle and complete a full turn.

Suppose the angles are

$$
d,\ 2d,\ 3d,\ \ldots,\ nd,
$$

and $nd=360^\circ$. Then these are the $n$ equally spaced points around the circle.

If $n$ is even, every point $\theta$ has its opposite point $\theta+180^\circ$ inside the same list. Thus

$$
\cos\theta+\cos(\theta+180^\circ)=0,
$$

so the entire sum cancels pair by pair.

Here is a warning example:

$$
\cos7^\circ+\cos14^\circ+\cdots+\cos357^\circ.
$$

Although $357^\circ=51\times7^\circ$, the number of terms is odd, and $357^\circ\neq360^\circ$. The angles do not complete a full circle in the same clean way, and there is no direct opposite-point pairing. Before using the shortcut, always check:

- Are the angles in an arithmetic progression?
- Does the list complete a whole number of turns?
- Is there an opposite point for every point?

---

## What About Sine and Tangent?

If we replace cosine by sine or tangent, the results are different. The reason is that the three functions behave differently under a $180^\circ$ shift:

| Function | $f(\theta+180^\circ)$ | Behavior in equally spaced sums |
| --- | --- | --- |
| $\sin$ | $-\sin\theta$ | Pairs cancel; sum is 0 |
| $\cos$ | $-\cos\theta$ | Pairs cancel; sum is 0 |
| $\tan$ | $\tan\theta$ | This pairing does not cancel |

### The Sine Case

The sine version works the same way:

$$
\sin2^\circ+\sin4^\circ+\cdots+\sin360^\circ=0.
$$

Geometrically, $\sin\theta$ is the $y$-coordinate on the unit circle. The equally spaced points have center of mass at the origin, so the sum of all $y$-coordinates is also zero.

### The Tangent Trap

Now consider

$$
\tan2^\circ+\tan4^\circ+\cdots+\tan360^\circ.
$$

This expression contains $\tan90^\circ$ and $\tan270^\circ$, where tangent is undefined. So the sum is not zero; the expression itself is undefined. This is a classic trap.

Avoiding the singular angles takes care with the step size too. For instance $\tan10^\circ+\tan20^\circ+\cdots+\tan170^\circ$ is **still not usable**: $90^\circ$ is a multiple of $10^\circ$, so $\tan90^\circ$ sneaks back in. A step of $20^\circ$ is safe:

$$
\tan20^\circ+\tan40^\circ+\cdots+\tan160^\circ.
$$

All eight terms are defined, and now a different symmetry applies:

$$
\tan(180^\circ-\theta)=-\tan\theta.
$$

This pairs $\tan20^\circ$ with $\tan160^\circ$, $\tan40^\circ$ with $\tan140^\circ$, and so on. The total sum is zero, but the pairing rule is different from the sine and cosine case.

---

## Another Symmetry: Complementary-Angle Pairing

High-school trigonometry often uses another kind of symmetry. A classic example is

$$
S=\sin^2 1^\circ+\sin^2 2^\circ+\cdots+\sin^2 90^\circ.
$$

This time we do not use a $180^\circ$ shift. We use the complementary-angle identity

$$
\sin(90^\circ-\theta)=\cos\theta.
$$

### Derivation

Write $S$ once in the original order:

$$
S=\sin^2 1^\circ+\sin^2 2^\circ+\cdots+\sin^2 89^\circ+\sin^2 90^\circ.
$$

Then write the same sum in reverse:

$$
S=\sin^2 90^\circ+\cos^2 1^\circ+\cos^2 2^\circ+\cdots+\cos^2 89^\circ,
$$

because $\sin89^\circ=\cos1^\circ$, $\sin88^\circ=\cos2^\circ$, and so on.

Add the two equations:

$$
2S=
\left(\sin^2 90^\circ+\sin^2 90^\circ\right)
+\sum_{k=1}^{89}\left(\sin^2 k^\circ+\cos^2 k^\circ\right).
$$

Using $\sin^2\theta+\cos^2\theta=1$,

$$
2S=2+89\times1=91,
$$

so

$$
\boxed{S=\frac{91}{2}}.
$$

### A Faster Pairing Method

Pair the angles from $1^\circ$ to $89^\circ$:

$$
(1^\circ,89^\circ),(2^\circ,88^\circ),\ldots,(44^\circ,46^\circ).
$$

Each pair gives

$$
\sin^2 k^\circ+\sin^2(90^\circ-k^\circ)
=\sin^2 k^\circ+\cos^2 k^\circ
=1.
$$

There are 44 such pairs, giving $44$. Then add the middle term $\sin^2 45^\circ=\dfrac12$ and the final term $\sin^2 90^\circ=1$:

$$
S=44+\frac12+1=\frac{91}{2}.
$$

### A General Template

Suppose your sum has the form

$$
S=\sum_{k=1}^{89}f(k^\circ),
$$

and you can find a constant $C$ such that

$$
f(\theta)+f(90^\circ-\theta)=C.
$$

Then complementary-angle pairing usually makes the sum short. The most common examples are

$$
\sin^2\theta+\cos^2\theta=1,
\qquad
\tan\theta\tan(90^\circ-\theta)=1.
$$

Many long trigonometric sums and products are really asking whether you can find the right symmetric angle: $90^\circ-\theta$, $180^\circ-\theta$, or $\theta+180^\circ$. Once you see the pairing, the amount of computation often drops to almost nothing.

---

## Summary: Three Symmetries to Recognize

| Symmetry | Formula | Typical Use |
| --- | --- | --- |
| Shift by $180^\circ$ | $\cos(\theta+180^\circ)=-\cos\theta$, $\sin(\theta+180^\circ)=-\sin\theta$, $\tan(\theta+180^\circ)=\tan\theta$ | Cancellation in equally spaced sine and cosine sums |
| Complement $90^\circ-\theta$ | $\sin(90^\circ-\theta)=\cos\theta$, $\tan(90^\circ-\theta)=\cot\theta$ | Pairing problems based on $\sin^2+\cos^2=1$ |
| Supplement $180^\circ-\theta$ | $\sin(180^\circ-\theta)=\sin\theta$, $\cos(180^\circ-\theta)=-\cos\theta$, $\tan(180^\circ-\theta)=-\tan\theta$ | Pairing tangent sums while avoiding undefined terms |

---

## Practice Problems

**A. Basic cancellation**  
These are all designed to cancel, but first check whether the angles complete a full circle.

1. $\cos1^\circ+\cos2^\circ+\cdots+\cos360^\circ$
2. $\sin10^\circ+\sin20^\circ+\cdots+\sin360^\circ$
3. $\cos15^\circ+\cos30^\circ+\cdots+\cos360^\circ$

**B. Square pairing**

4. $\sin^2 1^\circ+\sin^2 2^\circ+\cdots+\sin^2 89^\circ$
5. $\sin^2 10^\circ+\sin^2 20^\circ+\cdots+\sin^2 80^\circ$
6. $\cos^2 1^\circ+\cos^2 3^\circ+\cdots+\cos^2 89^\circ$

**C. Product pairing**

7. $\tan1^\circ\tan2^\circ\cdots\tan89^\circ$
8. $\tan5^\circ\tan10^\circ\cdots\tan85^\circ$

**D. Sign and definition traps**

9. $\tan20^\circ+\tan40^\circ+\cdots+\tan160^\circ$ (then ask: what breaks if the step is $10^\circ$?)
10. $\tan2^\circ+\tan4^\circ+\cdots+\tan360^\circ$  
    Check whether the expression is defined before trying to compute it.

**E. Challenge problems**

11. $\sin^2 1^\circ+\sin^2 2^\circ+\cdots+\sin^2 179^\circ$
12. $\cos^2 10^\circ+\cos^2 20^\circ+\cdots+\cos^2 360^\circ$

---

### Answers

1. $0$
2. $0$
3. $0$
4. $\dfrac{89}{2}$ (44 pairs of $1$, plus the middle term $\sin^2 45^\circ=\tfrac12$)
5. $4$
6. $\dfrac{45}{2}$
7. $1$
8. $1$
9. $0$ (with a $10^\circ$ step the sum would contain $\tan90^\circ$ and be undefined)
10. Undefined (it contains $\tan90^\circ$ and $\tan270^\circ$)
11. $90$ ($=2\times\dfrac{89}{2}+\sin^2 90^\circ$)
12. $18$
