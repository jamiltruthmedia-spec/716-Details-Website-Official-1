(function () {
  var LOGO_FILE = '716-details-logo-new.png';

  function getBasePath() {
    var path = window.location.pathname || '/';
    return path.indexOf('/locations/') === 0 ? '../' : '';
  }

  function normalizeHeaderLogo() {
    var logoWrap = document.querySelector('.navbar .nav-logo');
    if (!logoWrap) return;

    var basePath = getBasePath();
    var homeHref = basePath + 'index.html';
    var logoSrc = basePath + 'images/logo/' + LOGO_FILE;

    logoWrap.innerHTML = '';

    var link = document.createElement('a');
    link.href = homeHref;
    link.className = 'nav-logo-link';
    link.setAttribute('aria-label', '716 Details home');

    var img = document.createElement('img');
    img.src = logoSrc;
    img.alt = '716 Details';
    img.className = 'nav-logo-img';
    img.width = 520;
    img.height = 338;

    link.appendChild(img);
    logoWrap.appendChild(link);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', normalizeHeaderLogo);
  } else {
    normalizeHeaderLogo();
  }
})();
