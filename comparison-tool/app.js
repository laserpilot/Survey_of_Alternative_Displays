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

    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
