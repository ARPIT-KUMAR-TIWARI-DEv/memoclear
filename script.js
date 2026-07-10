// =============================================
// MEMORYVITALI - script.js
// =============================================

'use strict';

// =============================================
// NAVBAR - Sticky + Hamburger
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Scroll to top btn
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (scrollBtn) {
    scrollBtn.classList.toggle('show', window.scrollY > 300);
  }
}, { passive: true });

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('mobile-open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scroll for hash links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =============================================
// HERO PARTICLES
// =============================================
function createParticles(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 12 + 4;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100 + 100}%;
      animation-duration:${Math.random() * 20 + 12}s;
      animation-delay:${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}
createParticles('hero-particles', 18);
createParticles('final-particles', 12);

// =============================================
// COUNTDOWN TIMER
// =============================================
function startCountdown(minutesId, secondsId, durationMinutes) {
  let totalSecs = durationMinutes * 60;
  const mEl = document.getElementById(minutesId);
  const sEl = document.getElementById(secondsId);
  if (!mEl || !sEl) return;

  function update() {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
    if (totalSecs <= 0) {
      totalSecs = durationMinutes * 60; // auto-reset
    } else {
      totalSecs--;
    }
  }
  update();
  return setInterval(update, 1000);
}

// Sync both timers
let sharedSecs = 10 * 60;
const t1m = document.getElementById('ct1-m');
const t1s = document.getElementById('ct1-s');
const t2m = document.getElementById('ct2-m');
const t2s = document.getElementById('ct2-s');
const exitTimer = document.getElementById('exit-timer-mini');

setInterval(() => {
  const m = Math.floor(sharedSecs / 60);
  const s = sharedSecs % 60;
  const mStr = String(m).padStart(2, '0');
  const sStr = String(s).padStart(2, '0');
  if (t1m) t1m.textContent = mStr;
  if (t1s) t1s.textContent = sStr;
  if (t2m) t2m.textContent = mStr;
  if (t2s) t2s.textContent = sStr;
  if (exitTimer) exitTimer.textContent = `${mStr}:${sStr}`;
  if (sharedSecs <= 0) {
    sharedSecs = 10 * 60;
  } else {
    sharedSecs--;
  }
}, 1000);

// =============================================
// ACCORDION - How It Works
// =============================================
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const body = this.nextElementSibling;
    const isOpen = this.getAttribute('aria-expanded') === 'true';
    // Close all
    document.querySelectorAll('.accordion-btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const bBody = b.nextElementSibling;
      if (bBody) bBody.classList.remove('open');
    });
    // Toggle clicked
    if (!isOpen) {
      this.setAttribute('aria-expanded', 'true');
      if (body) body.classList.add('open');
    }
  });
});

// =============================================
// FAQ ACCORDION
// =============================================
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const body = this.nextElementSibling;
    const isOpen = this.getAttribute('aria-expanded') === 'true';
    // Close all
    document.querySelectorAll('.faq-btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const bBody = b.nextElementSibling;
      if (bBody) bBody.classList.remove('open');
    });
    // Toggle
    if (!isOpen) {
      this.setAttribute('aria-expanded', 'true');
      if (body) body.classList.add('open');
    }
  });
});

// =============================================
// INTERSECTION OBSERVER - Scroll Animations
// =============================================
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Stagger cards in grids
      const siblings = entry.target.parentElement.querySelectorAll('[data-aos]');
      let delay = 0;
      siblings.forEach((sib, i) => {
        if (sib === entry.target) delay = i * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('animated');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// =============================================
// PURCHASE NOTIFICATION POPUP
// =============================================
const names = ['Sarah M.', 'James R.', 'Linda K.', 'Mike T.', 'Emma S.', 'David C.', 'Rachel N.', 'Tom H.', 'Anna W.', 'Chris P.'];
const cities = ['Austin, TX', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Miami, FL', 'Seattle, WA', 'Denver, CO', 'Boston, MA', 'Phoenix, AZ', 'Houston, TX'];
const packages = ['6 Bottles 🎉', '3 Bottles!', '6 Bottles 🎉', '1 Bottle', '6 Bottles 🎉'];

let popupCount = 0;

function showPurchasePopup() {
  const popup = document.getElementById('purchase-popup');
  const nameEl = document.getElementById('popup-name');
  const cityEl = document.getElementById('popup-city');
  if (!popup || !nameEl || !cityEl) return;

  const idx = popupCount % names.length;
  nameEl.textContent = names[idx];
  cityEl.textContent = cities[idx];
  const textP = popup.querySelector('.popup-text p');
  if (textP) textP.textContent = `Just ordered ${packages[idx % packages.length]}`;
  popupCount++;

  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 4500);
}

function closePurchasePopup() {
  const popup = document.getElementById('purchase-popup');
  if (popup) popup.classList.remove('show');
}

// Show first after 5s, then every 30s
setTimeout(() => {
  showPurchasePopup();
  setInterval(showPurchasePopup, 30000);
}, 5000);

// =============================================
// EXIT INTENT / SCROLL POPUP
// =============================================
let exitPopupShown = false;

function showExitPopup() {
  if (exitPopupShown) return;
  exitPopupShown = true;
  const overlay = document.getElementById('exit-popup');
  if (overlay) overlay.classList.add('show');
}

function closeExitPopup() {
  const overlay = document.getElementById('exit-popup');
  if (overlay) overlay.classList.remove('show');
}

// Desktop: Exit intent
document.addEventListener('mouseleave', (e) => {
  if (e.clientY <= 0 && !exitPopupShown) {
    setTimeout(showExitPopup, 200);
  }
});

// Mobile: Scroll 55%
window.addEventListener('scroll', () => {
  if (exitPopupShown) return;
  const scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
  if (scrollPct >= 0.55) showExitPopup();
}, { passive: true });

// All devices: 20s delay fallback
setTimeout(() => {
  if (!exitPopupShown) showExitPopup();
}, 20000);

// Close exit popup on overlay click
document.getElementById('exit-popup')?.addEventListener('click', function(e) {
  if (e.target === this) closeExitPopup();
});

// =============================================
// TOUCH FEEDBACK ON BUTTONS
// =============================================
document.querySelectorAll('a[href], button').forEach(el => {
  el.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.97)';
  }, { passive: true });
  el.addEventListener('touchend', function() {
    this.style.transform = '';
  }, { passive: true });
});

// =============================================
// BUTTON HOVER EFFECTS
// =============================================
document.querySelectorAll('.hero-cta-btn, .pricing-cta-btn, .final-cta-btn, .btn-primary, .exit-popup-cta').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// =============================================
// LAZY LOADING IMAGES (fallback for older browsers)
// =============================================
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported
} else {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src') || img.src;
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}

// =============================================
// PERFORMANCE: requestAnimationFrame for scroll
// =============================================
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { ticking = false; });
    ticking = true;
  }
}, { passive: true });

// =============================================
// DOMContentLoaded init
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Open first FAQ by default
  const firstFaq = document.querySelector('.faq-btn');
  if (firstFaq) {
    firstFaq.click();
  }

  console.log('✅ MemoryVitali script loaded successfully');
});
