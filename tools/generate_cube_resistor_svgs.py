#!/usr/bin/env python3
"""Generate static SVG figures for the resistor cube series.

The articles carry captions and longer explanations. These SVGs stay atomic:
one diagram, one idea, minimal text. Every figure is exported as
Traditional Chinese / English and light / dark variants for Chirpy.
"""

from __future__ import annotations

from dataclasses import dataclass
import html
from pathlib import Path
from typing import Callable


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "img" / "posts"

W, H = 960, 540


THEMES = {
    "light": {
        "bg": "#ffffff",
        "panel": "#f8fafc",
        "panel2": "#eef2f7",
        "ink": "#172033",
        "muted": "#64748b",
        "edge": "#334155",
        "grid": "#d7dee8",
        "accent": "#2563eb",
        "accent2": "#d97706",
        "a": "#475569",
        "b": "#2563eb",
        "c": "#0f766e",
        "h": "#6d28d9",
        "warn": "#b42318",
        "good": "#0f766e",
    },
    "dark": {
        "bg": "#0b1120",
        "panel": "#111827",
        "panel2": "#1e293b",
        "ink": "#e5e7eb",
        "muted": "#9aa7b8",
        "edge": "#cbd5e1",
        "grid": "#334155",
        "accent": "#60a5fa",
        "accent2": "#f59e0b",
        "a": "#64748b",
        "b": "#60a5fa",
        "c": "#34d399",
        "h": "#a78bfa",
        "warn": "#f87171",
        "good": "#34d399",
    },
}


@dataclass(frozen=True)
class Cfg:
    lang: str
    mode: str

    @property
    def c(self) -> dict[str, str]:
        return THEMES[self.mode]


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def tr(cfg: Cfg, zh: str, en: str) -> str:
    return zh if cfg.lang == "zh" else en


def svg_shell(cfg: Cfg, body: str, title: str) -> str:
    c = cfg.c
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title">
  <title id="title">{esc(title)}</title>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="{c['accent']}"/>
    </marker>
    <marker id="arrow2" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="{c['accent2']}"/>
    </marker>
    <marker id="arrow-edge" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="{c['edge']}"/>
    </marker>
    <marker id="arrow-warn" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="{c['warn']}"/>
    </marker>
  </defs>
  <style>
    text {{
      font-family: "Noto Sans TC", "Noto Sans CJK TC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      fill: {c['ink']};
    }}
    .label {{ font-size: 22px; font-weight: 700; }}
    .small {{ font-size: 18px; }}
    .tiny {{ font-size: 15px; }}
    .math {{ font-size: 24px; font-weight: 650; }}
    .muted {{ fill: {c['muted']}; }}
    .edge {{ stroke: {c['edge']}; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; fill: none; }}
    .thin {{ stroke: {c['grid']}; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; fill: none; }}
    .dash {{ stroke-dasharray: 8 8; }}
    .panel {{ fill: {c['panel']}; stroke: {c['grid']}; stroke-width: 2; }}
    .panel2 {{ fill: {c['panel2']}; stroke: {c['grid']}; stroke-width: 2; }}
  </style>
  <rect width="{W}" height="{H}" fill="{c['bg']}"/>
{body}
</svg>
"""


def text(x: float, y: float, value: str, cls: str = "small", anchor: str = "start", color: str | None = None) -> str:
    style = f' style="fill:{color}"' if color else ""
    return f'<text x="{x:.1f}" y="{y:.1f}" class="{cls}" text-anchor="{anchor}"{style}>{esc(value)}</text>'


def line(x1: float, y1: float, x2: float, y2: float, cls: str = "edge") -> str:
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" class="{cls}"/>'


def path(d: str, color: str, width: int = 4, marker: str | None = None, dash: bool = False) -> str:
    marker_attr = f' marker-end="url(#{marker})"' if marker else ""
    dash_attr = ' stroke-dasharray="8 8"' if dash else ""
    return f'<path d="{d}" stroke="{color}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round" fill="none"{dash_attr}{marker_attr}/>'


def rect(x: int, y: int, w: int, h: int, cfg: Cfg, cls: str = "panel", rx: int = 16) -> str:
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" class="{cls}"/>'


def circle_node(
    cfg: Cfg,
    x: float,
    y: float,
    r: int,
    fill: str,
    label: str = "",
    label_color: str = "white",
    stroke: str | None = None,
) -> str:
    c = cfg.c
    stroke = stroke or c["bg"]
    label_svg = ""
    if label:
        label_svg = text(x, y + 7, label, "small", "middle", label_color)
    return f"""<g>
    <circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="4"/>
    {label_svg}
  </g>"""


def cube_geometry(dx=250, dy=-35, ux=-165, uy=-125, vx=0, vy=-230, ox=355, oy=455):
    pts: dict[tuple[int, int, int], tuple[float, float]] = {}
    for x in (0, 1):
        for y in (0, 1):
            for z in (0, 1):
                pts[(x, y, z)] = (ox + x * dx + y * ux + z * vx, oy + x * dy + y * uy + z * vy)

    edges: list[tuple[tuple[int, int, int], tuple[int, int, int]]] = []
    nodes = [(x, y, z) for x in (0, 1) for y in (0, 1) for z in (0, 1)]
    for u in nodes:
        for i in range(3):
            v = list(u)
            v[i] = 1 - v[i]
            v_tuple = tuple(v)
            if u < v_tuple:
                edges.append((u, v_tuple))
    return pts, edges


def class_label(v: tuple[int, int, int]) -> str:
    return ["A", "B", "C", "H"][sum(v)]


def class_color(cfg: Cfg, v: tuple[int, int, int]) -> str:
    return [cfg.c["a"], cfg.c["b"], cfg.c["c"], cfg.c["h"]][sum(v)]


def draw_cube(
    cfg: Cfg,
    *,
    ox: int = 355,
    oy: int = 455,
    scale: float = 1.0,
    class_nodes: bool = True,
    highlight: set[tuple[int, int, int]] | None = None,
    labels: bool = True,
    faded: bool = False,
) -> tuple[str, dict[tuple[int, int, int], tuple[float, float]]]:
    dx, dy = 250 * scale, -35 * scale
    ux, uy = -165 * scale, -125 * scale
    vx, vy = 0, -230 * scale
    pts, edges = cube_geometry(dx, dy, ux, uy, vx, vy, ox, oy)
    c = cfg.c
    edge_color = c["grid"] if faded else c["edge"]
    a, h = pts[(0, 0, 0)], pts[(1, 1, 1)]
    parts = [f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{h[0]:.1f}" y2="{h[1]:.1f}" class="thin dash"/>']
    parts.extend(
        f'<line x1="{pts[u][0]:.1f}" y1="{pts[u][1]:.1f}" x2="{pts[v][0]:.1f}" y2="{pts[v][1]:.1f}" stroke="{edge_color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>'
        for u, v in edges
    )
    draw_order = [(0, 1, 1), (1, 1, 1), (0, 0, 1), (1, 0, 1), (0, 1, 0), (1, 1, 0), (0, 0, 0), (1, 0, 0)]
    highlight = highlight or set()
    for v in draw_order:
        fill = class_color(cfg, v) if class_nodes else c["panel2"]
        label_color = "white" if class_nodes or v in highlight else c["ink"]
        if highlight and v not in highlight:
            fill = c["panel2"]
            label_color = c["muted"]
        radius = 17 if v not in highlight else 22
        parts.append(circle_node(cfg, *pts[v], radius, fill, class_label(v) if labels else "", label_color, c["bg"]))
    return "\n".join(parts), pts


def segment_label(cfg: Cfg, x: int, y: int, value: str) -> str:
    c = cfg.c
    return f"""<g>
    <rect x="{x - 58}" y="{y - 24}" width="116" height="40" rx="10" fill="{c['bg']}" stroke="{c['grid']}" stroke-width="2"/>
    {text(x, y + 5, value, "small", "middle", c["ink"])}
  </g>"""


def fig1_node_classification(cfg: Cfg) -> str:
    title = tr(cfg, "正方體節點分類", "Node classes in the cube")
    cube, _ = draw_cube(cfg, ox=360, oy=460, scale=0.88)
    c = cfg.c
    rows = [
        ("A", tr(cfg, "端點", "terminal"), c["a"]),
        ("B", tr(cfg, "3 個等位節點", "3 equal-potential nodes"), c["b"]),
        ("C", tr(cfg, "3 個等位節點", "3 equal-potential nodes"), c["c"]),
        ("H", tr(cfg, "端點", "terminal"), c["h"]),
    ]
    legend = []
    for i, (letter, label, color) in enumerate(rows):
        y = 190 + i * 52
        legend.append(circle_node(cfg, 675, y - 8, 14, color, letter))
        legend.append(text(705, y, label, "small"))
    body = f"""
  <g transform="translate(15,-8)">
    {cube}
  </g>
  {text(650, 135, title, "label")}
  {''.join(legend)}
"""
    return svg_shell(cfg, body, title)


def fig1_kcl_representatives(cfg: Cfg) -> str:
    title = tr(cfg, "代表節點的 KCL 鄰居", "Neighbor nodes for representative KCL")
    c = cfg.c
    b_title = tr(cfg, "B 型代表", "B representative")
    c_title = tr(cfg, "C 型代表", "C representative")
    body = f"""
  {rect(70, 80, 385, 385, cfg)}
  {rect(505, 80, 385, 385, cfg)}
  {text(262, 130, b_title, "label", "middle")}
  {text(697, 130, c_title, "label", "middle")}
  <g>
    {line(265, 265, 155, 265)}
    {line(265, 265, 365, 205)}
    {line(265, 265, 365, 335)}
    {circle_node(cfg, 265, 265, 28, c["b"], "B")}
    {circle_node(cfg, 155, 265, 23, c["a"], "A")}
    {circle_node(cfg, 365, 205, 23, c["c"], "C")}
    {circle_node(cfg, 365, 335, 23, c["c"], "C")}
    {text(155, 318, "V=1", "tiny", "middle", c["muted"])}
    {text(265, 318, "V=b", "tiny", "middle", c["muted"])}
    {text(392, 202, "V=c", "tiny", "start", c["muted"])}
    {text(392, 342, "V=c", "tiny", "start", c["muted"])}
  </g>
  <g>
    {line(695, 265, 595, 205)}
    {line(695, 265, 595, 335)}
    {line(695, 265, 805, 265)}
    {circle_node(cfg, 695, 265, 28, c["c"], "C")}
    {circle_node(cfg, 595, 205, 23, c["b"], "B")}
    {circle_node(cfg, 595, 335, 23, c["b"], "B")}
    {circle_node(cfg, 805, 265, 23, c["h"], "H")}
    {text(570, 202, "V=b", "tiny", "end", c["muted"])}
    {text(570, 342, "V=b", "tiny", "end", c["muted"])}
    {text(695, 318, "V=c", "tiny", "middle", c["muted"])}
    {text(805, 318, "V=0", "tiny", "middle", c["muted"])}
  </g>
"""
    return svg_shell(cfg, body, title)


def fig1_current_from_a(cfg: Cfg) -> str:
    title = tr(cfg, "從 A 流出的三條相同電流", "Three equal currents leave A")
    c = cfg.c
    total = tr(cfg, "I = 3(1-b)/R", "I = 3(1-b)/R")
    body = f"""
  {rect(95, 75, 770, 390, cfg)}
  {circle_node(cfg, 255, 270, 34, c["a"], "A")}
  {circle_node(cfg, 640, 160, 25, c["b"], "B")}
  {circle_node(cfg, 690, 270, 25, c["b"], "B")}
  {circle_node(cfg, 640, 380, 25, c["b"], "B")}
  {path("M 292 260 C 390 210, 500 175, 608 162", c["edge"], 5, "arrow-edge")}
  {path("M 295 270 H 655", c["edge"], 5, "arrow-edge")}
  {path("M 292 280 C 390 330, 500 365, 608 378", c["edge"], 5, "arrow-edge")}
  {segment_label(cfg, 455, 176, "(1-b)/R")}
  {segment_label(cfg, 480, 226, "(1-b)/R")}
  {segment_label(cfg, 455, 414, "(1-b)/R")}
  <path d="M 735 150 C 812 205, 812 335, 735 390" stroke="{c['accent']}" stroke-width="4" fill="none"/>
  {text(805, 276, total, "math", "start", c["accent"])}
"""
    return svg_shell(cfg, body, title)


def fig1_voltage_levels(cfg: Cfg) -> str:
    title = tr(cfg, "電位階梯", "Potential ladder")
    c = cfg.c
    items = [
        ("A", "1", 155, c["a"]),
        ("B", "3/5", 260, c["b"]),
        ("C", "2/5", 320, c["c"]),
        ("H", "0", 425, c["h"]),
    ]
    parts = [rect(90, 70, 780, 400, cfg)]
    parts.append(f'<line x1="220" y1="155" x2="220" y2="425" stroke="{c["grid"]}" stroke-width="8" stroke-linecap="round"/>')
    for letter, value, y, color in items:
        parts.append(circle_node(cfg, 220, y, 24, color, letter))
        parts.append(text(280, y + 8, f"V({letter}) = {value}", "math"))
    parts.append(path("M 500 155 V 250", c["accent2"], 4, "arrow2"))
    parts.append(path("M 500 260 V 310", c["accent2"], 4, "arrow2"))
    parts.append(path("M 500 320 V 415", c["accent2"], 4, "arrow2"))
    parts.append(segment_label(cfg, 610, 205, "ΔV=2/5"))
    parts.append(segment_label(cfg, 610, 292, "ΔV=1/5"))
    parts.append(segment_label(cfg, 610, 370, "ΔV=2/5"))
    parts.append(text(705, 292, tr(cfg, "中段壓降較小", "smaller middle drop"), "small", "start", c["muted"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig1_quotient_circuit(cfg: Cfg) -> str:
    title = tr(cfg, "商掉對稱性後的小電路", "The symmetry-reduced circuit")
    c = cfg.c
    labels = [("A", 150, c["a"]), ("B", 360, c["b"]), ("C", 600, c["c"]), ("H", 810, c["h"])]
    parts = [rect(70, 90, 820, 350, cfg)]
    for x1, x2, count in [(150, 360, "3"), (360, 600, "6"), (600, 810, "3")]:
        parts.append(f'<line x1="{x1}" y1="270" x2="{x2}" y2="270" stroke="{c["edge"]}" stroke-width="6" stroke-linecap="round"/>')
        parts.append(text((x1 + x2) / 2, 240, tr(cfg, f"{count} 條邊", f"{count} edges"), "small", "middle", c["muted"]))
    for label, x, color in labels:
        parts.append(circle_node(cfg, x, 270, 30, color, label))
    parts.append(text(255, 338, "R/3", "math", "middle", c["accent"]))
    parts.append(text(480, 338, "R/6", "math", "middle", c["accent"]))
    parts.append(text(705, 338, "R/3", "math", "middle", c["accent"]))
    parts.append(text(480, 405, tr(cfg, "同一軌道合併成一個代表節點", "Each orbit becomes one representative node"), "small", "middle", c["muted"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig2_kcl(cfg: Cfg) -> str:
    title = tr(cfg, "KCL 的節點圖像", "Node picture for KCL")
    c = cfg.c
    parts = [rect(95, 75, 770, 390, cfg)]
    parts.append(circle_node(cfg, 480, 270, 36, c["accent"], "i"))
    incoming = [(735, 175, 518, 248), (735, 365, 518, 292)]
    outgoing = [(442, 248, 225, 170), (462, 305, 350, 420)]
    for x1, y1, x2, y2 in incoming:
        parts.append(path(f"M {x1} {y1} L {x2} {y2}", c["edge"], 5, "arrow-edge"))
    for x1, y1, x2, y2 in outgoing:
        parts.append(path(f"M {x1} {y1} L {x2} {y2}", c["muted"], 5, "arrow-edge", dash=True))
    parts.append(text(665, 223, tr(cfg, "流入", "in"), "small", "middle", c["muted"]))
    parts.append(text(300, 392, tr(cfg, "流出", "out"), "small", "middle", c["muted"]))
    parts.append(text(480, 445, tr(cfg, "ΣI_in = ΣI_out", "ΣI_in = ΣI_out"), "math", "middle", c["accent"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig2_continuity(cfg: Cfg) -> str:
    title = tr(cfg, "連續性方程式的控制體積", "Control volume for the continuity equation")
    c = cfg.c
    parts = [rect(90, 75, 780, 390, cfg)]
    parts.append(f'<circle cx="480" cy="270" r="88" fill="{c["panel2"]}" stroke="{c["accent"]}" stroke-width="4" stroke-dasharray="10 8"/>')
    for d in [
        "M 180 210 C 270 210, 330 235, 398 252",
        "M 780 190 C 675 195, 620 230, 560 252",
        "M 355 420 C 395 355, 425 325, 452 300",
    ]:
        parts.append(path(d, c["edge"], 5, "arrow-edge"))
    for d in [
        "M 515 238 C 585 190, 650 150, 760 125",
        "M 520 300 C 590 350, 660 385, 780 405",
    ]:
        parts.append(path(d, c["muted"], 5, "arrow-edge", dash=True))
    parts.append(text(480, 274, tr(cfg, "節點區域", "node region"), "small", "middle"))
    parts.append(text(480, 440, "∂ρ/∂t + ∇·J = 0", "math", "middle", c["accent"]))
    parts.append(text(480, 125, tr(cfg, "穩態：∂ρ/∂t = 0", "steady state: ∂ρ/∂t = 0"), "small", "middle", c["muted"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig2_kvl(cfg: Cfg) -> str:
    title = tr(cfg, "KVL 的閉合路徑", "Closed path for KVL")
    c = cfg.c
    parts = [rect(95, 70, 770, 400, cfg)]
    points = {"A": (265, 385), "B": (695, 385), "C": (695, 185), "D": (265, 185)}
    for p1, p2 in [("A", "B"), ("B", "C"), ("C", "D"), ("D", "A")]:
        parts.append(line(*points[p1], *points[p2]))
    for d in ["M 355 385 H 585", "M 695 335 V 235", "M 605 185 H 375", "M 265 235 V 335"]:
        parts.append(path(d, c["accent2"], 5, "arrow2"))
    for label, (x, y) in points.items():
        parts.append(circle_node(cfg, x, y, 24, c["panel2"], label, c["ink"], c["edge"]))
    parts.append(text(480, 355, "ΔV₁", "small", "middle", c["muted"]))
    parts.append(text(730, 290, "ΔV₂", "small", "middle", c["muted"]))
    parts.append(text(480, 165, "ΔV₃", "small", "middle", c["muted"]))
    parts.append(text(230, 290, "ΔV₄", "small", "middle", c["muted"]))
    parts.append(text(480, 455, "ΔV₁+ΔV₂+ΔV₃+ΔV₄ = 0", "math", "middle", c["accent"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig2_kvl_faraday(cfg: Cfg) -> str:
    title = tr(cfg, "KVL 的失效條件", "When ordinary KVL fails")
    c = cfg.c
    parts = [rect(95, 70, 770, 400, cfg)]
    parts.append(f'<ellipse cx="480" cy="275" rx="230" ry="145" fill="none" stroke="{c["edge"]}" stroke-width="5"/>')
    for d in ["M 345 390 C 260 315, 268 220, 360 170", "M 605 160 C 710 215, 725 325, 635 392"]:
        parts.append(path(d, c["accent2"], 5, "arrow2"))
    parts.append(f'<circle cx="480" cy="275" r="70" fill="{c["panel2"]}" stroke="{c["grid"]}" stroke-width="2"/>')
    for x in [430, 480, 530]:
        parts.append(text(x, 286, "×", "math", "middle", c["accent"]))
    parts.append(text(480, 370, "Φ_B(t)", "math", "middle", c["accent"]))
    parts.append(text(480, 445, "∮E·dl = -dΦ_B/dt", "math", "middle", c["warn"]))
    parts.append(text(480, 125, tr(cfg, "時變磁通會產生非保守電場", "Changing magnetic flux creates a non-conservative field"), "small", "middle", c["muted"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig2_wheatstone(cfg: Cfg) -> str:
    title = tr(cfg, "惠斯通電橋平衡", "Balanced Wheatstone bridge")
    c = cfg.c
    parts = [rect(115, 70, 730, 410, cfg)]
    pts = {"A": (245, 275), "B": (480, 165), "C": (480, 385), "D": (715, 275)}
    for p1, p2 in [("A", "B"), ("B", "D"), ("A", "C"), ("C", "D")]:
        parts.append(line(*pts[p1], *pts[p2]))
    parts.append(f'<line x1="480" y1="195" x2="480" y2="355" stroke="{c["grid"]}" stroke-width="7" stroke-linecap="round" stroke-dasharray="10 8"/>')
    parts.append(text(505, 282, "I₅ = 0", "small", "start", c["accent2"]))
    for label, (x, y) in pts.items():
        fill = c["accent"] if label in {"B", "C"} else c["panel2"]
        label_color = "white" if label in {"B", "C"} else c["ink"]
        parts.append(circle_node(cfg, x, y, 26, fill, label, label_color, c["edge"]))
    parts.append(text(342, 203, "R₁", "small", "middle", c["muted"]))
    parts.append(text(618, 203, "R₃", "small", "middle", c["muted"]))
    parts.append(text(342, 365, "R₂", "small", "middle", c["muted"]))
    parts.append(text(618, 365, "R₄", "small", "middle", c["muted"]))
    parts.append(text(480, 455, "R₁/R₂ = R₃/R₄", "math", "middle", c["accent"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig3_uniqueness(cfg: Cfg) -> str:
    title = tr(cfg, "唯一性把對稱變成等電位", "Uniqueness turns symmetry into equal potentials")
    c = cfg.c
    labels = [
        tr(cfg, "原電位解", "solution"),
        tr(cfg, "對稱操作", "symmetry"),
        tr(cfg, "另一個合法解", "another valid solution"),
    ]
    parts = [text(480, 105, title, "label", "middle")]
    for i, x in enumerate([190, 480, 770]):
        parts.append(rect(x - 92, 170, 184, 120, cfg))
        parts.append(text(x, 240, labels[i], "small", "middle"))
    parts.append(path("M 290 230 H 372", c["accent"], 5, "arrow"))
    parts.append(path("M 580 230 H 662", c["accent"], 5, "arrow"))
    parts.append(path("M 190 315 C 300 425, 660 425, 770 315", c["accent2"], 4, "arrow2"))
    parts.append(text(480, 455, tr(cfg, "唯一性 ⇒ 兩解相同", "uniqueness ⇒ same solution"), "math", "middle", c["accent2"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig3_axis_permutation(cfg: Cfg) -> str:
    title = tr(cfg, "交換座標軸仍固定 A 與 H", "Permuting axes still fixes A and H")
    c = cfg.c
    cube, pts = draw_cube(cfg, ox=745, oy=390, scale=0.42, highlight={(0, 0, 0), (1, 1, 1), (1, 0, 0), (0, 1, 0)}, labels=True)
    rows = [
        ("(0,0,0)", "(0,0,0)"),
        ("(1,1,1)", "(1,1,1)"),
        ("(1,0,0)", "(0,1,0)"),
    ]
    parts = [rect(80, 80, 800, 380, cfg), text(480, 125, "(x,y,z) → (y,x,z)", "math", "middle", c["accent"])]
    for i, (src, dst) in enumerate(rows):
        y = 205 + i * 76
        parts.append(text(170, y, src, "math", "start"))
        parts.append(path(f"M 365 {y - 8} H 485", c["muted"], 4, "arrow-edge"))
        parts.append(text(545, y, dst, "math", "start"))
    parts.append(f'<g transform="translate(5,10)">{cube}</g>')
    p1, p2 = pts[(1, 0, 0)], pts[(0, 1, 0)]
    parts.append(path(f"M {p1[0]+8} {p1[1]-18} C 825 245, 745 245, {p2[0]+14} {p2[1]-8}", c["accent2"], 4, "arrow2"))
    return svg_shell(cfg, "\n".join(parts), title)


def fig3_s3_orbit(cfg: Cfg) -> str:
    title = tr(cfg, "B 型節點的一個軌道", "One orbit of the B nodes")
    c = cfg.c
    b_nodes = {(1, 0, 0), (0, 1, 0), (0, 0, 1)}
    cube, _ = draw_cube(cfg, ox=305, oy=440, scale=0.72, highlight=b_nodes, labels=True)
    parts = [f'<g transform="translate(0,-4)">{cube}</g>']
    parts.append(rect(635, 170, 245, 180, cfg))
    parts.append(text(758, 225, "{100, 010, 001}", "math", "middle", c["accent"]))
    parts.append(text(758, 270, tr(cfg, "同一軌道", "same orbit"), "small", "middle"))
    parts.append(text(758, 305, tr(cfg, "同一電位", "same potential"), "small", "middle", c["muted"]))
    parts.append(path("M 530 365 C 575 420, 620 390, 655 345", c["accent"], 5, "arrow"))
    return svg_shell(cfg, "\n".join(parts), title)


def fig3_orbit_compression(cfg: Cfg) -> str:
    title = tr(cfg, "8 個節點壓縮成 4 個軌道", "Eight nodes collapse to four orbits")
    c = cfg.c
    cube, _ = draw_cube(cfg, ox=235, oy=420, scale=0.55, labels=False)
    parts = [rect(60, 75, 840, 390, cfg)]
    parts.append(f'<g transform="translate(15,5)">{cube}</g>')
    xs = [555, 655, 755, 855]
    classes = [("A", "1", c["a"]), ("B", "3", c["b"]), ("C", "3", c["c"]), ("H", "1", c["h"])]
    for x, (label, count, color) in zip(xs, classes):
        parts.append(circle_node(cfg, x, 270, 28, color, label))
        parts.append(text(x, 330, tr(cfg, f"{count} 個節點", f"{count} node{'s' if count != '1' else ''}"), "tiny", "middle", c["muted"]))
    parts.append(text(705, 395, tr(cfg, "邊界 A,H 固定；未知數只剩 b,c", "A,H fixed; only b,c remain unknown"), "small", "middle", c["accent"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig4_triangle_rotations(cfg: Cfg) -> str:
    title = tr(cfg, "等邊三角形的旋轉", "Rotations of an equilateral triangle")
    c = cfg.c
    ink = c["ink"]
    bg = c["bg"]
    muted = c["muted"]
    sector = c["accent"] if cfg.mode == "dark" else "#787878"
    sector_stroke = c["accent2"] if cfg.mode == "dark" else "#505050"
    notes = [
        ("e", tr(cfg, "恆等，0°", "identity, 0°"), "0°"),
        ("r", tr(cfg, "旋轉 120°", "rotation by 120°"), "120°"),
        ("r²", tr(cfg, "旋轉 240°", "rotation by 240°"), "240°"),
    ]
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="960" height="320" viewBox="0 0 960 320" role="img" aria-labelledby="title">
  <title id="title">{esc(title)}</title>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L8,3 L0,6 Z" fill="{ink}" />
    </marker>
    <style>
      text {{
        font-family: "Noto Sans TC", "Noto Sans CJK TC", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        fill: {ink};
      }}
      .tri {{ fill: none; stroke: {ink}; stroke-width: 2.5; }}
      .vertex-circle {{ fill: {bg}; stroke: {ink}; stroke-width: 2.4; }}
      .vertex-label {{ font-size: 18px; font-weight: 700; dominant-baseline: middle; text-anchor: middle; }}
      .center-dot {{ fill: {ink}; }}
      .center-label {{ font-size: 15px; fill: {muted}; }}
      .rot-arc {{ fill: none; stroke: {ink}; stroke-width: 2; marker-end: url(#arrow); }}
      .angle-sector {{ fill: {sector}; fill-opacity: 0.18; stroke: {sector_stroke}; stroke-opacity: 0.7; stroke-width: 1.5; }}
      .title {{ font-size: 22px; font-weight: 700; text-anchor: middle; }}
      .angle-label {{ font-size: 17px; text-anchor: middle; fill: {muted}; }}
      .note {{ font-size: 14px; text-anchor: middle; fill: {muted}; }}
    </style>
  </defs>
  <rect width="960" height="320" fill="{bg}"/>
  <g transform="translate(160,170)">
    <text class="title" x="0" y="-125">{notes[0][0]}</text>
    <text class="note" x="0" y="-100">{notes[0][1]}</text>
    <polygon class="tri" points="0,-70 60,35 -60,35" />
    <circle class="vertex-circle" cx="0" cy="-70" r="16" />
    <circle class="vertex-circle" cx="60" cy="35" r="16" />
    <circle class="vertex-circle" cx="-60" cy="35" r="16" />
    <text class="vertex-label" x="0" y="-70">1</text>
    <text class="vertex-label" x="60" y="35">2</text>
    <text class="vertex-label" x="-60" y="35">3</text>
    <circle class="center-dot" cx="0" cy="0" r="3.5" />
    <text class="center-label" x="8" y="15">O</text>
    <line x1="0" y1="0" x2="48" y2="0" stroke="{ink}" stroke-width="1.5" />
    <text class="angle-label" x="0" y="82">{notes[0][2]}</text>
  </g>
  <g transform="translate(480,170)">
    <text class="title" x="0" y="-125">{notes[1][0]}</text>
    <text class="note" x="0" y="-100">{notes[1][1]}</text>
    <path class="angle-sector" d="M 0 0 L 55 0 A 55 55 0 0 1 -27.5 47.6 Z" />
    <path class="rot-arc" d="M 72 0 A 72 72 0 0 1 -36 62.4" />
    <polygon class="tri" points="60.6,35 -60.3,34.5 -0.3,-69.5" />
    <circle class="vertex-circle" cx="60.6" cy="35" r="16" />
    <circle class="vertex-circle" cx="-60.3" cy="34.5" r="16" />
    <circle class="vertex-circle" cx="-0.3" cy="-69.5" r="16" />
    <text class="vertex-label" x="60.6" y="35">1</text>
    <text class="vertex-label" x="-60.3" y="34.5">2</text>
    <text class="vertex-label" x="-0.3" y="-69.5">3</text>
    <circle class="center-dot" cx="0" cy="0" r="3.5" />
    <text class="center-label" x="8" y="15">O</text>
    <text class="angle-label" x="35" y="65">{notes[1][2]}</text>
  </g>
  <g transform="translate(800,170)">
    <text class="title" x="-5" y="-125">r</text>
    <text x="13" y="-137" font-size="13" font-weight="700" text-anchor="middle">2</text>
    <text class="note" x="0" y="-100">{notes[2][1]}</text>
    <path class="angle-sector" d="M 0 0 L 55 0 A 55 55 0 1 1 -27.5 -47.6 Z" />
    <path class="rot-arc" d="M 72 0 A 72 72 0 1 1 -36 -62.4" />
    <polygon class="tri" points="-60.6,35 0.3,-69.5 60.3,34.5" />
    <circle class="vertex-circle" cx="-60.6" cy="35" r="16" />
    <circle class="vertex-circle" cx="0.3" cy="-69.5" r="16" />
    <circle class="vertex-circle" cx="60.3" cy="34.5" r="16" />
    <text class="vertex-label" x="-60.6" y="35">1</text>
    <text class="vertex-label" x="0.3" y="-69.5">2</text>
    <text class="vertex-label" x="60.3" y="34.5">3</text>
    <circle class="center-dot" cx="0" cy="0" r="3.5" />
    <text class="center-label" x="8" y="15">O</text>
    <text class="angle-label" x="-15" y="82">{notes[2][2]}</text>
  </g>
</svg>
"""


def fig4_water_c2v(cfg: Cfg) -> str:
    title = tr(cfg, "水分子的 C₂v 對稱", "C₂v symmetry of water")
    c = cfg.c
    parts = [rect(110, 70, 740, 410, cfg)]
    parts.append(f'<line x1="480" y1="120" x2="480" y2="420" stroke="{c["accent2"]}" stroke-width="4" stroke-linecap="round" stroke-dasharray="12 9"/>')
    parts.append(f'<line x1="290" y1="390" x2="670" y2="390" stroke="{c["accent"]}" stroke-width="4" stroke-linecap="round" stroke-dasharray="12 9"/>')
    parts.append(f'<line x1="480" y1="290" x2="370" y2="385" stroke="{c["edge"]}" stroke-width="10" stroke-linecap="round"/>')
    parts.append(f'<line x1="480" y1="290" x2="590" y2="385" stroke="{c["edge"]}" stroke-width="10" stroke-linecap="round"/>')
    parts.append(circle_node(cfg, 480, 290, 36, c["a"], "O"))
    parts.append(circle_node(cfg, 360, 395, 27, c["b"], "H"))
    parts.append(circle_node(cfg, 600, 395, 27, c["b"], "H"))
    parts.append(text(505, 170, tr(cfg, "C₂ 軸", "C₂ axis"), "small", "start", c["accent2"]))
    mirror_label = text(300, 340, "鏡射平面投影", "small", "start", c["accent"]) if cfg.lang == "zh" else text(650, 340, "mirror-plane trace", "small", "middle", c["accent"])
    parts.append(mirror_label)
    parts.append(text(480, 455, "e, C₂, σᵥ, σᵥ′", "math", "middle", c["muted"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig4_cube_symmetry(cfg: Cfg) -> str:
    title = tr(cfg, "繞體對角線的 120° 旋轉", "A 120° turn about the body diagonal")
    c = cfg.c
    b_nodes = {(1, 0, 0), (0, 1, 0), (0, 0, 1), (0, 0, 0), (1, 1, 1)}
    cube, pts = draw_cube(cfg, ox=330, oy=455, scale=0.72, highlight=b_nodes, labels=True)
    p = {k: (v[0] + 35, v[1] - 8) for k, v in pts.items()}
    parts = []
    a, h = p[(0, 0, 0)], p[(1, 1, 1)]
    parts.append(f'<line x1="{a[0]}" y1="{a[1]}" x2="{h[0]}" y2="{h[1]}" stroke="{c["accent2"]}" stroke-width="5" stroke-dasharray="12 8" stroke-linecap="round"/>')
    parts.append(f'<g transform="translate(35,-8)">{cube}</g>')
    parts.append(text(236, 122, tr(cfg, "旋轉軸 A—H", "axis A-H"), "small", "middle", c["accent2"]))

    cx, cy, rr = 700, 270, 94
    orbit = [
        ("100", cx, cy - rr),
        ("010", cx - 82, cy + 48),
        ("001", cx + 82, cy + 48),
    ]
    parts.append(f'<circle cx="{cx}" cy="{cy}" r="128" fill="{c["panel"]}" stroke="{c["grid"]}" stroke-width="2"/>')
    parts.append(path(f"M {cx-8} {cy-rr+24} C {cx-85} {cy-58}, {cx-100} {cy+18}, {cx-82+17} {cy+48-9}", c["accent"], 4, "arrow"))
    parts.append(path(f"M {cx-60} {cy+61} C {cx-5} {cy+108}, {cx+60} {cy+96}, {cx+82-16} {cy+48+9}", c["accent"], 4, "arrow"))
    parts.append(path(f"M {cx+82-12} {cy+48-20} C {cx+112} {cy-34}, {cx+72} {cy-78}, {cx+10} {cy-rr+23}", c["accent"], 4, "arrow"))
    for label, x, y in orbit:
        parts.append(circle_node(cfg, x, y, 25, c["b"], "", "white", c["bg"]))
        parts.append(text(x, y + 7, label, "tiny", "middle", "white"))
    parts.append(text(cx, 430, tr(cfg, "A、H 固定；B 軌道循環", "A,H fixed; the B orbit cycles"), "small", "middle", c["muted"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig4_group_action_chain(cfg: Cfg) -> str:
    title = tr(cfg, "群作用到商電路", "From group action to quotient circuit")
    c = cfg.c
    labels = [
        tr(cfg, "S₃ 作用在節點", "S₃ acts on nodes"),
        tr(cfg, "形成軌道", "orbits form"),
        tr(cfg, "同軌道等電位", "equal potentials"),
        tr(cfg, "商電路降維", "quotient circuit"),
    ]
    parts = [rect(60, 115, 840, 270, cfg)]
    for i, x in enumerate([165, 375, 585, 795]):
        parts.append(f'<circle cx="{x}" cy="250" r="72" fill="{c["panel2"]}" stroke="{c["grid"]}" stroke-width="2"/>')
        parts.append(text(x, 246, labels[i], "small", "middle"))
        if i < 3:
            parts.append(path(f"M {x+82} 250 H {x+128}", c["accent"], 5, "arrow"))
    parts.append(text(480, 435, tr(cfg, "抽象的群語言，最後回到更小的電路問題", "Abstract group language returns to a smaller circuit problem"), "small", "middle", c["muted"]))
    return svg_shell(cfg, "\n".join(parts), title)


def fig4_s3_noncommutativity(cfg: Cfg) -> str:
    title = tr(cfg, "S₃ 不一定交換", "S₃ is not commutative")
    c = cfg.c
    parts = [rect(75, 85, 810, 370, cfg)]
    rows = [
        ("(12) then (13)", "1→3, 3→2, 2→1", "(132)"),
        ("(13) then (12)", "1→2, 2→3, 3→1", "(123)"),
    ]
    if cfg.lang == "zh":
        rows = [
            ("先 (12)，再 (13)", "1→3, 3→2, 2→1", "(132)"),
            ("先 (13)，再 (12)", "1→2, 2→3, 3→1", "(123)"),
        ]
    for i, (left, mid, right) in enumerate(rows):
        y = 185 + i * 140
        parts.append(text(190, y, left, "small", "middle"))
        parts.append(path(f"M 315 {y-8} H 405", c["accent"], 5, "arrow"))
        parts.append(text(505, y, mid, "small", "middle", c["muted"]))
        parts.append(path(f"M 615 {y-8} H 705", c["accent"], 5, "arrow"))
        parts.append(text(770, y, right, "math", "middle", c["accent2"]))
    parts.append(text(480, 420, "(12)(13) ≠ (13)(12)", "math", "middle", c["warn"]))
    return svg_shell(cfg, "\n".join(parts), title)


FIGURES: list[tuple[str, Callable[[Cfg], str]]] = [
    ("node-classification", fig1_node_classification),
    ("kcl-representatives", fig1_kcl_representatives),
    ("current-from-a", fig1_current_from_a),
    ("voltage-levels", fig1_voltage_levels),
    ("quotient-circuit", fig1_quotient_circuit),
    ("kcl", fig2_kcl),
    ("continuity", fig2_continuity),
    ("kvl", fig2_kvl),
    ("kvl-faraday", fig2_kvl_faraday),
    ("wheatstone", fig2_wheatstone),
    ("uniqueness", fig3_uniqueness),
    ("cube-resistoraxis-permutation", fig3_axis_permutation),
    ("s3-orbit", fig3_s3_orbit),
    ("orbit-compression", fig3_orbit_compression),
    ("triangle-rotations", fig4_triangle_rotations),
    ("water-c2v", fig4_water_c2v),
    ("cube-symmetry", fig4_cube_symmetry),
    ("group-action-chain", fig4_group_action_chain),
    ("s3-noncommutativity", fig4_s3_noncommutativity),
]


def write(name: str, svg: str) -> None:
    (OUT / name).write_text(svg, encoding="utf-8")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for slug, fn in FIGURES:
        for lang in ("zh", "en"):
            for mode in ("light", "dark"):
                write(f"{slug}-{lang}-{mode}.svg", fn(Cfg(lang, mode)))


if __name__ == "__main__":
    main()
