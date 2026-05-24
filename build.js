#!/usr/bin/env node
/**
 * build.js
 *
 * Reads data/reviews.json and injects review cards into:
 *   - reviews.html   (full reviews grid — replaces #reviews-container contents)
 *   - index.html     (2-card preview — replaces #reviews-preview contents)
 *
 * Run: node build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const REVIEWS_FILE = path.join(ROOT, 'data', 'reviews.json');
const REVIEWS_HTML = path.join(ROOT, 'reviews.html');
const INDEX_HTML = path.join(ROOT, 'index.html');

function reviewCard(review) {
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  const escaped = review.text.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<div class="review-card"><div class="stars">${stars}</div><p class="review-text">"${escaped}"</p><div class="reviewer">${review.author} <span>— ${review.date}</span></div></div>`;
}

function inject(html, startMarker, endMarker, content) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    throw new Error(`Could not find markers: "${startMarker}" ... "${endMarker}"`);
  }
  return html.slice(0, start + startMarker.length) + '\n' + content + '\n        ' + html.slice(end);
}

function main() {
  if (!fs.existsSync(REVIEWS_FILE)) {
    console.error('data/reviews.json not found. Run `node fetch-reviews.js` first.');
    process.exit(1);
  }

  const reviews = JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));

  if (!Array.isArray(reviews) || reviews.length === 0) {
    console.error('No reviews found in data/reviews.json');
    process.exit(1);
  }

  // --- reviews.html: inject all reviews ---
  if (fs.existsSync(REVIEWS_HTML)) {
    let reviewsHtml = fs.readFileSync(REVIEWS_HTML, 'utf8');
    const allCards = reviews.map(reviewCard).join('\n        ');

    const START = 'id="reviews-container"';
    const containerStart = reviewsHtml.indexOf(START);
    if (containerStart !== -1) {
      // Find the opening > of the div
      const divEnd = reviewsHtml.indexOf('>', containerStart) + 1;
      // Find the closing </div>
      const divClose = reviewsHtml.indexOf('</div>', divEnd);
      reviewsHtml = reviewsHtml.slice(0, divEnd) + '\n        ' + allCards + '\n      ' + reviewsHtml.slice(divClose);
      fs.writeFileSync(REVIEWS_HTML, reviewsHtml, 'utf8');
      console.log(`reviews.html updated with ${reviews.length} review cards`);
    } else {
      console.warn('reviews.html: could not find #reviews-container — skipped');
    }
  } else {
    console.warn('reviews.html not found — skipped');
  }

  // --- index.html: inject first 2 reviews into #reviews-preview ---
  if (fs.existsSync(INDEX_HTML)) {
    let indexHtml = fs.readFileSync(INDEX_HTML, 'utf8');
    const previewCards = reviews.slice(0, 2).map(reviewCard).join('\n        ');

    const PREVIEW_ID = 'id="reviews-preview"';
    const previewStart = indexHtml.indexOf(PREVIEW_ID);
    if (previewStart !== -1) {
      const divEnd = indexHtml.indexOf('>', previewStart) + 1;
      const divClose = indexHtml.indexOf('</div>', divEnd);
      indexHtml = indexHtml.slice(0, divEnd) + '\n        ' + previewCards + '\n      ' + indexHtml.slice(divClose);
      fs.writeFileSync(INDEX_HTML, indexHtml, 'utf8');
      console.log('index.html reviews preview updated with 2 cards');
    } else {
      console.warn('index.html: could not find #reviews-preview — skipped');
    }
  } else {
    console.warn('index.html not found — skipped');
  }

  console.log('Build complete.');
}

main();
