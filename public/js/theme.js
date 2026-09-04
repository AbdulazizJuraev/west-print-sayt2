'use strict';

const ThemeManager = (function () {
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function updateToggleIcon() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.innerHTML = Icons.get(getTheme() === 'dark' ? 'sun' : 'moon');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('wp_theme', theme); } catch (e) {}
    updateToggleIcon();
  }

  function toggle() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  function init() {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggle);
    updateToggleIcon();
  }

  return { getTheme, setTheme, toggle, init };
})();

document.addEventListener('DOMContentLoaded', ThemeManager.init);
