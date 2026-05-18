(function () {
  const THREE_URL = "https://esm.sh/three@0.164.1";
  const ORBIT_CONTROLS_URL = "https://esm.sh/three@0.164.1/examples/jsm/controls/OrbitControls.js";

  let threePromise = null;

  function loadThree() {
    if (!threePromise) {
      threePromise = Promise.all([
        import(THREE_URL),
        import(ORBIT_CONTROLS_URL),
      ]).then(([THREE, controls]) => ({ THREE, OrbitControls: controls.OrbitControls }));
    }
    return threePromise;
  }

  function cssVar(el, name) {
    return getComputedStyle(el).getPropertyValue(name).trim();
  }

  function makeButton(label, active, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cube-resistor-interactive__button";
    button.textContent = label;
    button.setAttribute("aria-pressed", active ? "true" : "false");
    button.addEventListener("click", onClick);
    return button;
  }

  function makeToggle(label, checked, onChange) {
    const wrapper = document.createElement("label");
    wrapper.className = "cube-resistor-interactive__toggle";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = checked;
    input.addEventListener("change", () => onChange(input.checked));
    wrapper.appendChild(input);
    wrapper.append(label);
    return wrapper;
  }

  function makeTooltip(text) {
    const tooltip = document.createElement("span");
    tooltip.className = "cube-resistor-interactive__tooltip";
    tooltip.textContent = "i";
    tooltip.tabIndex = 0;
    tooltip.title = text;
    tooltip.setAttribute("aria-label", text);
    return tooltip;
  }

  function makeLabelTexture(THREE, text, fg, bg) {
    const canvas = document.createElement("canvas");
    const measuring = canvas.getContext("2d");
    measuring.font = "700 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    const width = Math.max(160, Math.ceil(measuring.measureText(text).width + 72));
    canvas.width = width;
    canvas.height = 80;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(18, 12, canvas.width - 36, 56, 18);
    ctx.fill();
    ctx.fillStyle = fg;
    ctx.font = "700 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, 42);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return { texture, aspect: canvas.width / canvas.height };
  }

  function labelSprite(THREE, text, fg, bg, scale = 0.42, opacity = 1) {
    const label = makeLabelTexture(THREE, text, fg, bg);
    const material = new THREE.SpriteMaterial({
      map: label.texture,
      transparent: true,
      opacity,
      depthTest: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(scale * label.aspect, scale, 1);
    return sprite;
  }

  function makeLine(THREE, points, color, width = 3) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color, linewidth: width });
    return new THREE.Line(geometry, material);
  }

  function makeCylinderBetween(THREE, start, end, color, radius = 0.018) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(radius, radius, length, 24);
    const material = new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity: 0.76,
      roughness: 0.58,
      metalness: 0,
    });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.copy(start).add(end).multiplyScalar(0.5);
    cylinder.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize(),
    );
    return cylinder;
  }

  function makeScene(THREE, root, renderer) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(cssVar(root, "--cube-demo-bg"));
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(4.6, 3.5, 6.7);
    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const light = new THREE.DirectionalLight(0xffffff, 1.25);
    light.position.set(4, 5, 6);
    scene.add(light);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    return { scene, camera };
  }

  function buildTriangle(THREE, root) {
    const edge = cssVar(root, "--cube-demo-edge");
    const grid = cssVar(root, "--cube-demo-grid");
    const panel2 = cssVar(root, "--cube-demo-panel-2");
    const ink = cssVar(root, "--cube-demo-ink");
    const accent = cssVar(root, "--cube-demo-accent");
    const accent2 = cssVar(root, "--cube-demo-accent-2");
    const group = new THREE.Group();

    const vertices = [
      new THREE.Vector3(0, 1.35, 0),
      new THREE.Vector3(-1.17, -0.68, 0),
      new THREE.Vector3(1.17, -0.68, 0),
    ];
    const faceGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
    faceGeometry.setIndex([0, 1, 2]);
    faceGeometry.computeVertexNormals();
    group.add(new THREE.Mesh(
      faceGeometry,
      new THREE.MeshStandardMaterial({
        color: panel2,
        side: THREE.DoubleSide,
        roughness: 0.74,
        metalness: 0,
      }),
    ));
    [[0, 1], [1, 2], [2, 0]].forEach(([a, b]) => {
      group.add(makeLine(THREE, [vertices[a], vertices[b]], edge));
    });
    vertices.forEach((point, index) => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 32, 16),
        new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.6 }),
      );
      sphere.position.copy(point);
      group.add(sphere);
      const label = labelSprite(THREE, String(index + 1), ink, "#ffffff", 0.34);
      label.position.copy(point).add(new THREE.Vector3(0, 0, 0.2));
      group.add(label);
    });

    const axis = makeLine(THREE, [new THREE.Vector3(0, 0, -1.25), new THREE.Vector3(0, 0, 1.25)], accent2);
    group.add(axis);

    const arc = new THREE.Group();
    const curve = new THREE.EllipseCurve(0, 0, 1.75, 1.75, 0.2, 4.75, false);
    const arcPoints = curve.getPoints(72).map((p) => new THREE.Vector3(p.x, p.y, 0.18));
    arc.add(makeLine(THREE, arcPoints, accent, 4));
    const arrow = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.32, 24),
      new THREE.MeshStandardMaterial({ color: accent }),
    );
    arrow.position.copy(arcPoints[arcPoints.length - 1]);
    arrow.rotation.z = -0.9;
    arc.add(arrow);
    group.add(arc);

    const axisLabel = labelSprite(THREE, "旋轉軸", "#ffffff", accent2, 0.38);
    axisLabel.position.set(0.78, 1.35, 0.5);
    group.add(axisLabel);
    group.scale.setScalar(0.78);
    group.position.y = -0.08;
    return group;
  }

  function buildCube(THREE, root) {
    const edge = cssVar(root, "--cube-demo-edge");
    const muted = cssVar(root, "--cube-demo-muted");
    const accent = cssVar(root, "--cube-demo-accent");
    const accent2 = cssVar(root, "--cube-demo-accent-2");
    const bColor = cssVar(root, "--cube-demo-b");
    const cColor = cssVar(root, "--cube-demo-c");
    const hColor = cssVar(root, "--cube-demo-h");
    const group = new THREE.Group();
    const cubeBody = new THREE.Group();
    group.userData.rotatingBody = cubeBody;
    const nodes = [];
    for (let x = 0; x <= 1; x += 1) {
      for (let y = 0; y <= 1; y += 1) {
        for (let z = 0; z <= 1; z += 1) {
          const key = `${x}${y}${z}`;
          const sum = x + y + z;
          nodes.push({
            key,
            sum,
            label: ["A", "B", "C", "H"][sum],
            color: [muted, bColor, cColor, hColor][sum],
            position: new THREE.Vector3(x * 2 - 1, y * 2 - 1, z * 2 - 1),
          });
        }
      }
    }
    const byKey = new Map(nodes.map((node) => [node.key, node]));
    nodes.forEach((node) => {
      const bits = node.key.split("").map(Number);
      for (let i = 0; i < 3; i += 1) {
        const next = bits.slice();
        next[i] = 1 - next[i];
        const target = next.join("");
        if (node.key < target) {
          cubeBody.add(makeLine(THREE, [node.position, byKey.get(target).position], edge));
        }
      }
    });
    cubeBody.add(makeLine(THREE, [byKey.get("000").position, byKey.get("111").position], accent2, 4));
    nodes.forEach((node) => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(node.sum === 1 ? 0.16 : 0.14, 32, 16),
        new THREE.MeshStandardMaterial({ color: node.color, roughness: 0.55 }),
      );
      sphere.position.copy(node.position);
      cubeBody.add(sphere);
      const label = labelSprite(THREE, node.label, "#ffffff", node.color, 0.32);
      label.position.copy(node.position).add(new THREE.Vector3(0, 0.25, 0.16));
      cubeBody.add(label);
    });
    const axisLabel = labelSprite(THREE, "A-H 旋轉軸", "#ffffff", accent2, 0.42);
    axisLabel.position.set(0.15, 1.5, 1.1);
    cubeBody.add(axisLabel);
    group.add(cubeBody);

    const orbit = new THREE.Group();
    const orbitLabels = [
      ["100", new THREE.Vector3(2.75, 0.75, 0)],
      ["010", new THREE.Vector3(2.75, 0, 0)],
      ["001", new THREE.Vector3(2.75, -0.75, 0)],
    ];
    orbitLabels.forEach(([label, position]) => {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 32, 16),
        new THREE.MeshStandardMaterial({ color: bColor, roughness: 0.55 }),
      );
      node.position.copy(position);
      orbit.add(node);
      const sprite = labelSprite(THREE, label, "#ffffff", bColor, 0.34);
      sprite.position.copy(position).add(new THREE.Vector3(0, 0, 0.25));
      orbit.add(sprite);
    });
    orbit.add(makeLine(THREE, [orbitLabels[0][1], orbitLabels[1][1], orbitLabels[2][1]], accent, 4));
    const orbitLabel = labelSprite(THREE, "B 軌道", "#ffffff", accent, 0.38);
    orbitLabel.position.set(2.75, -1.35, 0);
    orbit.add(orbitLabel);
    group.add(orbit);
    return group;
  }

  function makeReferencePlane(THREE, color, orientation) {
    const geometry = new THREE.PlaneGeometry(3.4, 2.5);
    const material = new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      roughness: 0.8,
    });
    const plane = new THREE.Mesh(geometry, material);
    if (orientation === "yz") {
      plane.rotation.y = Math.PI / 2;
    }
    return plane;
  }

  function makeOctantMaterial(THREE, inverted = false) {
    return new THREE.ShaderMaterial({
      uniforms: {
        colorA: { value: new THREE.Color("#ffffff") },
        colorB: { value: new THREE.Color("#4b5563") },
        inverted: { value: inverted ? 1 : 0 },
      },
      vertexShader: `
        varying vec3 vLocalPosition;
        varying vec3 vNormal;
        void main() {
          vLocalPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform int inverted;
        varying vec3 vLocalPosition;
        varying vec3 vNormal;
        void main() {
          vec3 local = normalize(vLocalPosition);
          float product = local.x * local.y * local.z;
          bool useA = product >= 0.0;
          if (inverted == 1) {
            useA = !useA;
          }
          vec3 base = useA ? colorA : colorB;
          float directionMark = smoothstep(0.92, 0.98, local.x) * smoothstep(-0.18, 0.12, local.y);
          base = mix(base, useA ? vec3(0.18, 0.22, 0.28) : vec3(0.95, 0.96, 0.98), directionMark);
          float light = 0.58 + 0.42 * max(dot(normalize(vNormal), normalize(vec3(0.35, 0.7, 0.62))), 0.0);
          gl_FragColor = vec4(base * light, 1.0);
        }
      `,
    });
  }

  function operationMatrix(THREE, op, t = 1) {
    const matrix = new THREE.Matrix4();
    const mirrorScale = (progress) => {
      const scale = 1 - 2 * progress;
      if (Math.abs(scale) >= 0.055 || progress === 1) return scale;
      return scale < 0 ? -0.055 : 0.055;
    };
    if (op === "C2") {
      return matrix.makeRotationY(Math.PI * t);
    }
    if (op === "sigma_v") return matrix.makeScale(1, 1, mirrorScale(t));
    if (op === "sigma_v_prime") return matrix.makeScale(mirrorScale(t), 1, 1);
    return matrix.identity();
  }

  function buildWaterC2v(THREE, root, scene, camera, controls) {
    const edge = cssVar(root, "--cube-demo-edge");
    const accent = cssVar(root, "--cube-demo-accent");
    const accent2 = cssVar(root, "--cube-demo-accent-2");
    const oxygenColor = "#dc2626";
    const labelGray = "rgba(148, 163, 184, 0.72)";
    const labelBg = "rgba(15, 23, 42, 0.34)";
    const theta = 52.25 * Math.PI / 180;
    const atoms = [
      { id: "O", label: "O", color: oxygenColor, radius: 0.2, original: new THREE.Vector3(0, 0, 0) },
      { id: "H1", label: "H₁", radius: 0.17, original: new THREE.Vector3(-Math.sin(theta), Math.cos(theta), 0), octant: false },
      { id: "H2", label: "H₂", radius: 0.17, original: new THREE.Vector3(Math.sin(theta), Math.cos(theta), 0), octant: true },
    ];
    const rootGroup = new THREE.Group();
    rootGroup.scale.setScalar(1.28);
    scene.add(rootGroup);

    const moleculeGroup = new THREE.Group();
    moleculeGroup.matrixAutoUpdate = false;
    const labelGroup = new THREE.Group();
    const atomMeshes = new Map();
    atoms.forEach((atom) => {
      const material = atom.id === "O"
        ? new THREE.MeshStandardMaterial({ color: atom.color, roughness: 0.5 })
        : makeOctantMaterial(THREE, atom.octant);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(atom.radius, 40, 20),
        material,
      );
      mesh.position.copy(atom.original);
      moleculeGroup.add(mesh);
      const label = labelSprite(THREE, atom.label, labelGray, labelBg, 0.3, 0.76);
      labelGroup.add(label);
      atomMeshes.set(atom.id, { mesh, label, atom });
    });
    const bond1 = makeCylinderBetween(THREE, atoms[0].original, atoms[1].original, edge, 0.02);
    const bond2 = makeCylinderBetween(THREE, atoms[0].original, atoms[2].original, edge, 0.02);
    moleculeGroup.add(bond1, bond2);
    rootGroup.add(moleculeGroup, labelGroup);

    const referenceGroup = new THREE.Group();
    rootGroup.add(referenceGroup);

    const state = {
      operation: "e",
      labels: true,
      reference: true,
      locked: false,
      animation: 0,
      animating: false,
      displayMatrix: new THREE.Matrix4(),
      logicalMatrix: new THREE.Matrix4(),
    };

    function syncVisibility() {
      referenceGroup.visible = state.reference;
      atomMeshes.forEach(({ label }) => {
        label.visible = state.labels;
      });
    }

    function addReference(op) {
      referenceGroup.clear();
      if (op === "C2") {
        referenceGroup.add(makeLine(THREE, [new THREE.Vector3(0, -1.25, 0), new THREE.Vector3(0, 1.65, 0)], accent2, 4));
        const label = labelSprite(THREE, "C₂ 軸", labelGray, labelBg, 0.34, 0.8);
        label.position.set(0.28, 1.45, 0);
        referenceGroup.add(label);
        const arcPoints = [];
        for (let i = 0; i <= 40; i += 1) {
          const a = Math.PI * i / 40;
          arcPoints.push(new THREE.Vector3(0.95 * Math.cos(a), 0.92, -0.95 * Math.sin(a)));
        }
        referenceGroup.add(makeLine(THREE, arcPoints, accent, 4));
        const angle = labelSprite(THREE, "180°", labelGray, labelBg, 0.28, 0.8);
        angle.position.set(0, 1.22, -0.86);
        referenceGroup.add(angle);
      } else if (op === "sigma_v") {
        referenceGroup.add(makeReferencePlane(THREE, accent, "xy"));
        const label = labelSprite(THREE, "σᵥ：xy 平面", labelGray, labelBg, 0.4, 0.8);
        label.position.set(0, -0.95, 0.18);
        referenceGroup.add(label);
      } else if (op === "sigma_v_prime") {
        referenceGroup.add(makeReferencePlane(THREE, accent2, "yz"));
        const label = labelSprite(THREE, "σᵥ′：yz 平面", labelGray, labelBg, 0.4, 0.8);
        label.position.set(0.18, -0.95, 0.55);
        referenceGroup.add(label);
      } else {
        const label = labelSprite(THREE, "e：不改變位置", labelGray, labelBg, 0.4, 0.8);
        label.position.set(0, -0.95, 0);
        referenceGroup.add(label);
      }
      syncVisibility();
    }

    function updateGeometry(matrix) {
      moleculeGroup.matrix.copy(matrix);
      moleculeGroup.matrixWorldNeedsUpdate = true;
      atoms.forEach((atom) => {
        const pos = atom.original.clone().applyMatrix4(matrix);
        const entry = atomMeshes.get(atom.id);
        entry.label.position.copy(pos).add(new THREE.Vector3(0, 0.31, 0.06));
      });
    }

    function applyOperation(op) {
      state.operation = op;
      state.animation += 1;
      const animation = state.animation;
      const startMatrix = (state.animating ? state.logicalMatrix : state.displayMatrix).clone();
      const targetMatrix = operationMatrix(THREE, op, 1).multiply(startMatrix);
      state.logicalMatrix.copy(targetMatrix);
      state.animating = true;
      addReference(op);
      const start = performance.now();
      const duration = 850;

      function frameMatrix(t) {
        return operationMatrix(THREE, op, t).multiply(startMatrix);
      }

      function tick(now) {
        if (animation !== state.animation) return;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const matrix = t === 1 ? targetMatrix : frameMatrix(eased);
        updateGeometry(matrix);
        state.displayMatrix.copy(matrix);
        if (t < 1) {
          requestAnimationFrame(tick);
          return;
        }
        updateGeometry(targetMatrix);
        state.displayMatrix.copy(targetMatrix);
        state.animating = false;
      }

      requestAnimationFrame(tick);
    }

    function lockCamera(locked) {
      state.locked = locked;
      if (locked) {
        camera.position.set(0, 0, 5.2);
        controls.target.set(0, 0.28, 0);
        controls.enableRotate = false;
      } else {
        camera.position.set(3.6, 2.6, 4.7);
        controls.target.set(0, 0.28, 0);
        controls.enableRotate = true;
      }
      camera.updateProjectionMatrix();
      controls.update();
    }

    addReference("e");
    updateGeometry(state.displayMatrix);
    syncVisibility();
    controls.target.set(0, 0.28, 0);
    camera.position.set(3.6, 2.6, 4.7);

    return {
      state,
      applyOperation,
      syncVisibility,
      lockCamera,
    };
  }

  function setOperation(THREE, group, demo, angle) {
    if (demo === "triangle-rotation") {
      group.rotation.set(0, 0, angle);
      return;
    }
    const axis = new THREE.Vector3(1, 1, 1).normalize();
    group.userData.rotatingBody.quaternion.setFromAxisAngle(axis, angle);
  }

  async function mount(root) {
    const demo = root.dataset.demo;
    const panel = document.createElement("div");
    panel.className = "cube-resistor-interactive__panel";
    const viewport = document.createElement("div");
    viewport.className = "cube-resistor-interactive__viewport";
    const controlsEl = document.createElement("div");
    controlsEl.className = "cube-resistor-interactive__controls";
    panel.appendChild(viewport);
    panel.appendChild(controlsEl);
    root.appendChild(panel);

    try {
      const { THREE, OrbitControls } = await loadThree();
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      viewport.appendChild(renderer.domElement);
      const { scene, camera } = makeScene(THREE, root, renderer);
      const orbitControls = new OrbitControls(camera, renderer.domElement);
      orbitControls.enableDamping = true;
      orbitControls.dampingFactor = 0.08;
      orbitControls.target.set(0.55, 0, 0);

      const water = demo === "water-c2v" ? buildWaterC2v(THREE, root, scene, camera, orbitControls) : null;
      const objectGroup = water ? null : (demo === "triangle-rotation" ? buildTriangle(THREE, root) : buildCube(THREE, root));
      if (objectGroup) scene.add(objectGroup);

      const states = demo === "triangle-rotation"
        ? [["e", 0], ["r", (2 * Math.PI) / 3], ["r²", (4 * Math.PI) / 3]]
        : demo === "water-c2v"
          ? [["e", "e"], ["C₂", "C2"], ["σᵥ", "sigma_v"], ["σᵥ′", "sigma_v_prime"]]
        : [["0°", 0], ["120°", (2 * Math.PI) / 3], ["240°", (4 * Math.PI) / 3]];
      let active = 0;

      function renderButtons() {
        controlsEl.replaceChildren();
        states.forEach(([label, value], index) => {
          controlsEl.appendChild(makeButton(label, index === active, () => {
            active = index;
            if (water) water.applyOperation(value);
            else setOperation(THREE, objectGroup, demo, value);
            renderButtons();
          }));
        });
        const hintText = demo === "water-c2v"
          ? "拖曳可旋轉視角；按鈕切換 C₂v 的四個操作，灰白八卦限球追蹤 H₁/H₂ 身份。"
          : demo === "triangle-rotation"
          ? "拖曳可旋轉視角；按鈕切換 e、r、r²。"
          : "拖曳可旋轉視角；按鈕切換繞 A-H 軸的旋轉。";
        controlsEl.appendChild(makeTooltip(hintText));
        if (water) {
          const toggles = document.createElement("div");
          toggles.className = "cube-resistor-interactive__toggles";
          toggles.appendChild(makeToggle("身份標籤", water.state.labels, (checked) => {
            water.state.labels = checked;
            water.syncVisibility();
          }));
          toggles.appendChild(makeToggle("參考元素", water.state.reference, (checked) => {
            water.state.reference = checked;
            water.syncVisibility();
          }));
          toggles.appendChild(makeToggle("正視分子平面", water.state.locked, (checked) => {
            water.lockCamera(checked);
          }));
          controlsEl.appendChild(toggles);
        }
      }

      function resize() {
        const width = viewport.clientWidth;
        const height = Math.max(320, Math.min(430, Math.round(width * 0.58)));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      if (water) water.applyOperation("e");
      else setOperation(THREE, objectGroup, demo, 0);
      renderButtons();
      resize();
      new ResizeObserver(resize).observe(viewport);

      function animate() {
        orbitControls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();
    } catch (error) {
      const message = document.createElement("div");
      message.className = "cube-resistor-interactive__error";
      message.textContent = "Three.js 載入失敗，請檢查網路連線後重新整理。";
      viewport.appendChild(message);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".cube-resistor-interactive[data-demo]").forEach(mount);
  });
}());
