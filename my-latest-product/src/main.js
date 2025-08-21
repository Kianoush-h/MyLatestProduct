import './style.css'

// Import all images from the two folders
const webImages = import.meta.glob('./assets/images/web/*', { eager: true, as: 'url' })
const productImages = import.meta.glob('./assets/images/product/*', { eager: true, as: 'url' })

function renderImageStrip(images, label) {
  const urls = Object.values(images)
  if (urls.length === 0) return ''
  return `
    <div class="strip">
      ${urls.map(u => `<img src="${u}" alt="${label}" />`).join('')}
    </div>
  `
}

const linkedin = 'https://www.linkedin.com/in/kianoush-haratiannejadi/'

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <div class="brand">My Latest Product</div>
    <nav class="nav">
      <a href="#features">Features</a>
      <a href="#gallery">Gallery</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <section class="hero">
      <div class="hero-copy">
        <h1>Launch faster with a modern digital service</h1>
        <p>Elegant experience on mobile and web. Animated. Dark mode by default.</p>
        <a class="cta" href="#contact">Get in touch</a>
      </div>
      <div class="devices">
        <div class="device phone">
          <div class="screen shimmer"></div>
        </div>
        <div class="device laptop">
          <div class="screen shimmer"></div>
        </div>
      </div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="grid-bg"></div>
    </section>

    <section id="features" class="features">
      <div class="feature">
        <h3>Responsive by design</h3>
        <p>Looks great on phones and desktops with smooth micro‑interactions.</p>
      </div>
      <div class="feature">
        <h3>Fast & Lightweight</h3>
        <p>Built with Vite and vanilla JS for snappy loads and tiny bundles.</p>
      </div>
      <div class="feature">
        <h3>Easy content drops</h3>
        <p>Place your images in <code>src/assets/images/web</code> or <code>src/assets/images/product</code>.</p>
      </div>
    </section>

    <section id="gallery" class="gallery">
      <h2>Web previews</h2>
      ${renderImageStrip(webImages, 'Web screenshot')}
      <h2>Product previews</h2>
      ${renderImageStrip(productImages, 'Product screenshot')}
    </section>

    <section id="contact" class="contact">
      <h2>Contact</h2>
      <div class="card contact-card">
        <p class="name">Kianoush Haratianenjadi</p>
        <p><a href="mailto:haratiank2@gmail.com">haratiank2@gmail.com</a></p>
        <p><a target="_blank" rel="noopener" href="${linkedin}">LinkedIn</a></p>
      </div>
    </section>
  </main>
  <footer class="footer">© ${new Date().getFullYear()} My Latest Product</footer>
`
