/* =====================================================================
   HİZMET ANİMASYONLARI (kodla çizilmiş, fotoğraf gerektirmez)
   Kullanım: <div class="an" data-anim="kazi"></div>
   Türler: temizlik, kazi, peyzaj, nakliye, bayindirlik, insaat
   Renk: çizgi = yazı rengi (currentColor), vurgu = --an-vurgu
   ===================================================================== */
(function () {
  if (document.readyState !== "complete") document.addEventListener("DOMContentLoaded", baslat); else baslat();
  function baslat() {
  const yerler = document.querySelectorAll("[data-anim]");
  if (!yerler.length) return;

  const stil = document.createElement("style");
  stil.textContent = `
  .an { width: 132px; aspect-ratio: 6/5; margin-bottom: 18px; --an-vurgu: var(--sari, #c9a24d); }
  .an svg { display: block; width: 100%; height: 100%; overflow: visible; fill: none; stroke: currentColor; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
  .an .v { stroke: var(--an-vurgu); }
  .an .d { fill: var(--an-vurgu); stroke: none; }
  .an .ince { stroke-width: 3; }
  .an .kutu { transform-box: fill-box; transform-origin: center; }
  .an:not(.oyna) * { animation-play-state: paused !important; }

  /* 1) Temizlik: makine ileri geri, fırça döner, parıltılar */
  .an .t-mak { animation: an-t-git 3.2s ease-in-out infinite alternate; }
  .an .t-firca { stroke-dasharray: 5 4; animation: an-dash 0.5s linear infinite; }
  .an .t-pir { transform-box: fill-box; transform-origin: center; animation: an-pir 1.8s ease-in-out infinite; }
  .an .t-pir.b { animation-delay: .6s; } .an .t-pir.c { animation-delay: 1.2s; }
  @keyframes an-t-git { from { transform: translateX(-14px); } to { transform: translateX(16px); } }
  @keyframes an-dash { to { stroke-dashoffset: -18; } }
  @keyframes an-pir { 0%, 100% { transform: scale(0) rotate(0); opacity: 0; } 50% { transform: scale(1) rotate(45deg); opacity: 1; } }

  /* 2) Kazı: kol kazar, palet döner */
  .an .k-palet { stroke-dasharray: 7 5; animation: an-dash2 1s linear infinite; }
  .an .k-bom { transform-origin: 52px 56px; animation: an-k-bom 3.6s ease-in-out infinite; }
  .an .k-kol { transform-origin: 80px 28px; animation: an-k-kol 3.6s ease-in-out infinite; }
  .an .k-kepce { transform-origin: 96px 62px; animation: an-k-kepce 3.6s ease-in-out infinite; }
  .an .k-yigin { transform-box: fill-box; transform-origin: 50% 100%; animation: an-k-yigin 3.6s ease-in-out infinite; }
  @keyframes an-dash2 { to { stroke-dashoffset: -24; } }
  @keyframes an-k-bom { 0%, 100% { transform: rotate(-8deg); } 35%, 55% { transform: rotate(12deg); } 75% { transform: rotate(-14deg); } }
  @keyframes an-k-kol { 0%, 100% { transform: rotate(0); } 35% { transform: rotate(-12deg); } 55%, 75% { transform: rotate(10deg); } }
  @keyframes an-k-kepce { 0%, 100% { transform: rotate(0); } 35% { transform: rotate(-22deg); } 55%, 78% { transform: rotate(36deg); } }
  @keyframes an-k-yigin { 0%, 40% { transform: scale(1); } 58%, 85% { transform: scale(.6); } 100% { transform: scale(1); } }

  /* 3) Peyzaj: ağaç ve çiçek büyür, güneş döner */
  .an .p-govde { stroke-dasharray: 70; animation: an-p-govde 5s ease-out infinite; }
  .an .p-yap { transform-box: fill-box; transform-origin: 50% 100%; animation: an-p-yap 5s cubic-bezier(.34,1.56,.64,1) infinite; }
  .an .p-yap.b { animation-name: an-p-yap-b; } .an .p-yap.c { animation-name: an-p-yap-c; } .an .p-yap.e { animation-name: an-p-yap-e; }
  .an .p-gunes { transform-origin: 100px 20px; animation: an-don 9s linear infinite; }
  @keyframes an-p-govde { 0% { stroke-dashoffset: 70; opacity: 1; } 22%, 92% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 70; opacity: 0; } }
  @keyframes an-p-yap   { 0%, 20% { transform: scale(0); } 34%, 92% { transform: scale(1); } 100% { transform: scale(0); } }
  @keyframes an-p-yap-b { 0%, 28% { transform: scale(0); } 42%, 92% { transform: scale(1); } 100% { transform: scale(0); } }
  @keyframes an-p-yap-c { 0%, 36% { transform: scale(0); } 50%, 92% { transform: scale(1); } 100% { transform: scale(0); } }
  @keyframes an-p-yap-e { 0%, 46% { transform: scale(0); } 60%, 92% { transform: scale(1); } 100% { transform: scale(0); } }
  @keyframes an-don { to { transform: rotate(360deg); } }

  /* 4) Nakliye: tekerler döner, yol akar, hız çizgileri */
  .an .n-teker { transform-box: fill-box; transform-origin: center; animation: an-don .9s linear infinite; }
  .an .n-yol { stroke-dasharray: 10 8; animation: an-n-yol .5s linear infinite; }
  .an .n-arac { animation: an-n-zipla .45s ease-in-out infinite; }
  .an .n-hiz { stroke-dasharray: 10 16; animation: an-n-hiz .7s linear infinite; }
  @keyframes an-n-yol { to { stroke-dashoffset: 18; } }
  @keyframes an-n-zipla { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
  @keyframes an-n-hiz { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 26; } }

  /* 5) Bayındırlık: silindir ilerler, asfalt serilir */
  .an .b-arac { animation: an-b-git 4.4s ease-in-out infinite; }
  .an .b-tambur { transform-box: fill-box; transform-origin: center; animation: an-b-don 4.4s ease-in-out infinite; }
  .an .b-asfalt { stroke-dasharray: 108; animation: an-b-asfalt 4.4s ease-in-out infinite; }
  @keyframes an-b-git { 0% { transform: translateX(-14px); } 70%, 88% { transform: translateX(18px); } 100% { transform: translateX(-14px); } }
  @keyframes an-b-don { 0% { transform: rotate(0); } 70%, 88% { transform: rotate(220deg); } 100% { transform: rotate(0); } }
  @keyframes an-b-asfalt { 0% { stroke-dashoffset: 108; } 70%, 88% { stroke-dashoffset: 20; } 100% { stroke-dashoffset: 108; } }

  /* 6) İnşaat: vinç yük indirir, pencereler sırayla yanar */
  .an .i-halat { transform-box: fill-box; transform-origin: 50% 0; animation: an-i-halat 4s ease-in-out infinite; }
  .an .i-yuk { animation: an-i-yuk 4s ease-in-out infinite; }
  .an .i-pen { animation: an-i-pen 4s steps(1) infinite; opacity: 0; }
  .an .i-pen.b { animation-delay: .4s; } .an .i-pen.c { animation-delay: .8s; } .an .i-pen.e { animation-delay: 1.2s; }
  @keyframes an-i-halat { 0%, 100% { transform: scaleY(.45); } 45%, 60% { transform: scaleY(1.5); } }
  @keyframes an-i-yuk { 0%, 100% { transform: translateY(-8px); } 45%, 60% { transform: translateY(7px); } }
  @keyframes an-i-pen { 0%, 20% { opacity: 0; } 25%, 95% { opacity: 1; } 100% { opacity: 0; } }

  @media (prefers-reduced-motion: reduce) { .an * { animation: none !important; } .an .i-pen { opacity: 1; } }
  `;
  document.head.appendChild(stil);

  const pir = (x, y, c) => `<g transform="translate(${x} ${y})"><path class="d t-pir ${c}" d="M0-8L2.2-2.2 8 0 2.2 2.2 0 8-2.2 2.2-8 0-2.2-2.2z"/></g>`;
  const teker = (x, y, r) => `<g class="n-teker"><circle cx="${x}" cy="${y}" r="${r}"/><path class="ince" d="M${x - r + 3} ${y}h${2 * r - 6}M${x} ${y - r + 3}v${2 * r - 6}"/></g>`;

  const CIZIM = {
    temizlik: `
      <path d="M6 88h108"/>
      <g class="t-mak">
        <path d="M44 62L30 32M23 32h14"/>
        <rect x="42" y="56" width="36" height="22" rx="7"/>
        <path class="v" d="M52 64h16"/>
        <circle cx="48" cy="82" r="5"/>
        <ellipse class="v t-firca" cx="72" cy="84" rx="15" ry="3.5"/>
      </g>
      ${pir(100, 34, "")}${pir(16, 58, "b")}${pir(88, 12, "c")}`,

    kazi: `
      <path d="M4 88h112"/>
      <path class="d k-yigin" d="M82 88c5-9 10-13 16-13s11 4 16 13z"/>
      <rect class="k-palet" x="12" y="70" width="50" height="16" rx="8"/>
      <rect x="18" y="56" width="40" height="14" rx="4"/>
      <path d="M28 56l3-17h17l4 17"/>
      <path class="v ince" d="M35 45h10l2 8H33z"/>
      <g class="k-bom">
        <path d="M52 56L80 28"/>
        <circle class="d" cx="52" cy="56" r="4"/>
        <g class="k-kol">
          <path d="M80 28l16 34"/>
          <circle class="d" cx="80" cy="28" r="4"/>
          <g class="k-kepce"><path d="M96 62l-10 3c0 9 5 14 14 13l6-9z"/></g>
        </g>
      </g>`,

    peyzaj: `
      <path d="M4 88h112"/>
      <g class="p-gunes"><circle class="v" cx="100" cy="20" r="7"/><path class="v ince" d="M100 6v4M100 30v4M86 20h4M110 20h4M90 10l3 3M107 27l3 3M110 10l-3 3M93 27l-3 3"/></g>
      <path class="p-govde" d="M56 88V46M56 68l-10-8M56 60l9-8"/>
      <circle class="v p-yap" cx="56" cy="34" r="16"/>
      <circle class="v p-yap b" cx="40" cy="50" r="11"/>
      <circle class="v p-yap c" cx="72" cy="46" r="11"/>
      <path class="p-yap b" d="M12 88c0-9 5-13 10-13s10 4 10 13z"/>
      <g class="p-yap e"><path d="M94 88V72"/><circle class="d" cx="94" cy="67" r="5"/><path class="ince" d="M94 80c4 0 7-2 8-5M94 82c-4 0-6-2-7-4"/></g>`,

    nakliye: `
      <path d="M0 88h120"/>
      <path class="n-yol ince" d="M0 96h120"/>
      <path class="n-hiz ince v" d="M0 50h12M0 60h12M0 70h12"/>
      <g class="n-arac">
        <rect class="v" x="16" y="42" width="56" height="30" rx="3"/>
        <path class="v ince" d="M30 50v14M44 50v14M58 50v14"/>
        <path d="M72 50h16l14 13v9H72z"/>
        <path class="ince" d="M79 55h7l7 7H79z"/>
        <path d="M16 74h86"/>
        ${teker(30, 80, 7)}${teker(48, 80, 7)}${teker(92, 80, 7)}
      </g>`,

    bayindirlik: `
      <path d="M6 92h108"/>
      <path class="v b-asfalt" d="M6 88h108" stroke-width="5"/>
      <g class="b-arac">
        <path d="M52 34h34M56 34v12M82 34v12"/>
        <rect x="50" y="46" width="38" height="20" rx="4"/>
        <path d="M50 58L34 62"/>
        <g class="b-tambur"><circle cx="34" cy="70" r="16"/><path class="v ince" d="M22 70h24M34 58v24"/></g>
        <circle cx="80" cy="76" r="10"/><circle class="d" cx="80" cy="76" r="3"/>
      </g>`,

    insaat: `
      <path d="M4 88h112"/>
      <rect x="12" y="50" width="40" height="38"/>
      <path class="ince" d="M12 63h40M12 76h40"/>
      <rect class="d i-pen" x="18" y="79" width="8" height="6"/><rect class="d i-pen b" x="38" y="79" width="8" height="6"/>
      <rect class="d i-pen c" x="18" y="66" width="8" height="6"/><rect class="d i-pen e" x="38" y="66" width="8" height="6"/>
      <path d="M82 88V16M92 88V16"/>
      <path class="ince" d="M82 80l10-10-10-10 10-10-10-10 10-10"/>
      <path d="M58 18h56M87 6L60 18M87 6l25 12M87 6v10"/>
      <path class="v" d="M100 18v10h10V18"/>
      <path class="i-halat ince" d="M66 18v14"/>
      <g class="i-yuk"><rect class="d" x="58" y="34" width="16" height="9" rx="1.5"/></g>`
  };

  const gozcu = "IntersectionObserver" in window
    ? new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle("oyna", e.isIntersecting)), { threshold: .2 })
    : null;

  yerler.forEach(y => {
    const c = CIZIM[y.dataset.anim];
    if (!c) return;
    y.classList.add("an");
    y.setAttribute("aria-hidden", "true");
    y.innerHTML = `<svg viewBox="0 0 120 100">${c}</svg>`;
    if (gozcu) gozcu.observe(y); else y.classList.add("oyna");
  });
  }
})();
