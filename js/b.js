/* =====================================================================
   SEÇENEK B - AYARLAR (değişiklik gerekirse burayı düzenleyin)
   ===================================================================== */
const AYAR = {
  ad: "Arslan Terra",
  tamAd: "Arslan Terra Yapı Çevre Ltd. Şti.",
  altYazi: "Yapı Çevre Ltd. Şti.",
  // İletişim bilgileri robotlar toplamasın diye kodlanmış tutulur ve yalnızca
  // ziyaretçi sayfayla etkileşime girince (fare, dokunma, kaydırma, klavye) çözülür.
  // Değiştirmek için: tarayıcı konsolunda  btoa("yeni değer").split("").reverse().join("")
  g: { t: "=YzMgQjMgkTOwASNwUDIwkzK", l: "2MDNykTOwUDM1ATO", e: "t92YuwWah12ZANzMpBXY5FmcyVGduFGbzJXY" },
  instagram: "arslan_terra",
  adres: "Toroslar, Mersin",
  video: {
    kapak: "video/kapak.mp4",       // 10-15 sn, sessiz, döngülü kapak videosu (en fazla ~10 MB)
    poster: "video/kapak.jpg",      // videonun ilk karesi
    tanitim: "video/tanitim.mp4",   // tam tanıtım filmi (küçükse). Büyükse YouTube kullanın:
    youtube: ""                     // YouTube video kimliği, örn: "dQw4w9WgXcQ" (doluysa bu kullanılır)
  }
};

const IK = {
  ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.8 14.1c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.5-.1l.7-.9c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>'
};
IK.tel = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';
IK.yukari = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
IK.asagi = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
// [bağlantı, ad, kısa açıklama, çizim türü]
const HIZMETLER = [
  ["#hizmet-1", "Endüstriyel Temizlik", "Fabrika, tesis ve bina temizliği", "temizlik"],
  ["#hizmet-2", "Kazı ve Hafriyat", "Kazı, hafriyat ve dolgu işleri", "kazi"],
  ["#hizmet-3", "Peyzaj", "Yeşil alan ve çevre düzenleme", "peyzaj"],
  ["#hizmet-4", "Taşımacılık ve Nakliye", "Yük ve malzeme taşımacılığı", "nakliye"],
  ["#hizmet-5", "Bayındırlık Müteahhitliği", "Altyapı ve üstyapı işleri", "bayindirlik"],
  ["#hizmet-6", "İnşaat", "Anahtar teslim projeler", "insaat"]
];
const LOGO = '<img class="logo-img" src="img/logo-isaret.jpg" alt="" width="56" height="45">';
const LINKLER = [["#hizmetler", "Hizmetler"], ["#neden", "Neden Biz"], ["#film", "Tanıtım Filmi"], ["#sss", "Sorular"], ["#iletisim", "İletişim"]];

function kur() {
  // Üst çubuk + tam ekran menü
  const ustLink = ([h, a]) => h === "#hizmetler"
    ? `<div class="acilir">
         <a href="${h}" data-bolum="hizmetler" class="acilir-bas" aria-haspopup="true" aria-expanded="false">${a}</a>
         <div class="acilir-panel sade" role="group" aria-label="Hizmetlerimiz">${HIZMETLER.map(([hh, aa]) => `
           <a href="${hh}">${aa}<i aria-hidden="true">${IK.ok}</i></a>`).join("")}
         </div>
       </div>`
    : `<a href="${h}" data-bolum="${h.slice(1)}">${a}</a>`;
  document.getElementById("ust").innerHTML = `
    <div class="kap ust-ic">
      <a href="#" class="logo" aria-label="${AYAR.ad} sayfa başı">${LOGO}<span><b>${AYAR.ad}</b><small>${AYAR.altYazi}</small></span></a>
      <nav class="ust-nav" aria-label="Ana menü">${LINKLER.map(ustLink).join("")}</nav>
      <div class="ust-sag">
        <a href="#iletisim" data-gl="tel" class="tel-btn" aria-label="Telefonla arayın">${IK.tel}<span data-g="t">Telefon</span></a>
        <a href="#iletisim" class="btn">Teklif Al ${IK.ok}</a>
        <button class="menu-dugme" id="menu-ac" aria-expanded="false" aria-controls="tam-menu"><i></i>Menü</button>
      </div>
    </div>
    <div class="ilerleme" aria-hidden="true"><i id="ilerleme"></i></div>`;
  const acilir = document.querySelector(".acilir");
  if (acilir) {
    const bas = acilir.querySelector(".acilir-bas");
    const durum = a => { acilir.classList.toggle("acik", a); bas.setAttribute("aria-expanded", a); };
    let zaman;
    acilir.addEventListener("mouseenter", () => { clearTimeout(zaman); durum(true); });
    acilir.addEventListener("mouseleave", () => { zaman = setTimeout(() => durum(false), 180); });
    acilir.addEventListener("focusin", () => durum(true));
    acilir.addEventListener("focusout", e => { if (!acilir.contains(e.relatedTarget)) durum(false); });
    acilir.addEventListener("keydown", e => { if (e.key === "Escape") { durum(false); bas.focus(); } });
    acilir.querySelector(".acilir-panel").addEventListener("click", e => { if (e.target.closest("a")) { durum(false); document.activeElement.blur(); } });
  }
  const tm = document.getElementById("tam-menu");
  tm.innerHTML = `
    <div class="kap" style="display:flex;flex-direction:column;flex:1">
      <div class="tam-menu-ust">
        <a href="#" class="logo">${LOGO}<span><b>${AYAR.ad}</b><small>${AYAR.altYazi}</small></span></a>
        <button class="kapat" id="menu-kapat" aria-label="Menüyü kapat">${IK.x}</button>
      </div>
      <div class="tam-menu-govde">
        <nav aria-label="Ana menü">${LINKLER.map(([h, a], i) => `<a href="${h}" data-bolum="${h.slice(1)}"><small>0${i + 1}</small>${a}</a>`).join("")}</nav>
        <div class="tam-menu-yan">
          <h3>Hizmetlerimiz</h3>
          <ul>${HIZMETLER.map(([h, a]) => `<li><a href="${h}">${a} ${IK.ok}</a></li>`).join("")}</ul>
          <a href="#iletisim" data-gl="wa" target="_blank" rel="noopener noreferrer" class="btn koyu-btn">WhatsApp ile yazın ${IK.ok}</a>
        </div>
      </div>
      <div class="tam-menu-alt">
        <a href="#iletisim" data-gl="tel"><span data-g="t">Telefonu göster</span></a>
        <a href="#iletisim" data-gl="posta"><span data-g="e">E-postayı göster</span></a>
        <a href="https://instagram.com/${AYAR.instagram}" target="_blank" rel="noopener noreferrer">@${AYAR.instagram}</a>
      </div>
    </div>`;
  tm.inert = true;
  const ac = document.getElementById("menu-ac"), kapat = document.getElementById("menu-kapat");
  const goster = a => {
    tm.classList.toggle("acik", a); tm.inert = !a;
    ac.setAttribute("aria-expanded", a);
    document.body.style.overflow = a ? "hidden" : "";
    (a ? kapat : ac).focus();
  };
  ac.addEventListener("click", () => goster(true));
  kapat.addEventListener("click", () => goster(false));
  tm.addEventListener("click", e => { if (e.target.closest("a[href^='#']")) goster(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && tm.classList.contains("acik")) goster(false); });

  // Alt bilgi
  document.getElementById("alt").innerHTML = `
    <div class="kap">
      <div class="alt-ust">
        <div><a href="#" class="logo">${LOGO}<span><b>${AYAR.ad}</b><small>${AYAR.altYazi}</small></span></a>
          <p>Endüstriyel temizlik, kazı ve hafriyat, peyzaj, nakliye, bayındırlık ve inşaat. Güçlü altyapı, temiz çevre, sağlam gelecek.</p></div>
        <div><h4>Hizmetler</h4><ul>${HIZMETLER.map(([h, a]) => `<li><a href="${h}">${a}</a></li>`).join("")}</ul></div>
        <div><h4>Bağlantılar</h4><ul>${LINKLER.map(([h, a]) => `<li><a href="${h}">${a}</a></li>`).join("")}</ul></div>
        <div><h4>İletişim</h4><ul>
          <li><a href="#iletisim" data-gl="tel"><span data-g="t">Telefonu göster</span></a></li>
          <li><a href="#iletisim" data-gl="posta"><span data-g="e">E-postayı göster</span></a></li>
          <li><a href="https://instagram.com/${AYAR.instagram}" target="_blank" rel="noopener noreferrer">@${AYAR.instagram}</a></li></ul></div>
      </div>
      <div class="alt-alt"><span>© ${new Date().getFullYear()} ${AYAR.tamAd} Tüm hakları saklıdır.</span><span>${AYAR.adres}</span></div>
    </div>
    <a class="wa" href="#iletisim" data-gl="wa" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile yazın">${IK.wa}</a>`;

  document.querySelectorAll("[data-firma]").forEach(e => {
    const k = e.dataset.firma;
    if (k === "telefon") { e.dataset.g = "t"; e.textContent = "Telefonu göster"; }
    else if (k === "eposta") { e.dataset.g = "e"; e.textContent = "E-postayı göster"; }
    else e.textContent = AYAR[k] || "";
  });
  document.querySelectorAll("[data-tel]").forEach(e => { e.dataset.gl = "tel"; });
  document.querySelectorAll("[data-posta]").forEach(e => { e.dataset.gl = "posta"; });

  // ---------- Robot koruması: iletişim bilgilerini ilk etkileşimde çöz ve yerleştir
  const coz = s => new TextDecoder().decode(Uint8Array.from(atob(s.split("").reverse().join("")), c => c.charCodeAt(0)));
  let acildi = false;
  const OLAYLAR = ["pointerdown", "pointermove", "touchstart", "keydown", "scroll", "wheel", "focusin"];
  function iletisimAc() {
    if (acildi) return; acildi = true;
    OLAYLAR.forEach(o => removeEventListener(o, iletisimAc, true));
    const t = coz(AYAR.g.t), l = coz(AYAR.g.l), ep = coz(AYAR.g.e);
    document.querySelectorAll('[data-g="t"]').forEach(e => { e.textContent = t; });
    document.querySelectorAll('[data-g="e"]').forEach(e => { e.textContent = ep; });
    document.querySelectorAll('[data-gl="tel"]').forEach(e => { e.href = "tel:+" + l; });
    document.querySelectorAll('[data-gl="posta"]').forEach(e => { e.href = "mailto:" + ep; });
    document.querySelectorAll('[data-gl="wa"]').forEach(e => { e.href = "https://wa.me/" + l; });
    const tb = document.querySelector(".tel-btn"); if (tb) tb.setAttribute("aria-label", "Telefonla arayın: " + t);
  }
  // otomasyon araçlarıyla çalışan robotlarda hiç çözme
  if (!navigator.webdriver) OLAYLAR.forEach(o => addEventListener(o, iletisimAc, { capture: true, passive: true }));
  document.querySelectorAll("[data-ok]").forEach(e => { e.insertAdjacentHTML("beforeend", " " + IK.ok); });

  // Hizmet videoları: ekranda görününce yüklenir ve oynar, görünmeyince durur.
  // Hareket azaltma ya da veri tasarrufu açıksa video yüklenmez, fotoğraf kalır.
  const videolar = document.querySelectorAll("video.blok-video");
  const bag = navigator.connection || {};
  const tasarruf = bag.saveData === true || /(^|-)2g$/.test(bag.effectiveType || "");
  const azaltHareket = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (videolar.length && !tasarruf && !azaltHareket && "IntersectionObserver" in window) {
    const vg = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src) { v.src = v.dataset.src; v.addEventListener("playing", () => v.classList.add("oynuyor"), { once: true }); }
        v.dataset.gorunur = "1";
        if (!v.dataset.bekliyor) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      } else { v.dataset.gorunur = ""; if (v.src) v.pause(); }
    }), { threshold: .35 });
    // Bloktaki videolar sırayla oynar (data-liste ile ek videolar), ardından fotoğraf birkaç saniye görünür
    // ve baştan başlar. Ekranda değilken beklemeye geçer, görününce devam eder.
    videolar.forEach(v => {
      const liste = [v.dataset.src].concat((v.dataset.liste || "").split(",").map(x => x.trim()).filter(Boolean));
      const fotoVar = v.dataset.dongu === "foto";
      if (liste.length < 2 && !fotoVar) return;          // tek video, fotoğrafsız: normal döngü
      v.loop = false;
      let sira = 0;
      const oynat = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
      v.addEventListener("ended", () => {
        const blok = v.parentElement;
        if (sira < liste.length - 1) {                    // sıradaki video
          sira++; v.src = liste[sira];
          if (v.dataset.gorunur === "1") oynat(); else v.dataset.bekliyor = "";
          return;
        }
        sira = 0;                                         // liste bitti: fotoğraf sırası ya da doğrudan başa dön
        const basaDon = () => {
          v.dataset.bekliyor = ""; blok.classList.remove("foto-sirasi");
          v.src = liste[0];
          if (v.dataset.gorunur === "1") oynat();
        };
        if (!fotoVar) { basaDon(); return; }
        v.dataset.bekliyor = "1"; blok.classList.add("foto-sirasi");
        setTimeout(basaDon, 4200);
      });
    });
    videolar.forEach(v => vg.observe(v));
  }

  // Başlık gölgesi
  const ust = document.getElementById("ust");
  const cubuk = document.getElementById("ilerleme");
  const yukari = document.createElement("button");
  yukari.className = "yukari"; yukari.setAttribute("aria-label", "Sayfanın başına dön"); yukari.innerHTML = IK.yukari;
  yukari.addEventListener("click", () => scrollTo({ top: 0 }));
  document.body.appendChild(yukari);
  const golge = () => {
    ust.classList.toggle("kaydi", scrollY > 24);
    const toplam = document.documentElement.scrollHeight - innerHeight;
    cubuk.style.transform = `scaleX(${toplam > 0 ? Math.min(1, scrollY / toplam) : 0})`;
    yukari.classList.toggle("gor", scrollY > 700);
  };
  addEventListener("scroll", golge, { passive: true }); addEventListener("resize", golge); golge();

  // Bulunulan bölümü menüde işaretle
  const bolumLink = document.querySelectorAll("[data-bolum]");
  if ("IntersectionObserver" in window) {
    const isaretle = id => bolumLink.forEach(l => {
      if (l.dataset.bolum === id) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
    });
    const sg = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) isaretle(e.target.dataset.spy || e.target.id); }), { rootMargin: "-45% 0px -50% 0px" });
    LINKLER.forEach(([h]) => { const b = document.querySelector(h); if (b) sg.observe(b); });
    document.querySelectorAll("[data-spy]").forEach(b => sg.observe(b));
    const hero = document.querySelector(".hero");
    if (hero) new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) isaretle(""); }), { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
  }

  // Görünme animasyonu
  const h = document.querySelectorAll(".gizli");
  if ("IntersectionObserver" in window) {
    const g = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("gor"); g.unobserve(e.target); } }), { threshold: .12 });
    h.forEach(x => g.observe(x));
  } else h.forEach(x => x.classList.add("gor"));

  // Kapak videosu: dosya varsa ve yüklenirse görünür, yoksa yedek arka plan kalır
  const hero = document.querySelector(".hero"), v = document.getElementById("kapak-video");
  if (v) {
    v.poster = AYAR.video.poster;
    const azalt = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const src = document.createElement("source"); src.src = AYAR.video.kapak; src.type = "video/mp4";
    v.appendChild(src);
    v.addEventListener("loadeddata", () => { hero.classList.add("video-var"); if (!azalt) v.play().catch(() => {}); });
    v.load();
  }

  // Tanıtım filmi yoksa oynat butonlarını, film bölümünü ve menü bağlantısını gizle
  const filmVarMi = async () => {
    if (AYAR.video.youtube) return true;
    try { return (await fetch(AYAR.video.tanitim, { method: "HEAD" })).ok; } catch (e) { return false; }
  };
  filmVarMi().then(v => document.documentElement.classList.toggle("filmsiz", !v));

  // Film kapak resmi yoksa kaldır
  const fk = document.getElementById("film-kapak");
  if (fk) { fk.addEventListener("error", () => fk.remove()); if (fk.complete && fk.naturalWidth === 0) fk.remove(); }

  // Tanıtım filmi penceresi
  const pen = document.getElementById("film-pencere"), cer = document.getElementById("film-cerceve");
  const filmAc = () => {
    cer.innerHTML = "";
    const ytKimlik = String(AYAR.video.youtube || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 20);
    if (ytKimlik) {
      cer.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${ytKimlik}?autoplay=1&rel=0" referrerpolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-presentation" title="${AYAR.ad} tanıtım filmi" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    } else {
      const m = document.createElement("video");
      m.controls = true; m.autoplay = true; m.playsInline = true; m.src = AYAR.video.tanitim;
      m.addEventListener("error", () => { cer.innerHTML = "<p style='padding:24px'>Tanıtım filmi yakında eklenecek.</p>"; });
      cer.appendChild(m);
    }
    pen.showModal();
  };
  const filmKapat = () => { pen.close(); cer.innerHTML = ""; };
  document.querySelectorAll("[data-film]").forEach(b => b.addEventListener("click", filmAc));
  document.getElementById("film-kapat").addEventListener("click", filmKapat);
  pen.addEventListener("click", e => { if (e.target === pen) filmKapat(); });
  pen.addEventListener("close", () => { cer.innerHTML = ""; });

  // Teklif formu -> WhatsApp
  const f = document.getElementById("teklif-formu");
  f.addEventListener("submit", e => {
    e.preventDefault();
    const t = n => f.elements[n].value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, n === "mesaj" ? 1000 : 120);
    const msg = `Merhaba, ${AYAR.ad} için teklif almak istiyorum:\n\nAd: ${t("ad")}\nFirma: ${t("firma")}\nTelefon: ${t("telefon")}\nHizmet: ${t("hizmet")}\n\n${t("mesaj")}`;
    open(`https://wa.me/${coz(AYAR.g.l)}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  });
}
document.addEventListener("DOMContentLoaded", kur);
