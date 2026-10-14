/* Açılış animasyonu oynayacaksa sayfa görünmeden önce perdeyi indirir.
   Bu dosya <head> içinde, bekletmeden yüklenir (kısa tutuldu). */
(function () {
  try {
    var azalt = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var oynadi = sessionStorage.getItem("acilis") === "1";
    var dene = /[?&]acilis=(yavas|goster)/.test(location.search);        // inceleme için zorla oynat
    if (dene || (!azalt && !oynadi && !location.hash)) document.documentElement.classList.add("acilis");
  } catch (e) { /* depolama kapalıysa animasyon oynamaz, site normal açılır */ }
})();

/* Site başka bir sitenin çerçevesi (iframe) içinde açılırsa içeriği gizle ve
   mümkünse çerçeveden çık. Tıklama tuzağına (clickjacking) karşı korur. */
(function () {
  if (window.top !== window.self) {
    document.documentElement.style.display = "none";
    try { window.top.location = window.self.location.href; } catch (e) { /* çıkılamıyorsa gizli kalır */ }
  }
})();
