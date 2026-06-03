/* ============================================================
   THE NEDIANS — Page render functions
   Each page calls its renderer at the bottom of its HTML.
   ============================================================ */

/* ---------- Shared card builders ---------- */
function uniCard(u, opts = {}) {
  const tags = u.fields.slice(0, 3).map(f => `<span class="tag">${f}</span>`).join("");
  return `<article class="card uni-card reveal">
    <div class="uni-card-img">
      <img src="${u.img}" alt="${u.name} campus" loading="lazy">
      <span class="city-badge"><i class="fa-solid fa-location-dot"></i> ${u.city}</span>
      <span class="rank-badge">QS #${u.ranking}</span>
    </div>
    <div class="uni-card-body">
      <h3>${u.short}</h3>
      <div class="uni-meta">${u.name}</div>
      <div class="tags">${tags}</div>
      <div class="uni-stats">
        <div class="uni-stat"><div class="v">${fmtMoney(u.tuitionMin)}+</div><div class="l">Tuition/yr</div></div>
        <div class="uni-stat"><div class="v">IELTS ${u.ielts}</div><div class="l">English</div></div>
        <div class="uni-stat"><div class="v">${u.langs.length}</div><div class="l">Languages</div></div>
      </div>
      <div class="flex between center-y mb-2" style="gap:8px">
        <small style="font-family:var(--font-head);font-weight:600;color:var(--text-head)"><i class="fa-regular fa-clock" style="color:var(--gold)"></i> Deadline</small>
        ${renderCountdown(u.deadline)}
      </div>
      <a href="university.html?slug=${u.slug}" class="btn btn-navy btn-block">View Details <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </article>`;
}

function programCard(p) {
  return `<article class="card feature-card reveal" style="padding:24px">
    <span class="badge-pill mb-2">${p.level}</span>
    <h3 style="font-size:1.1rem;margin-bottom:6px">${p.name}</h3>
    <div class="uni-meta mb-2"><i class="fa-solid fa-building-columns" style="color:var(--gold)"></i> ${p.uniName} · ${p.city}</div>
    <div class="tags mb-2">
      <span class="tag"><i class="fa-solid fa-language"></i> ${p.lang}</span>
      <span class="tag"><i class="fa-regular fa-clock"></i> ${p.duration}</span>
      <span class="tag gold">${fmtMoney(p.tuitionMin)}/yr</span>
    </div>
    <a href="university.html?slug=${p.uniSlug}" class="btn btn-ghost btn-sm btn-block">View University <i class="fa-solid fa-arrow-right"></i></a>
  </article>`;
}

/* ============================================================
   HOMEPAGE
   ============================================================ */
function renderHomepage() {
  const heroImg = document.getElementById("heroImg");
  if (heroImg) heroImg.src = IMG.rome;

  // stats
  const hs = document.getElementById("heroStats");
  if (hs) hs.innerHTML = SITE.stats.map(s =>
    `<div class="stat-item"><div class="stat-num" data-count="${s.num}" data-suffix="${s.suffix}">0</div><div class="stat-label">${s.label}</div></div>`).join("");

  // features
  const features = [
    { icon: "fa-bullseye", title: "Italy Specialists", text: "We focus exclusively on Italy — deep expertise in every university, deadline, and visa nuance." },
    { icon: "fa-hand-holding-heart", title: "Honest Guidance", text: "We match you to universities you'll actually get into — no false promises, ever." },
    { icon: "fa-award", title: "Scholarship Experts", text: "We've unlocked over €2M in DiSCo, ER.GO, EDISU and MAECI scholarships for students." },
    { icon: "fa-passport", title: "98% Visa Success", text: "Personalised document checklists and interview prep give you the best approval odds." }
  ];
  const fg = document.getElementById("featureGrid");
  if (fg) fg.innerHTML = features.map((f, i) =>
    `<div class="card feature-card reveal reveal-d${(i % 4) + 1}"><div class="feature-icon"><i class="fa-solid ${f.icon}"></i></div><h3>${f.title}</h3><p>${f.text}</p></div>`).join("");

  // featured unis
  const fu = document.getElementById("featuredUnis");
  if (fu) fu.innerHTML = UNIVERSITIES.slice(0, 3).map(u => uniCard(u)).join("");

  // steps
  const steps = [
    { t: "Free Consultation", d: "Share your goals. We assess your profile and answer every question." },
    { t: "University Matching", d: "We shortlist the best-fit programs and scholarships for you." },
    { t: "Application & Docs", d: "We prepare and submit a flawless application on your behalf." },
    { t: "Visa & Arrival", d: "Visa support, pre-departure briefing, and a smooth landing in Italy." }
  ];
  const sg = document.getElementById("stepsGrid");
  if (sg) sg.innerHTML = steps.map((s, i) =>
    `<div class="step reveal reveal-d${i + 1}"><div class="step-num">${i + 1}</div><h4>${s.t}</h4><p>${s.d}</p></div>`).join("");

  // levels
  const levels = [
    { icon: "fa-graduation-cap", title: "Bachelor's", text: "3-year undergraduate degrees in English & Italian.", href: "programs.html?level=Bachelor's" },
    { icon: "fa-user-graduate", title: "Master's", text: "2-year specialised programs, mostly taught in English.", href: "programs.html?level=Master's" },
    { icon: "fa-flask", title: "PhD", text: "Funded doctoral research positions across Italy.", href: "programs.html?level=PhD" },
    { icon: "fa-school", title: "Foundation", text: "Pathway & high-school programs to bridge into degrees.", href: "programs.html?level=Foundation" }
  ];
  const lg = document.getElementById("levelGrid");
  if (lg) lg.innerHTML = levels.map((l, i) =>
    `<a href="${l.href}" class="card feature-card reveal reveal-d${(i % 4) + 1}" style="text-decoration:none"><div class="feature-icon"><i class="fa-solid ${l.icon}"></i></div><h3>${l.title}</h3><p>${l.text}</p><span style="color:var(--gold);font-family:var(--font-head);font-weight:600;font-size:.88rem;margin-top:10px;display:inline-block">Explore <i class="fa-solid fa-arrow-right"></i></span></a>`).join("");

  renderTestimonials();
  renderFAQ();
  reObserveReveals();
}

/* ---------- Testimonials ---------- */
function renderTestimonials(containerId = "testiTrack") {
  const track = document.getElementById(containerId);
  if (!track) return;
  track.innerHTML = TESTIMONIALS.map(t => {
    const initials = t.name.split(" ").map(n => n[0]).join("");
    const avatar = `<div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--navy),var(--navy-2));color:var(--gold);display:grid;place-items:center;font-family:var(--font-head);font-weight:700;flex-shrink:0">${initials}</div>`;
    return `<div class="card testi-card">
      <div class="testi-stars">${"★".repeat(t.stars)}</div>
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-author">${avatar}<div><div class="name">${t.name}</div><div class="role">${t.role}</div></div></div>
    </div>`;
  }).join("");

  const prev = document.getElementById("testiPrev"), next = document.getElementById("testiNext");
  const scrollAmt = () => Math.min(track.clientWidth * 0.8, 404);
  prev?.addEventListener("click", () => track.scrollBy({ left: -scrollAmt(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: scrollAmt(), behavior: "smooth" }));
}

/* ---------- FAQ ---------- */
function renderFAQ(containerId = "faqList", faqs = FAQS) {
  const list = document.getElementById(containerId);
  if (!list) return;
  list.innerHTML = faqs.map((f, i) =>
    `<div class="faq-item">
      <button class="faq-q" aria-expanded="false"><span>${f.q}</span><i class="fa-solid fa-chevron-down"></i></button>
      <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
    </div>`).join("");
  $$(".faq-q", list).forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const open = item.classList.contains("open");
      $$(".faq-item", list).forEach(it => { it.classList.remove("open"); it.querySelector(".faq-a").style.maxHeight = null; it.querySelector(".faq-q").setAttribute("aria-expanded", "false"); });
      if (!open) { item.classList.add("open"); item.querySelector(".faq-a").style.maxHeight = item.querySelector(".faq-a-inner").scrollHeight + "px"; btn.setAttribute("aria-expanded", "true"); }
    });
  });
}

/* ---------- re-observe newly added reveal elements ---------- */
function reObserveReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(c => { if (!c.dataset.done) { c.dataset.done = "1"; countUp(c, +c.dataset.count, c.dataset.suffix || ""); } });
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal:not(.in)").forEach(el => io.observe(el));
}

/* ============================================================
   STUDY IN ITALY
   ============================================================ */
function renderStudyInItaly() {
  const ph = document.getElementById("phImg"); if (ph) ph.src = IMG.bologna;

  const why = [
    { icon: "fa-euro-sign", title: "Affordable Tuition", text: "Public universities charge €500–€4,000/year — a fraction of the UK or US, with income-based discounts." },
    { icon: "fa-ranking-star", title: "Top-Ranked Universities", text: "Home to the world's oldest university and dozens of globally ranked institutions." },
    { icon: "fa-language", title: "English-Taught Degrees", text: "Hundreds of programs taught entirely in English — no Italian required to start." },
    { icon: "fa-landmark", title: "Unmatched Culture", text: "Live among Renaissance art, ancient history, and the finest food in the world." },
    { icon: "fa-briefcase", title: "Work & Stay Options", text: "Work 20 hrs/week as a student and access post-study work permits after graduation." }
  ];
  const wg = document.getElementById("whyGrid");
  if (wg) wg.innerHTML = why.map((w, i) => `<div class="card feature-card reveal reveal-d${(i % 4) + 1}"><div class="feature-icon"><i class="fa-solid ${w.icon}"></i></div><h3>${w.title}</h3><p>${w.text}</p></div>`).join("");

  const cg = document.getElementById("cityGrid");
  if (cg) cg.innerHTML = CITIES.map((c, i) => `<article class="card uni-card reveal reveal-d${(i % 4) + 1}">
      <div class="uni-card-img"><img src="${c.img}" alt="${c.name}, Italy" loading="lazy"><span class="city-badge"><i class="fa-solid fa-location-dot"></i> ${c.name}</span><span class="rank-badge">${c.unis} Unis</span></div>
      <div class="uni-card-body"><h3>${c.name}</h3><span class="badge-pill mb-2">${c.tag}</span><p style="font-size:.92rem;margin-bottom:14px">${c.desc}</p>
      <a href="universities.html" class="btn btn-ghost btn-sm btn-block">View Universities <i class="fa-solid fa-arrow-right"></i></a></div></article>`).join("");

  const intakes = [
    { season: "September Intake (Autumn)", icon: "fa-leaf", color: "var(--gold)", apply: "Nov – Apr", note: "The main intake. Widest choice of programs and scholarships. Best for non-EU students needing visa time." },
    { season: "February Intake (Spring)", icon: "fa-snowflake", color: "var(--success)", apply: "Sep – Nov", note: "A smaller secondary intake at select universities. Ideal if you missed the autumn deadline." }
  ];
  const ig = document.getElementById("intakeGrid");
  if (ig) ig.innerHTML = intakes.map((t, i) => `<div class="card feature-card reveal reveal-d${i + 1}">
      <div class="feature-icon" style="color:${t.color}"><i class="fa-solid ${t.icon}"></i></div>
      <h3>${t.season}</h3>
      <div class="flex center-y gap mb-2 mt-1"><span class="badge-pill">Apply: ${t.apply}</span></div>
      <p>${t.note}</p></div>`).join("");

  reObserveReveals();
}

/* ============================================================
   UNIVERSITIES DATABASE
   ============================================================ */
function renderUniversities() {
  const grid = document.getElementById("uGrid");
  const count = document.getElementById("uCount");
  const empty = document.getElementById("uEmpty");
  const search = document.getElementById("uSearch");
  const fCity = document.getElementById("fCity"), fLevel = document.getElementById("fLevel"),
        fLang = document.getElementById("fLang"), fTuition = document.getElementById("fTuition"), fSort = document.getElementById("fSort");

  // populate filters
  [...new Set(UNIVERSITIES.map(u => u.city))].sort().forEach(c => fCity.add(new Option(c, c)));
  [...new Set(UNIVERSITIES.flatMap(u => u.levels))].forEach(l => fLevel.add(new Option(l, l)));
  [...new Set(UNIVERSITIES.flatMap(u => u.langs))].forEach(l => fLang.add(new Option(l, l)));

  // skeleton then render
  grid.innerHTML = Array(6).fill('<div class="card skel-card skeleton"></div>').join("");

  function apply() {
    const q = search.value.toLowerCase().trim();
    let list = UNIVERSITIES.filter(u => {
      if (q && !(u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q) || u.fields.join(" ").toLowerCase().includes(q))) return false;
      if (fCity.value && u.city !== fCity.value) return false;
      if (fLevel.value && !u.levels.includes(fLevel.value)) return false;
      if (fLang.value && !u.langs.includes(fLang.value)) return false;
      if (fTuition.value && u.tuitionMin > +fTuition.value) return false;
      return true;
    });
    if (fSort.value === "tuition") list.sort((a, b) => a.tuitionMin - b.tuitionMin);
    else if (fSort.value === "name") list.sort((a, b) => a.short.localeCompare(b.short));
    else list.sort((a, b) => a.ranking - b.ranking);

    count.innerHTML = `Showing <b>${list.length}</b> of ${UNIVERSITIES.length} universities`;
    if (!list.length) { grid.innerHTML = ""; empty.classList.remove("hidden"); }
    else { empty.classList.add("hidden"); grid.innerHTML = list.map(u => uniCard(u)).join(""); reObserveReveals(); }
  }

  setTimeout(apply, 400);
  [search, fCity, fLevel, fLang, fTuition, fSort].forEach(el => el.addEventListener("input", apply));
  document.getElementById("uClear")?.addEventListener("click", () => {
    search.value = ""; [fCity, fLevel, fLang, fTuition].forEach(s => s.value = ""); fSort.value = "rank"; apply();
  });
}

/* ============================================================
   UNIVERSITY DETAIL
   ============================================================ */
function renderUniversityDetail() {
  const slug = new URLSearchParams(location.search).get("slug");
  const u = UNIVERSITIES.find(x => x.slug === slug);
  const root = document.getElementById("uniDetail");
  if (!u) {
    root.innerHTML = `<div class="section" style="padding-top:160px;text-align:center"><div class="container">
      <i class="fa-solid fa-circle-question" style="font-size:3rem;color:var(--gold)"></i>
      <h1 class="mt-2">University Not Found</h1><p class="mb-3">We couldn't find that university.</p>
      <a href="universities.html" class="btn btn-primary">Back to Universities</a></div></div>`;
    return;
  }
  document.title = `${u.name} | The Nedians`;

  let levelFilter = "All";
  function progRows() {
    const list = levelFilter === "All" ? u.programsList : u.programsList.filter(p => p.level === levelFilter);
    return list.map(p => `<tr><td style="background:transparent;font-weight:600;color:var(--text-head)">${p.name}</td><td>${p.level}</td><td>${p.lang}</td><td>${p.duration}</td></tr>`).join("");
  }
  const levels = ["All", ...new Set(u.programsList.map(p => p.level))];

  const related = UNIVERSITIES.filter(x => x.slug !== u.slug && (x.city === u.city || x.fields.some(f => u.fields.includes(f)))).slice(0, 3);

  root.innerHTML = `
    <header class="page-header with-img" style="padding:160px 0 60px">
      <div class="page-header-bg"><img src="${u.banner}" alt="${u.name}"></div>
      <div class="container">
        <div class="breadcrumb"><a href="index.html">Home</a><i class="fa-solid fa-chevron-right"></i><a href="universities.html">Universities</a><i class="fa-solid fa-chevron-right"></i><span>${u.short}</span></div>
        <span class="city-badge" style="position:static;display:inline-flex;margin-bottom:14px"><i class="fa-solid fa-location-dot"></i> ${u.city}, Italy</span>
        <h1>${u.name}</h1>
        <p>QS World Ranking #${u.ranking} · ${u.langs.join(" & ")} programs · Tuition from ${fmtMoney(u.tuitionMin)}/year</p>
        <div class="hero-actions mt-3">
          <button class="btn btn-primary" data-book><i class="fa-solid fa-calendar-check"></i> Book Consultation</button>
          <a href="eligibility.html" class="btn btn-light"><i class="fa-solid fa-clipboard-check"></i> Check Eligibility</a>
        </div>
      </div>
    </header>

    <section class="section">
      <div class="container" style="display:grid;grid-template-columns:1fr 340px;gap:40px;align-items:start" id="udLayout">
        <div>
          <div class="reveal in"><span class="eyebrow">About</span><h2 class="section-title" style="font-size:1.8rem">About ${u.short}</h2><p>${u.about}</p></div>

          <div class="reveal in mt-4"><span class="eyebrow">Programs</span><h2 class="section-title" style="font-size:1.8rem">Available Programs</h2>
            <div class="tags mb-3" id="levelTabs">${levels.map(l => `<button class="tag ${l === "All" ? "gold" : ""}" data-lvl="${l}">${l}</button>`).join("")}</div>
            <div class="table-wrap"><table class="compare-table"><thead><tr><th>Program</th><th>Level</th><th>Language</th><th>Duration</th></tr></thead><tbody id="progBody">${progRows()}</tbody></table></div>
          </div>

          <div class="reveal in mt-4"><span class="eyebrow">Admissions</span><h2 class="section-title" style="font-size:1.8rem">Admission Requirements</h2>
            <div class="table-wrap"><table class="compare-table"><tbody>${u.requirements.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody></table></div>
          </div>

          <div class="reveal in mt-4"><span class="eyebrow">Location</span><h2 class="section-title" style="font-size:1.8rem">Find ${u.short} on the Map</h2>
            <iframe class="map-embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${u.lat},${u.lng}&z=13&output=embed" title="Map of ${u.name}"></iframe>
          </div>
        </div>

        <aside style="position:sticky;top:100px">
          <div class="card" style="padding:24px">
            <h3 style="font-size:1.15rem;margin-bottom:16px">Quick Facts</h3>
            <div class="flex between mb-2" style="padding-bottom:10px;border-bottom:1px solid var(--border)"><span>Ranking</span><b style="color:var(--text-head)">QS #${u.ranking}</b></div>
            <div class="flex between mb-2" style="padding-bottom:10px;border-bottom:1px solid var(--border)"><span>Tuition</span><b style="color:var(--text-head)">${fmtMoney(u.tuitionMin)}–${fmtMoney(u.tuitionMax)}</b></div>
            <div class="flex between mb-2" style="padding-bottom:10px;border-bottom:1px solid var(--border)"><span>Min IELTS</span><b style="color:var(--text-head)">${u.ielts}</b></div>
            <div class="flex between mb-2" style="padding-bottom:10px;border-bottom:1px solid var(--border)"><span>Languages</span><b style="color:var(--text-head)">${u.langs.join(", ")}</b></div>
            <div class="flex between mb-3"><span>Scholarship</span><b style="color:${u.scholarship ? 'var(--success)' : 'var(--error)'}">${u.scholarship ? "Available" : "Limited"}</b></div>
            <div class="mb-2"><small style="font-family:var(--font-head);font-weight:600;color:var(--text-head)">Application Deadline</small></div>
            <div class="mb-3">${renderCountdown(u.deadline)}</div>
            <button class="btn btn-primary btn-block mb-2" data-book><i class="fa-solid fa-paper-plane"></i> Apply Now</button>
            <button class="btn btn-ghost btn-block" id="saveUni"><i class="fa-regular fa-bookmark"></i> Save University</button>
          </div>
        </aside>
      </div>
    </section>

    ${related.length ? `<section class="section" style="background:var(--surface)"><div class="container">
      <span class="eyebrow">You Might Also Like</span><h2 class="section-title" style="font-size:1.8rem">Related Universities</h2>
      <div class="grid uni-grid">${related.map(r => uniCard(r)).join("")}</div></div></section>` : ""}
  `;

  // program level tabs
  $$("#levelTabs [data-lvl]").forEach(btn => btn.addEventListener("click", () => {
    levelFilter = btn.dataset.lvl;
    $$("#levelTabs [data-lvl]").forEach(b => b.classList.toggle("gold", b.dataset.lvl === levelFilter));
    document.getElementById("progBody").innerHTML = progRows();
  }));

  // save university
  const saveBtn = document.getElementById("saveUni");
  const saved = store.get("saved_unis", []);
  const isSaved = () => store.get("saved_unis", []).includes(u.slug);
  function refreshSave() { saveBtn.innerHTML = isSaved() ? '<i class="fa-solid fa-bookmark"></i> Saved' : '<i class="fa-regular fa-bookmark"></i> Save University'; }
  refreshSave();
  saveBtn.addEventListener("click", () => {
    let s = store.get("saved_unis", []);
    if (s.includes(u.slug)) { s = s.filter(x => x !== u.slug); toast("success", "Removed", `${u.short} removed from saved.`); }
    else { s.push(u.slug); toast("success", "Saved!", `${u.short} added to your dashboard.`); }
    store.set("saved_unis", s); refreshSave();
  });

  // responsive: stack sidebar
  const adjust = () => { document.getElementById("udLayout").style.gridTemplateColumns = window.innerWidth < 920 ? "1fr" : "1fr 340px"; };
  adjust(); window.addEventListener("resize", adjust);
  reObserveReveals();
}

/* ============================================================
   PROGRAMS
   ============================================================ */
function renderPrograms() {
  const grid = document.getElementById("pGrid"), count = document.getElementById("pCount"), empty = document.getElementById("pEmpty");
  const search = document.getElementById("pSearch"), pField = document.getElementById("pField"),
        pCity = document.getElementById("pCity"), pLang = document.getElementById("pLang"), tabs = document.getElementById("levelTabs");

  [...new Set(PROGRAMS.map(p => p.field))].sort().forEach(f => pField.add(new Option(f, f)));
  [...new Set(PROGRAMS.map(p => p.city))].sort().forEach(c => pCity.add(new Option(c, c)));
  [...new Set(PROGRAMS.map(p => p.lang))].sort().forEach(l => pLang.add(new Option(l, l)));

  const levels = ["All", ...new Set(PROGRAMS.map(p => p.level))];
  let activeLevel = new URLSearchParams(location.search).get("level") || "All";
  if (!levels.includes(activeLevel)) activeLevel = "All";
  tabs.innerHTML = levels.map(l => `<button class="tag ${l === activeLevel ? "gold" : ""}" data-lvl="${l}" style="font-size:.92rem;padding:9px 18px">${l}</button>`).join("");

  function apply() {
    const q = search.value.toLowerCase().trim();
    const list = PROGRAMS.filter(p => {
      if (activeLevel !== "All" && p.level !== activeLevel) return false;
      if (q && !(p.name.toLowerCase().includes(q) || p.uniName.toLowerCase().includes(q) || p.field.toLowerCase().includes(q))) return false;
      if (pField.value && p.field !== pField.value) return false;
      if (pCity.value && p.city !== pCity.value) return false;
      if (pLang.value && p.lang !== pLang.value) return false;
      return true;
    });
    count.innerHTML = `Showing <b>${list.length}</b> programs`;
    if (!list.length) { grid.innerHTML = ""; empty.classList.remove("hidden"); }
    else { empty.classList.add("hidden"); grid.innerHTML = list.map(programCard).join(""); reObserveReveals(); }
  }
  apply();
  [search, pField, pCity, pLang].forEach(el => el.addEventListener("input", apply));
  $$("#levelTabs [data-lvl]").forEach(b => b.addEventListener("click", () => {
    activeLevel = b.dataset.lvl;
    $$("#levelTabs [data-lvl]").forEach(x => x.classList.toggle("gold", x.dataset.lvl === activeLevel));
    apply();
  }));
  document.getElementById("pClear")?.addEventListener("click", () => { search.value = ""; [pField, pCity, pLang].forEach(s => s.value = ""); activeLevel = "All"; $$("#levelTabs [data-lvl]").forEach(x => x.classList.toggle("gold", x.dataset.lvl === "All")); apply(); });
}

/* ============================================================
   ELIGIBILITY CHECKER
   ============================================================ */
function normalizeGrade(type, val) {
  val = parseFloat(val); if (isNaN(val)) return 0;
  if (type === "cgpa4") return Math.min(100, (val / 4) * 100);
  if (type === "cgpa10") return Math.min(100, (val / 10) * 100);
  return Math.min(100, val);
}

function renderEligibility() {
  const form = document.getElementById("eligForm");
  const steps = $$(".step-panel", form);
  const total = steps.length;
  let cur = 1;
  const data = { level: "", english: "" };

  // fill prefs
  const citySel = form.querySelector("[name=city]"), fieldSel = form.querySelector("[name=field]");
  [...new Set(UNIVERSITIES.map(u => u.city))].sort().forEach(c => citySel.add(new Option(c, c)));
  [...new Set(UNIVERSITIES.flatMap(u => u.fields))].sort().forEach(f => fieldSel.add(new Option(f, f)));

  // progress steps labels
  const labels = ["Level", "Origin", "Grades", "English", "Preferences"];
  document.getElementById("progressSteps").innerHTML = labels.map((l, i) => `<div class="ps" data-ps="${i + 1}"><span class="dot">${i + 1}</span><span>${l}</span></div>`).join("");

  function updateProgress() {
    document.getElementById("progressFill").style.width = (cur / total * 100) + "%";
    $$(".ps").forEach(ps => {
      const n = +ps.dataset.ps;
      ps.classList.toggle("active", n === cur);
      ps.classList.toggle("done", n < cur);
      if (n < cur) ps.querySelector(".dot").innerHTML = '<i class="fa-solid fa-check"></i>';
      else ps.querySelector(".dot").textContent = n;
    });
  }
  function show(n) {
    steps.forEach(s => s.classList.toggle("active", +s.dataset.step === n));
    cur = n; updateProgress();
    document.getElementById("prevBtn").style.visibility = n === 1 ? "hidden" : "visible";
    document.getElementById("nextBtn").innerHTML = n === total ? '<i class="fa-solid fa-wand-magic-sparkles"></i> See My Matches' : 'Next <i class="fa-solid fa-arrow-right"></i>';
  }

  // choice cards
  $$("[data-choice]", form).forEach(group => {
    const key = group.dataset.choice;
    $$(".choice", group).forEach(c => c.addEventListener("click", () => {
      $$(".choice", group).forEach(x => x.classList.remove("selected"));
      c.classList.add("selected"); data[key] = c.dataset.val;
      if (key === "english") form.querySelector("#ieltsWrap").style.display = c.dataset.val === "ielts" ? "block" : "none";
    }));
  });

  // grade preview
  const gradeType = form.querySelector("#gradeType"), gradeInput = form.querySelector("#gradeInput"), normPreview = document.getElementById("normPreview");
  function showNorm() {
    if (gradeInput.value) { const n = normalizeGrade(gradeType.value, gradeInput.value); normPreview.style.display = "inline-block"; normPreview.textContent = `Normalised: ${n.toFixed(0)} / 100`; }
    else normPreview.style.display = "none";
  }
  gradeType.addEventListener("change", showNorm); gradeInput.addEventListener("input", showNorm);

  function validateStep(n) {
    if (n === 1 && !data.level) { toast("error", "Select a level", "Please choose a study level."); return false; }
    if (n === 4 && !data.english) { toast("error", "Select an option", "Please choose your English proof."); return false; }
    const panel = steps.find(s => +s.dataset.step === n);
    const reqs = $$("[required]", panel);
    let ok = true;
    reqs.forEach(f => {
      const wrap = f.closest(".form-group"); const err = wrap?.querySelector(".field-error");
      let valid = f.value.trim() !== "";
      if (f.type === "email") valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value.trim());
      f.classList.toggle("error", !valid); err?.classList.toggle("show", !valid);
      if (!valid) ok = false;
    });
    return ok;
  }

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (!validateStep(cur)) return;
    if (cur < total) { show(cur + 1); document.getElementById("formCard").scrollIntoView({ behavior: "smooth", block: "center" }); }
    else submit();
  });
  document.getElementById("prevBtn").addEventListener("click", () => { if (cur > 1) show(cur - 1); });

  function submit() {
    const fd = Object.fromEntries(new FormData(form));
    const normGrade = normalizeGrade(fd.gradeType, fd.grade);
    const ielts = data.english === "ielts" ? parseFloat(fd.ielts || 0) : (data.english === "moi" ? 6.0 : 0);

    // matching logic
    const matches = UNIVERSITIES.map(u => {
      let score = 0;
      if (u.levels.includes(data.level)) score += 35; else score += 5;
      if (normGrade >= u.minGrade) score += 30; else score += Math.max(0, 30 - (u.minGrade - normGrade));
      if (ielts >= u.ielts) score += 20; else if (data.english === "none") score += 6; else score += Math.max(0, 20 - (u.ielts - ielts) * 8);
      if (fd.city && u.city === fd.city) score += 8; else if (!fd.city) score += 4;
      if (fd.field && u.fields.includes(fd.field)) score += 7; else if (!fd.field) score += 3;
      return { u, pct: Math.min(98, Math.round(score)) };
    }).filter(m => m.pct >= 45).sort((a, b) => b.pct - a.pct);

    // save submission + student
    const subs = store.get("eligibility", []);
    subs.push({ id: Date.now(), name: fd.name, email: fd.email, level: data.level, nationality: fd.nationality, country: fd.country, grade: normGrade.toFixed(0), english: data.english, ielts, city_pref: fd.city, field_pref: fd.field, matched: matches.map(m => m.u.slug), created_at: Date.now() });
    store.set("eligibility", subs);
    saveStudent({ name: fd.name, email: fd.email, nationality: fd.nationality });
    store.set("last_elig", { name: fd.name, email: fd.email, matched: matches.map(m => ({ slug: m.u.slug, pct: m.pct })) });

    // render results
    document.getElementById("progressWrap").classList.add("hidden");
    document.getElementById("formCard").classList.add("hidden");
    const res = document.getElementById("results");
    res.classList.remove("hidden");
    res.innerHTML = `
      <div class="text-center mb-3">
        <div class="feature-icon" style="margin:0 auto 14px;width:70px;height:70px;font-size:1.8rem"><i class="fa-solid fa-circle-check" style="color:var(--success)"></i></div>
        <h2 class="section-title" style="font-size:1.8rem">Great news, ${fd.name.split(" ")[0]}!</h2>
        <p class="section-sub">Based on your profile, we found <b style="color:var(--gold)">${matches.length}</b> matching ${matches.length === 1 ? "university" : "universities"}. A copy has been emailed to ${fd.email}.</p>
      </div>
      ${matches.length ? `<div class="grid uni-grid">${matches.map(m => {
        const cls = m.pct >= 75 ? "match-high" : "match-mid";
        const card = uniCard(m.u);
        return card.replace('<div class="uni-card-body">', `<div class="uni-card-body"><div class="match-badge ${cls}" style="position:absolute;margin-top:-46px"><i class="fa-solid fa-bullseye"></i> ${m.pct}% Match</div>`);
      }).join("")}</div>` : `<div class="card text-center" style="padding:40px"><p>No strong matches yet — but our counsellors can still help. Book a free consultation.</p></div>`}
      <div class="flex center-y wrap mt-4" style="justify-content:center;gap:14px">
        <button class="btn btn-primary" id="saveResults"><i class="fa-solid fa-envelope"></i> Email Me These Results</button>
        <button class="btn btn-navy" data-book><i class="fa-solid fa-calendar-check"></i> Book Consultation</button>
        <button class="btn btn-ghost" id="restartElig"><i class="fa-solid fa-rotate-left"></i> Start Over</button>
      </div>`;
    res.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(fireConfetti, 300);
    reObserveReveals();
    $$("[data-book]", res).forEach(b => b.addEventListener("click", openBookingModal));
    document.getElementById("saveResults").addEventListener("click", () => toast("success", "Results sent!", `We've emailed your matches to ${fd.email}.`));
    document.getElementById("restartElig").addEventListener("click", () => location.reload());
  }

  show(1);
}

/* ============================================================
   SCHOLARSHIPS
   ============================================================ */
function renderScholarships() {
  const grid = document.getElementById("sGrid"), count = document.getElementById("sCount"), empty = document.getElementById("sEmpty");
  const search = document.getElementById("sSearch"), sLevel = document.getElementById("sLevel"),
        sNat = document.getElementById("sNat"), sUni = document.getElementById("sUni");

  [...new Set(SCHOLARSHIPS.map(s => s.level))].forEach(l => sLevel.add(new Option(l, l)));
  [...new Set(SCHOLARSHIPS.map(s => s.nationality))].forEach(n => sNat.add(new Option(n, n)));
  [...new Set(SCHOLARSHIPS.map(s => s.uni))].forEach(u => sUni.add(new Option(u, u)));

  function apply() {
    const q = search.value.toLowerCase().trim();
    const list = SCHOLARSHIPS.filter(s => {
      if (q && !(s.name.toLowerCase().includes(q) || s.uni.toLowerCase().includes(q))) return false;
      if (sLevel.value && s.level !== sLevel.value) return false;
      if (sNat.value && s.nationality !== sNat.value) return false;
      if (sUni.value && s.uni !== sUni.value) return false;
      return true;
    });
    count.innerHTML = `Showing <b>${list.length}</b> scholarships`;
    if (!list.length) { grid.innerHTML = ""; empty.classList.remove("hidden"); return; }
    empty.classList.add("hidden");
    grid.innerHTML = list.map(s => `<article class="card reveal" style="padding:26px;display:flex;flex-direction:column">
      <div class="flex between center-y mb-2"><span class="badge-pill">${s.level}</span><span class="tag gold">${s.nationality}</span></div>
      <h3 style="font-size:1.18rem;margin-bottom:6px">${s.name}</h3>
      <div style="font-family:var(--font-head);font-weight:800;color:var(--success);font-size:1.3rem;margin-bottom:10px">${s.amount}</div>
      <div class="uni-meta mb-2"><i class="fa-solid fa-building-columns" style="color:var(--gold)"></i> ${s.uni}</div>
      <p style="font-size:.9rem;margin-bottom:16px;flex:1">${s.summary}</p>
      <div class="flex between center-y mb-3" style="gap:8px"><small style="font-family:var(--font-head);font-weight:600;color:var(--text-head)">Deadline</small>${renderCountdown(s.deadline)}</div>
      <button class="btn btn-navy btn-block" data-book><i class="fa-solid fa-paper-plane"></i> Apply with Help</button>
    </article>`).join("");
    $$("[data-book]", grid).forEach(b => b.addEventListener("click", openBookingModal));
    reObserveReveals();
  }
  apply();
  [search, sLevel, sNat, sUni].forEach(el => el.addEventListener("input", apply));
  document.getElementById("sClear")?.addEventListener("click", () => { search.value = ""; [sLevel, sNat, sUni].forEach(s => s.value = ""); apply(); });
}

/* ============================================================
   COMPARE
   ============================================================ */
function renderCompare() {
  const sel = document.getElementById("compareSelect"), result = document.getElementById("compareResult");
  let chosen = store.get("comparison", []).filter(s => UNIVERSITIES.find(u => u.slug === s));

  sel.innerHTML = UNIVERSITIES.map(u => `<div class="choice ${chosen.includes(u.slug) ? "selected" : ""}" data-slug="${u.slug}">
    <i class="fa-solid fa-building-columns"></i><h4 style="font-size:.95rem">${u.short}</h4><p>${u.city}</p></div>`).join("");

  function draw() {
    if (chosen.length < 2) { result.innerHTML = `<div class="card text-center" style="padding:50px"><i class="fa-solid fa-scale-balanced" style="font-size:2.5rem;color:var(--gold)"></i><h3 class="mt-2">Select at least 2 universities</h3><p>Choose universities above to see a detailed side-by-side comparison.</p></div>`; return; }
    const us = chosen.map(s => UNIVERSITIES.find(u => u.slug === s));
    const rows = [
      ["City", u => u.city],
      ["QS Ranking", u => "#" + u.ranking],
      ["Tuition / year", u => fmtMoney(u.tuitionMin) + " – " + fmtMoney(u.tuitionMax)],
      ["Languages", u => u.langs.join(", ")],
      ["Min IELTS", u => u.ielts],
      ["Min Grade", u => u.minGrade + "%"],
      ["Levels", u => u.levels.join(", ")],
      ["Fields", u => u.fields.slice(0, 3).join(", ")],
      ["Scholarship", u => u.scholarship ? '<span style="color:var(--success)"><i class="fa-solid fa-check"></i> Yes</span>' : '<span style="color:var(--error)">Limited</span>'],
      ["Deadline", u => new Date(u.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })]
    ];
    result.innerHTML = `<div class="flex between center-y mb-2 wrap" style="gap:10px"><h2 class="section-title" style="font-size:1.5rem">Comparison</h2><button class="btn btn-ghost btn-sm" id="saveCompare"><i class="fa-regular fa-bookmark"></i> Save Comparison</button></div>
      <div class="table-wrap"><table class="compare-table"><thead><tr><th>Criteria</th>${us.map(u => `<th>${u.short}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(r => `<tr><td>${r[0]}</td>${us.map(u => `<td>${r[1](u)}</td>`).join("")}</tr>`).join("")}
      <tr><td>Details</td>${us.map(u => `<td><a href="university.html?slug=${u.slug}" class="btn btn-navy btn-sm">View</a></td>`).join("")}</tr></tbody></table></div>`;
    document.getElementById("saveCompare").addEventListener("click", () => { store.set("comparison", chosen); toast("success", "Saved!", "Comparison saved to your dashboard."); });
  }

  $$(".choice", sel).forEach(c => c.addEventListener("click", () => {
    const slug = c.dataset.slug;
    if (chosen.includes(slug)) { chosen = chosen.filter(s => s !== slug); c.classList.remove("selected"); }
    else { if (chosen.length >= 3) { toast("error", "Max 3", "You can compare up to 3 universities."); return; } chosen.push(slug); c.classList.add("selected"); }
    store.set("comparison", chosen); draw();
  }));
  draw();
}

/* ============================================================
   DOCUMENT CHECKLIST
   ============================================================ */
function renderChecklist() {
  const clLevel = document.getElementById("clLevel"), clCity = document.getElementById("clCity"), clNat = document.getElementById("clNat");
  const list = document.getElementById("clList"), prog = document.getElementById("clProgress");
  [...new Set(UNIVERSITIES.map(u => u.city))].sort().forEach(c => clCity.add(new Option(c, c)));

  function build() {
    const level = clLevel.value;
    let items = [...CHECKLIST_ITEMS.base, ...(CHECKLIST_ITEMS[level] || []), ...CHECKLIST_ITEMS.visa];
    const done = store.get("checklist_done", {});
    list.innerHTML = items.map((it, i) => {
      const key = level + "-" + i;
      const isDone = done[key];
      return `<div class="check-item ${isDone ? "done" : ""}" data-key="${key}">
        <div class="check-box">${isDone ? '<i class="fa-solid fa-check"></i>' : ""}</div>
        <div><h4>${it.title}</h4><p>${it.desc}</p></div></div>`;
    }).join("");
    updateProg(items.length);
    $$(".check-item", list).forEach(ci => ci.querySelector(".check-box").addEventListener("click", () => {
      const d = store.get("checklist_done", {}); const k = ci.dataset.key;
      d[k] = !d[k]; store.set("checklist_done", d);
      ci.classList.toggle("done", d[k]);
      ci.querySelector(".check-box").innerHTML = d[k] ? '<i class="fa-solid fa-check"></i>' : "";
      updateProg(items.length);
    }));
  }
  function updateProg(total) {
    const done = store.get("checklist_done", {});
    const count = Object.keys(done).filter(k => k.startsWith(clLevel.value + "-") && done[k]).length;
    prog.innerHTML = `<b style="color:var(--gold)">${count}</b> of ${total} documents ready`;
  }
  clLevel.addEventListener("change", build);
  build();

  document.getElementById("clDownload").addEventListener("click", () => {
    const level = clLevel.value, city = clCity.value, nat = clNat.value || "Not specified";
    let items = [...CHECKLIST_ITEMS.base, ...(CHECKLIST_ITEMS[level] || []), ...CHECKLIST_ITEMS.visa];
    let txt = `THE NEDIANS — PERSONALISED DOCUMENT CHECKLIST\n${"=".repeat(50)}\nStudy Level: ${level}\nDestination City: ${city}\nNationality: ${nat}\nGenerated: ${new Date().toLocaleDateString()}\n${"=".repeat(50)}\n\n`;
    items.forEach((it, i) => { txt += `[ ] ${i + 1}. ${it.title}\n      ${it.desc}\n\n`; });
    txt += `${"=".repeat(50)}\nNeed help? Contact ${SITE.email} | ${SITE.phone}\n`;
    const blob = new Blob([txt], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `Nedians-Checklist-${level.replace(/[^a-z]/gi, "")}.txt`; a.click();
    toast("success", "Downloaded!", "Your personalised checklist is ready.");
  });
}

/* ============================================================
   BLOG
   ============================================================ */
function blogCard(b) {
  return `<article class="card uni-card reveal">
    <div class="uni-card-img"><img src="${b.img}" alt="${b.title}" loading="lazy"><span class="city-badge">${b.category}</span></div>
    <div class="uni-card-body">
      <div class="uni-meta mb-2"><i class="fa-regular fa-clock" style="color:var(--gold)"></i> ${b.read} min read · ${new Date(b.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</div>
      <h3 style="font-size:1.1rem;margin-bottom:8px">${b.title}</h3>
      <p style="font-size:.9rem;margin-bottom:14px;flex:1">${b.excerpt}</p>
      <a href="post.html?slug=${b.slug}" class="btn btn-ghost btn-sm btn-block">Read Article <i class="fa-solid fa-arrow-right"></i></a>
    </div></article>`;
}
function renderBlog() {
  const grid = document.getElementById("bGrid"), count = document.getElementById("bCount"), empty = document.getElementById("bEmpty"),
        search = document.getElementById("bSearch"), cats = document.getElementById("bCats");
  let activeCat = "All";
  cats.innerHTML = BLOG_CATEGORIES.map(c => `<button class="tag ${c === "All" ? "gold" : ""}" data-cat="${c}" style="font-size:.88rem;padding:9px 16px">${c}</button>`).join("");

  function apply() {
    const q = search.value.toLowerCase().trim();
    const list = BLOGS.filter(b => {
      if (activeCat !== "All" && b.category !== activeCat) return false;
      if (q && !(b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || b.category.toLowerCase().includes(q))) return false;
      return true;
    });
    count.innerHTML = `Showing <b>${list.length}</b> articles`;
    if (!list.length) { grid.innerHTML = ""; empty.classList.remove("hidden"); }
    else { empty.classList.add("hidden"); grid.innerHTML = list.map(blogCard).join(""); reObserveReveals(); }
  }
  apply();
  search.addEventListener("input", apply);
  $$("#bCats [data-cat]").forEach(b => b.addEventListener("click", () => { activeCat = b.dataset.cat; $$("#bCats [data-cat]").forEach(x => x.classList.toggle("gold", x.dataset.cat === activeCat)); apply(); }));
}

/* ============================================================
   BLOG POST
   ============================================================ */
function renderPost() {
  const slug = new URLSearchParams(location.search).get("slug");
  const b = BLOGS.find(x => x.slug === slug);
  const root = document.getElementById("postRoot");
  if (!b) { root.innerHTML = `<div class="section" style="padding-top:160px;text-align:center"><div class="container"><h1>Article Not Found</h1><a href="blog.html" class="btn btn-primary mt-3">Back to Blog</a></div></div>`; return; }
  document.title = `${b.title} | The Nedians`;
  const related = BLOGS.filter(x => x.slug !== b.slug && x.category === b.category).slice(0, 3);
  const relatedFinal = related.length ? related : BLOGS.filter(x => x.slug !== b.slug).slice(0, 3);

  const body = `<p>${b.excerpt}</p>
    <h2>Getting Started</h2><p>Studying in Italy is one of the most rewarding decisions an international student can make. With centuries-old universities, affordable tuition, and a culture that celebrates learning, Italy continues to attract students from every corner of the globe.</p>
    <p>In this guide, our counsellors break down the essentials so you can move forward with clarity and confidence. We've helped over 500 students navigate this exact process, and the patterns of success are remarkably consistent.</p>
    <h2>Key Things to Remember</h2>
    <ul style="margin:16px 0 16px 22px;list-style:disc">
      <li style="margin-bottom:10px">Start your preparation 6–9 months before the intake.</li>
      <li style="margin-bottom:10px">Keep your academic documents translated and legalised early.</li>
      <li style="margin-bottom:10px">Apply for scholarships in parallel with your university application.</li>
      <li style="margin-bottom:10px">Prepare thoroughly for your visa interview.</li>
    </ul>
    <h2>Final Thoughts</h2><p>Every student's journey is unique. The best outcomes come from honest guidance and careful planning. If you'd like personalised help with your application, our team is just a free consultation away.</p>`;

  root.innerHTML = `
    <header class="page-header with-img" style="padding:160px 0 60px">
      <div class="page-header-bg"><img src="${b.img}" alt="${b.title}"></div>
      <div class="container" style="max-width:840px">
        <div class="breadcrumb"><a href="index.html">Home</a><i class="fa-solid fa-chevron-right"></i><a href="blog.html">Blog</a><i class="fa-solid fa-chevron-right"></i><span>${b.category}</span></div>
        <span class="badge-pill mb-2" style="background:rgba(201,168,76,.25);color:#fff">${b.category}</span>
        <h1>${b.title}</h1>
        <p>By ${b.author} · ${b.read} min read · ${new Date(b.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
      </div>
    </header>
    <article class="section"><div class="container" style="max-width:760px">
      <div class="post-body" style="font-size:1.05rem;line-height:1.85">${body.replace(/<h2>/g, '<h2 style="margin:28px 0 12px;font-size:1.5rem">')}</div>
      <div class="divider"></div>
      <div class="flex center-y between wrap" style="gap:14px">
        <span style="font-family:var(--font-head);font-weight:600;color:var(--text-head)">Share this article</span>
        <div class="social-row">
          <a href="https://wa.me/?text=${encodeURIComponent(b.title)}" target="_blank" rel="noopener" style="background:#25D366;color:#fff" aria-label="Share on WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}" target="_blank" rel="noopener" style="background:#1877F2;color:#fff" aria-label="Share on Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(b.title)}" target="_blank" rel="noopener" style="background:#0B1C3E;color:#fff" aria-label="Share on X"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}" target="_blank" rel="noopener" style="background:#0A66C2;color:#fff" aria-label="Share on LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
      </div>
    </div></article>
    <section class="section" style="background:var(--surface)"><div class="container">
      <span class="eyebrow">Keep Reading</span><h2 class="section-title" style="font-size:1.8rem">Related Articles</h2>
      <div class="grid uni-grid">${relatedFinal.map(blogCard).join("")}</div>
    </div></section>`;
  reObserveReveals();
}

/* ============================================================
   BOOKING
   ============================================================ */
function renderBooking() {
  const perks = [
    { icon: "fa-circle-check", t: "100% Free & No Obligation", d: "Honest advice with zero pressure — we only recommend what's right for you." },
    { icon: "fa-user-tie", t: "One-on-One with a Specialist", d: "Talk directly to an Italy expert, not a call-centre agent." },
    { icon: "fa-map-location-dot", t: "Personalised Roadmap", d: "Leave with a clear, step-by-step plan tailored to your profile." }
  ];
  document.getElementById("bookPerks").innerHTML = perks.map(p =>
    `<div class="flex gap mb-3" style="align-items:flex-start"><i class="fa-solid ${p.icon}" style="color:var(--gold);font-size:1.3rem;margin-top:3px"></i><div><h4 style="font-size:1.05rem;margin-bottom:2px">${p.t}</h4><p style="font-size:.92rem">${p.d}</p></div></div>`).join("");

  document.getElementById("waBtn").href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi The Nedians! I'd like to book a free consultation about studying in Italy.")}`;

  const form = document.getElementById("bookingForm");
  liveValidate(form);
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm(form)) { toast("error", "Check the form", "Please fix the highlighted fields."); return; }
    const data = Object.fromEntries(new FormData(form));
    const bookings = store.get("consultations", []);
    bookings.push({ ...data, id: Date.now(), date: data.date || new Date().toISOString(), status: "pending" });
    store.set("consultations", bookings); saveStudent(data);
    const btn = form.querySelector("button[type=submit]"); btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...'; btn.disabled = true;
    setTimeout(() => { form.reset(); btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Request Consultation'; btn.disabled = false; toast("success", "Consultation booked!", `A confirmation email was sent to ${data.email}.`); }, 900);
  });

  const adjust = () => document.getElementById("bookLayout").style.gridTemplateColumns = window.innerWidth < 860 ? "1fr" : "1fr 1fr";
  adjust(); window.addEventListener("resize", adjust);
}

/* ============================================================
   CONTACT
   ============================================================ */
function renderContact() {
  const info = [
    { icon: "fa-location-dot", t: "Visit Our Office", d: SITE.address },
    { icon: "fa-phone", t: "Call Us", d: SITE.phone, href: "tel:" + SITE.phone.replace(/\s/g, "") },
    { icon: "fa-brands fa-whatsapp", t: "WhatsApp", d: "Chat with us instantly", href: `https://wa.me/${SITE.whatsapp}` },
    { icon: "fa-envelope", t: "Email", d: SITE.email, href: "mailto:" + SITE.email },
    { icon: "fa-clock", t: "Office Hours", d: SITE.hours }
  ];
  document.getElementById("contactInfo").innerHTML = info.map(i =>
    `<a ${i.href ? `href="${i.href}" ${i.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}` : ""} class="flex gap mb-3" style="align-items:flex-start;text-decoration:none">
      <div class="feature-icon" style="width:46px;height:46px;font-size:1.1rem;margin:0;flex-shrink:0"><i class="fa-solid ${i.icon}"></i></div>
      <div><h4 style="font-size:1rem;margin-bottom:2px">${i.t}</h4><p style="font-size:.92rem">${i.d}</p></div></a>`).join("");

  const form = document.getElementById("contactForm");
  liveValidate(form);
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm(form)) { toast("error", "Check the form", "Please fix the highlighted fields."); return; }
    const data = Object.fromEntries(new FormData(form));
    const msgs = store.get("contact_messages", []); msgs.push({ ...data, id: Date.now(), created_at: Date.now() }); store.set("contact_messages", msgs);
    saveStudent(data);
    const btn = form.querySelector("button[type=submit]"); btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...'; btn.disabled = true;
    setTimeout(() => { form.reset(); btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message'; btn.disabled = false; toast("success", "Message sent!", "Thanks for reaching out — we'll reply within one business day."); }, 900);
  });

  const adjust = () => document.getElementById("contactLayout").style.gridTemplateColumns = window.innerWidth < 860 ? "1fr" : "1fr 1.2fr";
  adjust(); window.addEventListener("resize", adjust);
}

/* ============================================================
   ABOUT
   ============================================================ */
function renderAbout() {
  document.getElementById("aboutImg").src = IMG.library2;
  document.getElementById("aboutStats").innerHTML = [...SITE.stats, { num: 2, suffix: "M+", label: "Scholarships (€)" }].slice(0, 4).map(s =>
    `<div class="stat-item" style="border-color:var(--border)"><div class="stat-num" data-count="${s.num}" data-suffix="${s.suffix}" style="color:var(--gold)">0</div><div class="stat-label" style="color:var(--text-body)">${s.label}</div></div>`).join("");

  document.getElementById("teamGrid").innerHTML = TEAM.map((m, i) => {
    const initials = m.name.split(" ").map(n => n[0]).join("");
    return `<div class="card feature-card reveal reveal-d${(i % 4) + 1}" style="text-align:center">
      <div style="width:80px;height:80px;border-radius:50%;margin:0 auto 16px;background:linear-gradient(135deg,var(--navy),var(--navy-2));color:var(--gold);display:grid;place-items:center;font-family:var(--font-head);font-weight:800;font-size:1.6rem">${initials}</div>
      <h3 style="font-size:1.1rem;margin-bottom:2px">${m.name}</h3>
      <div style="color:var(--gold);font-family:var(--font-head);font-weight:600;font-size:.88rem;margin-bottom:10px">${m.role}</div>
      <p style="font-size:.9rem">${m.bio}</p></div>`;
  }).join("");

  const trust = [
    { icon: "fa-handshake", t: "Official Partner Universities", d: "Direct relationships with admissions teams across Italy." },
    { icon: "fa-certificate", t: "ISO 9001 Certified", d: "Quality-assured processes you can rely on." },
    { icon: "fa-shield-halved", t: "GDPR Compliant", d: "Your data is encrypted, secure, and never sold." },
    { icon: "fa-star", t: "4.9/5 Student Rating", d: "Consistently rated excellent by the students we serve." }
  ];
  document.getElementById("trustGrid").innerHTML = trust.map((t, i) =>
    `<div class="card feature-card reveal reveal-d${(i % 4) + 1}"><div class="feature-icon"><i class="fa-solid ${t.icon}"></i></div><h3>${t.t}</h3><p>${t.d}</p></div>`).join("");
  reObserveReveals();
}

/* ============================================================
   STUDENT DASHBOARD
   ============================================================ */
function renderDashboard() {
  const root = document.getElementById("dashRoot");
  const user = store.get("user", null);

  if (!user) {
    root.innerHTML = `<div class="card" style="max-width:440px;margin:0 auto;padding:36px">
      <div class="feature-icon" style="margin:0 auto 16px"><i class="fa-solid fa-user-lock"></i></div>
      <h2 style="text-align:center;font-size:1.5rem;margin-bottom:6px">Student Login</h2>
      <p style="text-align:center;margin-bottom:24px;font-size:.92rem">Sign in to access your saved universities, comparisons and checklist.</p>
      <form id="loginForm" novalidate>
        <div class="form-group"><label>Full Name <span class="req">*</span></label><input class="input" name="name" required><div class="field-error"><i class="fa-solid fa-circle-exclamation"></i> Required.</div></div>
        <div class="form-group"><label>Email <span class="req">*</span></label><input class="input" name="email" type="email" required><div class="field-error"><i class="fa-solid fa-circle-exclamation"></i> Valid email required.</div></div>
        <button class="btn btn-primary btn-block" type="submit"><i class="fa-solid fa-right-to-bracket"></i> Sign In</button>
        <p style="text-align:center;font-size:.8rem;margin-top:14px;color:var(--text-body)">Demo login — no password needed. Your data stays in this browser.</p>
      </form></div>`;
    const form = document.getElementById("loginForm"); liveValidate(form);
    form.addEventListener("submit", e => {
      e.preventDefault(); if (!validateForm(form)) return;
      const d = Object.fromEntries(new FormData(form));
      store.set("user", { name: d.name, email: d.email }); saveStudent(d);
      toast("success", "Welcome!", `Signed in as ${d.name}.`); renderDashboard();
    });
    return;
  }

  document.getElementById("dashTitle").textContent = `Welcome back, ${user.name.split(" ")[0]}`;
  const savedSlugs = store.get("saved_unis", []);
  const savedUnis = savedSlugs.map(s => UNIVERSITIES.find(u => u.slug === s)).filter(Boolean);
  const comparison = store.get("comparison", []).map(s => UNIVERSITIES.find(u => u.slug === s)).filter(Boolean);
  const consultations = store.get("consultations", []);
  const checklistDone = store.get("checklist_done", {});
  const doneCount = Object.values(checklistDone).filter(Boolean).length;

  root.innerHTML = `
    <div class="flex between center-y wrap mb-3" style="gap:12px">
      <div class="flex center-y gap"><div style="width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,var(--navy),var(--navy-2));color:var(--gold);display:grid;place-items:center;font-family:var(--font-head);font-weight:800;font-size:1.3rem">${user.name.split(" ").map(n => n[0]).join("")}</div>
      <div><h3 style="font-size:1.1rem">${user.name}</h3><p style="font-size:.85rem">${user.email}</p></div></div>
      <button class="btn btn-ghost btn-sm" id="logoutBtn"><i class="fa-solid fa-right-from-bracket"></i> Sign Out</button>
    </div>

    <div class="grid feature-grid mb-4">
      ${dashStat("fa-bookmark", savedUnis.length, "Saved Universities")}
      ${dashStat("fa-scale-balanced", comparison.length, "In Comparison")}
      ${dashStat("fa-calendar-check", consultations.length, "Consultations")}
      ${dashStat("fa-list-check", doneCount, "Docs Ready")}
    </div>

    <div class="mb-4"><h2 class="section-title" style="font-size:1.4rem">Saved Universities</h2>
      ${savedUnis.length ? `<div class="grid uni-grid">${savedUnis.map(u => uniCard(u)).join("")}</div>` : emptyBox("fa-bookmark", "No saved universities yet", "universities.html", "Browse Universities")}</div>

    <div class="mb-4"><h2 class="section-title" style="font-size:1.4rem">My Comparison</h2>
      ${comparison.length >= 2 ? `<div class="table-wrap"><table class="compare-table"><thead><tr><th>University</th><th>City</th><th>Ranking</th><th>Tuition</th></tr></thead><tbody>${comparison.map(u => `<tr><td>${u.short}</td><td>${u.city}</td><td>#${u.ranking}</td><td>${fmtMoney(u.tuitionMin)}+</td></tr>`).join("")}</tbody></table></div><a href="compare.html" class="btn btn-ghost btn-sm mt-2">Edit Comparison <i class="fa-solid fa-arrow-right"></i></a>` : emptyBox("fa-scale-balanced", "No comparison saved", "compare.html", "Compare Universities")}</div>

    <div class="mb-4"><h2 class="section-title" style="font-size:1.4rem">Checklist Progress</h2>
      <div class="card" style="padding:24px">
        <div class="flex between center-y mb-2"><span style="font-family:var(--font-head);font-weight:600;color:var(--text-head)">${doneCount} documents marked ready</span><span class="badge-pill">${doneCount > 0 ? "In Progress" : "Not Started"}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.min(100, doneCount * 8)}%"></div></div>
        <a href="checklist.html" class="btn btn-ghost btn-sm mt-3">Open Checklist <i class="fa-solid fa-arrow-right"></i></a>
      </div></div>

    <div><h2 class="section-title" style="font-size:1.4rem">Consultation History</h2>
      ${consultations.length ? `<div class="table-wrap"><table class="compare-table"><thead><tr><th>Date</th><th>Level</th><th>Status</th></tr></thead><tbody>${consultations.map(c => `<tr><td>${new Date(c.date).toLocaleDateString("en-GB")}</td><td>${c.level || "—"}</td><td><span class="badge-pill" style="background:rgba(201,168,76,.15)">${c.status || "pending"}</span></td></tr>`).join("")}</tbody></table></div>` : emptyBox("fa-calendar-check", "No consultations booked yet", "booking.html", "Book Consultation")}</div>`;

  document.getElementById("logoutBtn").addEventListener("click", () => { store.del("user"); toast("success", "Signed out", "See you again soon!"); renderDashboard(); document.getElementById("dashTitle").textContent = "Student Dashboard"; });
  reObserveReveals();
}
function dashStat(icon, num, label) {
  return `<div class="card feature-card reveal" style="text-align:center;padding:24px"><div class="feature-icon" style="margin:0 auto 12px"><i class="fa-solid ${icon}"></i></div><div style="font-family:var(--font-head);font-weight:800;font-size:1.8rem;color:var(--text-head)">${num}</div><div style="font-size:.85rem">${label}</div></div>`;
}
function emptyBox(icon, msg, href, cta) {
  return `<div class="card text-center" style="padding:40px"><i class="fa-solid ${icon}" style="font-size:2rem;color:var(--gold);margin-bottom:12px"></i><p class="mb-2">${msg}</p><a href="${href}" class="btn btn-primary btn-sm">${cta}</a></div>`;
}
