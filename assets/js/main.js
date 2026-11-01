(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Terminal typewriter ---------- */
  var phrases = [
    'whoami → co-founder & cto @ deskly',
    'ls projects/ → deskly, slam-gp-tuner, microweb',
    'cat interests.txt → maths, robotics, product',
    'git status → shipping',
  ];
  var typed = document.getElementById('typed');

  if (typed) {
    if (reduceMotion) {
      typed.textContent = phrases[0];
    } else {
      var pi = 0, ci = 0, deleting = false;
      typed.textContent = '';
      (function type() {
        var phrase = phrases[pi];
        if (!deleting) {
          typed.textContent = phrase.slice(0, ++ci);
          if (ci === phrase.length) { deleting = true; return setTimeout(type, 1900); }
          setTimeout(type, 50);
        } else {
          typed.textContent = phrase.slice(0, --ci);
          if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; return setTimeout(type, 400); }
          setTimeout(type, 24);
        }
      })();
    }
  }

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.querySelector('.theme-toggle');
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function syncThemeBtn() {
    if (!themeBtn) return;
    var dark = currentTheme() === 'dark';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeBtn.setAttribute('aria-pressed', String(dark));
  }
  if (themeBtn) {
    syncThemeBtn();
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncThemeBtn();
    });
  }

  /* ---------- Mobile menu ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-links');
  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) { closeMenu(); navToggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') && !e.target.closest('.site-nav')) closeMenu();
    });
  }

  /* ---------- Active section in nav ---------- */
  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if ('IntersectionObserver' in window && sectionLinks.length) {
    var byId = {};
    sectionLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link || !entry.isIntersecting) return;
        sectionLinks.forEach(function (a) { a.classList.remove('active'); a.removeAttribute('aria-current'); });
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.querySelector('.copy-email');
  var copyStatus = document.querySelector('.copy-status');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      function done(msg) {
        if (copyStatus) copyStatus.textContent = msg;
        setTimeout(function () { if (copyStatus) copyStatus.textContent = ''; }, 3000);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(
          function () { done('✓ Copied ' + email); },
          function () { done(email); }
        );
      } else {
        done(email);
      }
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
