/* =========================================================
   ⚙️  GANTI DATA DI BAWAH INI SESUAI IDENTITAS ANDA
   Semua elemen di halaman (kontak, nama, badge WA, dll)
   otomatis mengambil isinya dari sini — cukup ubah di satu
   tempat ini saja.
   ========================================================= */
const AGENT_CONFIG = {
  name: "RAKSA TRAVEL",                          // nama lengkap Anda
  title: "Travel Agent Tiket Pesawat & Kapal",  // jabatan / spesialisasi
  tagline: "100% Amanah, Pelayanan Ramah, Harga Termurah — untuk setiap langkah perjalanan Anda.",
  experience: "10+ Tahun",

  whatsapp: "6282153043601",       // format 62xxxxxxxxxxx (tanpa + atau 0 di depan)
  whatsappDisplay: "0821-5304-3601", // nomor yang ditampilkan ke pengunjung
  email: "santi1005@gmail.com",
  instagram: "@raksatravel.id",
  address: "JL. TERMINAL LAMA EXPO WAENA, KEC HERAM JAYAPURA",
  hours: "Setiap hari, 08.00 – 21.00 WIB",

  clients: 850,     // jumlah pelanggan (untuk animasi statistik)
  rating: 4.9        // rating (untuk animasi statistik)
};
/* ========================================================= */


// ---------- BIND CONFIG KE HALAMAN ----------
function applyConfig(){
  // isi teks biasa: <span data-cfg="key">
  document.querySelectorAll('[data-cfg]').forEach(el => {
    const key = el.getAttribute('data-cfg');
    if(AGENT_CONFIG[key] !== undefined) el.textContent = AGENT_CONFIG[key];
  });

  // isi link: <a data-cfg-href="whatsapp|email|instagram">
  document.querySelectorAll('[data-cfg-href]').forEach(el => {
    const key = el.getAttribute('data-cfg-href');
    if(key === 'whatsapp'){
      const msg = encodeURIComponent(`Halo ${AGENT_CONFIG.name}, saya ingin bertanya tentang tiket pesawat/kapal.`);
      el.href = `https://wa.me/${AGENT_CONFIG.whatsapp}?text=${msg}`;
      el.target = "_blank";
    } else if(key === 'email'){
      el.href = `mailto:${AGENT_CONFIG.email}`;
    } else if(key === 'instagram'){
      const handle = AGENT_CONFIG.instagram.replace('@','');
      el.href = `https://instagram.com/${handle}`;
      el.target = "_blank";
    }
  });

  // avatar inisial dari nama
  // (avatar sekarang pakai gambar logo, bukan inisial teks)
}
applyConfig();


// ---------- FORM KONTAK -> BUKA WHATSAPP ----------
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const dest = document.getElementById('formDest').value.trim();
    const msg = document.getElementById('formMsg').value.trim();

    let text = `Halo ${AGENT_CONFIG.name}, perkenalkan saya ${name} (${phone}).`;
    if(dest) text += ` Saya tertarik dengan tiket untuk rute: ${dest}.`;
    if(msg) text += ` ${msg}`;

    const url = `https://wa.me/${AGENT_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}


// ---------- SCROLL REVEAL ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
revealEls.forEach(el => io.observe(el));


// ---------- STAT COUNTERS (pelanggan & rating) ----------
function animateCount(el, target, decimals, suffix){
  let current = 0;
  const step = target / 40;
  const tick = () => {
    current += step;
    if(current >= target) current = target;
    el.textContent = current.toFixed(decimals) + (suffix || '');
    if(current < target) requestAnimationFrame(tick);
  };
  tick();
}
const statClients = document.getElementById('statClients');
const statRating = document.getElementById('statRating');
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    if(statClients) animateCount(statClients, AGENT_CONFIG.clients, 0, '+');
    if(statRating) animateCount(statRating, AGENT_CONFIG.rating, 1, '/5');
    statIO.disconnect();
  });
}, {threshold:0.4});
const heroCard = document.querySelector('.hero-card');
if(heroCard) statIO.observe(heroCard);


// ---------- HEADER SHRINK ----------
const headerEl = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  headerEl.classList.toggle('shrink', window.scrollY > 40);
});


// ---------- MOBILE MENU ----------
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  navLinks.style.cssText += isOpen ? '' : 'position:absolute; top:100%; left:0; right:0; background:#FFFDF9; flex-direction:column; padding:20px 28px; gap:16px; border-bottom:1px solid rgba(11,41,66,0.14);';
});

/* =========================================================
   DARK / LIGHT MODE
   ========================================================= */

(function () {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;

    function updateThemeButton() {

        const isDark =
            document.documentElement.classList.contains("dark-mode");

        if (isDark) {
            themeToggle.textContent = "☀️";
            themeToggle.setAttribute(
                "aria-label",
                "Aktifkan Light Mode"
            );
        } else {
            themeToggle.textContent = "🌙";
            themeToggle.setAttribute(
                "aria-label",
                "Aktifkan Dark Mode"
            );
        }
    }


    /* Baca tema yang tersimpan */
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
    } else {
        document.documentElement.classList.remove("dark-mode");
    }

    updateThemeButton();


    /* Tombol */
    themeToggle.addEventListener("click", function () {

        const isDark =
            document.documentElement.classList.toggle("dark-mode");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        updateThemeButton();
    });

})();
