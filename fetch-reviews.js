#!/usr/bin/env node
/**
 * fetch-reviews.js
 *
 * Fetches reviews from the Facebook Graph API and writes them to data/reviews.json.
 *
 * Prerequisites:
 *   1. Create a Facebook App at developers.facebook.com
 *   2. Add the page to the app and request the `pages_read_engagement` permission
 *   3. Generate a long-lived Page Access Token
 *   4. Set FACEBOOK_PAGE_ID and FACEBOOK_ACCESS_TOKEN in your .env file
 *
 * Run: node fetch-reviews.js
 */

require('dotenv').config();

const https = require('https');
const fs = require('fs');
const path = require('path');

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const OUTPUT_PATH = path.join(__dirname, 'data', 'reviews.json');

if (!PAGE_ID || !ACCESS_TOKEN) {
  console.error(
    'Error: FACEBOOK_PAGE_ID and FACEBOOK_ACCESS_TOKEN must be set in your .env file.\n' +
    'See .env.example for details.'
  );
  process.exit(1);
}

const url = `https://graph.facebook.com/v18.0/${PAGE_ID}/ratings?fields=reviewer,rating,review_text,created_time&access_token=${ACCESS_TOKEN}&limit=50`;

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Failed to parse Facebook response: ' + data)); }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching reviews from Facebook Graph API...');

  let response;
  try {
    response = await fetchJSON(url);
  } catch (err) {
    console.error('Network error:', err.message);
    process.exit(1);
  }

  if (response.error) {
    console.error('Facebook API error:', response.error.message);
    process.exit(1);
  }

  const ratings = (response.data || []).filter(r => r.rating >= 4 && r.review_text);

  const reviews = ratings.map(r => ({
    author: r.reviewer ? r.reviewer.name : 'Anonymous',
    rating: r.rating,
    text: r.review_text,
    date: new Date(r.created_time).toLocaleDateString('en-AU', {
      month: 'long',
      year: 'numeric'
    }),
    source: 'Facebook'
  }));

  if (reviews.length === 0) {
    console.warn('No reviews with text found. The existing data/reviews.json has not been updated.');
    process.exit(0);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(reviews, null, 2), 'utf8');
  console.log(`Done — wrote ${reviews.length} reviews to ${OUTPUT_PATH}`);
}

main();
