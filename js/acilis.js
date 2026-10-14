/* =====================================================================
   AÇILIŞ ANİMASYONU
   Sayfa ilk açıldığında: dev kırıcı ekrana girer, sol üst köşedeki taşı
   döver, taş parçalanıp ekrana saçılır ve site ortaya çıkar.
   - Aynı sekmede yalnızca ilk açılışta oynar.
   - "Geç" düğmesi, tıklama ya da Esc ile atlanır.
   - Hareketi azaltmayı seçen kullanıcılarda hiç oynamaz.
   Ayarlar: VURUS (kaç darbe), PARCA (kaç parça)
   ===================================================================== */
(function () {
  const kok = document.documentElement;
  if (!kok.classList.contains("acilis")) return;
  try { sessionStorage.setItem("acilis", "1"); } catch (e) {}

  const VURUS = 4;
  // Küçük ekranda parçalar hem daha küçük hem daha az olur (akıcılık ve oran için)
  const KUCUK = Math.max(.5, Math.min(1, Math.min(innerWidth, innerHeight * 1.6) / 1100));
  const PARCA = innerWidth < 600 ? 22 : 34;
  // Adresin sonuna ?acilis=yavas eklenirse animasyon 8 kat yavaş oynar (inceleme için)
  const HIZ = /[?&]acilis=yavas/.test(location.search) ? 8 : 1;
  const an = (el, kareler, ayar) => { ayar.duration *= HIZ; if (ayar.delay) ayar.delay *= HIZ; return el.animate(kareler, ayar); };
  const W = innerWidth, H = innerHeight;
  const rast = (a, b) => a + Math.random() * (b - a);

  // ---------- Sahne
  const ov = document.createElement("div");
  ov.className = "acilis-ov";
  ov.setAttribute("aria-hidden", "true");
  ov.innerHTML = `
    <div class="acilis-zemin"></div>
    <div class="acilis-parcalar"></div>
    <svg class="acilis-tas" viewBox="0 0 300 240">
      <g class="tas-govde" stroke="#c3c9cf" stroke-width="2" stroke-linejoin="round">
        <polygon points="0,0 120,0 110,70 0,90" fill="#8a9199"/>
        <polygon points="120,0 230,0 290,60 190,110 110,70" fill="#9aa1a8"/>
        <polygon points="0,90 110,70 100,160 0,200" fill="#777e86"/>
        <polygon points="110,70 190,110 100,160" fill="#848b93"/>
        <polygon points="190,110 290,60 270,150 190,225 100,160" fill="#6f767e"/>
        <polygon points="0,200 100,160 190,225 80,240" fill="#697078"/>
      </g>
      <g fill="none" stroke="#0a152b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <path class="catlak c1" pathLength="1" d="M235 140L190 110 110 70 60 40"/>
        <path class="catlak c2" pathLength="1" d="M190 110L150 135 100 160 40 180"/>
        <path class="catlak c3" pathLength="1" d="M190 110L170 50 150 0"/>
        <path class="catlak c3" pathLength="1" d="M100 160L130 200 140 232"/>
      </g>
    </svg>
    <div class="acilis-yon"><div class="acilis-kirici">
      <svg viewBox="-110 -1500 220 1510">
        <defs>
          <linearGradient id="ac-sari" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9950f"/><stop offset=".45" stop-color="#f4c230"/><stop offset="1" stop-color="#b98a0c"/></linearGradient>
          <linearGradient id="ac-celik" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7d848a"/><stop offset=".4" stop-color="#dfe3e6"/><stop offset="1" stop-color="#6b7278"/></linearGradient>
          <linearGradient id="ac-kol" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#14264a"/><stop offset=".5" stop-color="#243f6e"/><stop offset="1" stop-color="#101f3d"/></linearGradient>
        </defs>
        <rect x="-36" y="-1500" width="72" height="1100" fill="url(#ac-kol)" stroke="#060c18" stroke-width="4"/>
        <path d="M-52 -1500V-420M52 -1500V-430" stroke="#060c18" stroke-width="9" fill="none"/>
        <polygon points="-74,-430 74,-430 58,-338 -58,-338" fill="#1b3157" stroke="#060c18" stroke-width="4"/>
        <circle cx="0" cy="-392" r="15" fill="#e3bd5a" stroke="#060c18" stroke-width="4"/>
        <rect x="-64" y="-345" width="128" height="218" rx="14" fill="url(#ac-sari)" stroke="#060c18" stroke-width="4"/>
        <rect x="-64" y="-345" width="128" height="30" rx="14" fill="#8a6418" opacity=".55"/>
        <rect x="-64" y="-212" width="128" height="12" fill="#060c18" opacity=".35"/>
        <g fill="#060c18"><circle cx="-42" cy="-292" r="7"/><circle cx="42" cy="-292" r="7"/><circle cx="-42" cy="-158" r="7"/><circle cx="42" cy="-158" r="7"/></g>
        <path d="M-30 -262h60M-30 -244h60" stroke="#060c18" stroke-width="6" stroke-linecap="round" opacity=".5"/>
        <rect x="-46" y="-132" width="92" height="34" rx="7" fill="#15284a" stroke="#060c18" stroke-width="4"/>
        <rect x="-23" y="-100" width="46" height="68" fill="url(#ac-celik)" stroke="#060c18" stroke-width="4"/>
        <polygon points="-23,-34 23,-34 6,0 -6,0" fill="url(#ac-celik)" stroke="#060c18" stroke-width="4" stroke-linejoin="round"/>
      </svg>
    </div></div>
    <button class="acilis-gec" type="button">Geç</button>`;
  document.body.appendChild(ov);
  kok.classList.add("acilis-bekle");
  kok.classList.remove("acilis");           // perde artık bu katmanda

  const tas = ov.querySelector(".acilis-tas"), yon = ov.querySelector(".acilis-yon"),
        kirici = ov.querySelector(".acilis-kirici"), zemin = ov.querySelector(".acilis-zemin"),
        parcalar = ov.querySelector(".acilis-parcalar");

  // ---------- Yerleşim: uç, taşın sağ alt yüzüne değer; kırıcı sağ alt köşeden gelir
  const tk = tas.getBoundingClientRect();
  const ucX = tk.left + tk.width * (235 / 300), ucY = tk.top + tk.height * (140 / 240);
  const aci = Math.atan2(H - ucY, W - ucX) * 180 / Math.PI;      // köşeye doğru yön
  const uzak = Math.hypot(W - ucX, H - ucY);
  const olcek = Math.min(3.4, Math.max(1.1, uzak / 470));
  yon.style.left = ucX + "px"; yon.style.top = ucY + "px";
  yon.style.transform = `rotate(${aci + 90}deg)`;
  kirici.style.width = 220 * olcek + "px";
  kirici.style.left = -110 * olcek + "px";          // uç, dönme merkezine otursun
  kirici.style.bottom = -10 * olcek + "px";
  const disari = uzak + 520 * olcek;

  let bitti = false, gizliLogo = null;
  const zamanlar = [];
  const sonra = (ms, f) => zamanlar.push(setTimeout(f, ms * HIZ));

  function bitir() {
    if (bitti) return; bitti = true;
    zamanlar.forEach(clearTimeout);
    kok.classList.remove("acilis-bekle", "acilis");
    if (gizliLogo) gizliLogo.style.visibility = "";
    ov.remove();
    removeEventListener("keydown", tus);
  }
  const tus = e => { if (e.key === "Escape") bitir(); };
  addEventListener("keydown", tus);
  ov.addEventListener("click", bitir);

  // ---------- Toz ve küçük kırıntı
  function toz(n, boy) {
    for (let i = 0; i < n; i++) {
      const d = document.createElement("i");
      d.className = "acilis-toz";
      const b = rast(boy * .6, boy * 1.5);
      d.style.cssText = `left:${ucX - b / 2}px;top:${ucY - b / 2}px;width:${b}px;height:${b}px`;
      parcalar.appendChild(d);
      const a = rast(-2.6, 1.2), m = rast(40, 190);
      an(d, [{ transform: "translate(0,0) scale(.3)", opacity: .75 },
                 { transform: `translate(${Math.cos(a) * m}px,${Math.sin(a) * m}px) scale(1.7)`, opacity: 0 }],
                { duration: rast(600, 1100), easing: "ease-out", fill: "forwards" });
    }
  }

  const RENK = ["#8a9199", "#9aa1a8", "#777e86", "#848b93", "#6f767e", "#a9b0b6", "#5f666d"];
  function sacil(adet, buyuk) {
    const g = 2600, kat = Math.max(.6, Math.min(1.5, Math.max(W, H) / 1366));
    for (let i = 0; i < adet; i++) {
      const p = document.createElement("i");
      p.className = "acilis-parca";
      const b = (buyuk ? (i < 6 ? rast(70, 130) : rast(16, 62)) : rast(8, 20)) * KUCUK;
      const n = [];
      for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2, r = rast(34, 50); n.push(`${50 + Math.cos(a) * r}% ${50 + Math.sin(a) * r}%`); }
      const x0 = buyuk ? rast(tk.left + tk.width * .15, tk.left + tk.width * .9) : ucX;
      const y0 = buyuk ? rast(tk.top + tk.height * .1, tk.top + tk.height * .85) : ucY;
      p.style.cssText = `left:${x0 - b / 2}px;top:${y0 - b / 2}px;width:${b}px;height:${b * rast(.7, 1)}px;background:${RENK[i % RENK.length]};clip-path:polygon(${n.join(",")})`;
      parcalar.appendChild(p);
      const a = rast(-55, 105) * Math.PI / 180, v = (buyuk ? rast(500, 1900) : rast(250, 800)) * kat;
      const vx = Math.cos(a) * v, vy = Math.sin(a) * v - (buyuk ? rast(200, 700) : 150);
      const don = rast(-720, 720), T = buyuk ? rast(1.0, 1.45) : rast(.5, .8), K = 12, kare = [];
      for (let k = 0; k <= K; k++) {
        const t = k / K * T;
        kare.push({ transform: `translate(${vx * t}px,${vy * t + .5 * g * t * t}px) rotate(${don * t}deg)`, opacity: k > K * .8 ? (K - k) / (K * .2) : 1 });
      }
      an(p, kare, { duration: T * 1000, easing: "linear", fill: "forwards" });
    }
  }

  // ---------- Kıvılcım ve parlama (darbe hissi)
  function kivilcim(n, guc) {
    for (let i = 0; i < n; i++) {
      const k = document.createElement("i");
      k.className = "acilis-kiv";
      const boy = rast(16, 44) * guc, a = rast(-150, 60), m = rast(50, 170) * guc;
      k.style.cssText = `left:${ucX}px;top:${ucY - 1.5}px;width:${boy}px`;
      parcalar.appendChild(k);
      an(k, [{ transform: `rotate(${a}deg) translateX(6px) scaleX(1)`, opacity: 1 },
             { transform: `rotate(${a}deg) translateX(${m}px) scaleX(.15)`, opacity: 0 }],
         { duration: rast(220, 380), easing: "cubic-bezier(.1,.7,.3,1)", fill: "forwards" });
    }
  }
  function parla(guc) {
    const f = document.createElement("i");
    f.className = "acilis-flas";
    f.style.background = `radial-gradient(circle at ${ucX}px ${ucY}px, rgba(255,255,255,${guc}) 0, rgba(255,236,190,${guc * .6}) 12%, rgba(255,255,255,0) ${guc > .6 ? 70 : 42}%)`;
    ov.appendChild(f);
    an(f, [{ opacity: 1 }, { opacity: 0 }], { duration: guc > .6 ? 420 : 170, easing: "ease-out", fill: "forwards" }).onfinish = () => f.remove();
  }

  // ---------- Taşın içinden çıkan logo: önce taşın yerinde parlar, sonra menüdeki yerine oturur
  function logoCikar() {
    const hedef = document.querySelector(".ust .logo-img");
    if (!hedef) return;
    const h = hedef.getBoundingClientRect();
    if (!h.width) return;
    const tasX = tk.left + tk.width * .46, tasY = tk.top + tk.height * .46;
    const dx = tasX - (h.left + h.width / 2), dy = tasY - (h.top + h.height / 2);
    const buyut = Math.max(1.6, Math.min(3, tk.width * .5 / h.width));

    const isik = document.createElement("i");
    isik.className = "acilis-isik";
    isik.style.cssText = `left:${tasX}px;top:${tasY}px`;
    ov.insertBefore(isik, parcalar);
    an(isik, [{ transform: "translate(-50%,-50%) scale(.2)", opacity: .95 }, { transform: "translate(-50%,-50%) scale(2.4)", opacity: 0 }],
       { duration: 800, easing: "ease-out", fill: "forwards" });

    const logo = hedef.cloneNode(true);
    logo.classList.add("acilis-logo");
    logo.style.cssText = `left:${h.left}px;top:${h.top}px;width:${h.width}px;height:${h.height}px`;
    ov.insertBefore(logo, parcalar);
    hedef.style.visibility = "hidden";           // uçan kopya yerine oturana kadar asıl logo gizli
    gizliLogo = hedef;
    const yer = k => `translate(${dx}px,${dy}px) scale(${buyut * k})`;
    an(logo, [
      { transform: yer(.35), opacity: 0, offset: 0 },
      { transform: yer(1.12), opacity: 1, offset: .2 },
      { transform: yer(1), opacity: 1, offset: .3 },
      { transform: yer(1), opacity: 1, offset: .56 },
      { transform: "translate(0,0) scale(1)", opacity: 1, offset: 1 }
    ], { duration: 1300, easing: "cubic-bezier(.5,0,.2,1)", fill: "forwards" });
  }

  // ---------- Akış
  an(kirici, [{ transform: `translateY(${-disari}px)` }, { transform: "translateY(0)" }],
                 { duration: 560, easing: "cubic-bezier(.2,.9,.25,1)", fill: "both" });

  const geri = 52 * olcek;
  function vur(i) {
    const son = i === VURUS, sure = son ? 330 : 200, cek = son ? geri * 2.1 : geri;
    // son darbede kırıcı daha çok gerilir, bir an bekler, sonra iner
    an(kirici, [{ transform: "translateY(0)" }, { transform: `translateY(${-cek}px)`, offset: son ? .72 : .6 }, { transform: "translateY(0)" }],
                   { duration: sure, easing: son ? "cubic-bezier(.7,0,.9,.6)" : "ease-in" });
    sonra(sure, () => {
      if (!son) {
        tas.classList.add("c" + i);
        an(tas, [{ transform: "translate(0,0)" }, { transform: "translate(-9px,-7px) rotate(-1.2deg)" }, { transform: "translate(4px,3px)" }, { transform: "translate(0,0)" }], { duration: 170 });
        an(ov, [{ transform: "translate(0,0)" }, { transform: `translate(${-4 - i * 2}px,${3 + i}px)` }, { transform: "translate(3px,-2px)" }, { transform: "translate(0,0)" }], { duration: 160 });
        toz(4, 60); sacil(5, false); kivilcim(6 + i * 2, .8 + i * .1); parla(.22 + i * .06);
      } else patla();
    });
  }
  function patla() {
    tas.style.visibility = "hidden";
    ov.classList.add("patladi");
    kok.classList.remove("acilis-bekle");
    parla(.9); kivilcim(22, 1.6);
    logoCikar();
    toz(10, 150); sacil(PARCA, true);
    an(ov, [{ transform: "translate(0,0)" }, { transform: "translate(-12px,9px)" }, { transform: "translate(8px,-6px)" }, { transform: "translate(-3px,2px)" }, { transform: "translate(0,0)" }], { duration: 280 });
    an(kirici, [{ transform: "translateY(0)" }, { transform: `translateY(${-disari}px)` }], { duration: 600, delay: 110, easing: "cubic-bezier(.6,0,.9,.4)", fill: "forwards" });
    an(zemin, [{ opacity: 1 }, { opacity: 0 }], { duration: 620, delay: 260, easing: "ease-out", fill: "forwards" });
    sonra(1500, bitir);
  }
  // Zamanlama: giriş 0,5 sn + 4 darbe ~1 sn + saçılma ve logo 1,5 sn = yaklaşık 3 sn
  for (let i = 1; i <= VURUS; i++) sonra(480 + (i - 1) * 220, () => vur(i));
  sonra(6000, bitir);                         // her ihtimale karşı emniyet
})();
