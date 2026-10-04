// Dr. Zeph — menu behaviour shared by every page.
(function () {
  var root = document.documentElement;
  var mobile = window.matchMedia('(max-width: 1023px)');
  var groups = Array.prototype.slice.call(document.querySelectorAll('.nav-group'));
  var menuBtn = document.querySelector('.menu-btn');

  function setOpen(group, open) {
    group.classList.toggle('open', open);
    group.querySelector('button').setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // Desktop shows one group at a time (the current page's); mobile shows them all.
  function resetGroups() {
    groups.forEach(function (g) {
      setOpen(g, mobile.matches || g.hasAttribute('data-current'));
    });
  }

  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  groups.forEach(function (g) {
    g.querySelector('button').addEventListener('click', function () {
      var willOpen = !g.classList.contains('open');
      if (!mobile.matches) groups.forEach(function (other) { setOpen(other, false); });
      setOpen(g, willOpen);
    });
  });

  menuBtn.addEventListener('click', function () {
    setMenu(!root.classList.contains('menu-open'));
  });

  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  mobile.addEventListener('change', function () {
    setMenu(false);
    resetGroups();
  });

  resetGroups();

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
