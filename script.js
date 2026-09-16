(() => {
  "use strict";

  const PROJECTS = [
    // stills first — larger cards
    { id: "don", title: "Double Or Nothing", desc: "Writer · Director · DP · Editor · Colorist · Sound Designer — short film", roles: ["dp"], span: 7, size: "lg", tag: "Writer · Director · DP" },
    { id: "swey", title: "SWEY: See the World, See Yourself", desc: "Colorist · spec ad for Swey Collective · 2025", roles: ["colorist"], span: 5, size: "md" },
    { id: "kmb", title: "Kaise Main Batau", desc: "Colorist · VFX assistant · camera operator · for Dhi Harmony · 2025", roles: ["colorist"], span: 7, size: "md" },
    { id: "waiting", title: "The Waiting Room", desc: "Colorist · short film", roles: ["colorist"], span: 5, size: "sm" },
    // storyboards only — smallest cards
    { id: "iow", title: "In Other Words, I Loved You", desc: "Storyboard artist · assembly editor", roles: ["editor"], span: 4, size: "sm" },
    { id: "keeta", title: "Keeta — Spec Ad", desc: "Production designer · storyboard artist", roles: ["editor"], span: 4, size: "sm" },
    { id: "rls", title: "Red Light Shadows", desc: "VFX artist · short film", roles: ["editor"], span: 4, size: "sm" },
    // no media yet
    { id: "house", title: "Housewarming", desc: "DOP · colorist · sound designer · short film", roles: ["dp"], span: 6, size: "lg" },
    { id: "dontleave", title: "Don't Leave", desc: "Sound recordist · color QC · short film", roles: ["colorist"], span: 6, size: "sm" }
  ];

  const hasMedia = typeof MEDIA !== "undefined";
  const projectMedia = (id) => (hasMedia && MEDIA.work[id]) || {};

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Custom cursor ---------------- */
  function initCursor() {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    document.documentElement.classList.add("has-cursor");
    const dot = $("#cursorDot");
    const ring = $("#cursorRing");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    }, { passive: true });

    function raf() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    }
    raf();

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("[data-cursor='magnetic'], a, .card, .credit-line, .video-plate")) {
        ring.classList.add("hover");
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("[data-cursor='magnetic'], a, .card, .credit-line, .video-plate")) {
        ring.classList.remove("hover");
      }
    });

    // magnetic pull on buttons/nav
    $$("[data-cursor='magnetic']").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${relX * 0.18}px, ${relY * 0.28}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------------- Smooth in-page scroll ---------------- */
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const headerH = $(".site-header").offsetHeight;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH + 1;
    window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  function initNavAndSmoothScroll() {
    $$("[data-target]").forEach((el) => {
      el.addEventListener("click", () => scrollToId(el.dataset.target));
    });
    $("#logoBtn").addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));
  }

  /* ---------------- Scroll progress + active nav + kinetic intro ---------------- */
  function initScrollFx() {
    const progressFill = $("#progressFill");
    const navLinks = $$(".nav-link");
    const sections = ["act-hero", "act-manifesto", "act-work", "act-journal", "act-contact"].map((id) => document.getElementById(id));

    let ticking = false;
    function update() {
      ticking = false;
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(1, scrollTop / max) : 0;
      progressFill.style.width = (pct * 100).toFixed(2) + "%";

      // active nav section highlight
      const headerH = $(".site-header").offsetHeight;
      let activeId = null;
      for (const sec of sections) {
        if (!sec) continue;
        const r = sec.getBoundingClientRect();
        if (r.top - headerH <= window.innerHeight * 0.4 && r.bottom > headerH) {
          activeId = sec.id;
        }
      }
      navLinks.forEach((l) => l.classList.toggle("active", l.dataset.target === activeId));
    }

    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ---------------- Reveal on scroll (IntersectionObserver) ---------------- */
  function initReveals() {
    const targets = $$(".reveal-up, .reveal-scale");
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------------- Parallax plates ---------------- */
  function initParallax() {
    if (prefersReducedMotion) return;
    const els = $$("[data-parallax]");
    if (!els.length) return;
    let ticking = false;
    function update() {
      ticking = false;
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.08;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${(-center * speed).toFixed(2)}px)`;
      });
    }
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------------- Gallery + project detail ---------------- */
  // Projects with no detail page: clicking the card opens the video modal
  // directly with a status message (or the reel, once a link is set).
  const NO_DETAIL_IDS = ["house"];

  function coverFor(id) {
    const m = projectMedia(id);
    if (m.cover) return m.cover;
    if (m.panels && m.panels.length) return m.panels[0].img;
    return "";
  }

  function cardMarkup(p) {
    return `
      <div class="card" data-id="${p.id}" data-size="${p.size}" style="grid-column: span ${p.span};">
        <div class="card-media" id="cardMedia-${p.id}">
          <span class="card-plate-label">key still — 2.39:1</span>
          <span class="card-tag">view project →</span>
        </div>
        ${p.tag ? `<div class="card-role">${p.tag}</div>` : ""}
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>`;
  }

  let cardSlideTimers = [];

  function stopCardSlideshows() {
    cardSlideTimers.forEach(clearInterval);
    cardSlideTimers = [];
  }

  function startCardSlideshows(list) {
    if (!hasMedia) return;
    list.forEach((p) => {
      const panels = projectMedia(p.id).panels || [];
      if (panels.length < 2) return;
      const el = $("#cardMedia-" + p.id);
      if (!el) return;
      let idx = 0;
      // randomized period + a staggered start so cards visibly stay out of sync
      const period = 4200 + Math.random() * 2400;
      const startDelay = Math.random() * period;
      const startTimer = setTimeout(() => {
        const timer = setInterval(() => {
          idx = (idx + 1) % panels.length;
          applyDriveBackground(el, panels[idx].img);
        }, period);
        cardSlideTimers.push(timer);
      }, startDelay);
      cardSlideTimers.push(startTimer);
    });
  }

  function renderGallery(filter) {
    stopCardSlideshows();
    const gallery = $("#gallery");
    const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.roles.includes(filter));
    gallery.innerHTML = list.map(cardMarkup).join("");
    attachCardEvents();
    if (hasMedia) {
      list.forEach((p) => applyDriveBackground($("#cardMedia-" + p.id), coverFor(p.id)));
      startCardSlideshows(list);
    }
  }

  function attachCardEvents() {
    $$(".card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        const p = PROJECTS.find((x) => x.id === id);
        if (NO_DETAIL_IDS.includes(id)) {
          const m = projectMedia(id);
          openVideoModal(p.title, m.reel, m.statusText || "Work in progress");
        } else {
          openDetail(id);
        }
      });
    });
  }

  let activeDetailId = null;

  function openDetail(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    activeDetailId = id;
    $("#mainView").hidden = true;
    const detail = $("#detailView");
    detail.hidden = false;
    $("#detailKind").textContent = p.roles.includes("colorist") ? "Colorist project" : p.roles.includes("dp") ? "Director / DP project" : "Editorial project";
    $("#detailTitle").textContent = p.title;
    $("#detailDesc").textContent = p.desc;
    const panels = projectMedia(id).panels || [];
    $("#detailMedia").innerHTML = panels
      .map((panel, i) => `
        <div class="panel-tile">
          <div class="plate-block" id="detailPanel-${i}" style="aspect-ratio:16/9;"></div>
          ${panel.title ? `<span class="panel-title">${panel.title}</span>` : ""}
        </div>`)
      .join("");
    if (hasMedia) {
      panels.forEach((panel, i) => applyDriveBackground($("#detailPanel-" + i), panel.img));
    }
    const media = projectMedia(id);
    const reelWrap = $("#detailReel");
    if (media.statusText) {
      reelWrap.innerHTML = `
        <span class="eyebrow mint">Reel</span>
        <span class="status-text">${media.statusText}</span>`;
    } else {
      reelWrap.innerHTML = `
        <span class="eyebrow mint">Watch the reel</span>
        <div class="video-plate" id="detailPlay" data-cursor="magnetic"><div class="play-btn"><div class="play-tri"></div></div></div>
        <a href="#" class="watch-label">Full reel ↗</a>`;
      $("#detailPlay").addEventListener("click", () => {
        openVideoModal(p.title, media.reel, "Work in progress");
      });
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => $$(".reveal-up, .reveal-scale", detail).forEach((el) => el.classList.add("in-view")));
  }

  function closeDetail() {
    $("#detailView").hidden = true;
    $("#mainView").hidden = false;
  }

  function initGallery() {
    renderGallery("all");
    $$(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        $("#filterLabel").textContent = btn.textContent.replace(/\s*\d+$/, "").trim();
        renderGallery(f);
      });
    });
    $("#backBtn").addEventListener("click", closeDetail);
  }

  /* ---------------- Upcoming (in-production) section ---------------- */
  function upcomingMarkup(p) {
    return `
      <div class="card upcoming-card" data-id="${p.id}">
        <div class="card-media" id="cardMedia-${p.id}">
          <span class="card-plate-label">in production</span>
          <span class="card-tag">coming soon →</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>`;
  }

  function initUpcoming() {
    if (!hasMedia || !MEDIA.upcoming || !MEDIA.upcoming.length) return;
    const section = $("#act-upcoming");
    if (!section) return;
    const grid = $("#upcomingGrid");
    grid.innerHTML = MEDIA.upcoming.map(upcomingMarkup).join("");
    MEDIA.upcoming.forEach((p) => applyDriveBackground($("#cardMedia-" + p.id), p.cover));
    $$(".upcoming-card", grid).forEach((card) => {
      card.addEventListener("click", () => {
        const p = MEDIA.upcoming.find((x) => x.id === card.dataset.id);
        openVideoModal(p.title, "", "Coming soon");
      });
    });
  }

  /* ---------------- Video modal ---------------- */
  function openVideoModal(title, reelValue, statusText) {
    const modal = $("#videoModal");
    const stage = $("#videoModalStage");
    const embedUrl = hasMedia ? resolveEmbedUrl(reelValue) : null;
    if (embedUrl) {
      stage.innerHTML = `<iframe src="${embedUrl}" allow="autoplay" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0;"></iframe>`;
    } else if (statusText) {
      stage.innerHTML = `<span class="status-text">${statusText}</span>`;
    } else {
      stage.innerHTML = `<div class="play-btn"><div class="play-tri"></div></div>`;
    }
    if (title) $("#videoModalTitle").textContent = title;
    modal.hidden = false;
  }

  function initVideoModal() {
    const modal = $("#videoModal");
    $("#chefCredit").addEventListener("click", () => {
      openVideoModal("Chronicles of a Chef — Ep. 4 \"Dil Se\"", hasMedia ? MEDIA.chefReel : "", "Work in progress");
    });
    $("#closeVideoBtn").addEventListener("click", () => { modal.hidden = true; });
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.hidden = true; });
  }

  /* ---------------- Background wave canvas (mouse-reactive) ---------------- */
  function initWaves() {
    const canvas = $("#bg-waves");
    const ctx = canvas.getContext("2d");
    let mouse = { x: -9999, y: -9999 };
    let lastMove = 0;
    let bands = [];

    function seedBands() {
      const h = canvas.height || window.innerHeight;
      const bandCount = Math.max(5, Math.ceil(h / 340));
      bands = [];
      for (let i = 0; i < bandCount; i++) {
        bands.push({
          offset: Math.random(),
          angle: (Math.random() * 2 - 1) * 0.55,
          freq1: 0.003 + Math.random() * 0.006,
          freq2: 0.0012 + Math.random() * 0.0022,
          amp1: 22 + Math.random() * 26,
          amp2: 30 + Math.random() * 40,
          dir: Math.random() < 0.5 ? -1 : 1,
          phase: Math.random() * Math.PI * 2
        });
      }
    }

    function resize() {
      const w = window.innerWidth, h = document.documentElement.scrollHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.height = h + "px";
        seedBands();
      }
    }
    window.addEventListener("resize", resize);
    resize();
    setInterval(resize, 1500);

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
      lastMove = performance.now();
    }, { passive: true });

    let t = 0, speed = 0.4;
    const bandColorA = "217,21,58";
    const bandColorB = "150,180,140";

    function frame() {
      requestAnimationFrame(frame);
      if (prefersReducedMotion) return;
      const w = canvas.width, h = canvas.height;
      if (!w || !h) return;
      if (!bands.length) seedBands();
      const active = performance.now() - lastMove < 1200;
      const target = active ? 1.6 : 0.4;
      speed += (target - speed) * 0.04;
      t += (1 / 60) * speed;

      ctx.clearRect(0, 0, w, h);
      bands.forEach((band, i) => {
        const baseY = (band.offset) * h;
        const color = i % 2 === 0 ? bandColorA : bandColorB;
        ctx.save();
        ctx.translate(w / 2, baseY);
        ctx.rotate(band.angle);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color},${0.34 + (i % 3) * 0.07})`;
        ctx.lineWidth = 4.6;
        ctx.lineCap = "round";
        const span = Math.max(w, h) * 1.3;
        const step = 26;
        const tt = t * band.dir;
        for (let x = -span; x <= span; x += step) {
          const distToMouse = Math.hypot(x + w / 2 - mouse.x, baseY - mouse.y);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 420) * 30;
          const y = Math.sin(x * band.freq1 + tt * 1.4 + band.phase) * band.amp1
            + Math.sin(x * band.freq2 - tt * 0.6 + band.phase * 2) * band.amp2
            - mouseInfluence;
          if (x === -span) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      });
    }
    requestAnimationFrame(frame);
  }

  /* ---------------- Drive media for hero + journal ---------------- */
  function initStaticDriveMedia() {
    if (!hasMedia) return;
    applyDriveBackground($("#heroPlateA"), MEDIA.hero.plateA);
    applyDriveBackground($("#heroPlateB"), MEDIA.hero.plateB);
    applyDriveBackground($("#heroPlateC"), MEDIA.hero.plateC);
    applyDriveBackground($("#heroPlateD"), MEDIA.hero.plateD);
    applyDriveBackground($("#heroPlateE"), MEDIA.hero.plateE);
    applyDriveBackground($("#journalDiagram"), MEDIA.journal.diagram);
    applyDriveBackground($("#journalBtsPlate"), MEDIA.journal.btsPlate);
    $$("#contactGrid .frame").forEach((el, i) => applyDriveBackground(el, MEDIA.journal.contactSheet[i]));
  }

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initCursor();
    initNavAndSmoothScroll();
    initScrollFx();
    initReveals();
    initParallax();
    initGallery();
    initUpcoming();
    initVideoModal();
    initWaves();
    initStaticDriveMedia();
  });
})();
