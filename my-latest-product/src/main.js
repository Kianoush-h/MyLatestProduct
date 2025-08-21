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
        <h1>check this product at <a href="http://www.dealeh.live/" target="_blank" rel="noopener">www.dealeh.live</a></h1>
        <p>Discover the latest discounts and flyers near you, and let our AI-powered algorithms optimize the best shopping route to help you purchase all the items on your list while maximizing your savings.</p>
      </div>
      <div class="devices">
        <div class="device phone" aria-label="Interactive phone mockup">
          <div class="screen shimmer"></div>
        </div>
        <div class="device laptop">
          <div class="browser-chrome" aria-hidden="true">
            <div class="browser-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
          </div>
          <div class="screen shimmer"></div>
        </div>
      </div>
      
    </section>

    <section id="contact" class="contact">
      <div class="contact-ribbon" role="contentinfo" aria-label="Contact information">
        <span class="contact-item name"><span class="avatar" aria-hidden="true">KH</span><span class="label">Kianoush Haratianenjadi</span></span>
        <a class="contact-item link" href="mailto:haratiank2@gmail.com" aria-label="Email Kianoush">
          <svg class="icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m-1.4 4.25l-6.34 4.23a1 1 0 0 1-1.12 0L4.8 8.25A1 1 0 0 1 6 6.9l5.5 3.67L17 6.9a1 1 0 1 1 1.6 1.35Z"/></svg>
          <span>haratiank2@gmail.com</span>
        </a>
        <a class="contact-item link" target="_blank" rel="noopener" href="${linkedin}" aria-label="LinkedIn profile">
          <svg class="icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M8.34 17.34V9.75H6V17.34h2.34m-.94-8.63a1.36 1.36 0 1 0 0-2.72 1.36 1.36 0 0 0 0 2.72M20 17.34v-4.2c0-2.26-1.21-3.31-2.83-3.31-1.3 0-1.88.72-2.21 1.22v-1.05h-2.34c.03.7 0 7.34 0 7.34H15v-4.1c0-.22.02-.44.08-.6.18-.44.58-.9 1.26-.9.89 0 1.24.68 1.24 1.67v3.93H20Z"/></svg>
          <span>LinkedIn</span>
        </a>
      </div>
    </section>
  </main>
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

// Buttons removed per request; showing only name, email and LinkedIn.

// Animated canvas background (soft moving color blobs)
(function startAuroraCanvas() {
  // Create a full‑page fixed canvas behind all content
  let canvas = document.getElementById('bg-canvas')
  if (!canvas) {
    canvas = document.createElement('canvas')
    canvas.id = 'bg-canvas'
    canvas.className = 'bg-canvas'
    document.body.prepend(canvas)
  }
  const ctx = canvas.getContext('2d')
  let width = 0, height = 0, dpr = Math.max(1, window.devicePixelRatio || 1)

  const blobs = Array.from({ length: 6 }).map((_, i) => {
    const palette = ['#ff6a3d', '#ffa133', '#2dd4bf', '#6478ff', '#ff73c5', '#22d3ee']
    return {
      x: Math.random(),
      y: Math.random(),
      r: 0.18 + Math.random() * 0.22,
      dx: (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
      dy: (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
      color: palette[i % palette.length]
    }
  })

  function hexToRgba(hex, a) {
    const v = hex.replace('#', '')
    const bigint = parseInt(v.length === 3 ? v.split('').map(c=>c+c).join('') : v, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  function resize() {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  window.addEventListener('resize', resize)

  function step(t) {
    ctx.clearRect(0, 0, width, height)
    ctx.globalCompositeOperation = 'lighter'
    for (const b of blobs) {
      const x = b.x * width
      const y = b.y * height
      const r = b.r * Math.max(width, height)
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
      grad.addColorStop(0, hexToRgba(b.color, 0.22))
      grad.addColorStop(1, hexToRgba(b.color, 0))
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()

      // drift
      b.x += b.dx * 0.0005
      b.y += b.dy * 0.0005
      if (b.x < -0.2 || b.x > 1.2) b.dx *= -1
      if (b.y < -0.2 || b.y > 1.2) b.dy *= -1
    }
    ctx.globalCompositeOperation = 'source-over'
    requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
})()
