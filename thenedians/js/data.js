/* ============================================================
   THE NEDIANS — Content Data Layer
   (Simulates the CMS / Sanity content. All site content lives
    here so it is centrally editable — no hardcoding in pages.)
   ============================================================ */

const SITE = {
  name: "The Nedians",
  tagline: "Study in Italy, Simplified",
  phone: "+39 320 555 0142",
  whatsapp: "393205550142",
  email: "admissions@thenedians.com",
  address: "Via Roma 24, 20121 Milano, Italy",
  hours: "Mon – Sat: 9:00 AM – 7:00 PM (CET)",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  },
  stats: [
    { num: 500, suffix: "+", label: "Students Guided" },
    { num: 50, suffix: "+", label: "Partner Universities" },
    { num: 10, suffix: "+", label: "Years Experience" }
  ]
};

/* ---- Image URLs (Creative-Commons filtered) ---- */
const IMG = {
  rome:    "https://sspark.genspark.ai/cfimages?u1=YsQVfVC8qn%2Fv2tnZT2R725FcA3Ip%2FXJ6KFgZ%2B%2FgS3YBrfIFWasMViT3UMFg3%2B0SgYR6MANVR%2FtewvUz8XToSTzpHdCD6dIqu1FfZn4KTCbKUTV8REuQQO32G4gIG&u2=Yfe%2BqGAltEMUUgzG&width=2560",
  rome2:   "https://sspark.genspark.ai/cfimages?u1=1QL1FuAlsVivdyF23EVPFjlp%2B%2FecdE4%2FBTgfhW6c2nBipiLRFOFMlfth18Iu9cQrfVwloK%2FCSr8MAPzHhaIdDFvyelVm%2BBnOzYVj5Ux9cJllY7svx6vgVNYg0HL7FAJdUAm%2F&u2=sNIF91%2FV5WNmpCf%2F&width=2560",
  milan:   "https://sspark.genspark.ai/cfimages?u1=08GfjreanNKuA0ANFmpY5Che9nR%2FHfI5KTH9hVc3NrzoKio4Q1cZWPxff9yfY%2F2tkyyCCn24KunThnFTZ%2FhVkvOgaVRdzu1fvjgAPnbbjSxx1VwXw8o%3D&u2=eMZiF3bts2frMBqe&width=2560",
  milan2:  "https://sspark.genspark.ai/cfimages?u1=3NAnpBnFL3asojw2AcUScfDtfjeCrv9Juj5ob%2F0hpIyYFid4%2Fr7f3JSBptV%2FOIL8oI9F%2BQizz3m3B7YcQXN5bJczoKaD45Lo0x%2BkWvzpM4okx6CF%2BCWWpPecsW0iwLUY%2FLLO2HGQd7%2B9WBPG4g%3D%3D&u2=1uXjIm8Xg2oNX3G1&width=2560",
  bologna: "https://sspark.genspark.ai/cfimages?u1=puj4%2BKn%2B%2B2GD%2BpVQk5FKdy4mfvje7BE71k38zYMG9OpFditQz1UvFisG%2FR52hsFULV8N4zpf%2FjjuUI0IrOVaXUbjIip%2FfyrfwcfAF0xXQGH96843ZEoS2dr3ZNGdLMZx6nI%2F%2BpG%2BgmJb&u2=5lpDrUOCV%2FzZgKjj&width=2560",
  bologna2:"https://sspark.genspark.ai/cfimages?u1=LFUC1PQ6WmUWOlGmr%2BK7r4%2BbkNBKkv7w2aovT8WZEits7Xp9luG9H8PzG9mDg5NzVzQIFyrGpGQYNdFFK2LPiR%2BWjTPK1myIqWpMKP3xN3jv6MyYVhhAWA5Prh3RI8Pzew%3D%3D&u2=PhZJ7v2jeQ5p5tgO&width=2560",
  turin:   "https://sspark.genspark.ai/cfimages?u1=TBtBSc7iZ7du4RretPU2BDc1izNB8k4YR7Jsnid4FxLuuLCv8qzhEXnGUdjcki6rC%2FcolW73VIg2apouqwqig3Zy5%2BsRQvRBfnfW5PbFa45sQpuey8Xr6Wec8oCJJVdujRsExLUWqriBhGv%2FE5WUvJTS92c%3D&u2=hfMQV8SGYyIHCny1&width=2560",
  turin2:  "https://sspark.genspark.ai/cfimages?u1=9%2F2ewFEzxIMrFhpoEJUe8w8IJFLfkkKO2dSUvlrSAkklo3D6xwxfMLZp3PHgAqxR8JJnN73dEQz29kwL%2FRjfIUrrwApzdKre%2BTREDqJLrpBsuqSBHw%3D%3D&u2=%2BYDaSabn5N19xh6B&width=2560",
  naples:  "https://sspark.genspark.ai/cfimages?u1=%2BXFiMbcr0Ouy1XM1MMx3wf9hNL2x7%2B6%2FAqXLNcANmBtfAFXShtdzT%2FBZXLbvMuMAd91ImnAjssykY7o7iNRLoxePdvBNzyzMAk%2FjheUDOIt%2BNuQTtPYvR8sWHe9ebHs%2FjvvQ0VNlHf8HQj8bI3ty73DS8l3syls2KUbBNjpizg5OVXVKbwrizQnn0LbhhaWhtlprBaKy7w%3D%3D&u2=tLcPPtP%2Bgm0ZFfZU&width=2560",
  students:"https://sspark.genspark.ai/cfimages?u1=nM%2FQfHvpqf988VquSVeYlZJnOIlHtaPGKPXmHYCeY%2FPwZr6k3Ag7SMcDmLTWeq7e5sHVSw01ZxGvqeY0jJHDPpnzP1OMEPE43znXz%2Bo10wotm%2BVTB5TVq9AahVyI&u2=bDtuIWvfgINfnUZa&width=2560",
  library: "https://sspark.genspark.ai/cfimages?u1=OnoFhDu2jr%2FY8DosfiU3DOnvLFkxF3aJeZVkNuJLOAaqB9odrsRqpboNKMdItgDBb6F5oBY5p0DEUmXwg%2FdjX6CHtODZ2GqJdJrQovHR7ZkFMfrRBUTSqaCFaJtkSrCaeoik1d1Gg7t3jkFl&u2=C5cD7ZCAPusvWvDb&width=2560",
  library2:"https://sspark.genspark.ai/cfimages?u1=wgWLJ%2F68pE10WnKl%2Fb7rbyLwKOO4jR4XgRgHnBAmTRRnvZA0tbHt%2B1TqotJaGjK%2BrbO8XriEbcy%2FekQxX%2FHb45eSKZkQoa8PydvLcTLHaNQ9QR6uzI6nsMWgoAEZc08xXE5FWiPdFDJYh257XaenHu62P1ptu8cpy%2F4d%2Bf%2Fr4uLmEilBSaLMUw05%2FzZfkRkKmuU72t%2FYbdQvC%2BD5OD384CSoWjgeTbLYReQP6iH8tQ%2FBDG0qWRmxRaCWmkd9vzWcnC09jWkWkYPCSSHCVBfFqOKn2LhNab0vBpFi0eALWGKtj%2BNCwX%2FVcvkhgYtK0vlSN7kqXGqeUtg8S6FPk85zx1t3NBzPafdc0N8xuzBlUYVfVLokcWRQgDvAjMRQILzaBKr%2FbPivD1jBJqCS2I%2FONfc00lT8fW%2FFb8im6zTZrLZyyCHaPdPZj5v06QpPB7QNqaEYvdOFg7G1BKKg7tEKz2RpE5hR7uHNpoQwKR5%2FV71gH1%2BqTUtgVmNAzYiV4LlQ7QcR%2FU5N48SMghDaB6KS3I8eyQkeMvWe%2BxbaVdkJ4lCMHKNOAQ9UzJQw0gjBH9Wctw%3D%3D&u2=5lsli%2Fpn4OpKul%2Bx&width=2560"
};

/* ---- Cities ---- */
const CITIES = [
  { name: "Rome", img: IMG.rome, desc: "The eternal capital — history, art, and prestigious universities like Sapienza.", unis: 12, tag: "Capital" },
  { name: "Milan", img: IMG.milan, desc: "Italy's design and finance hub, home to Politecnico and Bocconi.", unis: 10, tag: "Finance & Design" },
  { name: "Bologna", img: IMG.bologna, desc: "The world's oldest university city — vibrant student life and low costs.", unis: 6, tag: "Student City" },
  { name: "Turin", img: IMG.turin, desc: "An engineering powerhouse with Politecnico di Torino and Alpine charm.", unis: 5, tag: "Engineering" },
  { name: "Naples", img: IMG.naples, desc: "Affordable coastal living and historic universities near the Mediterranean.", unis: 4, tag: "Affordable" }
];

/* ---- Universities ---- */
const UNIVERSITIES = [
  {
    slug: "sapienza-rome", name: "Sapienza University of Rome", short: "Sapienza", city: "Rome",
    img: IMG.rome2, banner: IMG.rome, ranking: 134, langs: ["English", "Italian"],
    levels: ["Bachelor's", "Master's", "PhD"], tuitionMin: 1000, tuitionMax: 2900,
    deadline: "2026-07-31", lat: 41.9028, lng: 12.4964,
    fields: ["Engineering", "Medicine", "Economics", "Arts & Humanities", "Computer Science"],
    scholarship: true, ielts: 6.0, minGrade: 65,
    about: "Founded in 1303, Sapienza is one of the oldest and largest universities in Europe, with over 110,000 students. It consistently ranks among the world's top institutions, offering an extensive catalogue of English-taught programs and a generous regional scholarship scheme (DiSCo Lazio).",
    requirements: [
      ["High School Diploma (for Bachelor's)", "Required, translated & legalised"],
      ["Bachelor's Degree (for Master's)", "Required with transcripts"],
      ["English Proficiency", "IELTS 6.0 or MOI accepted"],
      ["Statement of Purpose", "Recommended"],
      ["Pre-evaluation via Universitaly", "Mandatory"]
    ],
    programsList: [
      { name: "Computer & Systems Engineering", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Economics & Finance", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Business Management", level: "Bachelor's", lang: "English", duration: "3 years" },
      { name: "Data Science", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Civil Engineering", level: "PhD", lang: "English", duration: "3 years" }
    ]
  },
  {
    slug: "politecnico-milano", name: "Politecnico di Milano", short: "PoliMi", city: "Milan",
    img: IMG.milan2, banner: IMG.milan, ranking: 111, langs: ["English", "Italian"],
    levels: ["Bachelor's", "Master's", "PhD"], tuitionMin: 3900, tuitionMax: 4000,
    deadline: "2026-02-15", lat: 45.4781, lng: 9.2270,
    fields: ["Engineering", "Architecture", "Design", "Computer Science"],
    scholarship: true, ielts: 6.0, minGrade: 70,
    about: "Politecnico di Milano is Italy's largest technical university and a global leader in engineering, architecture, and design. It is the #1 ranked Italian university for technical disciplines and offers the majority of its Master's programs entirely in English.",
    requirements: [
      ["Academic Transcripts", "Required, certified"],
      ["English Proficiency", "IELTS 6.0 / TOEFL 78"],
      ["Portfolio (Design/Architecture)", "Required for relevant programs"],
      ["Online Application (Polimi portal)", "Mandatory"],
      ["CV & Motivation Letter", "Required"]
    ],
    programsList: [
      { name: "Computer Science & Engineering", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Architecture", level: "Bachelor's", lang: "English", duration: "3 years" },
      { name: "Product Design", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Mechanical Engineering", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Management Engineering", level: "PhD", lang: "English", duration: "3 years" }
    ]
  },
  {
    slug: "university-bologna", name: "University of Bologna", short: "UniBo", city: "Bologna",
    img: IMG.bologna2, banner: IMG.bologna, ranking: 154, langs: ["English", "Italian"],
    levels: ["Bachelor's", "Master's", "PhD"], tuitionMin: 800, tuitionMax: 3000,
    deadline: "2026-03-25", lat: 44.4949, lng: 11.3426,
    fields: ["Economics", "Arts & Humanities", "Law", "Medicine", "Computer Science"],
    scholarship: true, ielts: 5.5, minGrade: 60,
    about: "Established in 1088, the University of Bologna is the oldest university in the Western world. It offers more than 90 international degree programs and is celebrated for its affordable tuition, vibrant student atmosphere, and strong research output.",
    requirements: [
      ["Secondary School Certificate", "Required for Bachelor's"],
      ["English Proficiency", "IELTS 5.5 minimum"],
      ["Academic CV", "Required for Master's"],
      ["Self-assessment Questionnaire", "Some programs"],
      ["DiSCo / ER.GO Scholarship form", "Optional but recommended"]
    ],
    programsList: [
      { name: "Economics & Management", level: "Bachelor's", lang: "English", duration: "3 years" },
      { name: "Artificial Intelligence", level: "Master's", lang: "English", duration: "2 years" },
      { name: "International Relations", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Law", level: "Bachelor's", lang: "Italian", duration: "5 years" },
      { name: "Biotechnology", level: "PhD", lang: "English", duration: "3 years" }
    ]
  },
  {
    slug: "politecnico-torino", name: "Politecnico di Torino", short: "PoliTo", city: "Turin",
    img: IMG.turin2, banner: IMG.turin, ranking: 252, langs: ["English", "Italian"],
    levels: ["Bachelor's", "Master's", "PhD"], tuitionMin: 2800, tuitionMax: 3500,
    deadline: "2026-04-02", lat: 45.0626, lng: 7.6626,
    fields: ["Engineering", "Architecture", "Computer Science"],
    scholarship: true, ielts: 5.5, minGrade: 65,
    about: "Politecnico di Torino is one of Italy's most respected engineering schools, with deep industry ties to companies like Fiat, Ferrari, and aerospace leaders. It offers a wide range of English-taught engineering programs and strong scholarship support (EDISU Piemonte).",
    requirements: [
      ["Academic Transcripts", "Required"],
      ["English Proficiency", "IELTS 5.5 / TOEFL 71"],
      ["TIL-I Engineering Test", "Required for Bachelor's"],
      ["Online Application (Apply@PoliTo)", "Mandatory"],
      ["Motivation Letter", "Required for Master's"]
    ],
    programsList: [
      { name: "Computer Engineering", level: "Bachelor's", lang: "English", duration: "3 years" },
      { name: "Mechatronic Engineering", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Aerospace Engineering", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Architecture Construction City", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Electronics Engineering", level: "PhD", lang: "English", duration: "3 years" }
    ]
  },
  {
    slug: "federico-ii-naples", name: "University of Naples Federico II", short: "Federico II", city: "Naples",
    img: IMG.naples, banner: IMG.naples, ranking: 392, langs: ["English", "Italian"],
    levels: ["Bachelor's", "Master's", "PhD", "Foundation"], tuitionMin: 500, tuitionMax: 2500,
    deadline: "2026-08-20", lat: 40.8518, lng: 14.2681,
    fields: ["Engineering", "Medicine", "Economics", "Computer Science"],
    scholarship: true, ielts: 5.5, minGrade: 55,
    about: "Founded in 1224, Federico II is the oldest public secular university in the world. Located on Italy's stunning southern coast, it combines very affordable tuition with a growing portfolio of English programs, making it ideal for budget-conscious students.",
    requirements: [
      ["High School Diploma", "Required for Bachelor's"],
      ["English Proficiency", "IELTS 5.5 or MOI"],
      ["Pre-enrolment via Universitaly", "Mandatory"],
      ["Declaration of Value", "Required for non-EU"],
      ["Transcripts", "Translated & legalised"]
    ],
    programsList: [
      { name: "Foundation Year (Pathway)", level: "Foundation", lang: "English", duration: "1 year" },
      { name: "Computer Engineering", level: "Bachelor's", lang: "English", duration: "3 years" },
      { name: "Biomedical Engineering", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Economics & Finance", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Molecular Medicine", level: "PhD", lang: "English", duration: "3 years" }
    ]
  },
  {
    slug: "bocconi-milan", name: "Bocconi University", short: "Bocconi", city: "Milan",
    img: IMG.milan, banner: IMG.milan2, ranking: 119, langs: ["English"],
    levels: ["Bachelor's", "Master's", "PhD"], tuitionMin: 12000, tuitionMax: 16000,
    deadline: "2026-01-10", lat: 45.4453, lng: 9.1880,
    fields: ["Economics", "Business", "Law", "Computer Science"],
    scholarship: true, ielts: 6.5, minGrade: 80,
    about: "Bocconi is Italy's premier private university for economics, finance, and management, ranked among the top business schools worldwide. Programs are taught entirely in English with strong global recruiter connections and merit scholarships covering up to 100% of tuition.",
    requirements: [
      ["Academic Excellence", "Strong grades required"],
      ["English Proficiency", "IELTS 6.5 / TOEFL 100"],
      ["SAT / GMAT / Bocconi Test", "Required"],
      ["Motivation Letter & CV", "Required"],
      ["References", "Recommended"]
    ],
    programsList: [
      { name: "Economics, Management & Computer Science", level: "Bachelor's", lang: "English", duration: "3 years" },
      { name: "International Management", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Finance", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Data Science & Business Analytics", level: "Master's", lang: "English", duration: "2 years" },
      { name: "Economics & Finance", level: "PhD", lang: "English", duration: "4 years" }
    ]
  }
];

/* ---- Flatten programs from universities + extras ---- */
const PROGRAMS = (() => {
  const list = [];
  UNIVERSITIES.forEach(u => {
    u.programsList.forEach((p, i) => {
      list.push({
        id: u.slug + "-" + i,
        name: p.name, level: p.level, lang: p.lang, duration: p.duration,
        field: u.fields[i % u.fields.length],
        uniSlug: u.slug, uniName: u.short, city: u.city,
        tuitionMin: u.tuitionMin, tuitionMax: u.tuitionMax, deadline: u.deadline
      });
    });
  });
  return list;
})();

/* ---- Scholarships ---- */
const SCHOLARSHIPS = [
  { name: "DiSCo Lazio Scholarship", amount: "€7,000 / year", uni: "Sapienza University of Rome", level: "All Levels", nationality: "International", deadline: "2026-07-15", summary: "Regional scholarship covering tuition waiver, monthly stipend, and free meals for students in the Lazio region based on financial need and merit." },
  { name: "Polimi Merit Award", amount: "€5,000 + Tuition Waiver", uni: "Politecnico di Milano", level: "Master's", nationality: "Non-EU", deadline: "2026-02-10", summary: "Awarded to top-performing international Master's applicants. Covers full tuition plus a yearly cash contribution." },
  { name: "ER.GO Emilia-Romagna Grant", amount: "€6,500 / year", uni: "University of Bologna", level: "All Levels", nationality: "International", deadline: "2026-09-01", summary: "Need-based grant including accommodation support, dining, and a cash stipend for eligible students in Emilia-Romagna." },
  { name: "EDISU Piemonte Scholarship", amount: "€5,500 / year", uni: "Politecnico di Torino", level: "All Levels", nationality: "International", deadline: "2026-04-30", summary: "Covers tuition fees, housing, and monthly allowances for international students enrolled in Piedmont universities." },
  { name: "Bocconi Merit & Talent Award", amount: "Up to 100% Tuition", uni: "Bocconi University", level: "Bachelor's", nationality: "Non-EU", deadline: "2026-01-05", summary: "Highly competitive merit scholarship for outstanding incoming undergraduate students, renewable annually based on performance." },
  { name: "Italian Government MAECI Grant", amount: "€900 / month", uni: "All Partner Universities", level: "Master's", nationality: "Selected Countries", deadline: "2026-06-09", summary: "Government-funded scholarship for foreign students and Italian citizens abroad, covering monthly stipend and health insurance." }
];

/* ---- Programs by category ---- */
const PROGRAM_FIELDS = ["Engineering", "Computer Science", "Economics", "Business", "Medicine", "Architecture", "Design", "Arts & Humanities", "Law"];

/* ---- Testimonials ---- */
const TESTIMONIALS = [
  { name: "Ayesha Khan", role: "MSc Data Science · Sapienza", stars: 5, text: "The Nedians made my dream of studying in Rome real. From the eligibility check to my visa interview, every step was guided with care. I got a full DiSCo scholarship!", img: "" },
  { name: "Daniel Okafor", role: "BSc Architecture · PoliMi", stars: 5, text: "I was overwhelmed by Italian paperwork until The Nedians stepped in. Their document checklist saved me weeks. Highly professional and genuinely caring team.", img: "" },
  { name: "Maria Santos", role: "MA Int'l Relations · UniBo", stars: 5, text: "Honest advice, no false promises. They matched me with Bologna based on my real profile and I couldn't be happier with my student life here.", img: "" },
  { name: "Rahul Mehta", role: "MSc Mechatronics · PoliTo", stars: 5, text: "The comparison tool helped me pick between three universities. The consultation was free and incredibly detailed. Worth every minute.", img: "" },
  { name: "Sofia Ahmed", role: "BSc Economics · Federico II", stars: 5, text: "Affordable Italy was a myth to me until The Nedians showed me Naples. Low tuition, scholarship, and a beautiful coastal city. Forever grateful.", img: "" }
];

/* ---- FAQs ---- */
const FAQS = [
  { q: "Do I need to know Italian to study in Italy?", a: "Not necessarily. Italy offers hundreds of degree programs taught entirely in English, especially at the Master's level. However, learning basic Italian greatly improves daily life and is sometimes required for specific Bachelor's programs and student visas." },
  { q: "How much does it cost to study in Italy?", a: "Public university tuition ranges from €500 to €4,000 per year — far lower than the UK or USA. Living costs average €700–€1,100 per month depending on the city. Naples and Bologna are more affordable, while Milan and Rome are higher." },
  { q: "Can I get a scholarship as an international student?", a: "Yes. Italy has generous regional scholarships (DiSCo, ER.GO, EDISU) and the national MAECI grant. Many cover full tuition plus a monthly stipend. The Nedians helps you identify and apply for every scholarship you qualify for." },
  { q: "What are the intake seasons in Italy?", a: "The main intake is September (Autumn), with applications opening between November and April. A smaller February (Spring) intake exists at select universities. We recommend starting your application 6–9 months in advance." },
  { q: "Is the student visa process difficult?", a: "Italy's student visa (Type D) process is straightforward when documents are prepared correctly. The Nedians provides a personalised checklist, reviews your file, and prepares you for the consulate interview to maximise approval chances." },
  { q: "Can I work while studying in Italy?", a: "Yes. International students on a study visa can legally work up to 20 hours per week (1,040 hours/year). This is a great way to support living costs and gain local experience." }
];

/* ---- Blog posts ---- */
const BLOGS = [
  { slug: "italy-admission-guide-2026", title: "The Complete 2026 Guide to University Admissions in Italy", category: "Admission Guide", author: "Elena Rossi", date: "2026-01-12", read: 8, img: IMG.library, excerpt: "Everything you need to know — from choosing a program to submitting your pre-enrolment on Universitaly — explained step by step." },
  { slug: "student-visa-italy", title: "How to Get Your Italian Student Visa: A Stress-Free Roadmap", category: "Visa Guide", author: "Marco Bianchi", date: "2026-01-05", read: 6, img: IMG.rome, excerpt: "The Type D student visa demystified: documents, timelines, the consulate interview, and the common mistakes to avoid." },
  { slug: "top-scholarships-italy", title: "7 Scholarships That Can Make Italy Almost Free", category: "Scholarship Tips", author: "Giulia Ferrari", date: "2025-12-20", read: 7, img: IMG.milan, excerpt: "From DiSCo Lazio to the MAECI grant — a breakdown of the most generous funding options for international students." },
  { slug: "student-life-bologna", title: "Student Life in Bologna: The World's Oldest University City", category: "Student Life", author: "Luca Conti", date: "2025-12-10", read: 5, img: IMG.bologna, excerpt: "Affordable food, lively piazzas, and a student culture that's been thriving for 900 years. Here's what to expect." },
  { slug: "milan-city-guide", title: "City Guide: Living & Studying in Milan", category: "City Guides", author: "Sara Greco", date: "2025-11-28", read: 6, img: IMG.milan2, excerpt: "Italy's fashion and finance capital is buzzing with opportunity. Our complete guide to neighbourhoods, costs, and getting around." },
  { slug: "ielts-or-moi", title: "IELTS vs MOI: Which English Proof Do Italian Universities Accept?", category: "Admission Guide", author: "Elena Rossi", date: "2025-11-15", read: 4, img: IMG.library2, excerpt: "Confused about English requirements? We compare IELTS, TOEFL, and the Medium of Instruction letter and when each is accepted." }
];
const BLOG_CATEGORIES = ["All", "Admission Guide", "Visa Guide", "Scholarship Tips", "Student Life", "City Guides"];

/* ---- Team ---- */
const TEAM = [
  { name: "Elena Rossi", role: "Founder & Lead Counsellor", bio: "15 years guiding students to Italian universities. Former international admissions officer at Sapienza." },
  { name: "Marco Bianchi", role: "Visa & Immigration Specialist", bio: "Expert in Type D student visas with a 98% approval track record across 40+ countries." },
  { name: "Giulia Ferrari", role: "Scholarships Advisor", bio: "Helps students secure regional and national funding. Has unlocked over €2M in scholarships." },
  { name: "Luca Conti", role: "Student Success Manager", bio: "Supports students from arrival to graduation, ensuring a smooth transition to life in Italy." }
];

/* ---- Document checklist items (CMS-managed) ---- */
const CHECKLIST_ITEMS = {
  base: [
    { title: "Valid Passport", desc: "Must be valid for at least the entire duration of your stay." },
    { title: "Completed University Application", desc: "Submitted through the university portal or Universitaly." },
    { title: "Academic Transcripts", desc: "Officially translated and legalised certificates." },
    { title: "Statement of Purpose", desc: "A motivation letter explaining your study goals." },
    { title: "Passport-size Photographs", desc: "Recent biometric photos as per consulate specs." }
  ],
  "Bachelor's": [ { title: "High School Diploma", desc: "Final secondary school certificate, translated." }, { title: "Entrance Test Results", desc: "If required (e.g. TIL-I, TOLC, SAT)." } ],
  "Master's": [ { title: "Bachelor's Degree Certificate", desc: "With official transcript of records." }, { title: "Updated CV / Résumé", desc: "Highlighting academic and professional experience." } ],
  "PhD": [ { title: "Research Proposal", desc: "A detailed plan of your intended research." }, { title: "Letters of Recommendation", desc: "Usually two from academic referees." }, { title: "Master's Degree Certificate", desc: "With transcripts." } ],
  "Foundation": [ { title: "Secondary School Records", desc: "Transcripts from the last 2–3 years." } ],
  visa: [
    { title: "Declaration of Value (DoV)", desc: "Issued by the Italian embassy in your country." },
    { title: "Proof of Financial Means", desc: "Approx. €6,000+ in bank statements." },
    { title: "Health Insurance", desc: "Valid coverage for Italy / Schengen area." },
    { title: "Proof of Accommodation", desc: "Rental contract or university housing letter." }
  ]
};

/* expose globally */
window.SITE = SITE; window.IMG = IMG; window.CITIES = CITIES;
window.UNIVERSITIES = UNIVERSITIES; window.PROGRAMS = PROGRAMS;
window.SCHOLARSHIPS = SCHOLARSHIPS; window.PROGRAM_FIELDS = PROGRAM_FIELDS;
window.TESTIMONIALS = TESTIMONIALS; window.FAQS = FAQS; window.BLOGS = BLOGS;
window.BLOG_CATEGORIES = BLOG_CATEGORIES; window.TEAM = TEAM; window.CHECKLIST_ITEMS = CHECKLIST_ITEMS;
