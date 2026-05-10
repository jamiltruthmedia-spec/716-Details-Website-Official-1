(function () {
  var PUBLIC_ERROR = 'Quote form is not available right now. Please call or text us directly at (716) 405-9988.';
  var LOCAL_FILE_API = 'http://localhost:4173/api/quote';
  var currentService = '';
  var modal;
  var form;
  var previousFocus;

  var SERVICE_BY_PATH = {
    '/': 'Website Quote',
    '/index.html': 'Website Quote',
    '/ceramic-coating.html': 'Ceramic Coating',
    '/window-tinting.html': 'Window Tinting',
    '/interior-detailing.html': 'Interior Detailing',
    '/exterior-detailing.html': 'Exterior Detailing',
    '/full-detail.html': 'Full Detail',
    '/paint-correction.html': 'Paint Correction',
    '/mobile-car-detailing.html': 'Mobile Detailing',
    '/mobile-luxury-services.html': 'Mobile Luxury Services',
    '/boat-detailing.html': 'Boat Detailing',
    '/rv-detailing.html': 'RV Detailing',
    '/fleet-detailing.html': 'Fleet Detailing',
    '/dealership-detailing.html': 'Dealership Detailing'
  };

  function getQuoteEndpoint() {
    if (window.location.protocol === 'file:') return LOCAL_FILE_API;
    return '/api/quote';
  }

  function getPathKey() {
    var path = window.location.pathname || '/';
    if (path === '/') return '/';

    var locationMatch = path.match(/\/locations\/[^/]+\.html$/);
    if (locationMatch) return locationMatch[0];

    var pageMatch = path.match(/\/[^/]+\.html$/);
    if (pageMatch) return pageMatch[0];

    return path;
  }

  function getDefaultService() {
    var path = getPathKey();
    if (path.indexOf('/locations/') === 0) return 'Car Detailing';
    return SERVICE_BY_PATH[path] || 'Website Quote';
  }

  function getPageSource() {
    var path = getPathKey();
    if (path === '/' || path === '/index.html') return 'homepage-popup';
    return path.replace(/^\/+/, '').replace(/\.html$/, '').replace(/\//g, '-') + '-popup';
  }

  function trackEvent(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  }

  function trackConversion() {
    if (!form || form.dataset.converted === 'true') return;
    if (typeof window.gtag !== 'function') return;

    form.dataset.converted = 'true';
    window.gtag('event', 'conversion', {
      send_to: 'AW-16886615838/_JrrCP6Oq_sbEJ6elfQ-',
      event_category: 'Form',
      event_label: getPageSource()
    });
  }

  function setStatus(type, message) {
    var status = form.querySelector('[data-site-quote-status]');
    if (!status) return;

    status.textContent = message;
    status.classList.remove('is-success', 'is-error', 'is-visible');
    if (message) {
      status.classList.add(type === 'success' ? 'is-success' : 'is-error', 'is-visible');
    }
  }

  function setLoading(isLoading) {
    var button = form.querySelector('[data-site-quote-submit]');
    if (!button) return;

    button.disabled = isLoading;
    button.textContent = isLoading ? 'Sending...' : 'Send Quote Request';
  }

  async function submitQuote(event) {
    event.preventDefault();

    var formData = new FormData(form);
    var payload = {
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      vehicleMakeModel: String(formData.get('vehicleMakeModel') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      service: currentService || getDefaultService(),
      landingPageSource: getPageSource(),
      pageUrl: window.location.href,
      source: 'Website Quote Popup'
    };

    setLoading(true);
    setStatus('success', '');

    try {
      var response = await fetch(getQuoteEndpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      var result = await response.json().catch(function () { return {}; });

      if (!response.ok || !result.ok) {
        throw new Error(result.message || PUBLIC_ERROR);
      }

      form.reset();
      setStatus('success', "Thanks, we received your request. We'll reach out shortly.");
      trackConversion();
    } catch (error) {
      var message = error && error.message && error.message !== 'Failed to fetch' ? error.message : PUBLIC_ERROR;
      setStatus('error', message);
    } finally {
      setLoading(false);
    }
  }

  function closeQuotePopup() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('site-quote-modal-open');
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
  }

  function openQuotePopup(serviceOverride) {
    buildModal();
    previousFocus = document.activeElement;
    currentService = typeof serviceOverride === 'string' && serviceOverride.trim() ? serviceOverride.trim() : getDefaultService();
    form.dataset.converted = 'false';
    setStatus('success', '');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('site-quote-modal-open');

    var firstField = form.querySelector('input');
    if (firstField) firstField.focus();

    trackEvent('site_quote_popup_open', {
      event_category: 'CTA',
      event_label: currentService
    });
  }

  function buildModal() {
    if (modal) return;

    modal = document.createElement('div');
    modal.className = 'site-quote-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'site-quote-title');
    modal.innerHTML = [
      '<div class="site-quote-modal__dialog" data-site-quote-dialog>',
      '  <button type="button" class="site-quote-modal__close" data-site-quote-close aria-label="Close quote form">&times;</button>',
      '  <span class="site-quote-modal__kicker">Free Estimate</span>',
      '  <h2 class="site-quote-modal__title" id="site-quote-title">Get Your Free Quote</h2>',
      '  <p class="site-quote-modal__intro">Takes about 30 seconds. We respond same day during business hours.</p>',
      '  <form class="site-quote-form" novalidate>',
      '    <div class="site-quote-field">',
      '      <label for="site-quote-name">Name</label>',
      '      <input id="site-quote-name" name="name" type="text" autocomplete="name" placeholder="Your name" required>',
      '    </div>',
      '    <div class="site-quote-field">',
      '      <label for="site-quote-phone">Phone</label>',
      '      <input id="site-quote-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="(716) 555-1234" required>',
      '    </div>',
      '    <div class="site-quote-field">',
      '      <label for="site-quote-vehicle">Vehicle Make / Model</label>',
      '      <input id="site-quote-vehicle" name="vehicleMakeModel" type="text" autocomplete="off" placeholder="2021 Toyota Camry" required>',
      '    </div>',
      '    <div class="site-quote-field">',
      '      <label for="site-quote-message">Message (Optional)</label>',
      '      <textarea id="site-quote-message" name="message" placeholder="Tell us what you need"></textarea>',
      '    </div>',
      '    <button type="submit" class="site-quote-submit" data-site-quote-submit>Send Quote Request</button>',
      '    <p class="site-quote-consent">By submitting, you agree 716 Details may call or text you about your quote request, including automated follow-up.</p>',
      '    <div class="site-quote-status" data-site-quote-status role="status" aria-live="polite"></div>',
      '    <p class="site-quote-microcopy">No spam. Free estimate. We call back quickly during business hours.</p>',
      '  </form>',
      '</div>'
    ].join('');

    document.body.appendChild(modal);
    form = modal.querySelector('form');
    form.addEventListener('submit', submitQuote);

    modal.querySelector('[data-site-quote-close]').addEventListener('click', closeQuotePopup);
    modal.addEventListener('click', function (event) {
      if (event.target === modal) closeQuotePopup();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeQuotePopup();
    }
  });

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-quote-popup]');
    if (!trigger) return;

    event.preventDefault();
    openQuotePopup(trigger.getAttribute('data-quote-service'));
  });

  window.openQuotePopup = openQuotePopup;
  window.closeQuotePopup = closeQuotePopup;
})();
