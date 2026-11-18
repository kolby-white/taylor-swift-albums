(function () {
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ribbon = $("#ribbon"), panel = $("#look-panel");
  if (!ribbon) return;

  ribbon.innerHTML = ALBUMS.map((a, i) => {
    const e = ERAS[a.id];
    const stripes = e.palette.map((c) => `<i style="background:${c}"></i>`).join("");
    return `<button type="button" role="tab" id="tab-${a.id}" aria-controls="look-panel" aria-selected="false" tabindex="-1" data-i="${i}">
      <span class="strip">${stripes}</span>
      <span class="r-name">${esc(a.styled || a.title)}</span><span class="r-year">${a.year}</span>
    </button>`;
  }).join("");
  const tabs = [...ribbon.querySelectorAll("[role=tab]")];

  let cur = -1;
  function select(i, focus) {
    i = (i + ALBUMS.length) % ALBUMS.length;
    cur = i;
    const a = ALBUMS[i], e = ERAS[a.id];
    tabs.forEach((t, k) => { t.setAttribute("aria-selected", k === i); t.tabIndex = k === i ? 0 : -1; });
    if (focus) { tabs[i].focus(); tabs[i].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" }); }
    panel.setAttribute("aria-labelledby", "tab-" + a.id);
    const sw = e.palette.map((c) => `<li><span class="sw" style="background:${c}"></span><code>${c}</code></li>`).join("");
    const sig = e.signature ? `<p class="sig"><span class="sw" style="background:${e.signature.hex}"></span><span><strong>Signature color: ${esc(e.signature.name)}.</strong> ${esc(e.signature.note)}</span></p>` : "";
    const grad = `linear-gradient(90deg, ${e.palette.map((c, k) => `${c} ${(k / (e.palette.length - 1)) * 100}%`).join(", ")})`;
    panel.style.setProperty("--grad", grad);
    panel.style.setProperty("--era", a.color);
    panel.innerHTML = `
      <div class="lp-band" aria-hidden="true"></div>
      <div class="lp-grid">
        <figure class="lp-cover"><img src="${a.covers[0][0]}" alt="Album cover: ${esc(a.title)} (${a.year})"></figure>
        <div class="lp-body">
          <p class="lp-kicker">Era ${i + 1} of 12 · ${a.year}</p>
          <h4><em>${esc(a.title)}</em>: ${esc(e.tag)}</h4>
          <h5>Cover palette</h5>
          <ul class="swatches">${sw}</ul>
          ${sig}
          <h5>Visual motifs</h5>
          <ul class="motifs">${e.motifs.map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
          <h5>The look</h5>
          <p>${esc(e.look)}</p>
          <h5>How it reflects the music</h5>
          <p>${esc(e.music)}</p>
          <div class="lp-nav">
            <button type="button" data-step="-1" aria-label="Previous era">← ${esc(ALBUMS[(i + 11) % 12].styled || ALBUMS[(i + 11) % 12].title)}</button>
            <a href="#${a.id}">Read about the album</a>
            <button type="button" data-step="1" aria-label="Next era">${esc(ALBUMS[(i + 1) % 12].styled || ALBUMS[(i + 1) % 12].title)} →</button>
          </div>
        </div>
      </div>`;
  }

  ribbon.addEventListener("click", (ev) => { const t = ev.target.closest("[role=tab]"); if (t) select(+t.dataset.i, false); });
  ribbon.addEventListener("keydown", (ev) => {
    const k = ev.key;
    if (k === "ArrowRight" || k === "ArrowDown") { ev.preventDefault(); select(cur + 1, true); }
    else if (k === "ArrowLeft" || k === "ArrowUp") { ev.preventDefault(); select(cur - 1, true); }
    else if (k === "Home") { ev.preventDefault(); select(0, true); }
    else if (k === "End") { ev.preventDefault(); select(ALBUMS.length - 1, true); }
  });
  panel.addEventListener("click", (ev) => { const b = ev.target.closest("[data-step]"); if (b) select(cur + +b.dataset.step, true); });

  select(0, false);
})();
