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

  function initializeMobileChatClearance() {
    var bar = document.querySelector('.mobile-sticky-cta');
    if (!bar || !window.matchMedia || !window.ResizeObserver || !window.customElements) return;
    if (bar.hasAttribute('data-chat-clearance-ready')) return;
    bar.setAttribute('data-chat-clearance-ready', '');

    var mobile = window.matchMedia('(max-width: 768px)');
    var root = document.documentElement;
    var widget = null;
    var active = false;
    var pendingFrame = 0;
    var heightProperty = '--site-sticky-cta-height';
    var viewportProperty = '--site-chat-viewport-height';
    var widgetAttribute = 'data-site-sticky-clearance';

    function setProperty(name, value) {
      if (root.style.getPropertyValue(name) !== value) root.style.setProperty(name, value);
    }

    function updateClearance() {
      pendingFrame = 0;
      var style = window.getComputedStyle(bar);
      var height = bar.getBoundingClientRect().height;
      active = mobile.matches && height > 0 && style.display !== 'none' &&
        style.visibility !== 'hidden' && style.opacity !== '0';

      document.body.classList.toggle('has-mobile-sticky-actions', active);
      if (active) {
        setProperty(heightProperty, height + 'px');
        var viewportHeight = window.visualViewport ?
          Math.min(window.innerHeight, window.visualViewport.height) : window.innerHeight;
        setProperty(viewportProperty, viewportHeight + 'px');
      } else {
        if (root.style.getPropertyValue(heightProperty)) root.style.removeProperty(heightProperty);
        if (root.style.getPropertyValue(viewportProperty)) root.style.removeProperty(viewportProperty);
      }

      if (widget && widget.hasAttribute(widgetAttribute) !== active) {
        widget.toggleAttribute(widgetAttribute, active);
      }
    }

    function scheduleUpdate() {
      if (!pendingFrame) pendingFrame = window.requestAnimationFrame(updateClearance);
    }

    new ResizeObserver(scheduleUpdate).observe(bar, { box: 'border-box' });
    window.addEventListener('resize', scheduleUpdate);
    if (mobile.addEventListener) mobile.addEventListener('change', scheduleUpdate);
    else mobile.addListener(scheduleUpdate);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', scheduleUpdate);
    updateClearance();

    function connectWidget(host) {
      var ready = typeof host.componentOnReady === 'function' ? host.componentOnReady() : host;
      Promise.resolve(ready).then(function () {
        var shadow = host.shadowRoot;
        if (!shadow) return;

        // The vendor positions these elements inside an open shadow root. Page CSS
        // cannot reach them; keep one scoped rule without changing vendor inline styles.
        if (!shadow.getElementById('site-sticky-chat-clearance')) {
          var style = document.createElement('style');
          style.id = 'site-sticky-chat-clearance';
          style.textContent = [
            '@media (max-width: 768px) {',
            ':host([data-site-sticky-clearance]) #lc_text-widget,',
            ':host([data-site-sticky-clearance]) #lc_text-widget--btn {',
            '  bottom: calc(var(--site-sticky-cta-height, 0px) + 16px) !important;',
            '}',
            ':host([data-site-sticky-clearance]) #lc_text-widget--btn {',
            '  transition-property: opacity, transform, background-color, color, box-shadow, border-color !important;',
            '}',
            ':host([data-site-sticky-clearance]) #lc_text-widget {',
            '  top: auto !important;',
            '  min-width: 0 !important;',
            '  max-width: calc(100vw - 40px) !important;',
            '  padding-bottom: 70px !important;',
            '  --site-chat-panel-height: max(0px, calc(var(--site-chat-viewport-height, 100vh) - var(--site-sticky-cta-height, 0px) - 16px - 70px - 16px - env(safe-area-inset-top, 0px)));',
            '  --chat-widget-max-height: var(--site-chat-panel-height);',
            '  --chat-widget-branding-max-height: var(--site-chat-panel-height);',
            '}',
            ':host([data-site-sticky-clearance]) #lc_text-widget .lc_text-widget--box {',
            '  max-width: calc(100vw - 40px) !important;',
            '  max-height: var(--site-chat-panel-height) !important;',
            '}',
            '}'
          ].join('\n');
          shadow.appendChild(style);
        }
        widget = host;
        updateClearance();
      }).catch(function () {
        // A failed third-party widget must not interrupt the site's own controls.
      });
    }

    window.customElements.whenDefined('chat-widget').then(function () {
      var host = document.querySelector('chat-widget');
      if (host) {
        connectWidget(host);
        return;
      }

      // Registration can precede insertion. Watch only during this bounded race,
      // then disconnect permanently; resizing never watches or rewrites the DOM.
      var discovery = new MutationObserver(function () {
        var found = document.querySelector('chat-widget');
        if (!found) return;
        discovery.disconnect();
        window.clearTimeout(discoveryTimeout);
        connectWidget(found);
      });
      var discoveryTimeout = window.setTimeout(function () { discovery.disconnect(); }, 15000);
      discovery.observe(document.body, { childList: true, subtree: true });
    });
  }

  function initializeNavigation() {
    normalizeHeaderLogo();
    initializeMobileChatClearance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
  } else {
    initializeNavigation();
  }
})();
