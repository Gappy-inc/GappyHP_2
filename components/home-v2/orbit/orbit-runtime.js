// Adapted from the user-provided Gappy_Orbit_Preview.html runtime.

/**
 * Gappy orbit motion. No network calls, external runtime, or framework required.
 * Logo URLs are supplied by the caller. Example logos do not imply integration support.
 */
const SVG_NS = "http://www.w3.org/2000/svg";
let orbitInstance = 0;

const DARK = {
  track: "#244037", wire: "#314a40", beam: "#a8e66b", text: "#a8b8b1",
  hub: "#0d1d18", hubEdge: "#486347", hubText: "#e9f5e2", halo: "#8ddf63",
};
const LIGHT = {
  track: "#dde7dd", wire: "#ccdacf", beam: "#348e41", text: "#52685b",
  hub: "#0d1d18", hubEdge: "#a7c59f", hubText: "#e9f5e2", halo: "#93ce73",
};

function svgElement(tag, attributes = {}, text) {
  const element = document.createElementNS(SVG_NS, tag);
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, String(value));
  if (text !== undefined) element.textContent = text;
  return element;
}

export function bezier(start, control, end, progress) {
  const inverse = 1 - progress;
  return {
    x: inverse * inverse * start.x + 2 * inverse * progress * control.x + progress * progress * end.x,
    y: inverse * inverse * start.y + 2 * inverse * progress * control.y + progress * progress * end.y,
  };
}

/**
 * @param {HTMLElement} container
 * @param {object} options
 * @param {Array<{id:string,name:string,shortName?:string,logo:string,ring?:0|1}>} options.tools
 * @param {'dark'|'light'} [options.theme]
 * @param {boolean} [options.paused]
 * @param {[number,number]} [options.periods] Inner/outer revolution times in seconds.
 * @param {(state:object)=>void} [options.onStateChange]
 */
export function createGappyOrbit(container, options) {
  if (!container || !Array.isArray(options?.tools)) throw new Error("A container and tools array are required.");
  if (options.tools.length > 8) throw new Error("Use at most eight tools; six is the recommended layout.");
  const id = `gappy-orbit-${++orbitInstance}`;
  const previousHost = {
    hadClass: container.classList.contains("gappy-orbit"),
    theme: container.getAttribute("data-theme"),
    motion: container.getAttribute("data-motion"),
  };
  const periods = options.periods || [46, 64];
  if (periods.length !== 2 || periods.some(value => !Number.isFinite(value) || value < 20)) {
    throw new Error("Use two orbit periods of at least 20 seconds.");
  }
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let palette;
  let compact = false;
  let time = 0;
  let previousTimestamp = null;
  let frame = null;
  let destroyed = false;
  let visible = !window.IntersectionObserver;
  let manuallyPaused = Boolean(options.paused);
  let pointerPaused = false;
  let reducedPreview = false;
  let width = 1200;
  let height = 620;
  let center = { x: 600, y: 310 };
  let hubRadius = 82;
  let cardSize = 66;
  let geometry = [{ rx: 274, ry: 148 }, { rx: 474, ry: 244 }];

  container.classList.add("gappy-orbit");
  const svg = svgElement("svg", {
    viewBox: `0 0 ${width} ${height}`, role: "img", class: "gappy-orbit__stage",
    "aria-labelledby": `${id}-title ${id}-description`, focusable: "false",
  });
  svg.append(
    svgElement("title", { id: `${id}-title` }, options.locale === "ja" ? "Gappy AI Workforceと業務ツールの連携イメージ" : "Gappy AI Workforce and your tools"),
    svgElement("desc", { id: `${id}-description` },
      options.locale === "ja" ? `Gappyと${options.tools.map(tool => tool.name).join("、")}をつなぐイメージです。ロゴは例示であり、対応範囲は個別に確認します。` : `Illustrative connections between Gappy and ${options.tools.map(tool => tool.name).join(", ")}. Tool logos in this concept are examples; support must be confirmed for your workflow.`),
  );
  const defs = svgElement("defs");
  const haloGradient = svgElement("radialGradient", { id: `${id}-halo` });
  const haloStart = svgElement("stop", { offset: "0", "stop-opacity": ".11" });
  const haloEnd = svgElement("stop", { offset: "1", "stop-opacity": "0" });
  haloGradient.append(haloStart, haloEnd);
  defs.append(haloGradient);
  svg.append(defs);
  const halo = svgElement("ellipse", { fill: `url(#${id}-halo)` });
  svg.append(halo);
  const tracks = geometry.map(() => svgElement("ellipse", {
    fill: "none", "stroke-width": "1", "vector-effect": "non-scaling-stroke",
  }));
  tracks.forEach(track => svg.append(track));

  const wireLayer = svgElement("g", { fill: "none", "stroke-width": "1" });
  const beamLayer = svgElement("g");
  const nodeLayer = svgElement("g");
  const hubLayer = svgElement("g", { "data-orbit-core": "" });
  svg.append(wireLayer, beamLayer, nodeLayer, hubLayer);

  const hubOuter = svgElement("circle", { fill: "none", "stroke-width": "1", opacity: ".5" });
  const hubCircle = svgElement("circle", { "stroke-width": "1.2" });
  const hubName = svgElement("image", { href: "/gappy-logo-official.png", preserveAspectRatio: "xMidYMid meet", "aria-label": "Gappy" });
  const hubSubtitle = svgElement("text", {
    "text-anchor": "middle", "font-size": "10", "font-weight": "500", "letter-spacing": "1.65",
  }, "AI WORKFORCE");
  const hubDetail = svgElement("line", { "stroke-width": "1", opacity: ".5" });
  hubLayer.append(hubOuter, hubCircle, hubName, hubDetail, hubSubtitle);

  const ringCounts = [0, 0];
  options.tools.forEach((tool, index) => ringCounts[tool.ring ?? index % 2]++);
  const ringIndexes = [0, 0];
  const nodes = options.tools.map((tool, index) => {
    const ring = tool.ring ?? index % 2;
    const phase = ringIndexes[ring]++ / ringCounts[ring] * Math.PI * 2 + (ring === 0 ? -.7 : .45);
    const group = svgElement("g", { class: "gappy-orbit__node", "data-tool": tool.id, "data-orbit-card": "", "data-ring": ring });
    const card = svgElement("rect", {
      rx: "17", fill: "#fff", stroke: "#dce5de", "stroke-width": ".65",
    });
    const logo = svgElement("image", { href: tool.logo, preserveAspectRatio: "xMidYMid meet" });
    const label = svgElement("text", { "text-anchor": "middle", "font-size": "13", "font-weight": "400" }, tool.name);
    group.append(card, logo, label);
    nodeLayer.append(group);
    const wire = svgElement("path", { "data-orbit-line": "", "vector-effect": "non-scaling-stroke", opacity: ".8" });
    wireLayer.append(wire);
    const pulse = svgElement("g", { opacity: "0", "data-orbit-signal": "" });
    const dots = [svgElement("circle", { r: "7", opacity: ".08" }),
      svgElement("circle", { r: "2.6" }), svgElement("circle", { r: "1.6", opacity: ".5" }),
      svgElement("circle", { r: ".9", opacity: ".25" })];
    pulse.append(...dots);
    beamLayer.append(pulse);
    return { tool, index, ring, phase, group, card, logo, label, wire, pulse, dots };
  });

  container.append(svg);

  function setTheme(theme = "dark") {
    palette = { ...(theme === "light" ? LIGHT : DARK), ...options.colors };
    container.dataset.theme = theme;
    haloStart.setAttribute("stop-color", palette.halo);
    haloEnd.setAttribute("stop-color", palette.halo);
    tracks.forEach(track => track.setAttribute("stroke", palette.track));
    hubOuter.setAttribute("stroke", palette.hubEdge);
    hubCircle.setAttribute("fill", palette.hub);
    hubCircle.setAttribute("stroke", palette.hubEdge);
    hubName.setAttribute("fill", palette.hubText);
    hubSubtitle.setAttribute("fill", palette.hubText);
    hubDetail.setAttribute("stroke", palette.hubEdge);
    nodes.forEach(node => {
      node.wire.setAttribute("stroke", palette.wire);
      node.pulse.setAttribute("fill", palette.beam);
      node.label.setAttribute("fill", palette.text);
    });
  }

  function render() {
    const reduced = motionPreference.matches || reducedPreview;
    nodes.forEach(node => {
      if (node.hidden) return;
      const { rx, ry } = geometry[node.ring];
      const direction = node.ring === 0 ? 1 : -1;
      const angle = node.phase + direction * time / periods[node.ring] * Math.PI * 2;
      const offset = { x: rx * Math.cos(angle), y: ry * Math.sin(angle) };
      const position = { x: center.x + offset.x, y: center.y + offset.y };
      // Translation only keeps every logo and label upright throughout the orbit.
      node.group.setAttribute("transform", `translate(${position.x.toFixed(2)} ${position.y.toFixed(2)})`);
      const length = Math.hypot(offset.x, offset.y);
      const unit = { x: offset.x / length, y: offset.y / length };
      const start = { x: center.x + unit.x * (hubRadius + 9), y: center.y + unit.y * (hubRadius + 9) };
      // Intersect the connector with the white square's bounding box.
      const endInset = (cardSize / 2 + 2) / Math.max(Math.abs(unit.x), Math.abs(unit.y));
      const end = { x: position.x - unit.x * endInset, y: position.y - unit.y * endInset };
      const bend = compact ? 8 : 14;
      const control = { x: (start.x + end.x) / 2 - unit.y * bend, y: (start.y + end.y) / 2 + unit.x * bend };
      node.wire.setAttribute("d", `M${start.x.toFixed(2)},${start.y.toFixed(2)} Q${control.x.toFixed(2)},${control.y.toFixed(2)} ${end.x.toFixed(2)},${end.y.toFixed(2)}`);
      const cycle = (time / 6.4 + node.index / Math.max(nodes.length, 1)) % 1;
      const active = cycle < .26 && !reduced;
      node.pulse.setAttribute("opacity", active ? String(Math.sin(Math.PI * cycle / .26)) : "0");
      if (active) {
        const progress = cycle / .26;
        const inward = node.index % 2 === 0;
        node.dots.forEach((dot, dotIndex) => {
          const trail = Math.max(0, progress - Math.max(0, dotIndex - 1) * .07);
          const point = bezier(start, control, end, inward ? 1 - trail : trail);
          dot.setAttribute("cx", point.x.toFixed(2));
          dot.setAttribute("cy", point.y.toFixed(2));
        });
      }
    });
  }

  function layout() {
    compact = container.clientWidth <= 900;
    width = compact ? 520 : 1200;
    height = 620;
    const renderedWidth = Math.max(240, compact ? Math.min(container.clientWidth, 520) : container.clientWidth);
    const labelPixels = compact && renderedWidth < 340 ? 10 : 12;
    const labelSize = labelPixels * width / renderedWidth;
    center = { x: width / 2, y: height / 2 };
    hubRadius = compact ? 64 : 82;
    cardSize = compact ? 60 : 66;
    geometry = compact ? [{ rx: 132, ry: 153 }, { rx: 210, ry: 245 }] : [{ rx: 274, ry: 148 }, { rx: 474, ry: 244 }];
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    halo.setAttribute("cx", center.x); halo.setAttribute("cy", center.y);
    halo.setAttribute("rx", compact ? 230 : 460); halo.setAttribute("ry", compact ? 250 : 260);
    tracks.forEach((track, index) => {
      for (const [name, value] of Object.entries({ cx: center.x, cy: center.y, ...geometry[index] })) track.setAttribute(name, value);
    });
    for (const circle of [hubCircle, hubOuter]) {
      circle.setAttribute("cx", center.x); circle.setAttribute("cy", center.y);
      circle.setAttribute("r", circle === hubCircle ? hubRadius : hubRadius + 9);
    }
    const hubLogoWidth = compact ? 88 : 114;
    hubName.setAttribute("x", center.x - hubLogoWidth / 2); hubName.setAttribute("y", center.y - 28);
    hubName.setAttribute("width", hubLogoWidth); hubName.setAttribute("height", 42);
    hubSubtitle.setAttribute("x", center.x); hubSubtitle.setAttribute("y", center.y + 31);
    hubSubtitle.setAttribute("font-size", compact ? "9" : "10");
    hubDetail.setAttribute("x1", center.x - 23); hubDetail.setAttribute("x2", center.x + 23);
    hubDetail.setAttribute("y1", center.y + 12); hubDetail.setAttribute("y2", center.y + 12);
    const shown = compact ? nodes.slice(0, options.mobileCount ?? 4) : nodes;
    const visibleCounts = [0, 0];
    shown.forEach(node => visibleCounts[node.ring]++);
    const visibleIndexes = [0, 0];
    nodes.forEach(node => {
      node.hidden = !shown.includes(node);
      for (const layer of [node.group, node.wire, node.pulse]) layer.style.display = node.hidden ? "none" : "";
      if (node.hidden) return;
      node.phase = visibleIndexes[node.ring]++ / visibleCounts[node.ring] * Math.PI * 2 + (node.ring === 0 ? -.7 : .45);
      for (const [name, value] of Object.entries({ x: -cardSize / 2, y: -cardSize / 2, width: cardSize, height: cardSize })) node.card.setAttribute(name, value);
      const size = cardSize * .49;
      for (const [name, value] of Object.entries({ x: -size / 2, y: -size / 2, width: size, height: size })) node.logo.setAttribute(name, value);
      node.label.setAttribute("y", cardSize / 2 + 22);
      node.label.setAttribute("font-size", labelSize.toFixed(2));
      node.label.textContent = compact ? node.tool.shortName || node.tool.name : node.tool.name;
    });
    render();
  }

  function running() {
    return !destroyed && visible && !document.hidden && !manuallyPaused && !pointerPaused && !motionPreference.matches && !reducedPreview;
  }

  function tick(timestamp) {
    frame = null;
    if (!running()) return;
    if (previousTimestamp !== null) time += Math.min((timestamp - previousTimestamp) / 1000, .05);
    previousTimestamp = timestamp;
    render();
    frame = requestAnimationFrame(tick);
  }

  function synchronize() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previousTimestamp = null;
    const state = {
      running: running(), paused: manuallyPaused,
      reduced: motionPreference.matches || reducedPreview,
      reason: motionPreference.matches || reducedPreview ? "reduced-motion" : manuallyPaused ? "paused" : pointerPaused ? "hover" : !visible || document.hidden ? "offscreen" : "running",
    };
    container.dataset.motion = state.reason;
    render();
    if (state.running) frame = requestAnimationFrame(tick);
    options.onStateChange?.(state);
  }

  const handleVisibility = () => synchronize();
  const handlePreference = () => synchronize();
  const handlePointerEnter = event => { if (options.pauseOnHover !== false && event.pointerType === "mouse") { pointerPaused = true; synchronize(); } };
  const handlePointerLeave = () => { pointerPaused = false; synchronize(); };
  document.addEventListener("visibilitychange", handleVisibility);
  motionPreference.addEventListener("change", handlePreference);
  container.addEventListener("pointerenter", handlePointerEnter);
  container.addEventListener("pointerleave", handlePointerLeave);
  const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(layout) : null;
  if (resize) resize.observe(container);
  else window.addEventListener("resize", layout);
  const intersection = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    synchronize();
  }, { threshold: 0 }) : null;
  intersection?.observe(container);
  setTheme(options.theme);
  layout();
  synchronize();

  return {
    setPaused(value) { manuallyPaused = Boolean(value); synchronize(); },
    setTheme,
    setReducedMotionPreview(value) { reducedPreview = Boolean(value); synchronize(); },
    destroy() {
      destroyed = true;
      if (frame !== null) cancelAnimationFrame(frame);
      resize?.disconnect(); intersection?.disconnect();
      if (!resize) window.removeEventListener("resize", layout);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionPreference.removeEventListener("change", handlePreference);
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointerleave", handlePointerLeave);
      svg.remove();
      if (!previousHost.hadClass) container.classList.remove("gappy-orbit");
      for (const [attribute, value] of [["data-theme", previousHost.theme], ["data-motion", previousHost.motion]]) {
        if (value === null) container.removeAttribute(attribute);
        else container.setAttribute(attribute, value);
      }
    },
  };
}

