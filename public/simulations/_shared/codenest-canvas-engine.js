/*
 * Shared "stamp + wire" sketchpad engine for CodeNest canvas.html lesson
 * pages. A page provides window.CANVAS_CONFIG = {
 *   canvasId, storageKey,
 *   componentTypes: [{ key, label, color }],
 * } and calls initCodeNestCanvas().
 *
 * Interaction model:
 *  - Pick a component type from the toolbar, then click empty canvas to
 *    stamp a node there.
 *  - Click "Wire" mode, then click two nodes in turn to connect them.
 *  - Double-click a node to delete it (and its wires).
 *  - State auto-saves to localStorage under `storageKey`.
 */
function initCodeNestCanvas(config) {
  const canvas = document.getElementById(config.canvasId);
  const ctx = canvas.getContext("2d");
  const toolbar = document.getElementById("toolbar");

  let nodes = [];
  let wires = [];
  let mode = { type: "place", componentKey: config.componentTypes[0].key };
  let pendingWireSource = null;
  let nextId = 1;

  function load() {
    try {
      const raw = localStorage.getItem(config.storageKey);
      if (raw) {
        const data = JSON.parse(raw);
        nodes = data.nodes || [];
        wires = data.wires || [];
        nextId = data.nextId || nodes.length + 1;
      }
    } catch (e) {
      /* corrupt/absent save data — start fresh */
    }
  }

  function save() {
    localStorage.setItem(
      config.storageKey,
      JSON.stringify({ nodes, wires, nextId })
    );
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    draw();
  }

  function componentByKey(key) {
    return config.componentTypes.find((c) => c.key === key);
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    // wires first, under nodes
    wires.forEach(([fromId, toId]) => {
      const a = nodes.find((n) => n.id === fromId);
      const b = nodes.find((n) => n.id === toId);
      if (!a || !b) return;
      ctx.strokeStyle = "rgba(94, 210, 156, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      // arrowhead at midpoint pointing from a -> b
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      const angle = Math.atan2(b.y - a.y, b.x - a.x);
      ctx.save();
      ctx.translate(midX, midY);
      ctx.rotate(angle);
      ctx.fillStyle = "rgba(94, 210, 156, 0.8)";
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(-6, -5);
      ctx.lineTo(-6, 5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    nodes.forEach((node) => {
      const comp = componentByKey(node.type) || config.componentTypes[0];
      const isPending = pendingWireSource === node.id;

      ctx.beginPath();
      ctx.arc(node.x, node.y, 28, 0, Math.PI * 2);
      ctx.fillStyle = comp.color || "#5ed29c";
      ctx.globalAlpha = 0.18;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.lineWidth = isPending ? 3 : 1.5;
      ctx.strokeStyle = isPending ? "#f1f5f9" : comp.color || "#5ed29c";
      ctx.stroke();

      ctx.fillStyle = "#f1f5f9";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(comp.label.slice(0, 4).toUpperCase(), node.x, node.y);

      ctx.font = "10px Inter, sans-serif";
      ctx.fillStyle = "rgba(241, 245, 249, 0.6)";
      ctx.fillText(comp.label, node.x, node.y + 42);
    });
  }

  function nodeAt(x, y) {
    return nodes.find((n) => Math.hypot(n.x - x, n.y - y) < 28);
  }

  function pointerPos(evt) {
    const rect = canvas.getBoundingClientRect();
    const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
    const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  canvas.addEventListener("click", (evt) => {
    const { x, y } = pointerPos(evt);
    const hit = nodeAt(x, y);

    if (mode.type === "wire") {
      if (!hit) return;
      if (pendingWireSource === null) {
        pendingWireSource = hit.id;
      } else if (pendingWireSource !== hit.id) {
        wires.push([pendingWireSource, hit.id]);
        pendingWireSource = null;
        save();
      }
      draw();
      return;
    }

    if (hit) return; // placing mode: ignore clicks on existing nodes
    nodes.push({ id: nextId++, type: mode.componentKey, x, y });
    save();
    draw();
  });

  canvas.addEventListener("dblclick", (evt) => {
    const { x, y } = pointerPos(evt);
    const hit = nodeAt(x, y);
    if (!hit) return;
    nodes = nodes.filter((n) => n.id !== hit.id);
    wires = wires.filter(([a, b]) => a !== hit.id && b !== hit.id);
    save();
    draw();
  });

  function buildToolbar() {
    config.componentTypes.forEach((comp) => {
      const btn = document.createElement("button");
      btn.className = "tool-btn";
      btn.textContent = comp.label;
      btn.onclick = () => {
        mode = { type: "place", componentKey: comp.key };
        pendingWireSource = null;
        refreshToolbarState();
      };
      btn.dataset.key = comp.key;
      toolbar.appendChild(btn);
    });

    const wireBtn = document.createElement("button");
    wireBtn.className = "tool-btn";
    wireBtn.textContent = "Wire";
    wireBtn.dataset.key = "__wire__";
    wireBtn.onclick = () => {
      mode = { type: "wire" };
      pendingWireSource = null;
      refreshToolbarState();
    };
    toolbar.appendChild(wireBtn);

    const clearBtn = document.createElement("button");
    clearBtn.className = "tool-btn danger";
    clearBtn.textContent = "Clear";
    clearBtn.onclick = () => {
      if (!confirm("Clear the whole canvas?")) return;
      nodes = [];
      wires = [];
      pendingWireSource = null;
      save();
      draw();
    };
    toolbar.appendChild(clearBtn);

    refreshToolbarState();
  }

  function refreshToolbarState() {
    const activeKey = mode.type === "wire" ? "__wire__" : mode.componentKey;
    [...toolbar.querySelectorAll(".tool-btn")].forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.key === activeKey);
    });
  }

  load();
  buildToolbar();
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
}
