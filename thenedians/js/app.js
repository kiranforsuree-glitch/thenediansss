/* ============================================================
   THE NEDIANS — Core App (shared components + utilities)
   Pure vanilla JS. Loaded on every page.
   ============================================================ */

/* ---------------- Helpers ---------------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const fmtMoney = n => "€" + n.toLocaleString("en-US");
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem("ned_" + k)) ?? d; } catch { return d; } },
  set: (k, v) => localStorage.setItem("ned_" + k, JSON.stringify(v)),
  del: k => localStorage.removeItem("ned_" + k)
};

/* ---------------- Theme ---------------- */
function initTheme() {
  const saved = store.get("theme", "light");
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  store.set("theme", next);
  updateThemeIcon(next);
}
function updateThemeIcon(t) {
  $$(".theme-toggle i").forEach(i => i.className = t === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon");
}

/* ---------------- Navbar ---------------- */
const NAV_LINKS = [
  { label: "Home", href: "index.html" },
  { label: "Study in Italy", href: "study-in-italy.html" },
  { label: "Universities", href: "universities.html" },
  { label: "Programs", href: "programs.html" },
  {
    label: "Tools", drop: [
      { label: "Eligibility Checker", href: "eligibility.html", icon: "fa-clipboard-check" },
      { label: "Compare Universities", href: "compare.html", icon: "fa-scale-balanced" },
      { label: "Document Checklist", href: "checklist.html", icon: "fa-list-check" },
      { label: "Scholarships", href: "scholarships.html", icon: "fa-award" }
    ]
  },
  { label: "Blog", href: "blog.html" },
  {
    label: "More", drop: [
      { label: "About Us", href: "about.html", icon: "fa-building-columns" },
      { label: "Student Dashboard", href: "dashboard.html", icon: "fa-gauge" },
      { label: "Contact", href: "contact.html", icon: "fa-envelope" }
    ]
  }
];

function buildNavbar() {
  const cur = location.pathname.split("/").pop() || "index.html";
  const linksHTML = NAV_LINKS.map(l => {
    if (l.drop) {
      return `<li class="has-drop"><a href="javascript:void(0)" aria-haspopup="true">${l.label} <i class="fa-solid fa-chevron-down" style="font-size:.65rem"></i></a>
        <div class="dropdown" role="menu">${l.drop.map(d => `<a href="${d.href}" role="menuitem"><i class="fa-solid ${d.icon}"></i> ${d.label}</a>`).join("")}</div></li>`;
    }
    const active = cur === l.href ? "active" : "";
    return `<li><a href="${l.href}" class="${active}">${l.label}</a></li>`;
  }).join("");

  const nav = document.createElement("nav");
  nav.className = "navbar";
  nav.setAttribute("aria-label", "Main navigation");
  nav.innerHTML = `
    <div class="container nav-inner">
      <a href="index.html" class="brand" aria-label="The Nedians home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-text"><strong>The Nedians</strong><span>Study in Italy</span></span>
      </a>
      <ul class="nav-links" id="navLinks">${linksHTML}</ul>
      <div class="nav-actions">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode"><i class="fa-solid fa-moon"></i></button>
        <a href="booking.html" class="btn btn-primary btn-sm" style="display:none" id="navCta">Free Consultation</a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>`;
  document.body.prepend(nav);

  const overlay = document.createElement("div");
  overlay.className = "nav-overlay"; overlay.id = "navOverlay";
  document.body.appendChild(overlay);

  // show desktop CTA only on wide screens via CSS-less approach
  const navCta = $("#navCta");
  const setCta = () => navCta.style.display = window.innerWidth > 980 ? "inline-flex" : "none";
  setCta(); window.addEventListener("resize", setCta);

  // scroll state
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  // toggle mobile
  const toggle = $("#navToggle"), links = $("#navLinks");
  const closeMenu = () => { toggle.classList.remove("open"); links.classList.remove("open"); overlay.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; };
  toggle.addEventListener("click", () => {
    const open = toggle.classList.toggle("open");
    links.classList.toggle("open", open); overlay.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : "";
  });
  overlay.addEventListener("click", closeMenu);
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => { if (!a.closest(".has-drop") || a.getAttribute("href") !== "javascript:void(0)") closeMenu(); }));

  $("#themeToggle").addEventListener("click", toggleTheme);
  updateThemeIcon(document.documentElement.getAttribute("data-theme"));
}

/* ---------------- Footer ---------------- */
function buildFooter() {
  const f = document.createElement("footer");
  f.className = "footer";
  f.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <a href="index.html" class="brand">
            <span class="brand-mark" aria-hidden="true"></span>
            <span class="brand-text"><strong style="color:#fff">The Nedians</strong><span>Study in Italy</span></span>
          </a>
          <p>${SITE.name} is a premium education consultancy specialising exclusively in helping international students study in Italy — from university selection to visa approval.</p>
          <div class="social-row">
            <a href="${SITE.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="${SITE.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="${SITE.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="${SITE.social.youtube}" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <div class="footer-links">
            <a href="study-in-italy.html">Study in Italy</a>
            <a href="universities.html">Universities</a>
            <a href="programs.html">Programs</a>
            <a href="scholarships.html">Scholarships</a>
            <a href="blog.html">Blog & Guides</a>
          </div>
        </div>
        <div>
          <h4>Tools</h4>
          <div class="footer-links">
            <a href="eligibility.html">Eligibility Checker</a>
            <a href="compare.html">Compare Universities</a>
            <a href="checklist.html">Document Checklist</a>
            <a href="booking.html">Book Consultation</a>
            <a href="dashboard.html">Student Dashboard</a>
          </div>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <div class="footer-links">
            <a href="tel:${SITE.phone.replace(/\s/g,'')}"><i class="fa-solid fa-phone" style="color:var(--gold);margin-right:8px"></i>${SITE.phone}</a>
            <a href="mailto:${SITE.email}"><i class="fa-solid fa-envelope" style="color:var(--gold);margin-right:8px"></i>${SITE.email}</a>
            <a href="contact.html"><i class="fa-solid fa-location-dot" style="color:var(--gold);margin-right:8px"></i>${SITE.address}</a>
          </div>
          <form class="newsletter-mini" data-newsletter>
            <input type="email" placeholder="Newsletter email" aria-label="Newsletter email" required>
            <button class="btn btn-primary btn-sm" type="submit" aria-label="Subscribe"><i class="fa-solid fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved. Official partner of leading Italian universities.</span>
        <span style="display:flex;gap:18px;flex-wrap:wrap">
          <a href="javascript:void(0)" onclick="openInfoModal('Privacy Policy')">Privacy Policy</a>
          <a href="javascript:void(0)" onclick="openInfoModal('Terms of Service')">Terms of Service</a>
        </span>
      </div>
    </div>`;
  document.body.appendChild(f);

  // newsletter handler
  $$("[data-newsletter]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const email = form.querySelector("input").value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { toast("error", "Invalid email", "Please enter a valid email address."); return; }
      const subs = store.get("newsletter", []); subs.push({ email, created_at: Date.now() }); store.set("newsletter", subs);
      form.reset(); toast("success", "Subscribed!", "You're on the list for Italy study updates.");
    });
  });
}

/* ---------------- Floating elements ---------------- */
function buildFloaters() {
  const wa = document.createElement("a");
  wa.className = "whatsapp-float";
  wa.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi The Nedians! I'd like to know more about studying in Italy.")}`;
  wa.target = "_blank"; wa.rel = "noopener"; wa.setAttribute("aria-label", "Chat on WhatsApp");
  wa.innerHTML = `<i class="fa-brands fa-whatsapp"></i>`;
  document.body.appendChild(wa);

  const st = document.createElement("button");
  st.className = "scroll-top"; st.id = "scrollTop"; st.setAttribute("aria-label", "Scroll to top");
  st.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
  st.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(st);
  window.addEventListener("scroll", () => st.classList.toggle("show", window.scrollY > 500), { passive: true });

  const mc = document.createElement("div");
  mc.className = "mobile-cta";
  mc.innerHTML = `<a href="booking.html" class="btn btn-primary btn-block"><i class="fa-solid fa-calendar-check"></i> Book a Free Consultation</a>`;
  document.body.appendChild(mc);
}

/* ---------------- Toast ---------------- */
let toastWrap;
function toast(type, title, msg) {
  if (!toastWrap) { toastWrap = document.createElement("div"); toastWrap.className = "toast-wrap"; document.body.appendChild(toastWrap); }
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}"></i>
    <div><div class="t-title">${title}</div><div class="t-msg">${msg}</div></div>`;
  toastWrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 400); }, 4200);
}

/* ---------------- Modal ---------------- */
function openModal(html) {
  let bd = $("#modalBackdrop");
  if (!bd) { bd = document.createElement("div"); bd.className = "modal-backdrop"; bd.id = "modalBackdrop"; document.body.appendChild(bd); }
  bd.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
  requestAnimationFrame(() => bd.classList.add("open"));
  document.body.style.overflow = "hidden";
  bd.addEventListener("click", e => { if (e.target === bd) closeModal(); });
  $(".modal-close", bd)?.addEventListener("click", closeModal);
  document.addEventListener("keydown", escClose);
}
function escClose(e) { if (e.key === "Escape") closeModal(); }
function closeModal() {
  const bd = $("#modalBackdrop"); if (!bd) return;
  bd.classList.remove("open"); document.body.style.overflow = "";
  document.removeEventListener("keydown", escClose);
}
function openInfoModal(title) {
  openModal(`<div class="modal-head"><h3>${title}</h3><button class="modal-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button></div>
    <div class="modal-body"><p>This is a demonstration page for ${SITE.name}. Our full ${title.toLowerCase()} outlines how we collect, use, and protect your personal data in compliance with GDPR. All student data submitted through our forms is stored securely and never shared with third parties without consent.</p>
    <p class="mt-2">For the complete document or any questions, please contact us at <a href="mailto:${SITE.email}" style="color:var(--gold)">${SITE.email}</a>.</p></div>`);
}

/* ---------------- Booking modal ---------------- */
function openBookingModal() {
  openModal(`<div class="modal-head"><h3>Book a Free Consultation</h3><p>A counsellor will reach out within 24 hours.</p><button class="modal-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button></div>
    <div class="modal-body"><form id="modalBookingForm" novalidate>
      <div class="form-group"><label>Full Name <span class="req">*</span></label><input class="input" name="name" required><div class="field-error"><i class="fa-solid fa-circle-exclamation"></i> Please enter your name.</div></div>
      <div class="form-row">
        <div class="form-group"><label>Email <span class="req">*</span></label><input class="input" name="email" type="email" required><div class="field-error"><i class="fa-solid fa-circle-exclamation"></i> Valid email required.</div></div>
        <div class="form-group"><label>WhatsApp / Phone <span class="req">*</span></label><input class="input" name="phone" required><div class="field-error"><i class="fa-solid fa-circle-exclamation"></i> Phone required.</div></div>
      </div>
      <div class="form-group"><label>Study Level <span class="req">*</span></label>
        <select class="input" name="level" required><option value="">Select level</option><option>Bachelor's</option><option>Master's</option><option>PhD</option><option>Foundation</option></select>
        <div class="field-error"><i class="fa-solid fa-circle-exclamation"></i> Please select a level.</div></div>
      <div class="form-group"><label>Message</label><textarea class="textarea" name="message" placeholder="Tell us about your goals (optional)"></textarea></div>
      <button class="btn btn-primary btn-block" type="submit"><i class="fa-solid fa-paper-plane"></i> Request Consultation</button>
    </form></div>`);
  attachBookingValidation($("#modalBookingForm"));
}

function attachBookingValidation(form) {
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm(form)) { toast("error", "Check the form", "Please fix the highlighted fields."); return; }
    const data = Object.fromEntries(new FormData(form));
    const bookings = store.get("consultations", []);
    bookings.push({ ...data, id: Date.now(), date: new Date().toISOString(), status: "pending" });
    store.set("consultations", bookings);
    // also save student
    saveStudent(data);
    const btn = form.querySelector("button[type=submit]");
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...'; btn.disabled = true;
    setTimeout(() => {
      closeModal();
      toast("success", "Consultation booked!", `A confirmation email was sent to ${data.email}.`);
    }, 900);
  });
}

/* ---------------- Form validation (client-side) ---------------- */
function validateForm(form) {
  let ok = true;
  $$("[required]", form).forEach(field => {
    const wrap = field.closest(".form-group");
    const err = wrap?.querySelector(".field-error");
    let valid = field.value.trim() !== "";
    if (field.type === "email") valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value.trim());
    if (field.name === "phone") valid = field.value.trim().length >= 7;
    field.classList.toggle("error", !valid);
    err?.classList.toggle("show", !valid);
    if (!valid) ok = false;
  });
  return ok;
}
function liveValidate(form) {
  $$("[required]", form).forEach(field => {
    field.addEventListener("blur", () => {
      const wrap = field.closest(".form-group"); const err = wrap?.querySelector(".field-error");
      let valid = field.value.trim() !== "";
      if (field.type === "email") valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value.trim());
      field.classList.toggle("error", !valid); err?.classList.toggle("show", !valid);
    });
  });
}

/* ---------------- Student data ---------------- */
function saveStudent(data) {
  const students = store.get("students", []);
  if (!students.find(s => s.email === data.email)) {
    students.push({ id: Date.now(), name: data.name, email: data.email, phone: data.phone || "", nationality: data.nationality || "", created_at: Date.now() });
    store.set("students", students);
  }
}

/* ---------------- Count-up animation ---------------- */
function countUp(el, target, suffix = "", dur = 1800) {
  let start = 0, t0 = null;
  const step = ts => {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(step); else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

/* ---------------- Scroll reveal ---------------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        // count-up trigger
        $$("[data-count]", en.target).forEach(c => {
          if (!c.dataset.done) { c.dataset.done = "1"; countUp(c, +c.dataset.count, c.dataset.suffix || ""); }
        });
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach(el => io.observe(el));
  // standalone counters
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting && !en.target.dataset.done) { en.target.dataset.done = "1"; countUp(en.target, +en.target.dataset.count, en.target.dataset.suffix || ""); io2.unobserve(en.target); } });
  }, { threshold: 0.4 });
  $$("[data-count]:not(.reveal [data-count])").forEach(el => io2.observe(el));
}

/* ---------------- Countdown timers ---------------- */
function renderCountdown(deadline) {
  const target = new Date(deadline).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return `<span class="badge-pill" style="background:rgba(216,90,48,.15);color:var(--error)">Closed</span>`;
  const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5), m = Math.floor((diff % 36e5) / 6e4);
  return `<div class="countdown" data-deadline="${deadline}">
    <span class="cd-box"><b>${d}</b><small>days</small></span>
    <span class="cd-box"><b>${h}</b><small>hrs</small></span>
    <span class="cd-box"><b>${m}</b><small>min</small></span></div>`;
}
function tickCountdowns() {
  $$(".countdown[data-deadline]").forEach(c => {
    const target = new Date(c.dataset.deadline).getTime(); const diff = target - Date.now();
    if (diff <= 0) { c.outerHTML = `<span class="badge-pill" style="background:rgba(216,90,48,.15);color:var(--error)">Closed</span>`; return; }
    const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5), m = Math.floor((diff % 36e5) / 6e4);
    const boxes = c.querySelectorAll(".cd-box b");
    if (boxes[0]) boxes[0].textContent = d; if (boxes[1]) boxes[1].textContent = h; if (boxes[2]) boxes[2].textContent = m;
  });
}

/* ---------------- Confetti ---------------- */
function fireConfetti() {
  const colors = ["#C9A84C", "#0B1C3E", "#1D9E75", "#e3cd8b", "#fff"];
  for (let i = 0; i < 90; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    document.body.appendChild(c);
    const fall = 80 + Math.random() * 40, dur = 2200 + Math.random() * 1600;
    c.animate([{ transform: `translateY(0) rotate(0)`, opacity: 1 }, { transform: `translateY(${fall}vh) rotate(${720 + Math.random() * 360}deg)`, opacity: 0 }], { duration: dur, easing: "cubic-bezier(.2,.6,.4,1)" });
    setTimeout(() => c.remove(), dur);
  }
}

/* ---------------- Page transition fade-in ---------------- */
function initPageFade() {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity .5s ease";
  requestAnimationFrame(() => { document.body.style.opacity = "1"; });
}

/* ---------------- Boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  buildNavbar();
  buildFooter();
  buildFloaters();
  initReveal();
  initPageFade();
  setInterval(tickCountdowns, 60000);
  // expose for inline handlers
  window.openBookingModal = openBookingModal;
  window.openInfoModal = openInfoModal;
  window.toast = toast;
  // any [data-book] buttons open modal
  $$("[data-book]").forEach(b => b.addEventListener("click", openBookingModal));
});
