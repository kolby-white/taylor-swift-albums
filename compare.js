(function () {
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const M = Object.fromEntries(METRICS.map((m) => [m.key, m]));
  const name = (a) => a.styled || a.title;

  /* ---------- formatting ---------- */
  const fmt = (m, v) => {
    if (v == null) return "—";
    switch (m.fmt) {
      case "units": return v >= 1e6 ? (v / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M" : Math.round(v / 1000) + "K";
      case "plat": return v + "× Platinum" + (v >= 10 ? " (Diamond)" : "");
      case "of10": return v + " of 10";
      case "time": { const m_ = Math.floor(v), s = Math.round((v - m_) * 60); return m_ + ":" + String(s).padStart(2, "0"); }
      default: return String(v);
    }
  };
  const fmtLong = (m, v) => (m.fmt === "units" ? Math.round(v).toLocaleString("en-US") : fmt(m, v));
  const val = (a, k) => STATS[a.id][k];

  /* ---------- state ---------- */
  const state = { metric: "fw", sort: "chron", x: "mc", y: "fw", a: "1989", b: "midnights" };
  const isA = (a) => a.id === state.a, isB = (a) => a.id === state.b;
  const pickClass = (a) => (isA(a) ? " is-a" : isB(a) ? " is-b" : "");

  /* ---------- tooltip ---------- */
  const tip = document.createElement("div");
  tip.className = "tip"; tip.setAttribute("role", "status"); document.body.appendChild(tip);
  const showTip = (el, html) => {
    tip.innerHTML = html; tip.style.display = "block";
    const r = el.getBoundingClientRect(), w = tip.offsetWidth;
    tip.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + "px";
    tip.style.top = r.top + window.scrollY - tip.offsetHeight - 8 + "px";
  };
  const hideTip = () => (tip.style.display = "none");
  window.addEventListener("scroll", hideTip, { passive: true });
  const bindTips = (root, sel, html) => {
    const on = (e) => { const el = e.target.closest(sel); if (el && root.contains(el)) showTip(el, html(el)); };
    root.addEventListener("mouseover", on); root.addEventListener("focusin", on);
    root.addEventListener("mouseleave", hideTip); root.addEventListener("focusout", hideTip);
  };

  /* ---------- 1. dashboard ---------- */
  $("#metric-chips").innerHTML = METRICS.map((m) =>
    `<button type="button" data-k="${m.key}" aria-pressed="${m.key === state.metric}">${esc(m.short)}</button>`).join("");
  $("#metric-chips").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    state.metric = b.dataset.k; renderDash();
  });
  document.querySelector(".seg").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    state.sort = b.dataset.sort;
    document.querySelectorAll(".seg button").forEach((x) => x.classList.toggle("on", x === b));
    renderDash();
  });

  function renderDash() {
    const m = M[state.metric];
    document.querySelectorAll("#metric-chips button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === m.key));
    const vals = ALBUMS.map((a) => val(a, m.key));
    const max = Math.max(...vals), min = Math.min(...vals);
    const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
    const hiA = ALBUMS[vals.indexOf(max)], loA = ALBUMS[vals.indexOf(min)];
    const hiLbl = m.hi === null ? "Longest / most" : "Highest";
    const loLbl = m.hi === null ? "Shortest / fewest" : "Lowest";
    $("#kpis").innerHTML = `
      <div><span class="k-l">${hiLbl}</span><span class="k-v">${esc(fmt(m, max))}</span><span class="k-s"><em>${esc(name(hiA))}</em> (${hiA.year})</span></div>
      <div><span class="k-l">${loLbl}</span><span class="k-v">${esc(fmt(m, min))}</span><span class="k-s"><em>${esc(name(loA))}</em> (${loA.year})</span></div>
      <div><span class="k-l">Average</span><span class="k-v">${esc(fmt(m, avg))}</span><span class="k-s">across 12 albums</span></div>`;
    const order = ALBUMS.slice();
    if (state.sort === "rank") order.sort((p, q) => val(q, m.key) - val(p, m.key));
    $("#bars").innerHTML = order.map((a) => {
      const v = val(a, m.key), w = max ? (v / max) * 100 : 0;
      const show = v === max || v === min || isA(a) || isB(a);
      return `<div class="bar-row${pickClass(a)}" role="listitem" tabindex="0" data-id="${a.id}" aria-label="${esc(a.title)}: ${esc(fmtLong(m, v))}">
        <span class="bar-name"><em>${esc(name(a))}</em> <small>${a.year}</small></span>
        <span class="bar-track"><span class="bar" style="width:${Math.max(w, v ? 0.8 : 0)}%"></span><span class="bar-val${show ? " show" : ""}">${esc(fmt(m, v))}</span></span>
      </div>`;
    }).join("");
    $("#metric-note").textContent = m.note + (isFinite(max) ? " Rose and blue bars are your head-to-head picks (A and B); select any bar to make it Album A." : "");
  }
  bindTips($("#bars"), ".bar-row", (el) => {
    const a = ALBUMS.find((x) => x.id === el.dataset.id), m = M[state.metric];
    return `<strong>${esc(a.title)}</strong> (${a.year})<br>${esc(m.name)}: ${esc(fmtLong(m, val(a, m.key)))}`;
  });
  $("#bars").addEventListener("click", (e) => {
    const r = e.target.closest(".bar-row"); if (!r) return;
    if (r.dataset.id !== state.a) { state.b = state.a; state.a = r.dataset.id; renderAll(); }
  });

  /* ---------- 2. scatter ---------- */
  const opts = METRICS.map((m) => `<option value="${m.key}">${esc(m.name)}</option>`).join("");
  $("#sx").innerHTML = opts; $("#sy").innerHTML = opts;
  $("#sx").value = state.x; $("#sy").value = state.y;
  $("#sx").addEventListener("change", (e) => { state.x = e.target.value; renderScatter(); });
  $("#sy").addEventListener("change", (e) => { state.y = e.target.value; renderScatter(); });

  const nice = (lo, hi, n = 5) => {
    const span = hi - lo || 1, step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
    const step = [1, 2, 2.5, 5, 10].map((f) => f * mag).find((s) => s >= step0);
    const a = Math.floor(lo / step) * step, b = Math.ceil(hi / step) * step, t = [];
    for (let v = a; v <= b + step / 2; v += step) t.push(+v.toFixed(6));
    return t;
  };
  const pearson = (xs, ys) => {
    const n = xs.length, mx = xs.reduce((s, v) => s + v, 0) / n, my = ys.reduce((s, v) => s + v, 0) / n;
    let sxy = 0, sxx = 0, syy = 0;
    xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; syy += (ys[i] - my) ** 2; });
    return sxx && syy ? sxy / Math.sqrt(sxx * syy) : NaN;
  };

  function renderScatter() {
    const mx = M[state.x], my = M[state.y];
    const W = 760, H = 430, L = 64, R = 24, T = 18, B = 52;
    const xs = ALBUMS.map((a) => val(a, mx.key)), ys = ALBUMS.map((a) => val(a, my.key));
    const tx = nice(Math.min(...xs), Math.max(...xs)), ty = nice(Math.min(...ys), Math.max(...ys));
    const x0 = tx[0], x1 = tx[tx.length - 1], y0 = ty[0], y1 = ty[ty.length - 1];
    const px = (v) => L + ((v - x0) / (x1 - x0 || 1)) * (W - L - R);
    const py = (v) => H - B - ((v - y0) / (y1 - y0 || 1)) * (H - T - B);
    const short = (m, v) => (m.fmt === "plat" ? v + "×" : m.fmt === "of10" ? String(v) : fmt(m, v));
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(my.name)} against ${esc(mx.name)} for 12 albums">`;
    ty.forEach((v) => (s += `<line class="grid" x1="${L}" x2="${W - R}" y1="${py(v)}" y2="${py(v)}"/><text class="tick" x="${L - 8}" y="${py(v) + 4}" text-anchor="end">${esc(short(my, v))}</text>`));
    tx.forEach((v) => (s += `<text class="tick" x="${px(v)}" y="${H - B + 18}" text-anchor="middle">${esc(short(mx, v))}</text>`));
    s += `<line class="axis" x1="${L}" x2="${W - R}" y1="${H - B}" y2="${H - B}"/>`;
    s += `<text class="ax-t" x="${(L + W - R) / 2}" y="${H - 10}" text-anchor="middle">${esc(mx.name)} →</text>`;
    s += `<text class="ax-t" transform="translate(16 ${(T + H - B) / 2}) rotate(-90)" text-anchor="middle">${esc(my.name)} →</text>`;
    const iMaxY = ys.indexOf(Math.max(...ys)), iMaxX = xs.indexOf(Math.max(...xs));
    // draw plain dots first, picks on top
    const order = ALBUMS.map((a, i) => i).sort((i, j) => (pickClass(ALBUMS[i]) ? 1 : 0) - (pickClass(ALBUMS[j]) ? 1 : 0));
    order.forEach((i) => {
      const a = ALBUMS[i], cx = px(xs[i]), cy = py(ys[i]);
      const label = isA(a) || isB(a) || i === iMaxY || i === iMaxX;
      const right = cx < W - 170;
      s += `<g class="pt${pickClass(a)}" tabindex="0" data-i="${i}" aria-label="${esc(a.title)}: ${esc(fmtLong(mx, xs[i]))}, ${esc(fmtLong(my, ys[i]))}">
        <circle class="hit" cx="${cx}" cy="${cy}" r="16"/><circle class="dot-m" cx="${cx}" cy="${cy}" r="7"/>
        ${label ? `<text class="pt-l" x="${cx + (right ? 12 : -12)}" y="${cy + 4}" text-anchor="${right ? "start" : "end"}">${esc(name(a))}</text>` : ""}
      </g>`;
    });
    s += "</svg>";
    $("#scatter").innerHTML = s;
    const r = pearson(xs, ys);
    const words = isNaN(r) ? "" : Math.abs(r) < 0.2 ? "almost no relationship" : Math.abs(r) < 0.5 ? (r > 0 ? "a weak positive" : "a weak negative") + " relationship" : (r > 0 ? "a strong positive" : "a strong negative") + " relationship";
    $("#corr").innerHTML = state.x === state.y ? "Pick two different statistics." : `Correlation r = ${r.toFixed(2)}: ${words}.`;
  }
  bindTips($("#scatter"), ".pt", (el) => {
    const i = +el.dataset.i, a = ALBUMS[i], mx = M[state.x], my = M[state.y];
    return `<strong>${esc(a.title)}</strong> (${a.year})<br>${esc(mx.short)}: ${esc(fmtLong(mx, val(a, mx.key)))}<br>${esc(my.short)}: ${esc(fmtLong(my, val(a, my.key)))}`;
  });

  /* ---------- 3. head to head ---------- */
  const albumOpts = ALBUMS.map((a) => `<option value="${a.id}">${esc(a.title)} (${a.year})</option>`).join("");
  $("#pa").innerHTML = albumOpts; $("#pb").innerHTML = albumOpts;
  $("#pa").addEventListener("change", (e) => { state.a = e.target.value; renderAll(); });
  $("#pb").addEventListener("change", (e) => { state.b = e.target.value; renderAll(); });
  $("#swap").addEventListener("click", () => { [state.a, state.b] = [state.b, state.a]; renderAll(); });

  function renderH2H() {
    const A = ALBUMS.find((x) => x.id === state.a), Bb = ALBUMS.find((x) => x.id === state.b);
    $("#pa").value = A.id; $("#pb").value = Bb.id;
    const cov = (a, cls) => `<figure class="${cls}"><img src="${a.covers[0][0]}" alt="Album cover: ${esc(a.title)}" loading="lazy"><figcaption><em>${esc(a.title)}</em><span>${esc(a.date)} · ${esc(a.label)} Records</span></figcaption></figure>`;
    let leadsA = 0, leadsB = 0;
    const rows = METRICS.map((m) => {
      const va = val(A, m.key), vb = val(Bb, m.key);
      const max = Math.max(...ALBUMS.map((a) => val(a, m.key)));
      const win = m.hi === null || va === vb ? 0 : va > vb ? 1 : 2;
      if (win === 1) leadsA++; if (win === 2) leadsB++;
      return `<div class="hr">
        <span class="hv a${win === 1 ? " win" : ""}">${esc(fmt(m, va))}</span>
        <span class="hb a"><span style="width:${(va / max) * 100}%"></span></span>
        <span class="hm">${esc(m.short)}</span>
        <span class="hb b"><span style="width:${(vb / max) * 100}%"></span></span>
        <span class="hv b${win === 2 ? " win" : ""}">${esc(fmt(m, vb))}</span>
      </div>`;
    }).join("");
    const scored = METRICS.filter((m) => m.hi !== null).length;
    const same = A.id === Bb.id;
    $("#h2h-covers").innerHTML = cov(A, "ca") + `<p class="h2h-score">${same ? "Pick two different albums." :
      `<strong class="ta">${esc(name(A))}</strong> leads on ${leadsA} of ${scored} performance stats; <strong class="tb">${esc(name(Bb))}</strong> leads on ${leadsB}.`}</p>` + cov(Bb, "cb");
    $("#h2h-rows").innerHTML = rows + `<p class="chart-note">A bold value is the higher one. Length, track count and average song length show differences only.</p>`;

    // sound and theme profile
    const ia = ALBUMS.indexOf(A), ib = ALBUMS.indexOf(Bb);
    const genreRows = GENRES.map((g) => `<div class="pr"><span>${esc(g.name)}</span>
      <span class="pl a" title="${esc(LEVELS[g.v[ia]])}">${"<i></i>".repeat(g.v[ia])}${"<i class=e></i>".repeat(3 - g.v[ia])}</span>
      <span class="pl b" title="${esc(LEVELS[g.v[ib]])}">${"<i></i>".repeat(g.v[ib])}${"<i class=e></i>".repeat(3 - g.v[ib])}</span></div>`).join("");
    const central = (i) => THEMES.filter((t) => t.v[i] === 2).map((t) => t.name);
    const ca = central(ia), cb = central(ib);
    const both = ca.filter((t) => cb.includes(t)), onlyA = ca.filter((t) => !cb.includes(t)), onlyB = cb.filter((t) => !ca.includes(t));
    const list = (xs) => (xs.length ? xs.map(esc).join(", ") : "None");
    $("#h2h-profile").innerHTML = `
      <div><h4>Sound</h4><div class="pr head"><span></span><span class="ta">${esc(name(A))}</span><span class="tb">${esc(name(Bb))}</span></div>${genreRows}
        <p class="chart-note">Three bars = primary sound, none = absent. Editorial ratings from "How the music evolved".</p></div>
      <div><h4>Central themes</h4>
        <p><strong>Shared:</strong> ${list(both)}</p>
        <p><strong class="ta">Only ${esc(name(A))}:</strong> ${list(onlyA)}</p>
        <p><strong class="tb">Only ${esc(name(Bb))}:</strong> ${list(onlyB)}</p>
        <p><strong>Key tracks:</strong> <span class="ta">${A.tracks.map((t) => "“" + esc(t) + "”").join(", ")}</span> vs. <span class="tb">${Bb.tracks.map((t) => "“" + esc(t) + "”").join(", ")}</span></p></div>`;
  }

  /* ---------- 4. data table ---------- */
  let dtSort = { k: null, dir: -1 };
  function renderTable() {
    const rows = ALBUMS.slice();
    if (dtSort.k) rows.sort((p, q) => (val(p, dtSort.k) - val(q, dtSort.k)) * dtSort.dir);
    $("#dt").innerHTML = `<caption class="sr">Statistics for all twelve studio albums</caption><thead><tr><th scope="col">Album</th>${METRICS.map((m) =>
      `<th scope="col" aria-sort="${dtSort.k === m.key ? (dtSort.dir > 0 ? "ascending" : "descending") : "none"}"><button type="button" data-k="${m.key}">${esc(m.short)}${dtSort.k === m.key ? (dtSort.dir > 0 ? " ▲" : " ▼") : ""}</button></th>`).join("")}<th scope="col">Peaks (${CHARTS.join(" / ")})</th></tr></thead><tbody>` +
      rows.map((a) => `<tr><th scope="row"><em>${esc(a.title)}</em> (${a.year})</th>${METRICS.map((m) => `<td>${esc(fmtLong(m, val(a, m.key)))}</td>`).join("")}<td class="pk">${STATS[a.id].peaks.map((p) => p ?? "—").join(" / ")}</td></tr>`).join("") + "</tbody>";
  }
  $("#dt").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-k]"); if (!b) return;
    dtSort = { k: b.dataset.k, dir: dtSort.k === b.dataset.k ? -dtSort.dir : -1 };
    renderTable();
  });

  function renderAll() { renderDash(); renderScatter(); renderH2H(); }
  renderAll(); renderTable();
})();
