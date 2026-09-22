/* ContaPro - Main JS
   Funciones interactivas globales: navbar, animaciones, contadores,
   filtros, slider, render de datos dinámicos y helper de iconos SVG.
*/

(function () {
  'use strict';

  const D = window.CONTA_DATA || {};

  /* ========== Helpers ========== */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(k => {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (k.startsWith('on') && typeof attrs[k] === 'function') {
          node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        } else {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    children.flat().forEach(c => {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  /* Iconos SVG inline (sin librerías externas) */
  const ICONS = {
    calculator: '<path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v6h14V4H6zm0 8v8h4v-8H6zm6 0v8h4v-8h-4zm6 0v8h2v-8h-2zM8 6h2v2H8V6zm4 0h2v2h-2V6zm-4 9h2v2H8v-2zm4 0h2v2h-2v-2z"/>',
    document: '<path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V9h5.5L14 3.5zM8 12h8v2H8v-2zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>',
    shield: '<path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3zm-1 13-4-4 1.4-1.4L11 12.2l5.6-5.6L18 8l-7 7z"/>',
    users: '<path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0v1H2v-1zm14-9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm5 9v1h-5v-1a6 6 0 0 0-1.7-4.2A5.5 5.5 0 0 1 21 20z"/>',
    lightbulb: '<path d="M9 21h6v-1H9v1zm3-19a7 7 0 0 0-4 12.7V18h8v-3.3A7 7 0 0 0 12 2zm-2 14v-2h4v2h-4zm.3-4.7-.8-.7A5 5 0 0 1 12 4a5 5 0 0 1 2.5 9.3l-.8.7V14h-3.4v-2.7z"/>',
    building: '<path d="M3 21V7l9-4 9 4v14h-6v-5h-6v5H3zm2-2h2v-3H5v3zm0-5h2v-3H5v3zm0-5h2V6H5v3zm10 10h2v-3h-2v3zm0-5h2v-3h-2v3zm0-5h2V6h-2v3z"/>',
    chart: '<path d="M3 21h18v-2H5V3H3v18zm4-4 4-4 4 3 6-7-1.4-1.4-4.6 5.4-4-3-5 6L7 17z"/>',
    target: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-14a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>',
    compass: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.5 6.5L13 13l-4.5 2.5L11 11l4.5-2.5zM12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16z"/>',
    award: '<path d="M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 13l-2 9 6-3 6 3-2-9a8 8 0 0 1-8 0z"/>',
    handshake: '<path d="m21.7 8-3-3-3.4 3.4 3 3 1.4-1.4L21.7 8zM12.7 7l-9 9 1.4 1.4 9-9L12.7 7zm1.4-4.7L11 5.4l3 3 3.4-3.4L14.1 2.3zM3.3 14l-1.4 1.4 3 3 1.4-1.4-3-3z"/>',
    sparkles: '<path d="m12 2 2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6zM4 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3zm14 1 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/>',
    user: '<path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-9 9a9 9 0 0 1 18 0v1H3v-1z"/>',
    cloud: '<path d="M7 18a5 5 0 0 1-1-9.9 6 6 0 0 1 11.7 1A4.5 4.5 0 0 1 18 18H7zm10-4h.5a2.5 2.5 0 0 0-2.3-3.5A5 5 0 0 0 8 7.5 4 4 0 0 0 7 15h10z"/>',
    certificate: '<path d="M4 3h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-5l-2 2-2 2-2-2-2-2H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 17l-1 5 3-2 2 2-1-5H6z"/>',
    check: '<path d="m9 16.2-4.2-4.2L3.4 13.4 9 19l12-12-1.4-1.4z"/>',
    cross: '<path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/>',
    phone: '<path d="M20 15.5a12 12 0 0 1-3.8-.6 1 1 0 0 0-1 .2l-2.2 2.2a15 15 0 0 1-6.7-6.7L8.5 8.4a1 1 0 0 0 .3-1A12 12 0 0 1 8.2 3.5 1 1 0 0 0 7.3 2.5H4.1A2 2 0 0 0 2 4.6 18 18 0 0 0 19.4 22a2 2 0 0 0 2-2v-3.2a1 1 0 0 0-1.4-1.3z"/>',
    mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 4v10h16V8l-8 5L4 8zm0-2 8 5 8-5H4z"/>',
    pin: '<path d="M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>',
    clock: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.2 3 .8-1.3-4.5-2.7V7z"/>',
    arrowRight: '<path d="M12 4 10.6 5.4 16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z"/>',
    chevron: '<path d="M9 6l6 6-6 6"/>'
  };
  function svg(name, size = 24) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" aria-hidden="true">${ICONS[name] || ''}</svg>`;
  }

  /* Toast helper */
  function toast(message, opts = {}) {
    const { type = 'success', title } = opts;
    const existing = $('.toast');
    if (existing) existing.remove();

    const t = el('div', { class: `toast ${type === 'error' ? 'error' : ''}` });
    t.innerHTML = `
      <div class="toast-icon">${type === 'error' ? '!' : '✓'}</div>
      <div class="toast-text">${title ? `<strong>${title}</strong>` : ''}${message}</div>
    `;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 400);
    }, 4000);
  }
  window.CONTA_TOAST = toast;

  /* ========== Navbar ========== */
  function initNavbar() {
    const navbar = $('.navbar');
    const toggle = $('.nav-toggle');
    const menu   = $('.mobile-menu');

    if (navbar) {
      const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
      });
    }

    const path = location.pathname.split('/').pop() || 'index.html';
    $$('.nav-link, .footer-nav').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* ========== Año en footer ========== */
  function setFooterYear() {
    const y = $('#footer-year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ========== Scroll reveal ========== */
  function initReveal() {
    const els = $$('[data-animate]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(e => io.observe(e));
  }

  /* ========== Contadores animados ========== */
  function initCounters() {
    const counters = $$('[data-counter]');
    if (!counters.length) return;
    const animate = (node) => {
      const target = parseFloat(node.dataset.counter);
      const suffix = node.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.floor(eased * target);
        node.textContent = value.toLocaleString('es-MX') + suffix;
        if (t < 1) requestAnimationFrame(step);
        else node.textContent = target.toLocaleString('es-MX') + suffix;
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => io.observe(c));
  }

  /* ========== Render: servicios (cards) ========== */
  function renderServices(target, options = {}) {
    if (!target || !D.SERVICES) return;
    target.innerHTML = D.SERVICES.map(s => `
      <div class="bg-white rounded-xl border border-slate-200 p-6 card-hover" data-animate="fade-up">
        <div class="w-14 h-14 rounded-lg bg-primary/5 flex items-center justify-center text-accent mb-5">
          ${svg(s.icon, 28)}
        </div>
        <h3 class="text-xl font-bold text-primary mb-3 font-display">${s.title}</h3>
        <p class="text-slate-600 leading-relaxed mb-4">${s.short}</p>
        ${options.withFeatures ? `
          <ul class="space-y-2 text-sm text-slate-700">
            ${s.features.map(f => `
              <li class="flex items-start gap-2">
                <span class="text-accent mt-0.5">${svg('check', 16)}</span>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>` : ''}
      </div>
    `).join('');
  }

  /* ========== Render: stats ========== */
  function renderStats(target) {
    if (!target || !D.STATS) return;
    target.innerHTML = D.STATS.map((s, i) => `
      <div data-animate="fade-up" style="transition-delay:${i * 80}ms">
        <div class="text-4xl md:text-5xl font-bold text-accent font-display" data-counter="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
        <div class="text-white/80 mt-2 text-sm uppercase tracking-wider">${s.label}</div>
      </div>
    `).join('');
  }

  /* ========== Render: testimonios ========== */
  function renderTestimonials(target) {
    if (!target || !D.TESTIMONIALS) return;
    const slides = D.TESTIMONIALS.map(t => `
      <div class="testimonial-slide">
        <div class="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-slate-100 max-w-3xl mx-auto">
          <svg class="text-accent mb-4" width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H4v2h1a4 4 0 0 0 4-4V9a2 2 0 0 0 0-2zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V9a2 2 0 0 0 0-2z"/></svg>
          <p class="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">${t.text}</p>
          <div class="flex items-center gap-4">
            <img src="${t.avatar}" alt="${t.name}" class="w-14 h-14 rounded-full object-cover" loading="lazy">
            <div>
              <div class="font-semibold text-primary">${t.name}</div>
              <div class="text-sm text-slate-500">${t.role} · ${t.company}</div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    target.innerHTML = `
      <div class="overflow-hidden">
        <div class="testimonial-track">${slides}</div>
      </div>
      <div class="testimonial-dots">
        ${D.TESTIMONIALS.map((_, i) => `<button class="testimonial-dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Ir al testimonio ${i + 1}"></button>`).join('')}
      </div>
    `;

    initSlider(target);
  }

  function initSlider(root) {
    const track = $('.testimonial-track', root);
    const dots  = $$('.testimonial-dot', root);
    if (!track) return;
    let idx = 0;
    const total = dots.length;

    const go = (n) => {
      idx = (n + total) % total;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

    let auto = setInterval(() => go(idx + 1), 6000);
    root.addEventListener('mouseenter', () => clearInterval(auto));
    root.addEventListener('mouseleave', () => { auto = setInterval(() => go(idx + 1), 6000); });
  }

  /* ========== Render: equipo ========== */
  function renderTeam(target) {
    if (!target || !D.TEAM) return;
    target.innerHTML = D.TEAM.map((m, i) => `
      <div class="bg-white rounded-xl overflow-hidden border border-slate-100 card-hover" data-animate="fade-up" style="transition-delay:${i * 80}ms">
        <div class="aspect-square overflow-hidden bg-slate-100">
          <img src="${m.photo}" alt="${m.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy">
        </div>
        <div class="p-5">
          <h3 class="font-display text-lg font-bold text-primary">${m.name}</h3>
          <div class="text-accent text-sm font-semibold mb-2">${m.role}</div>
          <p class="text-sm text-slate-600 leading-relaxed">${m.bio}</p>
        </div>
      </div>
    `).join('');
  }

  /* ========== Render: valores ========== */
  function renderValues(target) {
    if (!target || !D.VALUES) return;
    target.innerHTML = D.VALUES.map((v, i) => `
      <div class="text-center p-6" data-animate="fade-up" style="transition-delay:${i * 100}ms">
        <div class="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-accent mx-auto mb-4">
          ${svg(v.icon, 32)}
        </div>
        <h3 class="text-xl font-bold text-primary mb-2 font-display">${v.title}</h3>
        <p class="text-slate-600 leading-relaxed">${v.desc}</p>
      </div>
    `).join('');
  }

  /* ========== Render: procesos ========== */
  function renderProcess(target) {
    if (!target || !D.PROCESS) return;
    target.innerHTML = D.PROCESS.map((p, i) => `
      <div class="relative" data-animate="fade-up" style="transition-delay:${i * 100}ms">
        <div class="text-5xl font-bold text-accent/30 font-display mb-2">${p.step}</div>
        <h3 class="text-xl font-bold text-primary mb-3 font-display">${p.title}</h3>
        <p class="text-slate-600 leading-relaxed">${p.desc}</p>
      </div>
    `).join('');
  }

  /* ========== Render: "por qué nosotros" ========== */
  function renderWhyUs(target) {
    if (!target || !D.WHY_US) return;
    target.innerHTML = D.WHY_US.map((w, i) => `
      <div class="flex gap-5" data-animate="fade-up" style="transition-delay:${i * 100}ms">
        <div class="w-14 h-14 rounded-lg bg-primary text-accent flex-shrink-0 flex items-center justify-center">
          ${svg(w.icon, 26)}
        </div>
        <div>
          <h3 class="text-lg font-bold text-primary mb-2 font-display">${w.title}</h3>
          <p class="text-slate-600 leading-relaxed">${w.desc}</p>
        </div>
      </div>
    `).join('');
  }

  /* ========== Render: planes ========== */
  function renderPricing(target) {
    if (!target || !D.PRICING) return;
    target.innerHTML = D.PRICING.map((p, i) => `
      <div class="bg-white rounded-2xl p-8 border border-slate-200 card-hover pricing-card ${p.highlighted ? 'highlighted shadow-xl' : ''}" data-animate="fade-up" style="transition-delay:${i * 120}ms">
        ${p.highlighted ? '<div class="pricing-badge">Más popular</div>' : ''}
        <h3 class="text-2xl font-bold text-primary font-display mb-2">${p.name}</h3>
        <p class="text-slate-600 mb-6 text-sm leading-relaxed">${p.description}</p>
        <div class="mb-6">
          <span class="text-4xl font-bold text-primary font-display">${p.price}</span>
          <span class="text-slate-500 text-sm ml-1">${p.period}</span>
        </div>
        <a href="contacto.html?plan=${p.id}" class="${p.highlighted ? 'btn-primary' : 'btn-ghost'} w-full justify-center mb-8">
          Elegir plan
        </a>
        <ul class="space-y-3">
          ${p.features.map(f => `
            <li class="flex items-start gap-3 text-sm">
              <span class="${f.included ? 'text-accent' : 'text-slate-300'} mt-0.5 flex-shrink-0">${svg(f.included ? 'check' : 'cross', 18)}</span>
              <span class="${f.included ? 'text-slate-700' : 'text-slate-400 line-through'}">${f.text}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  /* ========== Render: FAQ ========== */
  function renderFAQ(target) {
    if (!target || !D.FAQ) return;
    target.innerHTML = D.FAQ.map(f => `
      <details class="faq-item">
        <summary>
          <span>${f.q}</span>
          <span class="icon">+</span>
        </summary>
        <div class="faq-content">${f.a}</div>
      </details>
    `).join('');
  }

  /* ========== Render: galería + filtros ========== */
  function renderGallery(target, filtersTarget) {
    if (!target || !D.GALLERY) return;
    target.innerHTML = D.GALLERY.map(g => `
      <div class="gallery-item" data-category="${g.category}" data-animate="zoom">
        <img src="${g.url}" alt="${g.alt}" loading="lazy">
        <div class="gallery-overlay">
          <div>
            <div class="text-accent text-xs font-semibold uppercase tracking-wider mb-1">${g.category}</div>
            <div class="text-white font-semibold">${g.alt}</div>
          </div>
        </div>
      </div>
    `).join('');

    if (filtersTarget) {
      filtersTarget.innerHTML = D.SERVICE_CATEGORIES.map((c, i) => `
        <button class="gallery-filter-btn ${i === 0 ? 'active' : ''}" data-filter="${c.toLowerCase()}">${c}</button>
      `).join('');
      filtersTarget.addEventListener('click', (e) => {
        const btn = e.target.closest('.gallery-filter-btn');
        if (!btn) return;
        const filter = btn.dataset.filter;
        $$('.gallery-filter-btn', filtersTarget).forEach(b => b.classList.toggle('active', b === btn));
        $$('.gallery-item', target).forEach(item => {
          const cat = item.dataset.category;
          const show = filter === 'todos' || cat === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    }
  }

  /* ========== Render: cursos (catálogo) ========== */
  function renderCourses(target) {
    if (!target || !D.COURSES) return;
    target.innerHTML = D.COURSES.map((c, i) => `
      <div class="bg-white rounded-xl border border-slate-200 p-6 card-hover" data-animate="fade-up" style="transition-delay:${i * 80}ms">
        <div class="flex items-start justify-between gap-4 mb-4">
          <h3 class="text-lg font-bold text-primary font-display">${c.name}</h3>
          <span class="bg-accent/10 text-accent-dark px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">${c.modality}</span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm text-slate-600 mb-5">
          <div class="flex items-center gap-2"><span class="text-accent">${svg('user', 16)}</span> ${c.instructor}</div>
          <div class="flex items-center gap-2"><span class="text-accent">${svg('clock', 16)}</span> ${c.duration}</div>
          <div class="flex items-center gap-2"><span class="text-accent">${svg('award', 16)}</span> ${c.level}</div>
          <div class="flex items-center gap-2 font-bold text-primary"><span class="text-accent">${svg('sparkles', 16)}</span> ${c.price}</div>
        </div>
        <button class="btn-ghost w-full justify-center text-sm" data-course="${c.name}">Inscribirme</button>
      </div>
    `).join('');

    target.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-course]');
      if (!btn) return;
      toast(`Hemos pre-registrado tu interés en "${btn.dataset.course}". Pronto nos pondremos en contacto.`, { title: '¡Inscripción registrada!' });
    });
  }

  /* ========== Render: horario semanal ==========
     Estructura plana: una fila por sesión, repitiendo el día.
     Usa rowspans para agrupar visualmente las sesiones del mismo día. */
  function renderSchedule(target) {
    if (!target || !D.SCHEDULE) return;
    const head = `
      <thead>
        <tr>
          <th class="w-28">Día</th>
          <th>Horario</th>
          <th>Curso</th>
          <th>Instructor</th>
          <th>Aula</th>
        </tr>
      </thead>`;
    const rows = D.SCHEDULE.map(day => {
      const slotsCount = day.slots.length;
      return day.slots.map((s, i) => `
        <tr>
          ${i === 0
            ? `<td class="font-semibold text-primary align-top" rowspan="${slotsCount}">${day.day}</td>`
            : ''}
          <td class="align-top"><span class="schedule-time">${s.time}</span></td>
          <td class="align-top text-slate-700">${s.course}</td>
          <td class="align-top text-sm text-slate-600">${s.instructor}</td>
          <td class="align-top text-sm text-slate-600">${s.room}</td>
        </tr>
      `).join('');
    }).join('');
    target.innerHTML = `${head}<tbody>${rows}</tbody>`;
  }

  /* ========== Boot ========== */
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    setFooterYear();
    initReveal();
    initCounters();

    if (D.STATS)          renderStats($('#stats-grid'));
    if (D.SERVICES)       renderServices($('#featured-services'));
    if (D.SERVICES)       renderServices($('#services-grid'), { withFeatures: true });
    if (D.TESTIMONIALS)   renderTestimonials($('#testimonials'));
    if (D.TEAM)           renderTeam($('#team-grid'));
    if (D.VALUES)         renderValues($('#values-grid'));
    if (D.PROCESS)        renderProcess($('#process-grid'));
    if (D.WHY_US)         renderWhyUs($('#why-us-grid'));
    if (D.PRICING)        renderPricing($('#pricing-grid'));
    if (D.FAQ)            renderFAQ($('#faq-list'));
    if (D.GALLERY)        renderGallery($('#gallery-grid'), $('#gallery-filters'));
    if (D.COURSES)        renderCourses($('#courses-grid'));
    if (D.SCHEDULE)       renderSchedule($('#schedule-table'));

    // Re-aplicar reveal a nodos recién creados
    initReveal();
  });
})();
