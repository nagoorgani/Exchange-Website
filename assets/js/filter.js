/* =========================================================================
   AL DAHAB EXCHANGE — FILTER.JS
   Client-side search + category filtering for the Blog grid and the
   Branch locator list. Pure DOM filtering, no build step required.
   ========================================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initBlogFilter();
    initBranchFilter();
  });

  /* ------------------------------------------------------- Blog page - */
  function initBlogFilter() {
    var grid = document.querySelector('[data-blog-grid]');
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-category]'));
    var search = document.querySelector('[data-blog-search]');
    var tabs = document.querySelectorAll('[data-blog-tab]');
    var empty = document.querySelector('[data-blog-empty]');
    var activeCat = 'all';

    function apply() {
      var term = (search && search.value || '').trim().toLowerCase();
      var visible = 0;
      cards.forEach(function (card) {
        var cat = card.getAttribute('data-category');
        var title = (card.getAttribute('data-title') || '').toLowerCase();
        var matchesCat = activeCat === 'all' || cat === activeCat;
        var matchesTerm = !term || title.indexOf(term) !== -1;
        var show = matchesCat && matchesTerm;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (empty) empty.style.display = visible ? 'none' : 'block';
    }

    if (search) search.addEventListener('input', apply);
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        activeCat = tab.getAttribute('data-blog-tab');
        apply();
      });
    });
    apply();
  }

  /* ---------------------------------------------------- Branch page -- */
  function initBranchFilter() {
    var list = document.querySelector('[data-branch-list]');
    if (!list) return;
    var cards = Array.prototype.slice.call(list.querySelectorAll('[data-branch-city]'));
    var search = document.querySelector('[data-branch-search]');
    var citySelect = document.querySelector('[data-branch-city-filter]');
    var serviceSelect = document.querySelector('[data-branch-service-filter]');
    var countEl = document.querySelector('[data-branch-count]');

    function apply() {
      var term = (search && search.value || '').trim().toLowerCase();
      var city = citySelect && citySelect.value || 'all';
      var service = serviceSelect && serviceSelect.value || 'all';
      var visible = 0;
      cards.forEach(function (card) {
        var cardCity = card.getAttribute('data-branch-city');
        var services = (card.getAttribute('data-branch-services') || '').toLowerCase();
        var name = (card.getAttribute('data-branch-name') || '').toLowerCase();
        var matchesTerm = !term || name.indexOf(term) !== -1 || cardCity.toLowerCase().indexOf(term) !== -1;
        var matchesCity = city === 'all' || cardCity === city;
        var matchesService = service === 'all' || services.indexOf(service) !== -1;
        var show = matchesTerm && matchesCity && matchesService;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (countEl) countEl.textContent = visible;
    }

    if (search) search.addEventListener('input', apply);
    if (citySelect) citySelect.addEventListener('change', apply);
    if (serviceSelect) serviceSelect.addEventListener('change', apply);
    apply();
  }
})();
