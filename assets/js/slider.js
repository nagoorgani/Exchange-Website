/* =========================================================================
   AL DAHAB EXCHANGE — SLIDER.JS
   Lightweight horizontal-scroll carousel controller used by the
   testimonials strip (and any other .js-carousel track on the site).
   ========================================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  });

  function initCarousel(root) {
    var track = root.querySelector('.js-carousel-track');
    var prev = root.querySelector('[data-carousel-prev]');
    var next = root.querySelector('[data-carousel-next]');
    if (!track) return;

    function cardWidth() {
      var card = track.querySelector(':scope > *');
      if (!card) return 320;
      var style = window.getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap || 0);
      return card.getBoundingClientRect().width + gap;
    }

    if (prev) prev.addEventListener('click', function () {
      track.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
    });
    if (next) next.addEventListener('click', function () {
      track.scrollBy({ left: cardWidth(), behavior: 'smooth' });
    });
  }
})();
