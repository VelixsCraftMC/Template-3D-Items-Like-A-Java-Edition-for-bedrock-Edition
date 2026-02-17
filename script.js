// External JS - optimized and modular-ish
// Assumes script.js is loaded with `defer`

/* ===========================
   CONFIG (data)
   =========================== */
const CONFIG = {
  creator: {
    name: "@Velixsaxy",
    pfp: "pp.png",
    ytLink: "https://youtube.com/@velixsaxy",
    video: "https://youtu.be/fO6L_b-bCcg?si=5zVuTIEgVztrIft",
    discord: "https://discord.gg/example",
    whatsapp: "https://wa.me/628123456789",
    bannerTitle: "VelixsCraftMCYT",
    bannerSub: "Creator",
    content: [
      { type: "label", value: "✓ Verified Developer Addons" },
      { type: "title", value: "Description Creator:" },
      { type: "divider" },
      { type: "text", value: "Saya adalah creator kecil **Minecraft Add-ons** yang fokus pada Asset Template untuk addons anda, bisa disini link [youtube](https://youtube.com/@velixsaxy?si=pq-tbjIIsKtsXb3E)" },
      { type: "divider" },
      { type: "text", value: "Addons Template Akan selalu² ada diaini, jadi tolong Pakailah dengan Bijak misal ke addons anda, buat server anda itu boleh asalkan ada Kreditnya ya :3" },
      { type: "list", items: ["[ ] Mibrowser (W.I.P)", "[x] Magicosmetic (W.I.P)", "3D Cosmetics item (W.I.P)"] },
      { type: "divider" },

      // Cardboard sample content (keberadaan cardboard di content creator tetap dipertahankan)
      { type: "cardboard", title: "Cardboard Example", value: "Template model cardboard untuk props dan dekorasi, cocok untuk map dan roleplay.", src: "https://via.placeholder.com/320x180?text=Cardboard" },

      { type: "divider" },

      // Minecraft colored text example using §a (light green)
      { type: "text", value: "Contoh teks berwarna: §aIni teks hijau menggunakan kode §a§r dan kembali ke teks normal." },

      { type: "divider" },
      { type: "text", value: "Template² yang sudah Saya buatkan" },
      { type: "label", value: "Items 3D Like A Java" },
      { type: "label", value: "Items Anvil Rename Like A Java" },
      { type: "divider" }
    ]
  },

  templates: [
    {
      id: 1,
      title: "Realistic Shader V4",
      type: "addons",
      thumbnail: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800",
      content: [
        { type: "image", src: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=800" },
        { type: "title", value: "Deskripsi Shader" },
        { type: "text", value: "Shader ini memberikan efek **bayangan nyata** dan air jernih." },
        { type: "label", value: "High Performance" },
        { type: "label", value: "Lush Water" },
        { type: "divider" },
        { type: "title", value: "Fitur Utama" },
        { type: "list", items: ["Refleksi Air", "Awan Dinamis", "Lampu Malam Berwarna"] },
        { type: "title", value: "Instalasi" },
        { type: "numbered", items: ["Download File", "Klik file .mcpack", "Pasang di Minecraft"] },
        { type: "code", value: "/set_shader realistic_v4 --enable" },
        { type: "divider" },
        {
          type: "dropdown",
          label: "Pilih Versi Shader",
          targetId: "btn-download-1",
          options: [
            { label: "Shader v4.0.0 (Stable)", url: "file_v4_stable.zip" },
            { label: "Shader v4.1.0 (Beta)", url: "file_v4_beta.zip" }
          ]
        },
        { type: "button", id: "btn-download-1", label: "Download File", url: "file_v4_stable.zip", primary: true }
      ]
    },
    {
      id: 2,
      title: "Cardboard Prop Pack",
      type: "addons",
      thumbnail: "https://via.placeholder.com/800x450/3b4252/ffffff?text=Cardboard+Pack",
      content: [
        { type: "title", value: "Cardboard Set" },
        { type: "text", value: "Set model cardboard untuk props dan dekorasi." },
        { type: "code", value: '{ "type": "cardboard", "id": "card_01" }' }
      ]
    }
  ],

  guides: [
    {
      id: 101,
      title: "Cara Pasang Addons",
      type: "utility",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800",
      content: [
        { type: "title", value: "Panduan Cepat" },
        { type: "text", value: "Ikuti langkah berikut untuk memasang asset." },
        { type: "code", value: "1. Buka File Manager\n2. Cari folder Minecraft\n3. Paste asset di Resource Packs" }
      ]
    }
  ],

  license: [
    { type: "title", value: "Hak Cipta" },
    { type: "text", value: "Seluruh asset adalah milik **@velixsaxy**." },
    { type: "list", items: ["Boleh untuk konten YT", "Dilarang jual ulang", "Wajib kredit"] }
  ]
};

/* ===========================
   STATE & PERFORMANCE HELPERS
   =========================== */
const state = {
  currentSection: "creator",
  searchTerm: "",
  settings: {
    theme: localStorage.getItem("ez_theme") || "dark",
    ios: localStorage.getItem("ez_ios") === "true",
    compact: localStorage.getItem("ez_compact") === "true",
    reduced: localStorage.getItem("ez_reduced") === "true"
  }
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const raf = (fn) => window.requestAnimationFrame(fn);

/* Debounce that uses rAF for visual updates when possible */
function debounceRAF(fn, wait = 180) {
  let t = null, lastCall = 0;
  return function (...args) {
    const now = Date.now();
    const later = () => {
      t = null;
      lastCall = Date.now();
      fn.apply(this, args);
    };
    clearTimeout(t);
    const remaining = wait - (now - lastCall);
    if (remaining <= 0) {
      raf(later);
    } else {
      t = setTimeout(() => raf(later), remaining);
    }
  };
}

/* Toast */
const toastEl = $("#toast");
let toastTimer = null;
function showToast(msg, timeout = 2000) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), timeout);
}

/* ===========================
   Text parsing (bold, italic, links, mc colors, markdown checkboxes)
   =========================== */
function applyMCColors(html) {
  try {
    // handle §a ... §r and fallback §a to end
    html = html.replace(/§a(.*?)§r/g, '<span style="color:#55FF55">$1</span>');
    html = html.replace(/§a(.+?)(?=<|$)/g, '<span style="color:#55FF55">$1</span>');
  } catch (e) {}
  return html;
}

function parseText(str) {
  if (!str) return "";
  let out = str
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\*(.*?)\*/g, "<i>$1</i>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  out = applyMCColors(out);
  return out;
}

/* Parse markdown-style checkbox in a single line.
   Returns {checked:boolean,label:string,raw:string} or null */
function parseMDCheckbox(line) {
  const m = line.match(/^\s*\[([ xX])\]\s*(.*)/);
  if (!m) return null;
  return { checked: m[1].toLowerCase() === "x", label: m[2], raw: line };
}

/* Persist checkbox states per unique key */
function setCheckboxState(key, value) {
  try { localStorage.setItem(`cb:${key}`, value ? "1" : "0"); } catch (e) {}
}
function getCheckboxState(key, fallback = false) {
  try {
    const v = localStorage.getItem(`cb:${key}`);
    if (v === null) return fallback;
    return v === "1";
  } catch (e) { return fallback; }
}

/* ===========================
   RENDERING (optimized with DocumentFragment)
   =========================== */
function renderCompTo(parent, c, opts = {}) {
  // parent: Element; c: component object
  // For performance and safety we build elements instead of trusting huge innerHTML for interactive parts.
  switch (c.type) {
    case "title": {
      const el = document.createElement("div");
      el.className = "comp-title";
      el.innerHTML = parseText(c.value || "");
      parent.appendChild(el);
      break;
    }
    case "text": {
      const p = document.createElement("p");
      p.className = "comp-text";
      p.innerHTML = parseText(c.value || "");
      parent.appendChild(p);
      break;
    }
    case "label": {
      const span = document.createElement("span");
      span.className = "comp-label";
      span.textContent = c.value || "";
      parent.appendChild(span);
      break;
    }
    case "divider": {
      const d = document.createElement("div");
      d.className = "comp-divider";
      parent.appendChild(d);
      break;
    }
    case "image": {
      const img = document.createElement("img");
      img.className = "comp-img";
      img.loading = "lazy";
      img.src = c.src;
      img.alt = c.alt || "";
      img.onerror = () => (img.src = "https://via.placeholder.com/800x450/0f172a/ffffff?text=No+Image");
      parent.appendChild(img);
      break;
    }
    case "code": {
      const wrap = document.createElement("div");
      wrap.className = "comp-code-wrapper";
      const pre = document.createElement("pre");
      pre.className = "comp-code";
      pre.tabIndex = 0;
      pre.textContent = c.value || "";
      const btn = document.createElement("button");
      btn.className = "btn-copy comp-code-btn";
      btn.type = "button";
      btn.textContent = "Salin Kode";
      btn.addEventListener("click", () => {
        copyText(pre.textContent);
        showToast("Kode disalin");
      });
      wrap.appendChild(pre);
      wrap.appendChild(btn);
      parent.appendChild(wrap);
      break;
    }
    case "list": {
      // If list items contain markdown checkboxes, render them as interactive checkboxes
      const ul = document.createElement("ul");
      ul.className = "comp-list";
      c.items.forEach((it, idx) => {
        const li = document.createElement("li");
        const md = parseMDCheckbox(it);
        if (md) {
          const key = `creator-list-${opts.context || "global"}-${idx}-${md.label}`;
          const cbWrapper = document.createElement("label");
          cbWrapper.className = "md-checkbox";
          const input = document.createElement("input");
          input.type = "checkbox";
          input.checked = getCheckboxState(key, md.checked);
          input.addEventListener("change", () => setCheckboxState(key, input.checked));
          const span = document.createElement("span");
          span.innerHTML = parseText(md.label);
          cbWrapper.appendChild(input);
          cbWrapper.appendChild(span);
          li.appendChild(cbWrapper);
        } else {
          li.innerHTML = parseText(it);
        }
        ul.appendChild(li);
      });
      parent.appendChild(ul);
      break;
    }
    case "numbered": {
      const ol = document.createElement("ol");
      ol.className = "comp-list";
      c.items.forEach((it) => {
        const li = document.createElement("li");
        li.innerHTML = parseText(it);
        ol.appendChild(li);
      });
      parent.appendChild(ol);
      break;
    }
    case "youtube": {
      const frame = document.createElement("div");
      frame.className = "yt-frame";
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${getYTId(c.id)}`;
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      frame.appendChild(iframe);
      parent.appendChild(frame);
      break;
    }
    case "button": {
      const a = document.createElement("a");
      a.id = c.id || "";
      a.href = c.url || "#";
      a.className = `btn-dl ${c.primary ? "btn-primary" : "btn-secondary"}`;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = c.label || "Link";
      parent.appendChild(a);
      break;
    }
    case "dropdown": {
      const wrapper = document.createElement("div");
      wrapper.style.margin = "12px 0";
      const label = document.createElement("label");
      label.style.cssText = "font-size:0.8rem;color:var(--text-dim);margin-bottom:8px;display:block";
      label.textContent = c.label;
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.gap = "8px";
      row.style.alignItems = "center";
      const sel = document.createElement("select");
      sel.className = "v-select";
      c.options.forEach((o) => {
        const op = document.createElement("option");
        op.value = o.url;
        op.textContent = o.label;
        sel.appendChild(op);
      });
      const copyBtn = document.createElement("button");
      copyBtn.className = "btn-copy";
      copyBtn.type = "button";
      copyBtn.textContent = "Copy";
      copyBtn.addEventListener("click", () => {
        copyText(sel.value);
      });
      row.appendChild(sel);
      row.appendChild(copyBtn);
      wrapper.appendChild(label);
      wrapper.appendChild(row);
      parent.appendChild(wrapper);
      break;
    }
    case "cardboard": {
      const box = document.createElement("div");
      box.className = "comp-cardboard";
      const tb = document.createElement("div");
      tb.className = "cb-thumb";
      tb.style.backgroundImage = `url('${c.src || "https://via.placeholder.com/320x180?text=Cardboard"}')`;
      const meta = document.createElement("div");
      const t = document.createElement("div");
      t.className = "cb-title";
      t.textContent = c.title || "";
      const d = document.createElement("div");
      d.className = "cb-desc";
      d.innerHTML = parseText(c.value || "");
      meta.appendChild(t);
      meta.appendChild(d);
      box.appendChild(tb);
      box.appendChild(meta);
      parent.appendChild(box);
      break;
    }
    default:
      // unknown -> ignore
      break;
  }
}

/* Helper to get YouTube ID */
function getYTId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.searchParams && u.searchParams.get("v")) return u.searchParams.get("v");
    const paths = u.pathname.split("/");
    return paths[paths.length - 1] || url;
  } catch (e) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
  }
}

/* Render creator content */
function renderCreator() {
  const contentRoot = $("#c-content");
  if (!contentRoot) return;
  contentRoot.innerHTML = ""; // clear
  const frag = document.createDocumentFragment();
  CONFIG.creator.content.forEach((c, idx) => {
    renderCompTo(frag, c, { context: `creator-${idx}` });
  });
  contentRoot.appendChild(frag);
}

/* Render details for an item */
function openDetail(id) {
  const data = [...CONFIG.templates, ...CONFIG.guides];
  const item = data.find((i) => i.id == id);
  if (!item) {
    showToast("Item tidak ditemukan");
    return;
  }
  const container = $("#detail-content");
  container.innerHTML = "";
  const title = document.createElement("h1");
  title.style.fontSize = "2rem";
  title.style.margin = "0 0 12px 0";
  title.textContent = item.title;
  container.appendChild(title);

  const frag = document.createDocumentFragment();
  item.content.forEach((c, idx) => renderCompTo(frag, c, { context: `detail-${item.id}-${idx}` }));
  container.appendChild(frag);

  const footer = document.createElement("div");
  footer.style.marginTop = "16px";
  const btn = document.createElement("button");
  btn.className = "btn-copy";
  btn.textContent = "Copy Link Halaman";
  btn.addEventListener("click", () => {
    copyText(window.location.href);
    showToast("Link halaman disalin");
  });
  footer.appendChild(btn);
  container.appendChild(footer);

  // switch sections
  switchSection("detail-view");
}

/* Render list (templates or guides) with DOM building for performance */
function renderList() {
  const container = $("#list-container");
  if (!container) return;
  container.innerHTML = "";
  const data = state.currentSection === "template" ? CONFIG.templates : CONFIG.guides;
  const query = (state.searchTerm || "").toLowerCase();
  const type = $("#sort").value;
  const filtered = data.filter((i) => (type === "all" || i.type === type) && i.title.toLowerCase().includes(query));
  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state">Maaf, belum ada postingan di sini. Coba ubah filter atau kata kunci.</div>`;
    return;
  }
  const frag = document.createDocumentFragment();
  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "listitem");
    card.dataset.id = item.id;

    const img = document.createElement("img");
    img.className = "thumb";
    img.loading = "lazy";
    img.src = item.thumbnail;
    img.alt = item.title;
    img.onerror = () => (img.src = "https://via.placeholder.com/800x450/0f172a/ffffff?text=No+Image");

    const meta = document.createElement("div");
    meta.className = "meta";
    const lbl = document.createElement("span");
    lbl.className = "comp-label";
    lbl.textContent = item.type;
    const sub = document.createElement("div");
    sub.style.color = "var(--text-dim)";
    sub.style.fontSize = "0.9rem";
    sub.textContent = "Klik untuk detail";
    meta.appendChild(lbl);
    meta.appendChild(sub);

    const h2 = document.createElement("h2");
    h2.innerHTML = highlight(item.title, state.searchTerm);

    card.appendChild(img);
    card.appendChild(meta);
    card.appendChild(h2);

    frag.appendChild(card);
  });
  container.appendChild(frag);
}

/* Highlight helper (used only for titles) */
function highlight(text, term) {
  if (!term) return text;
  try {
    const esc = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(esc, "ig");
    return text.replace(re, (m) => `<mark>${m}</mark>`);
  } catch (e) {
    return text;
  }
}

/* Section switching */
function setActiveNavItem(target) {
  $$(".nav-item").forEach((n) => n.classList.toggle("active", n.dataset.target === target));
  $$(".mob-btn").forEach((b) => b.setAttribute("aria-current", b.dataset.target === target ? "true" : "false"));
}

function switchSection(id) {
  state.currentSection = id === "creator" || id === "license" ? id : id; // keep state
  document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
  if (id === "creator" || id === "license") {
    $("#" + id).classList.add("active");
  } else if (id === "template" || id === "guide") {
    $("#view-title").textContent = id === "template" ? "Templates" : "Panduan";
    $("#search").value = "";
    state.searchTerm = "";
    renderList();
    $("#list-view").classList.add("active");
  } else {
    $("#" + id).classList.add("active");
  }
  setActiveNavItem(id);
  // close sidebar on mobile
  if (window.innerWidth < 1024 && $(".sidebar").classList.contains("active")) toggleMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ===========================
   Utilities: copyText, toggleMenu, etc.
   =========================== */
function copyText(text) {
  if (!navigator.clipboard) {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Disalin ke clipboard");
    } catch (e) {
      showToast("Gagal menyalin");
    }
    ta.remove();
    return;
  }
  navigator.clipboard.writeText(text).then(() => showToast("Disalin ke clipboard"), () => showToast("Gagal menyalin"));
}

function toggleMenu() {
  const sb = $(".sidebar");
  const ov = $(".overlay");
  const btn = $(".btn-menu");
  const open = sb.classList.toggle("active");
  ov.classList.toggle("active");
  if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
}

/* ===========================
   Settings (persist)
   =========================== */
function applySettings() {
  document.documentElement.setAttribute("data-theme", state.settings.theme || "dark");
  if (state.settings.ios) document.body.classList.add("ios");
  else document.body.classList.remove("ios");
  if (state.settings.compact) document.body.classList.add("compact");
  else document.body.classList.remove("compact");
  if (state.settings.reduced) document.body.classList.add("reduced");
  else document.body.classList.remove("reduced");

  // update UI controls
  $("#setting-ios").checked = !!state.settings.ios;
  $("#setting-compact").checked = !!state.settings.compact;
  $("#setting-reduced").checked = !!state.settings.reduced;
}

function saveSettings() {
  localStorage.setItem("ez_theme", state.settings.theme);
  localStorage.setItem("ez_ios", state.settings.ios ? "true" : "false");
  localStorage.setItem("ez_compact", state.settings.compact ? "true" : "false");
  localStorage.setItem("ez_reduced", state.settings.reduced ? "true" : "false");
}

/* ===========================
   Event wiring (delegation where possible)
   =========================== */
function attachEvents() {
  // header buttons
  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".btn-menu");
    if (btn) toggleMenu();

    const nav = ev.target.closest(".nav-item");
    if (nav) {
      const target = nav.dataset.target;
      if (target) switchSection(target);
    }

    const mob = ev.target.closest(".mob-btn");
    if (mob && mob.dataset.target) {
      const t = mob.dataset.target;
      switchSection(t);
    }

    const card = ev.target.closest(".card");
    if (card && card.dataset.id) {
      openDetail(card.dataset.id);
    }

    // settings open/close
    if (ev.target.closest("#btn-settings")) {
      openSettings();
    }
    if (ev.target.closest("#close-settings") || ev.target.closest(".modal") && ev.target === $(".modal")) {
      closeSettings();
    }

    // list control: open youtube
    if (ev.target.closest("#open-youtube")) {
      // allow default link
      showToast("Menyiapkan...");
    }
  });

  // keyboard activation for nav items
  $$(".nav-item").forEach((n) => {
    n.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        n.click();
      }
    });
  });

  // search input (debounced)
  $("#search").addEventListener("input", debounceRAF((ev) => {
    state.searchTerm = ev.target.value.trim();
    renderList();
  }, 200));

  // sort change
  $("#sort").addEventListener("change", () => renderList());

  // back button in detail
  document.addEventListener("click", (ev) => {
    if (ev.target.closest(".back")) {
      // go back to list or creator depending on state
      if (state.currentSection === "template" || state.currentSection === "guide") switchSection(state.currentSection);
      else switchSection("creator");
    }
  });

  // keyboard: Escape closes overlays/details
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      if ($(".sidebar").classList.contains("active")) toggleMenu();
      if ($("#detail-view").classList.contains("active")) {
        // go back to previous list/creator view
        if (state.currentSection === "template" || state.currentSection === "guide") switchSection(state.currentSection);
        else switchSection("creator");
      }
      if ($("#settings").classList.contains("active")) closeSettings();
    }
  });

  // settings controls wiring
  $("#theme-toggle").addEventListener("click", () => {
    state.settings.theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applySettings();
    saveSettings();
  });

  $("#theme-dark").addEventListener("click", () => {
    state.settings.theme = "dark";
    applySettings();
    saveSettings();
  });
  $("#theme-light").addEventListener("click", () => {
    state.settings.theme = "light";
    applySettings();
    saveSettings();
  });

  $("#setting-ios").addEventListener("change", (e) => {
    state.settings.ios = e.target.checked;
    applySettings();
    saveSettings();
  });
  $("#setting-compact").addEventListener("change", (e) => {
    state.settings.compact = e.target.checked;
    applySettings();
    saveSettings();
  });
  $("#setting-reduced").addEventListener("change", (e) => {
    state.settings.reduced = e.target.checked;
    applySettings();
    saveSettings();
  });

  // overlay close
  $(".overlay").addEventListener("click", () => {
    if ($(".sidebar").classList.contains("active")) toggleMenu();
    closeSettings();
  });

  // delegated copy/download button toast (keeps previous behaviour)
  document.addEventListener("click", (ev) => {
    const dl = ev.target.closest(".btn-dl");
    if (dl) {
      showToast("Menyiapkan download...");
    }
  });
}

/* Settings open/close */
function openSettings() {
  const modal = $("#settings");
  if (!modal) return;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  modal.querySelector(".modal-card").focus?.();
}
function closeSettings() {
  const modal = $("#settings");
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

/* ===========================
   INIT
   =========================== */
function init() {
  // apply saved theme & settings
  state.settings.theme = localStorage.getItem("ez_theme") || state.settings.theme;
  state.settings.ios = localStorage.getItem("ez_ios") === "true" || state.settings.ios;
  state.settings.compact = localStorage.getItem("ez_compact") === "true" || state.settings.compact;
  state.settings.reduced = localStorage.getItem("ez_reduced") === "true" || state.settings.reduced;
  applySettings();

  // basic DOM population
  $("#c-pfp").src = CONFIG.creator.pfp;
  $("#c-name").textContent = CONFIG.creator.name;
  $("#c-sub").href = CONFIG.creator.ytLink;
  $("#c-content").innerHTML = ""; // will be built by renderCreator
  const openBtn = $("#open-youtube");
  if (openBtn) openBtn.href = CONFIG.creator.video || CONFIG.creator.ytLink;

  // socials
  $("#side-discord").href = CONFIG.creator.discord || "#";
  $("#side-whatsapp").href = CONFIG.creator.whatsapp || "#";
  $("#banner-discord").href = CONFIG.creator.discord || "#";
  $("#banner-whatsapp").href = CONFIG.creator.whatsapp || "#";

  // banner text
  $("#banner-title").textContent = CONFIG.creator.bannerTitle || CONFIG.creator.name;
  $("#banner-sub").textContent = CONFIG.creator.bannerSub || "";

  // render creator content & video
  renderCreator();
  const videoRoot = $("#c-video");
  videoRoot.innerHTML = "";
  renderCompTo(videoRoot, { type: "youtube", id: CONFIG.creator.video });

  // initial section
  switchSection("creator");

  // attach events
  attachEvents();
}

// helper to select quickly
function $(s, ctx = document) { return ctx.querySelector(s); }
function $$(s, ctx = document) { return Array.from((ctx || document).querySelectorAll(s)); }

// run init on load
window.addEventListener("DOMContentLoaded", init);