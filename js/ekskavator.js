/* =====================================================================
   YÜRÜYEN EKSKAVATÖR ŞERİDİ
   Kullanım: sayfada istediğiniz yere şunu koyun:
     <div data-ekskavator></div>
   Ekskavatör soldan girer, ortada durup toprak alır, sağdan çıkar.
   Renkler: --ek-cizgi (çizgi), --ek-vurgu (altın), --ek-zemin (arka plan)
   Hız: --ek-sure (varsayılan 16s)
   ===================================================================== */
(function () {
  const yerler = document.querySelectorAll("[data-ekskavator]");
  if (!yerler.length) return;

  const stil = document.createElement("style");
  stil.textContent = `
  .ek-serit { --w: 310px; --ek-sure: 16s; position: relative; height: 240px; overflow: hidden; background: var(--ek-zemin, transparent); color: var(--ek-cizgi, #0c1a31); }
  .ek-serit::after { content: ""; position: absolute; left: 0; right: 0; bottom: 14px; height: 0; border-top: 3px dashed currentColor; opacity: .35; }
  .ek-arac { position: absolute; bottom: 5px; left: calc(-1 * var(--w)); width: var(--w); animation: ek-git var(--ek-sure) linear infinite; }
  .ek-arac svg { display: block; width: 100%; height: auto; overflow: visible; fill: none; stroke: currentColor; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
  .ek-arac .vurgu { stroke: var(--ek-vurgu, #c9a24d); }
  .ek-arac .dolu { fill: var(--ek-vurgu, #c9a24d); stroke: none; }
  .ek-palet { stroke-dasharray: 14 9; animation: ek-palet var(--ek-sure) linear infinite; }
  .ek-teker { transform-box: fill-box; transform-origin: center; animation: ek-teker var(--ek-sure) linear infinite; }
  .ek-bom { transform-origin: 122px 88px; animation: ek-bom var(--ek-sure) ease-in-out infinite; }
  .ek-kol { transform-origin: 188px 38px; animation: ek-kol var(--ek-sure) ease-in-out infinite; }
  .ek-kepce { transform-origin: 226px 110px; animation: ek-kepce var(--ek-sure) ease-in-out infinite; }
  .ek-govde { animation: ek-titre .22s linear infinite; }
  .ek-yigin { position: absolute; bottom: 14px; left: calc(50% + var(--w) * .2); width: calc(var(--w) * .28); transform-origin: 50% 100%; animation: ek-yigin var(--ek-sure) ease-in-out infinite; }
  .ek-yigin svg { display: block; width: 100%; height: auto; fill: var(--ek-vurgu, #c9a24d); stroke: currentColor; stroke-width: 5; stroke-linejoin: round; }
  @keyframes ek-git   { 0% { left: calc(-1 * var(--w)); } 40%, 62% { left: calc(50% - var(--w) * .62); } 100% { left: 100%; } }
  @keyframes ek-palet { 0% { stroke-dashoffset: 0; } 40%, 62% { stroke-dashoffset: -345; } 100% { stroke-dashoffset: -690; } }
  @keyframes ek-teker { 0% { transform: rotate(0); } 40%, 62% { transform: rotate(900deg); } 100% { transform: rotate(1800deg); } }
  @keyframes ek-bom   { 0%, 40% { transform: rotate(0); } 45%, 51% { transform: rotate(17deg); } 57% { transform: rotate(-9deg); } 62%, 100% { transform: rotate(0); } }
  @keyframes ek-kol   { 0%, 40% { transform: rotate(0); } 45% { transform: rotate(-14deg); } 51%, 57% { transform: rotate(6deg); } 62%, 100% { transform: rotate(0); } }
  @keyframes ek-kepce { 0%, 40% { transform: rotate(0); } 45% { transform: rotate(-22deg); } 51%, 58% { transform: rotate(38deg); } 62%, 100% { transform: rotate(0); } }
  @keyframes ek-yigin { 0%, 47% { transform: scale(1); } 54%, 88% { transform: scale(.5); } 100% { transform: scale(1); } }
  @keyframes ek-titre { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.2px); } }
  @media (max-width: 700px) { .ek-serit { --w: 180px; height: 160px; } }
  @media (prefers-reduced-motion: reduce) {
    .ek-arac, .ek-palet, .ek-teker, .ek-bom, .ek-kol, .ek-kepce, .ek-govde, .ek-yigin { animation: none; }
    .ek-arac { left: calc(50% - var(--w) * .62); }
  }`;
  document.head.appendChild(stil);

  const teker = x => `<g class="ek-teker"><circle cx="${x}" cy="140" r="11"/><path d="M${x - 6} 140h12M${x} 134v12" stroke-width="4"/></g>`;
  const ARAC = `
  <svg viewBox="0 0 260 170" aria-hidden="true">
    <rect class="ek-palet" x="20" y="120" width="150" height="40" rx="20"/>
    ${teker(45)}${teker(95)}${teker(145)}
    <g class="ek-govde">
      <rect x="28" y="92" width="124" height="24" rx="7"/>
      <path d="M36 92V74h18v18" stroke-width="5"/>
      <path d="M62 92l7-42h44l8 42z"/>
      <path class="vurgu" d="M77 60h28l4 22H73z" stroke-width="5"/>
      <g class="ek-bom">
        <path d="M122 88L188 38"/>
        <path class="vurgu" d="M136 66l30-18" stroke-width="4"/>
        <circle class="dolu" cx="122" cy="88" r="6"/>
        <g class="ek-kol">
          <path d="M188 38l38 72"/>
          <circle class="dolu" cx="188" cy="38" r="6"/>
          <g class="ek-kepce">
            <path d="M226 110l-20 6c0 16 10 26 28 24l10-18z"/>
            <path d="M208 134l-5 7M219 139l-3 8M231 140l-1 8" stroke-width="4"/>
            <circle class="dolu" cx="226" cy="110" r="5"/>
          </g>
        </g>
      </g>
    </g>
  </svg>`;
  const YIGIN = `<svg viewBox="0 0 80 40" aria-hidden="true"><path d="M3 38C14 20 24 6 40 6s27 14 37 32z"/></svg>`;

  yerler.forEach(y => {
    y.classList.add("ek-serit");
    y.setAttribute("aria-hidden", "true");
    y.innerHTML = `<div class="ek-yigin">${YIGIN}</div><div class="ek-arac">${ARAC}</div>`;
  });
})();
