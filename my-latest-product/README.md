## My Latest Product – Showcase

This project is a single‑page showcase for your latest product, featuring responsive device mockups (phone and web/laptop), a polished hero with a prominent link to your live product, subtle animated background, and a clean contact section.

- **Live product**: [Deal'eh](http://www.dealeh.live/)

### Features
- **Sticky full‑bleed header** with gradient and blur
- **Hero** with a bold call‑to‑action linking to your product
- **Responsive device mockups** (phone + web) that display images fully (no cropping)
- **Animated aurora canvas background** rendered behind the content
- **Contact ribbon** with avatar, email, and LinkedIn

### Tech Stack
- Vite (build tool)
- Vanilla JS + CSS (no frameworks)

### Getting Started (Local)
Prerequisites: Node.js 18+ (recommended: 20+) and npm

1) Install dependencies
```bash
npm ci
```

2) Run the dev server
```bash
npm run dev
```

3) Production build
```bash
npm run build
```

4) Preview the production build
```bash
npm run preview
```

### Docker
Build a production image and serve the static site via Nginx.

1) Build the image (from the repository root)
```bash
docker build -t myproduct-dealeh .
```

2) Run the container
```bash
docker run -p 8080:80 myproduct-dealeh
```
Then open `http://localhost:8080` in your browser.

### Project Structure
```
my-latest-product/
  index.html            # App entry
  src/                  # JS and CSS
    main.js
    style.css
  assets/               # Product/web images (referenced at build time)
  public/               # Static public assets
```

### Notes
- The web mockup shrink‑wraps to the image and scales down on smaller screens (no cropping). The phone mockup contains images with `object-fit: contain`.
- The hero link points to your live product at [Deal'eh](http://www.dealeh.live/).

My Latest Product
=================

Quick start
-----------

1. Open a terminal in `my-latest-product`.
2. Install deps:
```
npm install
```
3. Run locally:
```
npm run dev
```
4. Build for production:
```
npm run build
npm run preview
```

Where to drop images
--------------------

- Put website UI screenshots in `src/assets/images/web`.
- Put product/device screenshots in `src/assets/images/product`.

The page automatically loads any files you place in those folders and shows them in the Gallery section.

Contact content
---------------

The Contact section is prefilled with:
- Name: Kianoush Haratianenjadi
- Email: haratiank2@gmail.com
- LinkedIn: https://www.linkedin.com/in/kianoush-haratiannejadi/

Renaming
--------

The document title is set to "My Latest Product" in `index.html`.
