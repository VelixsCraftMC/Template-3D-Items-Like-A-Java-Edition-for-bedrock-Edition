// Main app logic (uses CONFIG from config.js)
// All DOM interactions and rendering live here.

let currentSection = 'creator';
let searchTerm = '';
let debounceTimer = null;

// debounce helper
function debounce(fn, delay = 250) {
  return function(...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// toast
const toastEl = () => document.getElementById('toast');
let toastTimer = null;
function showToast(msg, timeout = 2000) {
  const el = toastEl();
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), timeout);
}

function toggleMenu() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('overlay');
  const btn = document.querySelector('.btn-menu');
  const open = sb.classList.toggle('active');
  ov.classList.toggle('active');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

// text parser (bold, italic, link)
function parseText(str) {
  if (!str) return "";
  return str
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

// youtube id extractor
function getYTId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.searchParams && u.searchParams.get('v')) return u.searchParams.get('v');
    const parts = u.pathname.split('/');
    return parts[parts.length - 1] || url;
  } catch (e) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  }
}

// update download button when dropdown changed
function updateDl(select, btnId) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.href = select.value;
    btn.innerText = "Download " + select.options[select.selectedIndex].text;
  }
}

function highlight(text, term) {
  if (!term) return text;
  try {
    const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(esc, 'ig');
    return text.replace(re, (m) => `<mark>${m}</mark>`);
  } catch (e) {
    return text;
  }
}

function escapeHtml(s) {
  if (s === undefined || s === null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// render component
function renderComp(c) {
  switch (c.type) {
    case 'title': return `<div class="comp-title">${c.value}</div>`;
    case 'text': return `<p class="comp-text">${parseText(c.value)}</p>`;
    case 'label': return `<span class="comp-label">${c.value}</span>`;
    case 'divider': return `<div class="comp-divider"></div>`;
    case 'image': return `<img src="${c.src}" class="comp-img" loading="lazy" alt="">`;
    case 'code':
      return `<div class="comp-code-wrapper">
                <pre class="comp-code" tabindex="0">${escapeHtml(c.value)}</pre>
                <button class="btn-copy comp-code-btn" type="button" onclick="copyCodeBlock(this)">Salin Kode</button>
              </div>`;
    case 'list': return `<ul class="comp-list">${c.items.map(i => `<li>${parseText(i)}</li>`).join('')}</ul>`;
    case 'numbered': return `<ol class="comp-list">${c.items.map(i => `<li>${parseText(i)}</li>`).join('')}</ol>`;
    case 'youtube': return `<div class="yt-frame"><iframe src="https://www.youtube.com/embed/${getYTId(c.id)}" allowfullscreen loading="lazy"></iframe></div>`;
    case 'button': return `<a id="${c.id || ''}" href="${c.url}" class="btn-dl ${c.primary ? 'btn-primary' : 'btn-secondary'}" target="_blank" rel="noopener noreferrer">${c.label}</a>`;
    case 'dropdown':
      return `<div style="margin:12px 0"><label style="font-size:0.8rem; color:var(--text-dim); margin-bottom:8px; display:block;">${c.label}</label>
                <div style="display:flex; gap:8px; align-items:center;">
                  <select class="v-select" onchange="updateDl(this, '${c.targetId}')">${c.options.map(o => `<option value="${o.url}">${o.label}</option>`).join('')}</select>
                  <button class="btn-copy" type="button" onclick="copySelected(this.previousElementSibling)">Copy</button>
                </div></div>`;
    default: return '';
  }
}

function setActiveNav(id) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById('nav-' + id);
  if (el) el.classList.add('active');

  ['creator','template','guide','license'].forEach(k => {
    const mob = document.getElementById('mob-' + k);
    if (mob) mob.setAttribute('aria-current', k === id ? 'true' : 'false');
  });
}

function showTab(id) {
  currentSection = id;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  setActiveNav(id);

  if (id === 'creator' || id === 'license') {
    document.getElementById(id).classList.add('active');
  } else {
    document.getElementById('view-title').innerText = id === 'template' ? 'Templates' : 'Panduan';
    document.getElementById('search').value = '';
    searchTerm = '';
    renderList();
    document.getElementById('list-view').classList.add('active');
  }
  if (window.innerWidth < 1024 && document.getElementById('sidebar').classList.contains('active')) toggleMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderList() {
  const container = document.getElementById('list-container');
  const data = currentSection === 'template' ? CONFIG.templates : CONFIG.guides;
  const query = (searchTerm || '').toLowerCase();
  const type = document.getElementById('sort').value;

  const filtered = data.filter(i => (type === 'all' || i.type === type) && i.title.toLowerCase().includes(query));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state">Maaf, belum ada postingan di sini. Coba ubah filter atau kata kunci.</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const highlightedTitle = highlight(item.title, searchTerm);
    return `
      <div class="card" onclick="openDetail('${item.id}')" role="button" tabindex="0">
        <img src="${item.thumbnail}" class="thumb" onerror="this.src='https://via.placeholder.com/800x450/0f172a/ffffff?text=No+Image'" loading="lazy" alt="${item.title}">
        <div class="meta">
          <span class="comp-label">${item.type}</span>
          <div style="color:var(--text-dim); font-size:0.9rem;">Klik untuk detail</div>
        </div>
        <h2>${highlightedTitle}</h2>
      </div>
    `;
  }).join('');
}

function openDetail(id) {
  const data = [...CONFIG.templates, ...CONFIG.guides];
  const item = data.find(i => i.id == id);
  if (!item) {
    showToast('Item tidak ditemukan');
    return;
  }
  const container = document.getElementById('detail-content');

  container.innerHTML = `<h1 style="font-size:2rem; margin:0 0 12px 0;">${item.title}</h1>` + item.content.map(c => renderComp(c)).join('') +
    `<div style="margin-top:16px;">
       <button class="btn-copy" onclick="copyText('${encodeURI(window.location.href)}')">Copy Link</button>
     </div>`;

  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('detail-view').classList.add('active');
  if (window.innerWidth < 1024 && document.getElementById('sidebar').classList.contains('active')) toggleMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeDetail() { showTab(currentSection); }

function copySelected(selectEl) {
  if (!selectEl) return;
  const val = selectEl.value;
  copyText(val);
}

function copyText(text) {
  const decoded = decodeURIComponent(text);
  if (!navigator.clipboard) {
    const ta = document.createElement('textarea');
    ta.value = decoded;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast('Disalin ke clipboard'); } catch (e) { showToast('Gagal menyalin'); }
    ta.remove();
    return;
  }
  navigator.clipboard.writeText(decoded).then(() => showToast('Disalin ke clipboard'), () => showToast('Gagal menyalin'));
}

function copyCodeBlock(btn) {
  const wrapper = btn.closest('.comp-code-wrapper');
  if (!wrapper) return;
  const pre = wrapper.querySelector('.comp-code');
  const text = pre ? pre.innerText : '';
  if (!text) { showToast('Tidak ada kode untuk disalin'); return; }
  if (!navigator.clipboard) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast('Kode disalin'); } catch (e) { showToast('Gagal menyalin'); }
    ta.remove();
    return;
  }
  navigator.clipboard.writeText(text).then(() => showToast('Kode disalin'), () => showToast('Gagal menyalin'));
}

function copyVideoLink() {
  copyText(CONFIG.creator.video);
}
function toggleMiniVideo() {
  const frame = document.querySelector('#creator .yt-frame');
  const btn = document.getElementById('toggle-mini');
  if (!frame) return;
  const isMini = frame.classList.toggle('mini');
  btn.setAttribute('aria-pressed', isMini ? 'true' : 'false');
  showToast(isMini ? 'Mini player aktif' : 'Mini player non-aktif');
}

document.addEventListener('click', function(e) {
  const dl = e.target.closest('.btn-dl');
  if (dl) showToast('Menyiapkan download...');
});

// search debounce
function onSearchInput() {
  const val = document.getElementById('search').value.trim();
  searchTerm = val;
  debouncedRender();
}
const debouncedRender = debounce(() => renderList(), 220);

// theme
function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('ez_theme', next);
}
(function initTheme() {
  const saved = localStorage.getItem('ez_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

function mobileNavClick(sectionId) {
  showTab(sectionId);
  ['creator','template','guide','license'].forEach(k => {
    const mob = document.getElementById('mob-' + k);
    if (mob) mob.setAttribute('aria-current', k === sectionId ? 'true' : 'false');
  });
}

function init() {
  // populate creator UI
  document.getElementById('c-pfp').src = CONFIG.creator.pfp;
  document.getElementById('c-name').textContent = CONFIG.creator.name;
  document.getElementById('c-sub').href = CONFIG.creator.ytLink;
  document.getElementById('c-content').innerHTML = CONFIG.creator.content.map(c => renderComp(c)).join('');
  document.getElementById('c-video').innerHTML = renderComp({ type: 'youtube', id: CONFIG.creator.video });
  document.getElementById('license-content').innerHTML = CONFIG.license.map(c => renderComp(c)).join('');

  const open = document.getElementById('open-youtube');
  if (open) open.href = CONFIG.creator.video || CONFIG.creator.ytLink;

  // socials
  const sideDiscord = document.getElementById('side-discord');
  const sideWhatsapp = document.getElementById('side-whatsapp');
  const bannerDiscord = document.getElementById('banner-discord');
  const bannerWhatsapp = document.getElementById('banner-whatsapp');

  if (sideDiscord) sideDiscord.href = CONFIG.creator.discord || '#';
  if (sideWhatsapp) sideWhatsapp.href = CONFIG.creator.whatsapp || '#';
  if (bannerDiscord) bannerDiscord.href = CONFIG.creator.discord || '#';
  if (bannerWhatsapp) bannerWhatsapp.href = CONFIG.creator.whatsapp || '#';

  // banner text
  const bt = document.getElementById('banner-title');
  const bs = document.getElementById('banner-sub');
  if (bt) bt.innerText = CONFIG.creator.bannerTitle || CONFIG.creator.name;
  if (bs) bs.innerText = CONFIG.creator.bannerSub || '';

  // keyboard escape
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      const sb = document.getElementById('sidebar');
      if (sb.classList.contains('active')) toggleMenu();
      else if (document.getElementById('detail-view').classList.contains('active')) closeDetail();
    }
  });

  // nav keyboard accessible
  document.querySelectorAll('.nav-item').forEach(n => {
    n.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); n.click(); }
    });
  });

  showTab('creator');

  ['creator','template','guide','license'].forEach(k => {
    const mob = document.getElementById('mob-' + k);
    if (mob) mob.setAttribute('aria-current', k === 'creator' ? 'true' : 'false');
  });
}

window.addEventListener('load', init);