(function () {
  var PUBLIC_ERROR = 'Quote form is not available right now. Please call or text us directly at (716) 405-9988.';
  var LOCAL_FILE_API = 'http://localhost:4173/api/quote';

  function getQuoteEndpoint() {
    if (window.location.protocol === 'file:') return LOCAL_FILE_API;
    return '/api/quote';
  }

  function trackEvent(name, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, params || {});
  }

  function trackConversion(form) {
    if (form.dataset.converted === 'true') return;
    form.dataset.converted = 'true';

    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', {
      send_to: 'AW-16886615838/_JrrCP6Oq_sbEJ6elfQ-',
      event_category: 'Form',
      event_label: form.dataset.source || 'landing_quote_submit'
    });
  }

  function setStatus(form, type, message) {
    var status = form.querySelector('[data-quote-status]');
    if (!status) return;

    status.textContent = message;
    status.classList.remove('is-success', 'is-error', 'is-visible');
    status.classList.add(type === 'success' ? 'is-success' : 'is-error', 'is-visible');
  }

  function setLoading(form, isLoading) {
    var button = form.querySelector('[data-quote-submit]');
    if (!button) return;

    button.disabled = isLoading;
    button.textContent = isLoading ? 'Sending...' : 'Send Quote Request';
  }

  async function submitQuote(form) {
    var formData = new FormData(form);
    var payload = {
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      vehicleMakeModel: String(formData.get('vehicleMakeModel') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      service: form.dataset.service || '',
      landingPageSource: form.dataset.source || '',
      pageUrl: window.location.href
    };

    setLoading(form, true);
    setStatus(form, 'success', '');

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
      setStatus(form, 'success', "Thanks, we received your request. We'll reach out shortly.");
      trackConversion(form);
    } catch (error) {
      var message = error && error.message && error.message !== 'Failed to fetch' ? error.message : PUBLIC_ERROR;
      setStatus(form, 'error', message);
    } finally {
      setLoading(form, false);
    }
  }

  document.querySelectorAll('.native-quote-form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      submitQuote(form);
    });
  });

  document.querySelectorAll('a[href="#quote"]').forEach(function (el) {
    el.addEventListener('click', function () {
      trackEvent('landing_quote_cta_click', {
        event_category: 'CTA',
        event_label: el.getAttribute('data-label') || 'quote_scroll_click'
      });
    });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
    el.addEventListener('click', function () {
      trackEvent('landing_phone_click', {
        event_category: 'CTA',
        event_label: el.getAttribute('data-label') || 'phone_click'
      });
    });
  });
})();
