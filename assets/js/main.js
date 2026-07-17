/* =========================================================================
   AL DAHAB EXCHANGE — MAIN.JS
   Site-wide interactions: header state, mobile nav, scroll reveal,
   animated counters, FAQ accordion, cookie banner, loader, floaters.
   ========================================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initLoader();
    initHeader();
    initMobileNav();
    initScrollProgress();
    initReveal();
    initCounters();
    initFaq();
    initCookieBanner();
    initBackToTop();
    initNewsletterForms();
    initContactForm();
    initYear();
  });

  /* ---------------------------------------------------------- Loader -- */
  function initLoader() {
    var loader = document.querySelector('.page-loader');
    if (!loader) return;
    window.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('hidden'); }, 280);
    });
    // Safety timeout in case load event is delayed
    setTimeout(function () { loader.classList.add('hidden'); }, 2200);
  }

  /* -------------------------------------------------- Sticky header --- */
  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add('is-solid');
      else header.classList.remove('is-solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------ Mobile nav -- */
  function initMobileNav() {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.mobile-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* -------------------------------------------------- Scroll progress - */
  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = scrolled + '%';
    }, { passive: true });
  }

  /* ------------------------------------------------- Scroll reveal --- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------- Animated counters -- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-counter'));
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1600;
      var start = null;
      var startVal = 0;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var val = Math.floor(startVal + (target - startVal) * eased);
        el.textContent = val + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) {
      counters.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------------------- FAQ accordion -- */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;
    items.forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        items.forEach(function (other) {
          other.classList.remove('open');
          var oa = other.querySelector('.faq-a');
          if (oa) oa.style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  }

  /* ------------------------------------------------- Cookie banner --- */
  function initCookieBanner() {
    var banner = document.querySelector('.cookie-banner');
    if (!banner) return;
    var KEY = 'aldahab_cookie_consent';
    if (!localStorageGet(KEY)) {
      setTimeout(function () { banner.classList.add('visible'); }, 900);
    }
    banner.querySelectorAll('[data-cookie-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        localStorageSet(KEY, btn.getAttribute('data-cookie-action'));
        banner.classList.remove('visible');
      });
    });
  }
  function localStorageGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function localStorageSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

  /* --------------------------------------------------- Back to top --- */
  function initBackToTop() {
    var btn = document.querySelector('.fab-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------------------------------- Newsletter ----- */
  function initNewsletterForms() {
    document.querySelectorAll('.footer-newsletter form, .newsletter-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var btn = form.querySelector('button');
        if (input && input.value) {
          var original = btn.innerHTML;
          btn.innerHTML = '&#10003;';
          input.value = '';
          setTimeout(function () { btn.innerHTML = original; }, 2200);
        }
      });
    });
  }

  /* ---------------------------------------------------- Contact form - */
  function initContactForm() {
    var form = document.querySelector('.js-contact-form');
    if (!form) return;
    var success = document.querySelector('.form-success');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      if (success) success.classList.add('visible');
    });
  }

  /* --------------------------------------------------------- Year ---- */
  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();
