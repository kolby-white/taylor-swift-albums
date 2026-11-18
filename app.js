(function () {
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const byId = Object.fromEntries(ALBUMS.map((a) => [a.id, a]));

  /* ---------- Timeline ---------- */
  const tl = $("#timeline");
  const y0 = 2006, y1 = 2026;
  const pos = (y) => ((y - y0) / (y1 - y0)) * 100;
  const tvYear = { fearless: 2021.27, red: 2021.86, speaknow: 2023.51, "1989": 2023.82 };
  let html = '<div class="tl-track">';
  html += `<div class="tl-label bm" style="left:0;width:${pos(2018.9)}%">Big Machine Records</div>`;
  html += `<div class="tl-label rep" style="left:${pos(2018.9)}%;width:${100 - pos(2018.9)}%">Republic Records</div>`;
  ALBUMS.forEach((a, i) => {
    const offset = a.id === "evermore" ? 0.55 : 0; // folklore and evermore share 2020
    const up = i % 2 === 0 ? "up" : "down";
    html += `<a class="tl-dot ${up}" href="#${a.id}" style="left:${pos(a.year + offset)}%;--c:${a.color}" title="${esc(a.title)} (${a.year})"><span>${esc(a.styled || a.title)}<b>${a.year}</b></span></a>`;
  });
  Object.entries(tvYear).forEach(([id, y]) => {
    html += `<a class="tl-ring" href="#${id}" style="left:${pos(y)}%;--c:${byId[id].color}" title="${esc(byId[id].title)} (Taylor's Version)"></a>`;
  });
  [2006, 2010, 2014, 2018, 2022, 2026].forEach((y) => (html += `<span class="tl-year" style="left:${pos(y)}%">${y}</span>`));
  html += "</div>";
  tl.innerHTML = html;

  /* ---------- Album cards ---------- */
  $("#album-list").innerHTML = ALBUMS.map((a, i) => {
    const covers = a.covers.map(([src, cap]) =>
      `<figure><img src="${src}" alt="Album cover: ${esc(cap)}" loading="lazy" width="320" height="320"><figcaption>${esc(cap)}</figcaption></figure>`).join("");
    const badges = [
      `<span class="badge">${esc(a.genre)}</span>`,
      `<span class="badge">${esc(a.label)} Records</span>`,
      a.grammy ? `<span class="badge gold">★ ${esc(a.grammy)}</span>` : "",
      a.tv ? `<span class="badge tv">Taylor's Version: ${esc(a.tv)}</span>` : ""
    ].join("");
    const styled = a.styled && a.styled !== a.title ? ` <span class="styled">(stylized <em>${esc(a.styled)}</em>)</span>` : "";
    return `
    <article class="album" id="${a.id}" style="--c:${a.color}">
      <div class="album-covers n${a.covers.length}">${covers}</div>
      <div class="album-body">
        <p class="album-num">Album ${i + 1} · ${esc(a.date)}</p>
        <h3><em>${esc(a.title)}</em>${styled}</h3>
        <div class="badges">${badges}</div>
        <p class="brief">${esc(a.brief)}</p>
        ${a.note ? `<p class="note">${esc(a.note)}</p>` : ""}
        <p class="tracks"><span>Key tracks</span> ${a.tracks.map((t) => `“${esc(t)}”`).join(" · ")}</p>
        <details class="source"><summary>Source excerpt (Wikipedia)</summary><p>"${esc(a.quote)}"</p><p><a href="${WIKI}${a.wiki}" target="_blank" rel="noopener">Read the full article</a></p></details>
      </div>
    </article>`;
  }).join("");

  if (typeof L === "undefined") return; // maps need Leaflet

  const dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const tiles = () => L.tileLayer(`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/${dark ? "World_Dark_Gray_Base" : "World_Light_Gray_Base"}/MapServer/tile/{z}/{y}/{x}`, {
    attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors", maxZoom: 16
  });

  /* ---------- Places map ---------- */
  const pm = L.map("places-map", { scrollWheelZoom: false }).setView([39.5, -85], 4);
  tiles().addTo(pm);
  const markers = [];
  PLACES.forEach((p, i) => {
    const a = byId[p.album];
    const icon = L.divIcon({ className: "pin", html: `<span style="--c:${a.color}">${i + 1}</span>`, iconSize: [28, 28], iconAnchor: [14, 14] });
    const m = L.marker(p.ll, { icon, title: p.name, alt: p.name }).addTo(pm)
      .bindPopup(`<strong>${esc(p.name)}</strong><br><em>${esc(a.title)}</em> era<p>${esc(p.text)}</p>`);
    markers.push(m);
  });
  pm.fitBounds(L.latLngBounds(PLACES.filter((p) => p.ll[1] < 0).map((p) => p.ll)).pad(0.15));
  $("#place-list").innerHTML = PLACES.map((p, i) =>
    `<li><button type="button" data-i="${i}" style="--c:${byId[p.album].color}"><span class="n">${i + 1}</span><span><strong>${esc(p.name)}</strong><small>${esc(byId[p.album].title)}</small></span></button></li>`).join("");
  $("#place-list").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const p = PLACES[+b.dataset.i];
    pm.flyTo(p.ll, p.ll[1] > 0 ? 5 : 8, { duration: 0.8 });
    markers[+b.dataset.i].openPopup();
    $("#places-map").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  /* ---------- Tour map ---------- */
  const tm = L.map("tour-map", { scrollWheelZoom: false, worldCopyJump: true }).setView([25, 0], 2);
  tiles().addTo(tm);
  const groups = {};
  Object.keys(LEGS).forEach((k) => (groups[k] = L.layerGroup().addTo(tm)));
  const route = L.polyline(TOUR.map((t) => [t[2], t[3]]), { color: dark ? "#888" : "#999", weight: 1, dashArray: "3 5", opacity: 0.7 }).addTo(tm);
  TOUR.forEach(([city, country, lat, lng, n, leg]) => {
    L.circleMarker([lat, lng], { radius: 4 + n * 1.6, color: LEGS[leg].color, fillColor: LEGS[leg].color, fillOpacity: 0.55, weight: 1.5 })
      .bindPopup(`<strong>${esc(city)}</strong>, ${esc(country)}<br>${n} show${n > 1 ? "s" : ""} · ${esc(LEGS[leg].name)}`)
      .bindTooltip(`${esc(city)}: ${n}`, { direction: "top" })
      .addTo(groups[leg]);
  });
  const cancelled = L.layerGroup().addTo(tm);
  CANCELLED.forEach(([city, country, lat, lng, n]) => {
    L.circleMarker([lat, lng], { radius: 6, color: "#888", fillOpacity: 0, weight: 2, dashArray: "2 3" })
      .bindPopup(`<strong>${esc(city)}</strong>, ${esc(country)}<br>${n} shows cancelled (August 2024)`).addTo(cancelled);
  });

  const totals = {};
  TOUR.forEach((t) => (totals[t[5]] = (totals[t[5]] || 0) + t[4]));
  const btns = $("#leg-buttons");
  btns.innerHTML = `<button type="button" data-leg="all" class="on">All legs <small>149</small></button>` +
    Object.entries(LEGS).map(([k, l]) => `<button type="button" data-leg="${k}" style="--c:${l.color}"><i></i>${l.name} <small>${totals[k]}</small></button>`).join("");
  btns.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    btns.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    const leg = b.dataset.leg;
    Object.entries(groups).forEach(([k, g]) => (leg === "all" || leg === k ? tm.addLayer(g) : tm.removeLayer(g)));
    leg === "all" ? tm.addLayer(route) : tm.removeLayer(route);
    leg === "all" || leg === "eu24" ? tm.addLayer(cancelled) : tm.removeLayer(cancelled);
    const pts = TOUR.filter((t) => leg === "all" || t[5] === leg).map((t) => [t[2], t[3]]);
    tm.flyToBounds(L.latLngBounds(pts).pad(0.2), { duration: 0.8, maxZoom: 6 });
  });
})();
