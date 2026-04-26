let dragging = null;
let offsetX, offsetY;

function startDrag(wrap, clientX, clientY) {
  dragging = wrap;
  wrap.classList.add('dragging');
  const rect = wrap.getBoundingClientRect();
  offsetX = clientX - rect.left;
  offsetY = clientY - rect.top;
  wrap.style.right = 'auto';
  wrap.style.bottom = 'auto';
  wrap.style.left = rect.left + 'px';
  wrap.style.top = rect.top + 'px';
}

document.querySelectorAll('.hero-img-wrap').forEach(wrap => {
  wrap.addEventListener('mousedown', (e) => {
    startDrag(wrap, e.clientX, e.clientY);
    e.preventDefault();
  });
  wrap.addEventListener('touchstart', (e) => {
    startDrag(wrap, e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
  }, { passive: false });
});

document.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  dragging.style.left = (e.clientX - offsetX) + 'px';
  dragging.style.top = (e.clientY - offsetY) + 'px';
});

document.addEventListener('touchmove', (e) => {
  if (!dragging) return;
  dragging.style.left = (e.touches[0].clientX - offsetX) + 'px';
  dragging.style.top = (e.touches[0].clientY - offsetY) + 'px';
  e.preventDefault();
}, { passive: false });

document.addEventListener('mouseup', () => {
  if (dragging) {
    dragging.classList.remove('dragging');
    dragging = null;
  }
});

document.addEventListener('touchend', () => {
  if (dragging) {
    dragging.classList.remove('dragging');
    dragging = null;
  }
});

const rocketWrap = document.getElementById('rocketWrap');

rocketWrap.addEventListener('mouseenter', function () {
  if (window.matchMedia('(pointer: fine)').matches) {
    this.classList.add('peeked');
  }
});
rocketWrap.addEventListener('mouseleave', function () {
  this.classList.remove('peeked');
});
rocketWrap.addEventListener('click', function () {
  this.classList.remove('peeked');
  this.classList.add('launched');
});
rocketWrap.addEventListener('transitionend', function (e) {
  if (e.propertyName === 'transform' && this.classList.contains('launched')) {
    this.style.transition = 'none';
    this.classList.remove('launched');
    void this.offsetWidth;
    this.style.transition = '';
  }
});

document.querySelectorAll('.about-ct-img, .about-wide-ghost, .about-dog-img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    if (img.dataset.spinning) return;
    img.dataset.spinning = '1';
    const spin = img.classList.contains('about-ct-img') ? 'spinOnceCenter' : 'spinOnce';
    img.style.animation = `${spin} 0.45s ease-out forwards`;
    img.addEventListener('animationend', () => {
      delete img.dataset.spinning;
      img.style.animation = '';
    }, { once: true });
  });
});

document.querySelectorAll('.about-card').forEach(card => {
  const [expandBtn, closeBtn] = card.querySelectorAll('.about-card-controls svg');

  const toast = document.createElement('div');
  toast.className = 'about-card-toast';
  toast.textContent = "Hey, don't delete me! I'm human enough!";
  card.appendChild(toast);

  let toastTimer;
  closeBtn.addEventListener('click', () => {
    clearTimeout(toastTimer);
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2500);
  });

  expandBtn.addEventListener('click', () => {
    if (card.dataset.animating) return;
    card.dataset.animating = '1';
    card.classList.add('about-card--expanded');
    setTimeout(() => {
      card.classList.remove('about-card--expanded');
      delete card.dataset.animating;
    }, 500);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const heroGear = document.getElementById('heroGear');
heroGear.addEventListener('click', function () {
  clearTimeout(this._helloTimer);
  this.classList.remove('hello-active', 'hello-erasing');
  void this.offsetWidth;
  this.classList.add('hello-active');
  this._helloTimer = setTimeout(() => {
    this.classList.remove('hello-active');
    this.classList.add('hello-erasing');
    setTimeout(() => this.classList.remove('hello-erasing'), 650);
  }, 3700);
});

const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});