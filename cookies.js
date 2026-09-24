(function () {
  var KEY = 'kg-cookie-consent';
  var overlay = document.getElementById('cookieOverlay');
  var analytics = document.getElementById('cookieAnalytics');
  if (!overlay) return;

  function writeCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }

  function applyConsent(value) {
    localStorage.setItem(KEY, value);
    writeCookie('kg_consent', value, 180);
    writeCookie('kg_necessary', '1', 180);
    if (value === 'all') {
      writeCookie('kg_analytics', '1', 180);
    } else {
      writeCookie('kg_analytics', '0', 1);
    }
    document.documentElement.setAttribute('data-cookies', value);
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openSettings() {
    var current = localStorage.getItem(KEY);
    if (analytics) analytics.checked = current === 'all';
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  if (!localStorage.getItem(KEY)) {
    openSettings();
  } else {
    document.documentElement.setAttribute('data-cookies', localStorage.getItem(KEY));
  }

  var accept = document.getElementById('cookieAccept');
  var reject = document.getElementById('cookieReject');
  var save = document.getElementById('cookieSave');
  var settingsBtn = document.getElementById('cookieSettingsBtn');

  if (accept) accept.addEventListener('click', function () { applyConsent('all'); });
  if (reject) reject.addEventListener('click', function () { applyConsent('necessary'); });
  if (save) save.addEventListener('click', function () {
    applyConsent(analytics && analytics.checked ? 'all' : 'necessary');
  });
  if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
})();
