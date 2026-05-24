<<<<<<< HEAD
# Your Local Carpet Cleaner — Website

Static HTML/CSS/JS website for Your Local Carpet Cleaner, Sydney.

## Tech Stack

- Pure HTML, CSS, and vanilla JavaScript — no build framework required
- Tailwind CSS via CDN (Play CDN with forms plugin)
- Shared components (header, footer, modal, WhatsApp FAB) injected by `js/components.js`
- Hosted on Vercel (static)
- Form handling via Formspree

## Local Development

```bash
npm run dev
# Opens http://localhost:3000
```

Requires Node.js and `serve` installed globally or via npx (no install needed with npx).

## File Structure

```
/
├── index.html                  # Homepage
├── about.html
├── services.html
├── carpet-cleaning.html
├── upholstery-cleaning.html
├── rug-cleaning.html
├── mattress-cleaning.html
├── stain-odour-removal.html
├── end-of-lease-cleaning.html
├── commercial-carpet-cleaning.html
├── gallery.html
├── reviews.html
├── contact.html
├── thank-you.html
├── blog.html
├── blog-post-1.html            # How often to clean carpets
├── blog-post-2.html            # Pet odour removal
├── blog-post-3.html            # End of lease guide
├── blog-post-4.html            # Steam vs dry cleaning
├── blog-post-5.html            # Remove stains at home
├── blog-post-6.html            # Upholstery cleaning worth it
├── css/
│   ├── tokens.css              # Design tokens as CSS variables
│   ├── style.css               # Global styles
│   ├── components.css          # Header, footer, modal, cards
│   └── blog.css                # Blog layout and article styles
├── js/
│   ├── components.js           # Shared component injection (header, footer, modal, WhatsApp)
│   ├── main.js                 # FAQ accordion, scroll effects, counters
│   ├── gallery.js              # Gallery filter + before/after slider
│   └── reviews.js              # Renders reviews from data/reviews.json
├── data/
│   └── reviews.json            # Review data (manual or fetched via fetch-reviews.js)
├── images/                     # Add real photos here
├── fetch-reviews.js            # Pulls reviews from Facebook Graph API
├── build.js                    # Injects reviews into HTML files
├── package.json
├── vercel.json
├── .env.example
└── .gitignore
```

## Setting Up the Contact Form

The contact form uses [Formspree](https://formspree.io):

1. Create a free account at formspree.io
2. Create a new form — you'll get a Form ID (e.g. `xpwzabcd`)
3. In `contact.html`, replace `YOUR_FORM_ID` in the action URL:
   ```html
   <form action="https://formspree.io/f/xpwzabcd" method="POST">
   ```

## Refreshing Facebook Reviews

1. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
2. Set `FACEBOOK_PAGE_ID` and `FACEBOOK_ACCESS_TOKEN` in `.env`
3. Run the fetch script:
   ```bash
   npm run fetch-reviews
   ```
4. Run the build script to inject updated reviews into HTML:
   ```bash
   npm run build
   ```

## Adding a Blog Post

1. Duplicate `blog-post-1.html` and rename it (e.g. `blog-post-7.html`)
2. Update the `<title>`, `<meta name="description">`, `<link rel="canonical">`, and `<meta property="og:...">` tags
3. Write the article content inside `.article-content`
4. Add a card for the new post in `blog.html`
5. Update the sidebar "Recent Posts" links in all blog post files if desired

## Adding Photos

Replace placeholder tiles by adding images to the `images/` folder and updating the relevant HTML:

- **Homepage gallery preview** — `index.html`, the gallery-preview section
- **Gallery page** — `gallery.html`, the `.gallery-item` tiles and before/after slider
- **Service pages** — each service page has an image placeholder in the intro section
- **Blog posts** — each `.article-featured-img` div

Recommended image sizes:
- Hero / featured: 1200 × 630px
- Gallery tiles: 600 × 600px (square)
- Blog post hero: 900 × 500px

## Deploying to Vercel

1. Push this repository to GitHub
2. Connect your GitHub repo to [Vercel](https://vercel.com)
3. Vercel will detect a static site and deploy automatically
4. Set your custom domain in Vercel project settings

No build command is needed — Vercel serves the static files directly.

## Sitemap

Generate a sitemap at [XML-Sitemaps.com](https://www.xml-sitemaps.com) using your live domain and save as `sitemap.xml` in the root. Submit it to Google Search Console.

## Business Details

- **Phone:** 0451 286 550
- **WhatsApp:** +61 451 286 550
- **Email:** nasser@yourlocalcarpetcleaner.com.au
- **Facebook:** facebook.com/carepluscarpetcleaning
- **Domain:** yourlocalcarpetcleaner.com.au
=======
# your-local-carpet-cleaner
>>>>>>> 3ec52d0fd89940289bdb92123108a4e6879b70c2
