/* Display Chooser — render / sort / filter the comparison matrix.
 * No framework, no build step. Reads window.DISPLAYS from displays.js. */
(function () {
  "use strict";

  var DATA = (window.DISPLAYS || []).slice();

  // Column definitions, in display order. type: "score" (0-3) or "cat" (categorical).
  // `order` gives sort/rank order for categoricals (low → high).
  var COLUMNS = [
    { key: "ambientLight",   label: "Daylight",     type: "score", hint: "Ambient-light tolerance" },
    { key: "scale",          label: "Scale",        type: "score", hint: "Handheld → architectural" },
    { key: "resolution",     label: "Resolution",   type: "score", hint: "Blocky → sharp" },
    { key: "color",          label: "Color",        type: "cat",   order: ["mono", "limited", "full"] },
    { key: "motion",         label: "Motion",       type: "score", hint: "Static → full video" },
    { key: "transparency",   label: "See-through",  type: "score", hint: "Opaque → floats in air" },
    { key: "dimensionality", label: "Dimension",    type: "cat",   order: ["flat", "curved", "parallax", "volumetric"] },
    { key: "availability",   label: "Availability", type: "cat",   order: ["lab", "diy", "rent", "buy"] },
    { key: "cost",           label: "Cost",         type: "score", hint: "DIY/cheap → premium" },
    { key: "safety",         label: "Safety",       type: "score", hint: "Hazardous → safe" }
  ];

  var CAT_LABELS = {
    color:          { mono: "Mono", limited: "Limited", full: "Full" },
    dimensionality: { flat: "Flat", curved: "Curved", parallax: "Parallax", volumetric: "Volumetric" },
    availability:   { lab: "Lab", diy: "DIY", rent: "Rent", buy: "Buy today" }
  };
  var AXIS_DESC = {
    ambientLight: "Ambient light", scale: "Scale", resolution: "Resolution", color: "Color",
    motion: "Motion", transparency: "Transparency", dimensionality: "Dimensionality",
    availability: "Availability", cost: "Cost", safety: "Safety / power"
  };

  // ----- helpers ------------------------------------------------------------
  function axisOf(row, key) { return (row.axes && row.axes[key]) || {}; }
  function scoreOf(row, key) { var v = axisOf(row, key).score; return (typeof v === "number") ? v : null; }
  function valueOf(row, key) { var v = axisOf(row, key).value; return v || null; }

  function dots(score) {
    if (score === null) return '<span class="muted" title="not stated in the source">—</span>';
    var s = '<span class="dots dots-' + score + '" aria-label="' + score + ' of 3">';
    for (var i = 0; i < 3; i++) s += '<span class="dot ' + (i < score ? "on" : "off") + '"></span>';
    return s + "</span>";
  }
  function catChip(key, value) {
    if (!value) return '<span class="muted" title="not stated in the source">—</span>';
    var label = (CAT_LABELS[key] && CAT_LABELS[key][value]) || value;
    return '<span class="chip chip-' + key + '-' + value + '">' + label + "</span>";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  // ----- state --------------------------------------------------------------
  var sortKey = "name", sortDir = 1; // 1 asc, -1 desc
  var els = {};

  var CONF_RANK = { high: 0, medium: 1, low: 2 };

  function colByKey(key) { return COLUMNS.filter(function (c) { return c.key === key; })[0]; }
  function rankCat(row, col) {
    var v = valueOf(row, col.key);
    return v ? col.order.indexOf(v) : -1; // -1 = not stated
  }
  // active-sort-column value + whether it's "not stated"
  function sortVal(row, col) {
    if (col.type === "score") { var s = scoreOf(row, col.key); return { v: s, isNull: s === null }; }
    var r = rankCat(row, col); return { v: r, isNull: r < 0 };
  }
  function nameCmp(a, b) { return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1; }
  // within a tier, order is principled (not arbitrary): higher confidence first, then name
  function tiebreak(a, b) {
    var d = CONF_RANK[a.confidence] - CONF_RANK[b.confidence];
    return d !== 0 ? d : nameCmp(a, b);
  }
  function compare(a, b) {
    if (sortKey === "name") return sortDir * nameCmp(a, b);
    var col = colByKey(sortKey);
    if (!col) return nameCmp(a, b);
    var sa = sortVal(a, col), sb = sortVal(b, col);
    if (sa.isNull || sb.isNull) {              // "not stated" always sinks to the bottom, either direction
      if (sa.isNull && sb.isNull) return tiebreak(a, b);
      return sa.isNull ? 1 : -1;
    }
    if (sa.v !== sb.v) return sortDir * (sa.v < sb.v ? -1 : 1);
    return tiebreak(a, b);                      // equal tier
  }

  function currentFilters() {
    var minScores = [];
    Array.prototype.forEach.call(document.querySelectorAll("[data-axis]"), function (sel) {
      var n = parseInt(sel.value, 10);
      if (n > 0) minScores.push({ axis: sel.getAttribute("data-axis"), min: n });
    });
    return {
      q: els.search.value.trim().toLowerCase(),
      family: els.family.value,
      availability: els.availability.value,
      minScores: minScores
    };
  }

  function matches(row, f) {
    if (f.family && row.family !== f.family) return false;
    if (f.availability && valueOf(row, "availability") !== f.availability) return false;
    for (var i = 0; i < f.minScores.length; i++) {
      var sc = scoreOf(row, f.minScores[i].axis);
      if (sc === null || sc < f.minScores[i].min) return false; // gaps excluded by a min filter
    }
    if (f.q) {
      var hay = (row.name + " " + row.family + " " + row.summary).toLowerCase();
      if (hay.indexOf(f.q) === -1) return false;
    }
    return true;
  }

  // ----- rendering ----------------------------------------------------------
  function renderHead() {
    var tr = els.headRow;
    tr.innerHTML = "";
    var cols = [{ key: "name", label: "Technology", type: "name" }].concat(COLUMNS);
    cols.forEach(function (col) {
      var th = document.createElement("th");
      th.className = "th-" + (col.type || "score");
      th.tabIndex = 0;
      th.setAttribute("role", "button");
      th.title = (col.hint || col.label) + " — click to sort";
      var arrow = (sortKey === col.key) ? (sortDir === 1 ? " ▲" : " ▼") : "";
      th.innerHTML = esc(col.label) + '<span class="arrow">' + arrow + "</span>";
      function doSort() {
        if (sortKey === col.key) sortDir *= -1;
        else { sortKey = col.key; sortDir = (col.key === "name") ? 1 : -1; } // scores default high→low
        render();
      }
      th.addEventListener("click", doSort);
      th.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); doSort(); } });
      tr.appendChild(th);
    });
  }

  function renderBody(rows) {
    var tb = els.body;
    tb.innerHTML = "";
    var sortCol = (sortKey !== "name") ? colByKey(sortKey) : null;
    var prevTier;
    rows.forEach(function (row) {
      var tr = document.createElement("tr");
      tr.className = "row-" + row.status;
      if (sortCol) { // band consecutive equal-value rows so a "tier" reads as one group
        var sv = sortVal(row, sortCol);
        var tier = sv.isNull ? "—" : String(sv.v);
        if (prevTier !== undefined && tier !== prevTier) tr.className += " tier-break";
        prevTier = tier;
      }
      tr.tabIndex = 0;
      var html = '<td class="name-cell"><span class="name">' + esc(row.name) + "</span>" +
                 (row.status === "borderline" ? '<span class="badge badge-borderline" title="Real but pre-commercial / niche">borderline</span>' : "") +
                 '<span class="family">' + esc(row.family) + "</span></td>";
      COLUMNS.forEach(function (col) {
        html += "<td>" + (col.type === "score" ? dots(scoreOf(row, col.key)) : catChip(col.key, valueOf(row, col.key))) + "</td>";
      });
      tr.innerHTML = html;
      tr.addEventListener("click", function () { showDetail(row); });
      tr.addEventListener("keydown", function (e) { if (e.key === "Enter") showDetail(row); });
      tb.appendChild(tr);
    });
  }

  function render() {
    var f = currentFilters();
    var rows = DATA.filter(function (r) { return matches(r, f); }).sort(compare);
    renderHead();
    renderBody(rows);
    els.count.textContent = rows.length + " of " + DATA.length + " technologies";
  }

  function showDetail(row) {
    var d = els.detail;
    var rowsHtml = COLUMNS.map(function (col) {
      var a = axisOf(row, col.key);
      var val = (col.type === "score") ? dots(scoreOf(row, col.key)) : catChip(col.key, valueOf(row, col.key));
      var note = a.note ? esc(a.note) : '<span class="muted">not stated</span>';
      return '<div class="d-axis"><div class="d-axis-name">' + esc(AXIS_DESC[col.key] || col.label) +
             "</div><div class=\"d-axis-val\">" + val + '</div><div class="d-axis-note">' + note + "</div></div>";
    }).join("");
    d.innerHTML =
      '<button class="d-close" type="button" aria-label="Close">×</button>' +
      '<h2>' + esc(row.name) +
      (row.status === "borderline" ? ' <span class="badge badge-borderline">borderline</span>' : "") + "</h2>" +
      '<p class="d-summary">' + esc(row.summary) + "</p>" +
      '<p class="d-meta">Family: <strong>' + esc(row.family) + "</strong> · Confidence in ratings: " +
      '<strong class="conf conf-' + row.confidence + '">' + esc(row.confidence) + "</strong></p>" +
      '<div class="d-axes">' + rowsHtml + "</div>" +
      '<p class="d-links">' +
      '<a href="' + esc(row.gitbookUrl) + '" target="_blank" rel="noopener">Read full section ↗</a>' +
      '<span class="d-source">source: <code>' + esc(row.source) + "</code></span></p>";
    d.hidden = false;
    d.querySelector(".d-close").addEventListener("click", function () { d.hidden = true; });
    d.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // ----- init ---------------------------------------------------------------
  function init() {
    els = {
      search: document.getElementById("search"),
      family: document.getElementById("filter-family"),
      availability: document.getElementById("filter-availability"),
      headRow: document.getElementById("head-row"),
      body: document.getElementById("body"),
      count: document.getElementById("count"),
      detail: document.getElementById("detail")
    };

    // populate family dropdown
    var families = DATA.map(function (r) { return r.family; })
      .filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    families.forEach(function (fam) {
      var o = document.createElement("option"); o.value = fam; o.textContent = fam;
      els.family.appendChild(o);
    });

    [els.search, els.family, els.availability].forEach(function (el) {
      el.addEventListener("input", render); el.addEventListener("change", render);
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-axis]"), function (sel) {
      sel.addEventListener("change", render);
    });
    document.getElementById("reset").addEventListener("click", function () {
      els.search.value = ""; els.family.value = ""; els.availability.value = "";
      Array.prototype.forEach.call(document.querySelectorAll("[data-axis]"), function (s) { s.value = "0"; });
      els.detail.hidden = true;
      render();
    });

    setupViews();
    initTensions();
    render();
  }

  // ===== Tensions view (scatter + Pareto frontier + insight) ================
  var PLOT_AXES = ["ambientLight", "scale", "resolution", "motion", "transparency",
                   "color", "dimensionality", "availability", "cost", "safety"];
  var PRESETS = {
    bigsharp: { x: "resolution",    y: "scale",        fx: false, fy: false,
      cap: "Here “resolution” means perceived sharpness / pixel density up close. Fine-pitch LED (≈0.7 mm) is narrowing this at scale, but most large formats still trade fine detail for size." },
    bright:   { x: "ambientLight",  y: "transparency", fx: false, fy: false,
      cap: "Readable in ambient light AND see-through is a hard combination — note the only things that manage both aren’t image displays at all, but switchable glass (opacity control)." },
    cheap:    { x: "cost",          y: "availability", fx: true,  fy: false,
      cap: "Cheap and easy to obtain. Cost is flipped to ▼ so “cheaper is better,” and the frontier hugs the affordable, buy-it-today corner." },
    surface:  { x: "dimensionality",y: "transparency", fx: false, fy: false,
      cap: "Images that leave the screen: both volumetric (true 3D) and see-through, so they float free in space rather than living on a surface." }
  };
  var FAMILY_COLORS = (function () {
    var fams = DATA.map(function (r) { return r.family; })
      .filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    var m = {};
    fams.forEach(function (f, i) { m[f] = "hsl(" + Math.round((i * 137.508) % 360) + ",62%,58%)"; });
    return m;
  })();
  var tState = { x: "resolution", y: "scale", flipX: false, flipY: false };
  var tEl = {}, tnsTip = null;

  function axisMeta(key) {
    var col = colByKey(key);
    if (col.type === "score") return { col: col, max: 3, ticks: ["0", "1", "2", "3"], label: AXIS_DESC[key] || col.label };
    var ticks = col.order.map(function (v) { return (CAT_LABELS[key] && CAT_LABELS[key][v]) || v; });
    return { col: col, max: col.order.length - 1, ticks: ticks, label: AXIS_DESC[key] || col.label };
  }
  function numVal(row, key) {
    var col = colByKey(key);
    if (col.type === "score") return scoreOf(row, key);
    var idx = rankCat(row, col); return idx < 0 ? null : idx;
  }
  function fmtVal(row, key) {
    var col = colByKey(key);
    if (col.type === "score") { var s = scoreOf(row, key); return s === null ? "—" : String(s) + "/3"; }
    var v = valueOf(row, key); return v ? ((CAT_LABELS[key] && CAT_LABELS[key][v]) || v) : "—";
  }
  function rowById(id) { for (var i = 0; i < DATA.length; i++) if (DATA[i].id === id) return DATA[i]; return null; }
  function goodX(r) { var v = numVal(r, tState.x); return tState.flipX ? axisMeta(tState.x).max - v : v; }
  function goodY(r) { var v = numVal(r, tState.y); return tState.flipY ? axisMeta(tState.y).max - v : v; }
  function paretoSet(rows) {
    return rows.filter(function (r) {
      return !rows.some(function (o) {
        if (o === r) return false;
        return goodX(o) >= goodX(r) && goodY(o) >= goodY(r) && (goodX(o) > goodX(r) || goodY(o) > goodY(r));
      });
    });
  }
  function strongPhrase(key, flip) {
    var m = axisMeta(key), tick = m.ticks[flip ? 0 : m.max], lbl = m.label.toLowerCase();
    return colByKey(key).type === "score" ? (tick + "/" + m.max + " " + lbl) : ("“" + tick + "” " + lbl);
  }

  function renderTensions() {
    var x = tState.x, y = tState.y, mx = axisMeta(x), my = axisMeta(y);
    var W = 760, H = 560, L = 104, Rm = 28, Tm = 34, Bm = 70, pw = W - L - Rm, ph = H - Tm - Bm;
    var INSET = 30, R0 = 5; // inset the data domain so edge clusters don't spill over the labels
    var plotted = [], missing = [];
    DATA.forEach(function (r) {
      (numVal(r, x) === null || numVal(r, y) === null) ? missing.push(r) : plotted.push(r);
    });
    function px(v) { return L + INSET + (mx.max ? v / mx.max : 0) * (pw - 2 * INSET); }
    function py(v) { return Tm + INSET + (ph - 2 * INSET) - (my.max ? v / my.max : 0) * (ph - 2 * INSET); }

    // cluster points sharing a cell so ties don't fully overlap
    var groups = {};
    plotted.forEach(function (r) { var k = numVal(r, x) + "," + numVal(r, y); (groups[k] = groups[k] || []).push(r); });
    var innerW = pw - 2 * INSET, innerH = ph - 2 * INSET;
    var spread = Math.min(innerW / (mx.max || 1), innerH / (my.max || 1)) * 0.42, pos = {};
    var maxHalf = INSET - R0 - 2; // a cluster can never reach past the inset into the axis labels
    Object.keys(groups).forEach(function (k) {
      var arr = groups[k].slice().sort(function (a, b) { return a.name < b.name ? -1 : 1; });
      var parts = k.split(","), bx = px(+parts[0]), by = py(+parts[1]);
      var n = arr.length, cols = Math.ceil(Math.sqrt(n)), rowsN = Math.ceil(n / cols);
      var step = Math.min(cols > 1 ? spread / (cols - 1) : spread, 13);
      if (cols > 1) step = Math.min(step, (2 * maxHalf) / (cols - 1));
      var ox = (cols - 1) / 2 * step, oy = (rowsN - 1) / 2 * step;
      arr.forEach(function (r, i) {
        pos[r.id] = { cx: bx + (i % cols) * step - ox, cy: by + Math.floor(i / cols) * step - oy };
      });
    });

    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="tns-svg" preserveAspectRatio="xMidYMid meet">';
    for (var i = 0; i <= mx.max; i++) {
      var X = px(i);
      s += '<line class="grid" x1="' + X + '" y1="' + Tm + '" x2="' + X + '" y2="' + (Tm + ph) + '"/>';
      s += '<text class="tick" x="' + X + '" y="' + (Tm + ph + 18) + '" text-anchor="middle">' + esc(mx.ticks[i]) + '</text>';
    }
    for (var j = 0; j <= my.max; j++) {
      var Y = py(j);
      s += '<line class="grid" x1="' + L + '" y1="' + Y + '" x2="' + (L + pw) + '" y2="' + Y + '"/>';
      s += '<text class="tick" x="' + (L - 9) + '" y="' + (Y + 4) + '" text-anchor="end">' + esc(my.ticks[j]) + '</text>';
    }
    s += '<text class="axis-title" x="' + (L + pw / 2) + '" y="' + (H - 10) + '" text-anchor="middle">' +
         esc(mx.label) + (tState.flipX ? " ▾" : " ▴") + '</text>';
    s += '<text class="axis-title" transform="translate(16,' + (Tm + ph / 2) + ') rotate(-90)" text-anchor="middle">' +
         esc(my.label) + (tState.flipY ? " ▾" : " ▴") + '</text>';

    var front = paretoSet(plotted);
    if (front.length > 1) {
      var seen = {}, pts = [];
      front.map(function (r) { return { x: px(numVal(r, x)), y: py(numVal(r, y)) }; })
        .sort(function (a, b) { return a.x - b.x || a.y - b.y; })
        .forEach(function (p) { var key = p.x.toFixed(1) + "," + p.y.toFixed(1); if (!seen[key]) { seen[key] = 1; pts.push(key); } });
      if (pts.length > 1) s += '<polyline class="frontier" points="' + pts.join(" ") + '"/>';
    }
    plotted.forEach(function (r) {
      var p = pos[r.id], col = FAMILY_COLORS[r.family] || "#888", low = r.confidence === "low";
      s += '<circle class="pt' + (low ? " low" : "") + '" data-id="' + esc(r.id) + '" cx="' + p.cx.toFixed(1) +
           '" cy="' + p.cy.toFixed(1) + '" r="5" ' +
           (low ? ('fill="none" stroke="' + col + '" stroke-width="2"') : ('fill="' + col + '" stroke="rgba(0,0,0,.35)"')) + '/>';
    });
    s += '</svg>';
    tEl.plot.innerHTML = s;

    // insight
    var corner = plotted.filter(function (r) { return goodX(r) === mx.max && goodY(r) === my.max; });
    var sx = strongPhrase(x, tState.flipX), sy = strongPhrase(y, tState.flipY);
    if (corner.length === 0) {
      tEl.insight.innerHTML = '<strong>Empty corner.</strong> Nothing is both ' + sx + ' and ' + sy +
        ' — that combination is a real gap. The closest options sit on the dashed frontier.';
    } else {
      var names = corner.slice(0, 4).map(function (r) { return esc(r.name); }).join(", ") + (corner.length > 4 ? ", …" : "");
      tEl.insight.innerHTML = '<strong>' + corner.length + (corner.length === 1 ? ' display' : ' displays') +
        '</strong> reach both ' + sx + ' and ' + sy + ': ' + names + '.';
    }

    // missing-data note (honest about gaps)
    if (!missing.length) tEl.missing.textContent = "Plotting all " + plotted.length + " displays on these two axes.";
    else {
      var mn = missing.slice(0, 6).map(function (r) { return r.name; }).join(", ") + (missing.length > 6 ? ", …" : "");
      tEl.missing.innerHTML = "Plotting " + plotted.length + " of " + DATA.length + ". <span class='muted'>" +
        missing.length + " not shown — no rating on " + esc(mx.label.toLowerCase()) + " or " + esc(my.label.toLowerCase()) + ": " + esc(mn) + "</span>";
    }

    // legend
    var fams = plotted.map(function (r) { return r.family; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).sort();
    var lh = fams.map(function (f) { return '<span class="lg-fam"><span class="sw" style="background:' + FAMILY_COLORS[f] + '"></span>' + esc(f) + '</span>'; }).join("");
    lh += '<span class="lg-fam"><span class="sw hollow"></span>low-confidence rating</span>';
    lh += '<span class="lg-fam"><span class="sw line"></span>trade-off frontier</span>';
    tEl.legend.innerHTML = lh;
  }

  function initTensions() {
    tEl.x = document.getElementById("tns-x"); tEl.y = document.getElementById("tns-y");
    tEl.fx = document.getElementById("tns-fx"); tEl.fy = document.getElementById("tns-fy");
    tEl.plot = document.getElementById("tns-plot"); tEl.legend = document.getElementById("tns-legend");
    tEl.insight = document.getElementById("tns-insight"); tEl.missing = document.getElementById("tns-missing");
    tEl.caption = document.getElementById("tns-caption");
    function clearCaption() { tEl.caption.hidden = true; tEl.caption.textContent = ""; }

    PLOT_AXES.forEach(function (k) {
      var label = axisMeta(k).label;
      [tEl.x, tEl.y].forEach(function (sel) {
        var o = document.createElement("option"); o.value = k; o.textContent = label; sel.appendChild(o);
      });
    });
    tEl.x.value = tState.x; tEl.y.value = tState.y;
    tEl.x.addEventListener("change", function () { tState.x = tEl.x.value; clearCaption(); renderTensions(); });
    tEl.y.addEventListener("change", function () { tState.y = tEl.y.value; clearCaption(); renderTensions(); });
    tEl.fx.addEventListener("click", function () { tState.flipX = !tState.flipX; tEl.fx.textContent = tState.flipX ? "▼" : "▲"; clearCaption(); renderTensions(); });
    tEl.fy.addEventListener("click", function () { tState.flipY = !tState.flipY; tEl.fy.textContent = tState.flipY ? "▼" : "▲"; clearCaption(); renderTensions(); });

    Array.prototype.forEach.call(document.querySelectorAll(".preset"), function (b) {
      b.addEventListener("click", function () {
        var p = PRESETS[b.getAttribute("data-preset")]; if (!p) return;
        tState.x = p.x; tState.y = p.y; tState.flipX = p.fx; tState.flipY = p.fy;
        tEl.x.value = p.x; tEl.y.value = p.y;
        tEl.fx.textContent = p.fx ? "▼" : "▲"; tEl.fy.textContent = p.fy ? "▼" : "▲";
        tEl.caption.textContent = p.cap || ""; tEl.caption.hidden = !p.cap;
        renderTensions();
      });
    });

    // shared tooltip
    tnsTip = document.createElement("div"); tnsTip.className = "tns-tip"; tnsTip.hidden = true;
    document.body.appendChild(tnsTip);
    tEl.plot.addEventListener("mouseover", function (e) {
      var c = e.target; if (!c.classList || !c.classList.contains("pt")) return;
      var r = rowById(c.getAttribute("data-id")); if (!r) return;
      tnsTip.innerHTML = "<strong>" + esc(r.name) + "</strong><br><span class='muted'>" + esc(r.family) + "</span><br>" +
        esc(axisMeta(tState.x).label) + ": " + esc(fmtVal(r, tState.x)) + " · " +
        esc(axisMeta(tState.y).label) + ": " + esc(fmtVal(r, tState.y));
      tnsTip.hidden = false;
    });
    tEl.plot.addEventListener("mousemove", function (e) {
      if (tnsTip.hidden) return; tnsTip.style.left = (e.clientX + 13) + "px"; tnsTip.style.top = (e.clientY + 13) + "px";
    });
    tEl.plot.addEventListener("mouseout", function (e) {
      if (e.target.classList && e.target.classList.contains("pt")) tnsTip.hidden = true;
    });
    tEl.plot.addEventListener("click", function (e) {
      var c = e.target; if (c.classList && c.classList.contains("pt")) { var r = rowById(c.getAttribute("data-id")); if (r) showDetail(r); }
    });
  }

  function setupViews() {
    var tabM = document.getElementById("tab-matrix"), tabT = document.getElementById("tab-tensions");
    var vM = document.getElementById("view-matrix"), vT = document.getElementById("view-tensions");
    function show(matrix) {
      vM.hidden = !matrix; vT.hidden = matrix;
      tabM.classList.toggle("active", matrix); tabT.classList.toggle("active", !matrix);
      tabM.setAttribute("aria-selected", matrix); tabT.setAttribute("aria-selected", !matrix);
      if (!matrix) renderTensions();
    }
    tabM.addEventListener("click", function () { show(true); });
    tabT.addEventListener("click", function () { show(false); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
