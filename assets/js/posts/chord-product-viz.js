(function () {
  var roots = document.querySelectorAll('.chord-viz[data-cpv-mode]');
  if (!roots.length) return;

  var NS = 'http://www.w3.org/2000/svg';
  var TAU = Math.PI * 2;
  var vertices = [
    { name: 'A', a: 0, color: '#2563eb' },
    { name: 'B', a: TAU / 3, color: '#16a34a' },
    { name: 'C', a: (2 * TAU) / 3, color: '#dc2626' }
  ];

  injectStyles();
  Array.prototype.forEach.call(roots, init);

  function init(root) {
    var mode = root.getAttribute('data-cpv-mode') || 'observe';
    var isComplex = mode === 'complex';
    var stage = root.querySelector('.chord-viz__stage');
    var slider = root.querySelector('[data-cpv-theta]');
    var thetaValue = root.querySelector('[data-cpv-theta-value]');
    var paValue = root.querySelector('[data-cpv-pa]');
    var pbValue = root.querySelector('[data-cpv-pb]');
    var pcValue = root.querySelector('[data-cpv-pc]');
    var productValue = root.querySelector('[data-cpv-product]');
    var productBar = root.querySelector('[data-cpv-product-bar]');
    var cubicValue = root.querySelector('[data-cpv-cubic]');
    if (!stage || !slider) return;

    var left = isComplex ? { x: 180, y: 172, r: 104 } : { x: 260, y: 168, r: 112 };
    var right = { x: 540, y: 172, r: 82 };
    var viewBox = isComplex ? '0 0 720 320' : '0 0 520 315';

    var svg = make('svg', {
      viewBox: viewBox,
      role: 'img',
      'aria-label': isComplex ? '複數法弦積互動圖' : '正三角形外接圓弦積觀察圖'
    });
    stage.appendChild(svg);

    var grid = group('grid');
    var leftLayer = group('left-layer');
    var rightLayer = group('right-layer');
    var chordLayer = group('chords');
    var pointsLayer = group('points');
    svg.appendChild(grid);
    svg.appendChild(leftLayer);
    if (isComplex) svg.appendChild(rightLayer);
    svg.appendChild(chordLayer);
    svg.appendChild(pointsLayer);

    drawAxes(grid, left, isComplex ? 'z 平面' : '先觀察 P 的位置', isComplex ? 32 : 28);
    leftLayer.appendChild(make('circle', {
      cx: left.x, cy: left.y, r: left.r, class: 'cpv-circle'
    }));

    if (isComplex) {
      drawAxes(grid, right, 'z^3 平面', 32);
      rightLayer.appendChild(make('circle', {
        cx: right.x, cy: right.y, r: right.r, class: 'cpv-circle'
      }));
      drawMapArrow(svg, grid, root.id || 'cpv');
    }

    var triangle = make('polygon', { class: 'cpv-triangle' });
    leftLayer.appendChild(triangle);

    vertices.forEach(function (v) {
      var p = pointOn(left, v.a);
      var g = group('cpv-vertex');
      var dot = make('circle', { cx: p.x, cy: p.y, r: 5.5, fill: v.color });
      var label = make('text', { x: labelX(left, p.x), y: labelY(left, p.y), class: 'cpv-label' });
      label.textContent = v.name;
      g.appendChild(dot);
      g.appendChild(label);
      pointsLayer.appendChild(g);
    });

    var chordNodes = vertices.map(function (v) {
      var line = make('line', { class: 'cpv-chord', stroke: v.color });
      chordLayer.appendChild(line);
      return line;
    });

    var movingPoint = make('circle', { class: 'cpv-moving-point', r: 8 });
    var movingLabel = make('text', { class: 'cpv-moving-label' });
    movingLabel.textContent = isComplex ? 'P = z' : 'P';
    pointsLayer.appendChild(movingPoint);
    pointsLayer.appendChild(movingLabel);

    var basePoint = null;
    var rightLine = null;
    var cubicPoint = null;
    var cubicLabel = null;
    if (isComplex) {
      basePoint = pointOn(right, 0);
      rightLine = make('line', { class: 'cpv-cubic-line' });
      cubicPoint = make('circle', { class: 'cpv-cubic-point', r: 7 });
      var baseDot = make('circle', { cx: basePoint.x, cy: basePoint.y, r: 5.5, fill: '#2563eb' });
      var baseLabel = make('text', { x: basePoint.x + 12, y: basePoint.y + 4, class: 'cpv-label' });
      cubicLabel = make('text', { class: 'cpv-moving-label' });
      baseLabel.textContent = '1';
      cubicLabel.textContent = 'z^3';
      rightLayer.appendChild(rightLine);
      rightLayer.appendChild(baseDot);
      rightLayer.appendChild(baseLabel);
      rightLayer.appendChild(cubicPoint);
      rightLayer.appendChild(cubicLabel);
    }

    var dragging = false;

    slider.addEventListener('input', function () {
      update(Number(slider.value));
    });

    svg.addEventListener('pointerdown', function (event) {
      var p = localPoint(svg, event);
      if (isComplex && p.x > 330) return;
      dragging = true;
      svg.setPointerCapture(event.pointerId);
      updateFromPoint(p);
    });

    svg.addEventListener('pointermove', function (event) {
      if (!dragging) return;
      updateFromPoint(localPoint(svg, event));
    });

    svg.addEventListener('pointerup', endDrag);
    svg.addEventListener('pointercancel', endDrag);

    update(Number(slider.value));

    function updateFromPoint(p) {
      var angle = Math.atan2(left.y - p.y, p.x - left.x);
      var degrees = ((angle * 180 / Math.PI) + 360) % 360;
      slider.value = String(Math.round(degrees));
      update(degrees);
    }

    function update(degrees) {
      var theta = degrees * Math.PI / 180;
      var p = pointOn(left, theta);
      var trianglePoints = vertices.map(function (v) {
        var q = pointOn(left, v.a);
        return q.x.toFixed(1) + ',' + q.y.toFixed(1);
      }).join(' ');

      triangle.setAttribute('points', trianglePoints);
      movingPoint.setAttribute('cx', p.x);
      movingPoint.setAttribute('cy', p.y);
      movingLabel.setAttribute('x', p.x + (p.x >= left.x ? 13 : -30));
      movingLabel.setAttribute('y', p.y + (p.y >= left.y ? 22 : -14));

      var distances = vertices.map(function (v, i) {
        var q = pointOn(left, v.a);
        chordNodes[i].setAttribute('x1', p.x);
        chordNodes[i].setAttribute('y1', p.y);
        chordNodes[i].setAttribute('x2', q.x);
        chordNodes[i].setAttribute('y2', q.y);
        return distance(p, q) / left.r;
      });

      var product = distances[0] * distances[1] * distances[2];

      if (isComplex) {
        var w = pointOn(right, theta * 3);
        rightLine.setAttribute('x1', basePoint.x);
        rightLine.setAttribute('y1', basePoint.y);
        rightLine.setAttribute('x2', w.x);
        rightLine.setAttribute('y2', w.y);
        cubicPoint.setAttribute('cx', w.x);
        cubicPoint.setAttribute('cy', w.y);
        cubicLabel.setAttribute('x', w.x + (w.x >= right.x ? 11 : -34));
        cubicLabel.setAttribute('y', w.y + (w.y >= right.y ? 22 : -13));
        if (cubicValue) cubicValue.textContent = format(distance(w, basePoint) / right.r);
      }

      if (thetaValue) thetaValue.textContent = Math.round(degrees) + '°';
      if (paValue) paValue.textContent = format(distances[0]);
      if (pbValue) pbValue.textContent = format(distances[1]);
      if (pcValue) pcValue.textContent = format(distances[2]);
      if (productValue) productValue.textContent = format(product);
      if (productBar) productBar.style.width = Math.max(0, Math.min(100, product / 2 * 100)).toFixed(1) + '%';
    }

    function endDrag(event) {
      if (!dragging) return;
      dragging = false;
      try {
        svg.releasePointerCapture(event.pointerId);
      } catch (e) {}
    }
  }

  function drawAxes(parent, c, label, y) {
    parent.appendChild(make('line', {
      x1: c.x - c.r - 24, y1: c.y,
      x2: c.x + c.r + 24, y2: c.y,
      class: 'cpv-axis'
    }));
    parent.appendChild(make('line', {
      x1: c.x, y1: c.y - c.r - 24,
      x2: c.x, y2: c.y + c.r + 24,
      class: 'cpv-axis'
    }));
    var text = make('text', { x: c.x, y: y, class: 'cpv-plane-title' });
    text.textContent = label;
    parent.appendChild(text);
  }

  function drawMapArrow(svg, parent, idPrefix) {
    var markerId = idPrefix + '-arrowhead';
    var defs = make('defs');
    var marker = make('marker', {
      id: markerId,
      markerWidth: 10,
      markerHeight: 10,
      refX: 8.5,
      refY: 5,
      orient: 'auto',
      markerUnits: 'strokeWidth',
      viewBox: '0 0 10 10'
    });
    marker.appendChild(make('path', {
      d: 'M 0 0 L 10 5 L 0 10 Z',
      class: 'cpv-map-head'
    }));
    defs.appendChild(marker);
    svg.insertBefore(defs, svg.firstChild);

    var arrow = make('path', {
      d: 'M 326 172 C 350 139, 383 139, 414 166',
      class: 'cpv-map-arrow',
      'marker-end': 'url(#' + markerId + ')'
    });
    var arrowText = make('text', { x: 382, y: 126, class: 'cpv-map-label' });
    arrowText.textContent = 'z -> z^3';
    parent.appendChild(arrow);
    parent.appendChild(arrowText);
  }

  function pointOn(c, a) {
    return {
      x: c.x + c.r * Math.cos(a),
      y: c.y - c.r * Math.sin(a)
    };
  }

  function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function localPoint(svg, event) {
    var point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
  }

  function labelX(c, x) {
    return x + (x >= c.x ? 12 : -20);
  }

  function labelY(c, y) {
    return y + (y >= c.y ? 20 : -12);
  }

  function format(value) {
    return Math.abs(value) < 0.0005 ? '0.000' : value.toFixed(3);
  }

  function make(name, attrs) {
    var node = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function (key) {
      node.setAttribute(key, attrs[key]);
    });
    return node;
  }

  function group(className) {
    return make('g', { class: className });
  }

  function injectStyles() {
    if (document.getElementById('cpv-styles')) return;
    var style = document.createElement('style');
    style.id = 'cpv-styles';
    style.textContent = [
      '.chord-viz{margin:1.5rem 0;border:1px solid #d8dee4;border-radius:8px;background:#f8fafc;padding:1rem;box-shadow:0 1px 2px rgba(15,23,42,.04)}',
      '.chord-viz__stage{line-height:0;overflow:hidden;border-radius:6px;background:#fff;border:1px solid #e5e7eb;touch-action:none}',
      '.chord-viz svg{display:block;width:100%;height:auto;max-height:360px;cursor:crosshair}',
      '.chord-viz--observe svg{max-height:330px}',
      '.chord-viz__controls{display:grid;grid-template-columns:auto minmax(160px,1fr) 4.5rem;align-items:center;gap:.75rem;margin-top:.8rem;font-size:.92rem;color:#334155}',
      '.chord-viz__controls label{font-weight:700;white-space:nowrap}',
      '.chord-viz__controls output{font-variant-numeric:tabular-nums;text-align:right;font-weight:700;color:#0f172a}',
      '.chord-viz__controls input{width:100%;accent-color:#2563eb}',
      '.chord-viz__stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:.5rem;margin-top:.75rem;font-size:.9rem;color:#334155}',
      '.chord-viz__stats span{background:#fff;border:1px solid #e5e7eb;border-radius:6px;padding:.42rem .55rem;white-space:nowrap}',
      '.chord-viz__stats strong{color:#0f172a;font-variant-numeric:tabular-nums}',
      '.chord-viz__product{margin-top:.65rem;background:#fff;border:1px solid #dbe3ee;border-radius:8px;padding:.75rem .85rem .65rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.85)}',
      '.chord-viz__product-row{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;color:#1e293b}',
      '.chord-viz__product-row span{font-size:1.05rem;font-weight:800}',
      '.chord-viz__product-row strong{font-size:1.55rem;line-height:1;font-weight:900;color:#0f172a;font-variant-numeric:tabular-nums}',
      '.chord-viz__bar{height:13px;margin-top:.62rem;border-radius:999px;background:#e5e7eb;overflow:hidden;box-shadow:inset 0 1px 2px rgba(15,23,42,.16)}',
      '.chord-viz__bar-fill{height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#38bdf8,#2563eb 55%,#f59e0b);transition:width .12s ease-out}',
      '.chord-viz__bar-labels{display:flex;justify-content:space-between;margin-top:.32rem;font-size:.78rem;font-weight:700;color:#64748b}',
      '.cpv-axis{stroke:#e2e8f0;stroke-width:1}',
      '.cpv-circle{fill:#f8fafc;stroke:#64748b;stroke-width:2}',
      '.cpv-triangle{fill:rgba(37,99,235,.06);stroke:#94a3b8;stroke-width:1.5}',
      '.cpv-chord{stroke-width:3;stroke-linecap:round;opacity:.72}',
      '.cpv-moving-point{fill:#f59e0b;stroke:#78350f;stroke-width:2}',
      '.cpv-cubic-point{fill:#f59e0b;stroke:#78350f;stroke-width:2}',
      '.cpv-cubic-line{stroke:#f59e0b;stroke-width:4;stroke-linecap:round}',
      '.cpv-map-arrow{fill:none;stroke:#64748b;stroke-width:2;stroke-linecap:round}',
      '.cpv-map-head{fill:#64748b}',
      '.cpv-label,.cpv-moving-label,.cpv-map-label,.cpv-plane-title{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;fill:#0f172a}',
      '.cpv-label,.cpv-moving-label{font-size:15px;font-weight:700}',
      '.cpv-map-label{font-size:16px;font-weight:700;text-anchor:middle;fill:#475569}',
      '.cpv-plane-title{font-size:17px;font-weight:800;text-anchor:middle;fill:#1e293b}',
      '@media (max-width:560px){.chord-viz{padding:.75rem}.chord-viz__controls{grid-template-columns:1fr 4rem}.chord-viz__controls label{grid-column:1 / -1}.chord-viz__stats{grid-template-columns:1fr}.chord-viz__product-row span{font-size:.98rem}.chord-viz__product-row strong{font-size:1.35rem}}'
    ].join('');
    document.head.appendChild(style);
  }
})();
