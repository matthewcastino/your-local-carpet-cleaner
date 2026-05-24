/* Gallery filter + before/after slider */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilter();
  initBeforeAfter();
});

function initGalleryFilter() {
  const tabs  = document.querySelectorAll('.gallery-tab');
  const items = document.querySelectorAll('.gallery-item');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? 'block' : 'none';
        if (show) {
          item.style.animation = 'fadeInUp .35s ease both';
        }
      });
    });
  });
}

function initBeforeAfter() {
  const sliders = document.querySelectorAll('.before-after-slider');
  sliders.forEach(slider => {
    const handle  = slider.querySelector('.ba-handle');
    const afterEl = slider.querySelector('.ba-after');
    if (!handle || !afterEl) return;

    let dragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      const pct  = Math.min(Math.max((x - rect.left) / rect.width, 0.02), 0.98);
      afterEl.style.width = (pct * 100) + '%';
      handle.style.left   = (pct * 100) + '%';
    }

    handle.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
    handle.addEventListener('touchstart', e => { dragging = true; }, { passive: true });

    document.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
    document.addEventListener('touchmove', e => { if (dragging) setPosition(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mouseup',  () => { dragging = false; });
    document.addEventListener('touchend', () => { dragging = false; });

    // Start at 50%
    setPosition(slider.getBoundingClientRect().left + slider.offsetWidth * 0.5);
  });
}
