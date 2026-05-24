/* Main JS — FAQ accordion, scroll effects, misc */

/* FAQ accordion */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-question.open').forEach(other => {
        other.classList.remove('open');
        other.nextElementSibling.classList.remove('open');
      });

      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
}

/* Sticky header shrink on scroll */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.borderBottomColor = '#1A1A1A';
    } else {
      header.style.borderBottomColor = '#2D2D2D';
    }
  }, { passive: true });
}

/* Animate counting numbers */
function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (el.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, 24);
  });
}

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initHeaderScroll();

  // Trigger counters when stats section is visible
  const statsSection = document.querySelector('[data-count]');
  if (statsSection) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { initCounters(); obs.disconnect(); } });
    }, { threshold: 0.3 });
    obs.observe(statsSection);
  }
});
