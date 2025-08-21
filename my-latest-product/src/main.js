import './style.css'

// Import images from both src/ and project-root assets folders
const webImages = {
  ...import.meta.glob('./assets/images/web/*', { eager: true, query: '?url', import: 'default' }),
  ...import.meta.glob('../assets/images/web/*', { eager: true, query: '?url', import: 'default' }),
}
const productImages = {
  ...import.meta.glob('./assets/images/product/*', { eager: true, query: '?url', import: 'default' }),
  ...import.meta.glob('../assets/images/product/*', { eager: true, query: '?url', import: 'default' }),
}

const linkedin = 'https://www.linkedin.com/in/kianoush-haratiannejadi/'

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <div class="brand">My Latest Product</div>
  </header>
  <main>
    <section class="hero">
      <div class="hero-copy">
        <h1>Launch faster with a modern digital service</h1>
        
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

    <section id="contact" class="contact">
      <div class="contact-row">
        <span class="name">Kianoush Haratianenjadi</span>
        <a href="mailto:haratiank2@gmail.com">haratiank2@gmail.com</a>
        <a target="_blank" rel="noopener" href="${linkedin}">LinkedIn</a>
      </div>
    </section>
  </main>
  <footer class="footer">© ${new Date().getFullYear()} My Latest Product</footer>
`

// After rendering, mount slideshows inside device mockups
const webUrls = Object.values(webImages).filter(u => /\.(png|jpe?g|webp|gif|svg)$/i.test(u))
const productUrls = Object.values(productImages).filter(u => /\.(png|jpe?g|webp|gif|svg)$/i.test(u))

function mountSlideshow(screenEl, urls, altLabel) {
  if (!screenEl || !urls || urls.length === 0) return
  const img = document.createElement('img')
  img.alt = altLabel
  img.className = 'slide-img'
  screenEl.appendChild(img)
  let i = 0
  function show(idx) {
    img.src = urls[idx]
  }
  show(i)
  if (urls.length > 1) {
    setInterval(() => {
      i = (i + 1) % urls.length
      show(i)
    }, 3500)
  }
}

mountSlideshow(document.querySelector('.laptop .screen'), webUrls, 'Web preview')
mountSlideshow(document.querySelector('.phone .screen'), productUrls, 'Product preview')
