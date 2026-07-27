import i18next from 'i18next';
import es from './es.json';
import en from './en.json';

const SUPPORTED_LANGS = ['es', 'en'];

function getLang() {
  const s = localStorage.getItem('lang');
  if (s && SUPPORTED_LANGS.includes(s)) return s;
  const b = navigator.language?.split('-')[0];
  return b && SUPPORTED_LANGS.includes(b) ? b : 'es';
}

function apply() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    const t = i18next.t(k);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.setAttribute(el.getAttribute('data-i18n-attr') || 'placeholder', t);
    } else {
      el.textContent = t;
    }
  });
  document.documentElement.lang = i18next.language;
}

i18next.init({
  lng: getLang(),
  fallbackLng: 'es',
  resources: { es: { translation: es }, en: { translation: en } }
});

apply();

window.__i18n._ready = true;
window.__i18n.currentLang = () => i18next.language;
window.__i18n.changeLanguage = (lng) => {
  i18next.changeLanguage(lng);
  localStorage.setItem('lang', lng);
  apply();
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: lng }));
};
