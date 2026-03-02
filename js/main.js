/* ============================================================
   THE PROPERTY SHOW KENYA — main.js
   Handles:
   - Shared header/footer injection (XHR, works on any server)
   - CTA button swap (Book Consultation / Media Enquiry)
   - Navbar scroll + active link
   - Mobile menu
   - Scroll reveal
   - Counter animations
   - 3D card tilt
   - Contact form
   - Ticker/marquee duplication
   - Footer year
   ============================================================ */

(function () {

  /* ── PATH HELPER ───────────────────────────────────────────── */
  var isPages = window.location.pathname.includes('/pages/');
  var root    = isPages ? '../' : './';

  /* ── INCLUDE LOADER ────────────────────────────────────────── */
  function loadInclude(placeholderId, file, callback) {
    var el = document.getElementById(placeholderId);
    if (!el) return;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', root + 'includes/' + file, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Create a temp container to fix paths before injecting
        var temp = document.createElement('div');
        temp.innerHTML = xhr.responseText;

        // Fix all href paths that start with / to be root-relative
        temp.querySelectorAll('a[href]').forEach(function (a) {
          var href = a.getAttribute('href');
          if (href && href.startsWith('/') && !href.startsWith('//')) {
            a.setAttribute('href', root + href.slice(1));
          }
        });

        // Replace placeholder with the fixed HTML
        el.outerHTML = temp.innerHTML;

        if (callback) callback();
      }
    };
    xhr.send();
  }

  /* ── NAVBAR SCROLL ─────────────────────────────────────────── */
  function initNavbar() {
    var navbar = document.getElementById('mainNavbar');
    if (!navbar) return;
    function handleScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ── MOBILE MENU ───────────────────────────────────────────── */
  function initMobileMenu() {
    var hamburger  = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    var overlay    = document.querySelector('.overlay');
    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      hamburger.classList.add('active');
      mobileMenu.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
    if (overlay) overlay.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ── SCROLL REVEAL ─────────────────────────────────────────── */
  function initReveal() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('revealed');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── COUNTER ANIMATIONS ────────────────────────────────────── */
  function initCounters() {
    function animate(el, target, duration, suffix) {
      var current = 0;
      var increment = target / (duration / 16);
      var timer = setInterval(function () {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Number(Math.floor(current)).toLocaleString() + (suffix || '');
      }, 16);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          animate(el, parseFloat(el.dataset.target), 2000, el.dataset.suffix || '');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-counter]').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── 3D CARD TILT ──────────────────────────────────────────── */
  function initTilt() {
    document.querySelectorAll('.service-card, .show-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
        var y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
        card.style.transform = 'perspective(1000px) rotateX(' + (-y) + 'deg) rotateY(' + x + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ── CONTACT FORM ──────────────────────────────────────────── */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn  = form.querySelector('[type="submit"]');
      var orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = '\u2713 Message Sent!';
        btn.style.background = '#22c55e';
        setTimeout(function () {
          btn.textContent = orig;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
      }, 1500);
    });
  }

  /* ── TICKER / MARQUEE DUPLICATION ──────────────────────────── */
  function initScrollingBands() {
    ['.ticker-track', '.marquee-track'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) el.innerHTML += el.innerHTML;
    });
  }

  /* ── FOOTER YEAR ───────────────────────────────────────────── */
  function initYear() {
    var el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── HEADER INJECTION CALLBACK ─────────────────────────────── */
  function onHeaderLoaded() {
    // Active nav link
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var lp = (a.getAttribute('href') || '').split('/').pop();
      if (lp === page || (page === '' && lp === 'index.html')) {
        a.classList.add('active');
      }
    });

    // CTA swap for media page
    var isMedia = document.body.dataset.page === 'media';
    if (isMedia) {
      document.querySelectorAll('.nav-cta-btn, .nav-cta-mobile').forEach(function (btn) {
        btn.textContent = 'Media Enquiry';
      });
    }

    // Initialise navbar and mobile menu (elements now exist in DOM)
    initNavbar();
    initMobileMenu();
  }

  /* ── FOOTER INJECTION CALLBACK ─────────────────────────────── */
  function onFooterLoaded() {
    initYear();
  }

 /* ── THEME TOGGLE ──────────────────────────────────────────── */
  function initThemeToggle() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;

    // Restore saved preference
    var saved = localStorage.getItem('tps-theme');
    if (saved === 'light') {
      document.documentElement.classList.add('light-mode');
      updateToggleLabel(btn, true);
    }

    btn.addEventListener('click', function () {
      var isLight = document.documentElement.classList.toggle('light-mode');
      localStorage.setItem('tps-theme', isLight ? 'light' : 'dark');
      updateToggleLabel(btn, isLight);
    });
  }

  function updateToggleLabel(btn, isLight) {
    var icon = btn.querySelector('.theme-toggle-icon');
    var label = btn.querySelector('.theme-toggle-label');
    if (isLight) {
      label.textContent = 'Dark Mode';
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    } else {
      label.textContent = 'Light Mode';
      icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    }
  }
  
  /* ── BOOT ──────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    loadInclude('site-header', 'header.html', onHeaderLoaded);
    loadInclude('site-footer', 'footer.html', onFooterLoaded);
    initReveal();
    initCounters();
    initTilt();
    initContactForm();
    initScrollingBands();
    initThemeToggle();
  });

})();