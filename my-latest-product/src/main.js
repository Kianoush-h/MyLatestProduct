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
        <div class="device phone" aria-label="Interactive phone mockup">
          <div class="screen shimmer"></div>
        </div>
        <div class="device laptop">
          <div class="screen shimmer"></div>
        </div>
      </div>
      <div class="aurora"></div>
    </section>

    <section id="contact" class="contact">
      <div class="contact-card">
        <div class="contact-id">
          <div class="contact-name">Kianoush Haratianenjadi</div>
          <div class="contact-chips">
            <a class="chip" href="mailto:haratiank2@gmail.com">haratiank2@gmail.com</a>
            <a class="chip" target="_blank" rel="noopener" href="${linkedin}">LinkedIn</a>
          </div>
        </div>
        <div class="contact-actions">
          <a class="btn" href="mailto:haratiank2@gmail.com">Email me</a>
          <button id="copy-email" class="btn secondary" type="button">Copy email</button>
        </div>
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

// Interactive phone tilt/rotate
const phone = document.querySelector('.phone')
if (phone) {
  const maxRotate = 20 // degrees
  function setRotation(clientX, clientY) {
    const rect = phone.getBoundingClientRect()
    const x = (clientX - rect.left) / rect.width
    const y = (clientY - rect.top) / rect.height
    const rotY = (x - 0.5) * maxRotate * 2 // left-right
    const rotX = (0.5 - y) * maxRotate * 2 // up-down
    phone.style.transform = `rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`
  }
  function resetRotation() {
    phone.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }
  phone.addEventListener('pointermove', e => setRotation(e.clientX, e.clientY))
  phone.addEventListener('pointerleave', resetRotation)
  phone.addEventListener('pointerdown', e => {
    phone.setPointerCapture(e.pointerId)
  })
}

// Copy email button
const copyBtn = document.getElementById('copy-email')
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('haratiank2@gmail.com')
      copyBtn.textContent = 'Copied!'
      setTimeout(() => (copyBtn.textContent = 'Copy email'), 1200)
    } catch (e) {
      copyBtn.textContent = 'Copy failed'
      setTimeout(() => (copyBtn.textContent = 'Copy email'), 1200)
    }
  })
}
