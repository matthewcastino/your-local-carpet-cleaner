/* Shared site components — header, footer, modal, WhatsApp FAB */

const PHONE_DISPLAY  = '0451 286 550';
const PHONE_LINK     = '0451286550';
const EMAIL          = 'nasser@yourlocalcarpetcleaner.com.au';
const WA_LINK        = 'https://wa.me/61451286550?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote%20for%20carpet%20cleaning';
const FORMSPREE_URL  = 'https://formspree.io/f/YOUR_FORM_ID';
const THANKYOU_URL   = 'thank-you.html';

/* Resolve paths relative to site root when pages are in subdirectories */
function root(path) {
  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  const prefix = depth > 0 ? '../'.repeat(depth) : '';
  return prefix + path;
}

function activePage() {
  const p = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  return p;
}

function navLink(href, label, page) {
  const current = activePage();
  const isActive = current === page ? ' active' : '';
  return `<a href="${root(href)}" class="desk-nav-link${isActive}">${label}</a>`;
}

/* ── Utility bar + sticky header ──────────── */
function buildHeader() {
  const page = activePage();
  const svcActive = ['carpet-cleaning','upholstery-cleaning','rug-cleaning','mattress-cleaning','stain-odour-removal','end-of-lease-cleaning','commercial-carpet-cleaning'].includes(page);

  return `
<div id="utility-bar">
  <div style="max-width:1200px;margin:0 auto;padding:0 24px;display:flex;justify-content:space-between;align-items:center;">
    <a href="tel:${PHONE_LINK}" style="color:#c4c7c7;font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='#c4c7c7'">
      <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:4px;">call</span>Call: ${PHONE_DISPLAY}
    </a>
    <a href="mailto:${EMAIL}" style="color:#c4c7c7;font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;display:none;" class="util-email" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='#c4c7c7'">
      <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:4px;">mail</span>Email: ${EMAIL}
    </a>
  </div>
</div>

<header id="main-header">
  <div class="header-inner">
    <!-- Logo -->
    <a href="${root('index.html')}" style="display:inline-flex;align-items:center;text-decoration:none;line-height:1;flex-shrink:0;">
      <div style="background:#ffffff;padding:7px 12px;">
        <span style="font-family:'Montserrat',sans-serif;font-size:7px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#0D0D0D;display:block;line-height:1.4;white-space:nowrap;">YOUR LOCAL CARPET</span>
        <span style="font-family:'Montserrat',sans-serif;font-size:17px;font-weight:900;letter-spacing:-.02em;text-transform:uppercase;color:#0D0D0D;display:block;line-height:1;white-space:nowrap;">CLEANER</span>
      </div>
    </a>

    <!-- Desktop nav -->
    <nav class="desk-nav">
      <a href="${root('index.html')}" class="desk-nav-link${page==='index'?' active':''}">Home</a>
      <a href="${root('about.html')}" class="desk-nav-link${page==='about'?' active':''}">About Us</a>

      <!-- Services dropdown -->
      <div class="services-dropdown-wrap">
        <button class="services-dropdown-btn${svcActive?' active':''}">
          Services <span class="material-symbols-outlined" style="font-size:16px;">expand_more</span>
        </button>
        <div class="services-dropdown">
          <a href="${root('carpet-cleaning.html')}">Carpet Cleaning</a>
          <a href="${root('upholstery-cleaning.html')}">Upholstery Cleaning</a>
          <a href="${root('rug-cleaning.html')}">Rug Cleaning</a>
          <a href="${root('mattress-cleaning.html')}">Mattress Cleaning</a>
          <a href="${root('stain-odour-removal.html')}">Stain &amp; Odour Removal</a>
          <a href="${root('end-of-lease-cleaning.html')}">End of Lease Cleaning</a>
          <a href="${root('commercial-carpet-cleaning.html')}">Commercial Cleaning</a>
        </div>
      </div>

      <a href="${root('gallery.html')}" class="desk-nav-link${page==='gallery'?' active':''}">Gallery</a>
      <a href="${root('reviews.html')}" class="desk-nav-link${page==='reviews'?' active':''}">Reviews</a>
      <a href="${root('blog.html')}" class="desk-nav-link${page==='blog'||page.startsWith('blog-post')?' active':''}">Blog</a>
      <a href="${root('contact.html')}" class="desk-nav-link${page==='contact'?' active':''}">Contact</a>
    </nav>

    <!-- Desktop CTA -->
    <div style="display:none;" class="desk-cta-wrap">
      <a href="tel:${PHONE_LINK}" style="font-size:13px;font-weight:700;color:#c4c7c7;text-decoration:none;letter-spacing:.03em;margin-right:20px;" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='#c4c7c7'">${PHONE_DISPLAY}</a>
      <button class="header-cta open-modal">Get a Free Quote</button>
    </div>

    <!-- Mobile right -->
    <div class="mobile-header-right">
      <a href="tel:${PHONE_LINK}" class="mobile-call-btn" aria-label="Call us">
        <span class="material-symbols-outlined">call</span>
      </a>
      <button class="hamburger-btn" id="hamburger-btn" aria-label="Open menu" aria-expanded="false">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>
  </div>
</header>

<!-- Mobile drawer -->
<div id="drawer-overlay"></div>
<nav id="mobile-drawer" aria-label="Mobile navigation">
  <div class="drawer-header">
    <span class="logo-text" style="font-size:14px;">Your Local Carpet Cleaner</span>
    <button class="drawer-close" id="drawer-close" aria-label="Close menu">
      <span class="material-symbols-outlined">close</span>
    </button>
  </div>
  <div class="drawer-nav">
    <a href="${root('index.html')}" class="${page==='index'?'active':''}">Home</a>
    <a href="${root('about.html')}" class="${page==='about'?'active':''}">About Us</a>
    <button class="drawer-services-toggle" id="drawer-svc-toggle">
      Services <span class="material-symbols-outlined" style="font-size:18px;">expand_more</span>
    </button>
    <div class="drawer-services-sub" id="drawer-svc-sub">
      <a href="${root('carpet-cleaning.html')}">Carpet Cleaning</a>
      <a href="${root('upholstery-cleaning.html')}">Upholstery Cleaning</a>
      <a href="${root('rug-cleaning.html')}">Rug Cleaning</a>
      <a href="${root('mattress-cleaning.html')}">Mattress Cleaning</a>
      <a href="${root('stain-odour-removal.html')}">Stain &amp; Odour Removal</a>
      <a href="${root('end-of-lease-cleaning.html')}">End of Lease Cleaning</a>
      <a href="${root('commercial-carpet-cleaning.html')}">Commercial Cleaning</a>
    </div>
    <a href="${root('gallery.html')}" class="${page==='gallery'?'active':''}">Gallery</a>
    <a href="${root('reviews.html')}" class="${page==='reviews'?'active':''}">Reviews</a>
    <a href="${root('blog.html')}" class="${page==='blog'||page.startsWith('blog-post')?'active':''}">Blog</a>
    <a href="${root('contact.html')}" class="${page==='contact'?'active':''}">Contact</a>
  </div>
  <div class="drawer-cta">
    <button class="open-modal">Get a Free Quote</button>
    <a href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a>
  </div>
</nav>`;
}

/* ── Footer ───────────────────────────────── */
function buildFooter() {
  return `
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <!-- Col 1: Brand -->
      <div class="footer-col">
        <div style="display:flex;align-items:center;gap:0;margin-bottom:20px;">
          <div style="background:#ffffff;padding:6px 10px;display:inline-block;">
            <span style="font-family:'Montserrat',sans-serif;font-size:6px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#0D0D0D;display:block;line-height:1.4;white-space:nowrap;">YOUR LOCAL CARPET</span>
            <span style="font-family:'Montserrat',sans-serif;font-size:14px;font-weight:900;letter-spacing:-.02em;text-transform:uppercase;color:#0D0D0D;display:block;line-height:1;white-space:nowrap;">CLEANER</span>
          </div>
        </div>
        <p>Family-owned carpet and upholstery cleaning across Sydney. 20 years of trusted service.</p>
        <p><a href="tel:${PHONE_LINK}" style="color:#4A5D6E;text-decoration:none;font-weight:700;">${PHONE_DISPLAY}</a></p>
        <p><a href="mailto:${EMAIL}" style="color:#4A5D6E;text-decoration:none;font-size:13px;">${EMAIL}</a></p>
        <div class="footer-social">
          <a href="https://www.facebook.com/carepluscarpetcleaning/" target="_blank" rel="noopener" aria-label="Facebook">
            <span class="material-symbols-outlined">thumb_up</span>
          </a>
          <a href="${WA_LINK}" target="_blank" rel="noopener" aria-label="WhatsApp">
            <span class="material-symbols-outlined">chat</span>
          </a>
        </div>
      </div>

      <!-- Col 2: Quick links -->
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="${root('index.html')}">Home</a></li>
          <li><a href="${root('about.html')}">About Us</a></li>
          <li><a href="${root('services.html')}">All Services</a></li>
          <li><a href="${root('gallery.html')}">Gallery</a></li>
          <li><a href="${root('reviews.html')}">Reviews</a></li>
          <li><a href="${root('blog.html')}">Blog</a></li>
          <li><a href="${root('contact.html')}">Contact</a></li>
        </ul>
      </div>

      <!-- Col 3: Services -->
      <div class="footer-col">
        <h4>Our Services</h4>
        <ul>
          <li><a href="${root('carpet-cleaning.html')}">Carpet Cleaning</a></li>
          <li><a href="${root('upholstery-cleaning.html')}">Upholstery Cleaning</a></li>
          <li><a href="${root('rug-cleaning.html')}">Rug Cleaning</a></li>
          <li><a href="${root('mattress-cleaning.html')}">Mattress Cleaning</a></li>
          <li><a href="${root('stain-odour-removal.html')}">Stain &amp; Odour Removal</a></li>
          <li><a href="${root('end-of-lease-cleaning.html')}">End of Lease Cleaning</a></li>
          <li><a href="${root('commercial-carpet-cleaning.html')}">Commercial Cleaning</a></li>
        </ul>
      </div>

      <!-- Col 4: Contact -->
      <div class="footer-col">
        <h4>Contact Us</h4>
        <ul>
          <li style="color:#c4c7c7;font-size:13px;padding:10px 0;border-bottom:1px solid #1A1A1A;">
            <span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:6px;color:#4A5D6E;">location_on</span>Sydney, NSW, Australia
          </li>
          <li><a href="tel:${PHONE_LINK}"><span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:6px;">call</span>${PHONE_DISPLAY}</a></li>
          <li><a href="mailto:${EMAIL}"><span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:6px;">mail</span>Email Us</a></li>
          <li><a href="${WA_LINK}" target="_blank" rel="noopener"><span class="material-symbols-outlined" style="font-size:14px;vertical-align:middle;margin-right:6px;">chat</span>WhatsApp</a></li>
        </ul>
      </div>
    </div>

    <!-- Service areas -->
    <div class="footer-areas">
      <span>Serving:</span>
      <span>Sydney</span><span class="sep">·</span>
      <span>Sefton</span><span class="sep">·</span>
      <span>Prestons</span><span class="sep">·</span>
      <span>Revesby</span><span class="sep">·</span>
      <span>Parramatta</span><span class="sep">·</span>
      <span>Liverpool</span><span class="sep">·</span>
      <span>Bankstown</span><span class="sep">·</span>
      <span>Campbelltown</span><span class="sep">·</span>
      <span>Penrith</span><span class="sep">·</span>
      <span>Chatswood</span><span class="sep">·</span>
      <span>Surrounding suburbs</span>
    </div>

    <div class="footer-bottom">
      <p>© 2025 Your Local Carpet Cleaner. All rights reserved. Sydney, NSW, Australia.</p>
      <p>Family-owned &amp; operated since 2004 · 20 years of trusted service</p>
    </div>
  </div>
</footer>`;
}

/* ── WhatsApp FAB ─────────────────────────── */
function buildWhatsApp() {
  return `
<a href="${WA_LINK}" class="whatsapp-fab" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>`;
}

/* ── Quote modal ──────────────────────────── */
function buildModal() {
  return `
<div id="quote-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div id="modal-overlay"></div>
  <div id="modal-card">
    <button id="modal-close" aria-label="Close modal">
      <span class="material-symbols-outlined">close</span>
    </button>
    <h2 id="modal-title">Request a Free Quote</h2>
    <p class="modal-sub">We'll call you back within the hour. No obligation.</p>
    <form class="modal-form" action="${FORMSPREE_URL}" method="POST">
      <input type="hidden" name="_subject" value="New Quote Request — Your Local Carpet Cleaner">
      <input type="hidden" name="_next" value="${THANKYOU_URL}">
      <div class="form-row">
        <div class="form-group">
          <label for="modal-name">Full Name *</label>
          <input type="text" id="modal-name" name="name" placeholder="Jane Smith" required>
        </div>
        <div class="form-group">
          <label for="modal-phone">Phone Number *</label>
          <input type="tel" id="modal-phone" name="phone" placeholder="0400 000 000" required>
        </div>
      </div>
      <div class="form-group">
        <label for="modal-email">Email Address</label>
        <input type="email" id="modal-email" name="email" placeholder="jane@example.com">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="modal-service">Service Required *</label>
          <select id="modal-service" name="service" required>
            <option value="">Select a service...</option>
            <option>Carpet Cleaning</option>
            <option>Upholstery Cleaning</option>
            <option>Rug Cleaning</option>
            <option>Mattress Cleaning</option>
            <option>Stain &amp; Odour Removal</option>
            <option>End of Lease Cleaning</option>
            <option>Commercial Carpet Cleaning</option>
          </select>
        </div>
        <div class="form-group">
          <label for="modal-suburb">Suburb *</label>
          <input type="text" id="modal-suburb" name="suburb" placeholder="e.g. Revesby" required>
        </div>
      </div>
      <div class="form-group">
        <label for="modal-message">Message</label>
        <textarea id="modal-message" name="message" placeholder="Tell us a bit about what you need..."></textarea>
      </div>
      <button type="submit" class="modal-submit">Send Quote Request</button>
    </form>
  </div>
</div>`;
}

/* ── Responsive show/hide helpers ─────────── */
function applyResponsive() {
  const w = window.innerWidth;
  // Show email in utility bar on sm+
  const email = document.querySelector('.util-email');
  if (email) email.style.display = w >= 640 ? 'inline' : 'none';
  // Show logo text on lg+
  document.querySelectorAll('.logo-text').forEach(el => {
    el.style.display = w >= 1024 ? 'block' : 'none';
  });
  // Show desk CTA on lg+
  const deskCta = document.querySelector('.desk-cta-wrap');
  if (deskCta) deskCta.style.display = w >= 1024 ? 'flex' : 'none';
  // Show desk nav on lg+
  const deskNav = document.querySelector('.desk-nav');
  if (deskNav) deskNav.style.display = w >= 1024 ? 'flex' : 'none';
  // Show mobile header on <lg
  const mobileRight = document.querySelector('.mobile-header-right');
  if (mobileRight) mobileRight.style.display = w < 1024 ? 'flex' : 'none';
}

/* ── Modal logic ──────────────────────────── */
function initModal() {
  const modal   = document.getElementById('quote-modal');
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Focus trap
  modal.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = modal.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
    }
  });
}

/* ── Mobile drawer logic ──────────────────── */
function initDrawer() {
  const drawer  = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const openBtn = document.getElementById('hamburger-btn');
  const closeBtn = document.getElementById('drawer-close');
  const svcToggle = document.getElementById('drawer-svc-toggle');
  const svcSub    = document.getElementById('drawer-svc-sub');
  if (!drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
  }

  if (openBtn)  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  if (svcToggle && svcSub) {
    svcToggle.addEventListener('click', () => {
      svcSub.classList.toggle('open');
    });
  }
}

/* ── Intersection observer for fade-in ────── */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ── Bootstrap ────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const hEl = document.getElementById('site-header');
  const fEl = document.getElementById('site-footer');

  if (hEl) hEl.innerHTML = buildHeader();
  if (fEl) fEl.innerHTML = buildFooter();

  document.body.insertAdjacentHTML('beforeend', buildWhatsApp());
  document.body.insertAdjacentHTML('beforeend', buildModal());

  applyResponsive();
  window.addEventListener('resize', applyResponsive);

  initModal();
  initDrawer();
  initFadeIn();
});
