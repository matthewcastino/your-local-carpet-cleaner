/* Render reviews from data/reviews.json into the reviews page */

async function loadReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  try {
    const res  = await fetch('data/reviews.json');
    const data = await res.json();
    renderReviews(container, data);
  } catch (e) {
    container.innerHTML = '<p style="color:#c4c7c7;text-align:center;padding:40px 0;">Reviews loading — run <code>npm run fetch-reviews</code> then <code>npm run build</code> to populate.</p>';
  }
}

function renderReviews(container, reviews) {
  container.innerHTML = reviews.map(r => `
    <div class="review-card fade-in">
      <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="reviewer">${r.name} <span>— ${r.date}</span></div>
    </div>
  `).join('');

  // Trigger fade-in for newly added elements
  requestAnimationFrame(() => {
    container.querySelectorAll('.fade-in').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
      }, { threshold: 0.1 });
      obs.observe(el);
    });
  });
}

document.addEventListener('DOMContentLoaded', loadReviews);
