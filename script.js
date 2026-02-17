// script.js — lebih tahan banting: early log, defensive coding, pointer support
(function () {
  'use strict';
  console.log('[script.js] loaded');

  // Safe selector helpers
  const $ = (sel, ctx = document) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));
  const raf = (fn) => window.requestAnimationFrame(fn);

  // Minimal guard to avoid exceptions stopping execution
  function safe(fn) { return (...a) => { try { return fn(...a); } catch (e) { console.error('[script] error in', fn.name || 'fn', e); } }; }

  // Simple state
  const state = { settings: {}, currentSection: 'creator', searchTerm: '' };

  // toast element assigned in init (safe)
  let toastEl = null;

  // Debounce with rAF fallback
  function debounceRAF(fn, wait = 160) {
    let t = null, last = 0;
    return function (...args) {
      const now = Date.now();
      const later = () => { t = null; last = Date.now(); fn.apply(this, args); };
      clearTimeout(t);
      const remaining = wait - (now - last);
      if (remaining <= 0) raf(later);
      else t = setTimeout(() => raf(later), remaining);
    };
  }

  function showToast(msg, timeout = 1800) {
    if (!toastEl) {
      console.warn('[script] toast not available');
      return;
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove('show'), timeout);
  }

  // copy helper
  const copyText = safe((text) => {
    if (!navigator.clipboard) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); showToast('Disalin ke clipboard'); } catch (e) { showToast('Gagal menyalin'); }
      ta.remove(); return;
    }
    navigator.clipboard.writeText(text).then(() => showToast('Disalin ke clipboard'), () => showToast('Gagal menyalin'));
  });

  // Basic parsing helpers (kept small)
  function parseText(s){ if(!s) return ''; return s.replace(/\*\*(.*?)\*\*/g,'<b>$1</b>').replace(/\*(.*?)\*/g,'<i>$1</i>').replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>').replace(/§a(.*?)§r/g,'<span style="color:#55FF55">$1</span>').replace(/§a(.+?)(?=<|$)/g,'<span style="color:#55FF55">$1</span>'); }

  // Delegated handler (responds to click + pointerdown for mobile)
  function onGlobalClick(ev) {
    try {
      const t = ev.target;
      // menu button
      const menuBtn = t.closest('.btn-menu');
      if (menuBtn) { toggleMenu(); return; }

      // nav item (div used as nav)
      const nav = t.closest('.nav-item');
      if (nav && nav.dataset && nav.dataset.target) { switchSection(nav.dataset.target); return; }

      // mobile nav
      const mob = t.closest('.mob-btn');
      if (mob && mob.dataset && mob.dataset.target) { switchSection(mob.dataset.target); return; }

      // cards open detail
      const card = t.closest('.card');
      if (card && card.dataset && card.dataset.id) { openDetail(card.dataset.id); return; }

      // open youtube (link) — allow default but show toast
      if (t.closest('#open-youtube')) { showToast('Menyiapkan...'); return; }

      // settings open/close
      if (t.closest('#btn-settings')) { openSettings(); return; }
      if (t.closest('#close-settings')) { closeSettings(); return; }

      // copy/download links (btn-dl)
      if (t.closest('.btn-dl')) { showToast('Menyiapkan download...'); return; }

    } catch (e) {
      console.error('[script] onGlobalClick error', e);
    }
  }

  // Toggle sidebar
  function toggleMenu() {
    const sb = document.querySelector('.sidebar');
    const ov = document.querySelector('.overlay');
    if (!sb || !ov) return;
    const open = sb.classList.toggle('active');
    ov.classList.toggle('active');
    const btn = document.querySelector('.btn-menu');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function switchSection(id) {
    try {
      state.currentSection = id;
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
      // if templates/guide, render list (if function exists)
      if ((id === 'template' || id === 'guide') && typeof renderList === 'function') {
        const search = document.querySelector('#search'); if (search) search.value = '';
        state.searchTerm = '';
        renderList();
        const lv = document.getElementById('list-view'); if (lv) lv.classList.add('active');
      }
      // update nav visuals
      document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.target === id));
      document.querySelectorAll('.mob-btn').forEach(b => b.setAttribute('aria-current', b.dataset.target === id ? 'true' : 'false'));
    } catch (e) { console.error(e); }
  }

  // Placeholder for renderList/openDetail if page doesn't implement them
  function renderList(){ /* no-op if not provided in page */ }
  function openDetail(id){ /* no-op if not provided in page */ }

  // Attach global listeners (click + pointerdown for mobile responsiveness)
  function attachGlobalListeners() {
    document.addEventListener('click', onGlobalClick, true);
    // pointerdown ensures responsiveness on mobile quickly
    document.addEventListener('pointerdown', (ev) => { /* passive handler for touch responsiveness */ }, {passive:true});
    // keyboard accessibility for nav items
    document.querySelectorAll('.nav-item').forEach(n => n.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); n.click(); }
    }));
    // Search input debounce wiring (if present)
    const s = document.getElementById('search');
    if (s) s.addEventListener('input', (function(){
      let t;
      return function(e){
        clearTimeout(t);
        t = setTimeout(()=>{ state.searchTerm = e.target.value.trim(); if (typeof renderList === 'function') renderList(); }, 160);
      };
    })());
    // overlay click closes menu / settings
    const ov = document.querySelector('.overlay');
    if (ov) ov.addEventListener('click', () => {
      const sb = document.querySelector('.sidebar'); if (sb && sb.classList.contains('active')) toggleMenu();
      const modal = document.getElementById('settings'); if (modal && modal.classList.contains('active')) closeSettings();
    });
  }

  // Settings dialog
  function openSettings() { const modal = document.getElementById('settings'); if (!modal) return; modal.classList.add('active'); modal.setAttribute('aria-hidden','false'); }
  function closeSettings() { const modal = document.getElementById('settings'); if (!modal) return; modal.classList.remove('active'); modal.setAttribute('aria-hidden','true'); }

  // INIT safe
  function init() {
    try {
      // assign toast
      toastEl = document.getElementById('toast');

      // wire global listeners
      attachGlobalListeners();

      // initial UI state
      // ensure sidebar state (desktop)
      if (window.innerWidth >= 1024) {
        const sb = document.querySelector('.sidebar'); if (sb) sb.classList.add('active');
      }

      console.log('[script.js] init complete');
    } catch (e) {
      console.error('[script] init error', e);
    }
  }

  // run when DOM ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();