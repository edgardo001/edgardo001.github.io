import i18next from 'i18next';
import es from './es.json';
import en from './en.json';

const SUPPORTED_LANGS = ['es', 'en'];

function getInitialLang() {
  const stored = localStorage.getItem('lang');
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const browser = navigator.language?.split('-')[0];
  if (browser && SUPPORTED_LANGS.includes(browser)) return browser;
  return 'es';
}

i18next.init({
  lng: getInitialLang(),
  fallbackLng: 'es',
  resources: {
    es: { translation: es },
    en: { translation: en }
  }
});

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = i18next.t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      const attr = el.getAttribute('data-i18n-attr') || 'placeholder';
      el.setAttribute(attr, translation);
    } else {
      el.textContent = translation;
    }
  });
  document.documentElement.lang = i18next.language;
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng);
  localStorage.setItem('lang', lng);
  applyTranslations();
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: lng }));
}

document.addEventListener('DOMContentLoaded', applyTranslations);
window.__i18n = { changeLanguage, applyTranslations, currentLang: () => i18next.language };
