/**
 * ====================================================================
 * TELUGU CULTURAL TRADITIONAL WEDDING — INTERACTIVE JAVASCRIPT ENGINE
 * Sri Lakshmi Priya & Sri Krishna Kalyana Mahotsavam
 * ====================================================================
 */

(function () {
  'use strict';

  // --- Core Selectors & Interpolation Math ---
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const setTxt = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || '';
  };
  const setHtml = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html || '';
  };
  const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val));
  const seg = (val, start, end) => clamp((val - start) / (end - start));
  const lerp = (a, b, t) => a + (b - a) * t;
  const eOut = t => 1 - Math.pow(1 - t, 3);
  const eIn = t => t * t;
  const eIO = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  // --- TRADITIONAL TELUGU WEDDING DATA ---
  const WEDDING_DATA = {
    weddingAt: "2026-10-29T19:30:00+05:30",
    venue: {
      name: "Athidhi Function Hall",
      nameTe: "అతిథి ఫంక్షన్ హాల్",
      address: "Gollapudi, Vijayawada, Andhra Pradesh",
      addressTe: "గొల్లపూడి, విజయవాడ, ఆంధ్రప్రదేశ్",
      mapUrl: "https://maps.google.com/?q=Athidhi+Function+Hall+Gollapudi+Vijayawada",
      phone: "+91 98765 43210"
    },
    gallery: [
      "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-gallery1-1790861320364.webp",
      "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-gallery2-1790862182952.webp",
      "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-gallery3-1790862336803.webp",
      "image_pic.jpeg"
    ],
    te: {
      bride: "POORNA LATHA",
      brideFull: "చి.ల.సౌ. పూర్ణ లత",
      groom: "KRISHNA CHAITANYA",
      groomFull: "చి. కృష్ణ చైతన్య",
      sealTopShloka: "॥ శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు ॥",
      sealGreeting: "కళ్యాణ మహోత్సవ ఆహ్వానము",
      sealDateText: "గురువారం, 29 అక్టోబర్ 2026",
      openBtnText: "శుభలేఖ తెరవండి",
      sealFooterNote: "",
      heroShloka: "॥ శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు ॥",
      heroWeds: "weds",
      heroSubline: "శ్రీ చెరుకు ఏడుకొండలు & శ్రీమతి సుభాషిణి గార్ల జ్యేష్ఠ కుమారుని వివాహ మహోత్సవము",
      scrollHintText: "శుభలేఖను తిలకించండి (Scroll Down)",
      patTitle: "॥ వివాహ ఆహ్వాన శుభ పత్రిక ॥",
      patBlessing: "॥ శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు ॥",
      patAncestors: "",
      patParents: "శ్రీ చెరుకు ఏడుకొండలు & శ్రీమతి సుభాషిణి",
      patInviteText: "మా జ్యేష్ఠ కుమారుడు చి. కృష్ణ చైతన్య వివాహ మహోత్సవమునకు మిమ్ములను సకుటుంబంగా సాదరంగా ఆహ్వానిస్తున్నాము",
      patPanchangamDetails: "మృగశిర నక్షత్రం, వృషభ లగ్న సుముహూర్తమున",
      patMuhurthamDateTime: "గురువారం, 29 అక్టోబర్ 2026 · రాత్రి 07:30 గంటలకు",
      patLocationSummary: "కళ్యాణ వేదిక: అతిథి ఫంక్షన్ హాల్ · గొల్లపూడి, విజయవాడ",
      ritualsTitle: "సప్తపది & వివాహ ఆచారాలు",
      ritualsSubtitle: "తెలుగు సాంప్రదాయ వివాహంలోని పవిత్ర ఘట్టాల విశిష్టత",
      eventsTitle: "కళ్యాణ మహోత్సవాల వివరాలు",
      eventsSub: "మంగళ వేడుకల కాల నిర్ణయం",
      feastTitle: "సాంప్రదాయ కళ్యాణ విందు భోజనం",
      feastSubtitle: "అరిటాకులో ఘుమఘుమలాడే తెలుగు పెళ్లి భోజనం మెనూ",
      storyVerseLine: "Two Hearts... Becoming One",
      storyVerseSub: "A Sacred Matrimonial Journey with Elders' Blessings",
      storyMuhurthamTitle: "Muhurtham",
      storyMuhurthamWhen: "29.10.2026",
      coupleHead: "వధూవరుల పరిచయం",
      coupleTale: "శ్రీ చెరుకు ఏడుకొండలు & శ్రీమతి సుభాషిణి గార్ల జ్యేష్ఠ కుమారుడు చి. కృష్ణ చైతన్య మరియు శ్రీ రావిరాల రాధా బాలకృష్ణ రావు & శ్రీమతి ఇందిరాదేవి (కొండపల్లి, ఇబ్రహీంపట్నం మండలం, ఎన్.టి.ఆర్ జిల్లా) గార్ల ఏకైక కుమార్తె చి.ల.సౌ. పూర్ణ లత ల పవిత్ర వివాహ బంధం.",
      familyRoots: "చెరుకు & రావిరాల కుటుంబాల కలయిక (గొల్లపూడి & కొండపల్లి, విజయవాడ, ఎన్.టి.ఆర్ జిల్లా)",
      venueHead: "కళ్యాణ వేదిక & మార్గం",
      mapBtnLabel: "గూగుల్ మ్యాప్స్ లో మార్గం చూడండి",
      rsvpMainTitle: "విచ్చేసి ఆశీర్వదించండి",
      rsvpLead: "మీ రాక మరియు దివ్య ఆశీస్సులు మా వివాహ వేడుకకు నిండుదనాన్ని చేకూరుస్తాయి.",
      txtAccept: "తప్పక విచ్చేస్తాము",
      txtDecline: "క్షమించండి, రాలేకపోతున్నాము",
      txtSubmit: "ఆశీర్వాదం పంపండి (Submit RSVP)",
      countMainHead: "సుముహూర్త సమయం మొదలవుతోంది",
      cdLblDays: "రోజులు",
      cdLblHours: "గంటలు",
      cdLblMins: "నిమిషాలు",
      cdLblSecs: "సెకన్లు",
      lblAddGoogleCal: "Google Calendar లో సేవ్ చేసుకోండి",
      galleryMainTitle: "మధుర స్మృతులు",
      gallerySubDesc: "మా ప్రయాణంలోని మరపురాని ఆనంద క్షణాలు",
      tapInstructions: "ఫోటోలపై తాకండి (Tap to Scatter & Arrange)",
      footerGratitude: "హృదయపూర్వక ధన్యవాదాలు",
      footerFamilies: "With Best Compliments From Near & Dear · Cheruku & Ravirala Families",
      roseShowerTxt: "పూల వర్షం",
      events: [
        {
          name: "సుముహూర్తం (Sumuhurtham)",
          date: "గురువారం, 29 అక్టోబర్ 2026",
          time: "రాత్రి 07:30 PM",
          place: "అతిథి ఫంక్షన్ హాల్, గొల్లపూడి, విజయవాడ",
          desc: "మృగశిర నక్షత్రం, వృషభ లగ్నం, జీలకర్ర-బెల్లం, మాంగల్యధారణ, తలంబ్రాలు & సప్తపది.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev3-1790834810738.webp",
          map: "https://maps.google.com/?q=Athidhi+Function+Hall+Gollapudi+Vijayawada"
        },
        {
          name: "వివాహ విందు (Kalyana Vindhu Dinner)",
          date: "గురువారం, 29 అక్టోబర్ 2026",
          time: "సాయంత్రం 07:00 PM onwards",
          place: "అతిథి ఫంక్షన్ హాల్, గొల్లపూడి, విజయవాడ",
          desc: "సాంప్రదాయ ఆంధ్రా వివాహ విందు భోజనము మరియు బంధుమిత్రుల సత్కారం.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev4-1790834811597.webp",
          map: "https://maps.google.com/?q=Athidhi+Function+Hall+Gollapudi+Vijayawada"
        }
      ]
    },
    en: {
      bride: "POORNA LATHA",
      brideFull: "Chi. La. Sou. Poorna Latha",
      groom: "KRISHNA CHAITANYA",
      groomFull: "Chi. Krishna Chaitanya",
      sealTopShloka: "॥ శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు ॥",
      sealGreeting: "Wedding Invitation",
      sealDateText: "Thursday, 29 October 2026",
      openBtnText: "శుభలేఖ తెరవండి",
      sealFooterNote: "",
      heroShloka: "॥ శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు ॥",
      heroWeds: "weds",
      heroSubline: "Celebrating the Auspicious Wedding of Krishna Chaitanya & Poorna Latha",
      scrollHintText: "Scroll Down to View Subhalekha (శుభలేఖను తిలకించండి)",
      patTitle: "॥ Wedding Invitation (వివాహ ఆహ్వాన శుభ పత్రిక) ॥",
      patBlessing: "Srirasthu · Subhamasthu · Avighnamasthu",
      patAncestors: "",
      patParents: "Sri Cheruku Yedukondalu & Smt. Subhashini",
      patInviteText: "Solicit your gracious presence and blessings on the auspicious occasion of the wedding of their elder son",
      patPanchangamDetails: "Mrugasira Nakshatram, Vrushabha Lagnam Sumuhurtham",
      patMuhurthamDateTime: "Thursday, 29th October 2026 at 07:30 PM",
      patLocationSummary: "Venue: Athidhi Function Hall · Gollapudi, Vijayawada",
      ritualsTitle: "Saptapadi & Sacred Rituals",
      ritualsSubtitle: "The sacred spiritual significance behind traditional Telugu wedding rituals",
      eventsTitle: "Kalyana Mahotsavam",
      eventsSub: "Auspicious dates and timings for our wedding celebrations",
      feastTitle: "Traditional Kalyana Vindhu Feast",
      feastSubtitle: "Authentic Andhra wedding delicacies served on a fresh banana leaf",
      storyVerseLine: "Two Hearts... Becoming One",
      storyVerseSub: "A Sacred Matrimonial Journey with Elders' Blessings",
      storyMuhurthamTitle: "Muhurtham",
      storyMuhurthamWhen: "29.10.2026",
      coupleHead: "Meet the Bride & Groom",
      coupleTale: "With immense joy and the blessings of the Almighty and our elders, Chi. Krishna Chaitanya (elder son of Sri Cheruku Yedukondalu & Smt. Subhashini) unites in sacred matrimony with Chi.La.Sou. Poorna Latha (only daughter of Sri Ravirala Radha Balakrishna Rao & Smt. Indiradevi, Kondapalli, Ibrahimpatnam Mandal, N.T.R. Dist.).",
      familyRoots: "Celebrating the union of Cheruku & Ravirala families (Gollapudi & Kondapalli, Vijayawada, N.T.R. Dist.)",
      venueHead: "Kalyana Vedika & Location",
      mapBtnLabel: "Get Directions on Google Maps",
      rsvpMainTitle: "Bless the Couple · RSVP",
      rsvpLead: "Your gracious presence and heartfelt blessings will make our celebrations truly unforgettable.",
      txtAccept: "Joyfully Accept",
      txtDecline: "Regretfully Decline",
      txtSubmit: "Send Blessings · Submit RSVP",
      countMainHead: "The Sacred Countdown Begins",
      cdLblDays: "DAYS",
      cdLblHours: "HOURS",
      cdLblMins: "MINS",
      cdLblSecs: "SECS",
      lblAddGoogleCal: "Save to Google Calendar",
      galleryMainTitle: "Cherished Memories",
      gallerySubDesc: "Unforgettable glimpses from our beautiful journey together",
      tapInstructions: "Tap Photos to Scatter & Arrange",
      footerGratitude: "Heartfelt Gratitude",
      footerFamilies: "With Best Compliments From Near & Dear · Cheruku & Ravirala Families",
      roseShowerTxt: "Rose Petals (పూల వర్షం)",
      events: [
        {
          name: "Sumuhurtham (సుముహూర్తం)",
          date: "Thursday, 29 October 2026",
          time: "07:30 PM",
          place: "Athidhi Function Hall, Gollapudi, Vijayawada",
          desc: "Mrugasira Nakshatram, Vrushabha Lagna Sumuhurtham, Jeelakarra-Bellam, Mangalasutra Dharana, Talambralu & Saptapadi.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev3-1790834810738.webp",
          map: "https://maps.google.com/?q=Athidhi+Function+Hall+Gollapudi+Vijayawada"
        },
        {
          name: "Dinner & Kalyana Vindhu (వివాహ విందు)",
          date: "Thursday, 29 October 2026",
          time: "07:00 PM onwards",
          place: "Athidhi Function Hall, Gollapudi, Vijayawada",
          desc: "Traditional Andhra wedding feast served with love, hospitality and elder blessings.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev4-1790834811597.webp",
          map: "https://maps.google.com/?q=Athidhi+Function+Hall+Gollapudi+Vijayawada"
        }
      ]
    }
  };

  let currentLang = 'en'; // English default with cultural Telugu phrases

  // --- RENDER DYNAMIC CONTENT BASED ON LANGUAGE ---
  function renderContent(lang) {
    currentLang = lang;
    const d = WEDDING_DATA[lang];

    // Document Title
    document.title = "Chaithu & Poorns Wedding Invitation";

    // Temple Gate
    setTxt("sealTopShloka", d.sealTopShloka);
    setTxt("sealGreeting", d.sealGreeting);
    setTxt("sealBride", d.bride);
    setTxt("sealGroom", d.groom);
    setTxt("sealDateText", d.sealDateText);
    setTxt("openBtnText", d.openBtnText);
    setTxt("sealFooterNote", d.sealFooterNote);

    // Section 1: Hero
    setTxt("heroShloka", d.heroShloka);
    setTxt("heroBride", d.bride);
    setTxt("heroGroom", d.groom);
    setTxt("heroWeds", d.heroWeds);
    setTxt("heroSubline", d.heroSubline);
    setTxt("scrollHintText", d.scrollHintText);

    // Section 2: Pelli Patrika
    setTxt("patTitle", d.patTitle);
    setTxt("patBlessing", d.patBlessing);
    setTxt("patAncestors", d.patAncestors);
    setTxt("patParents", d.patParents);
    setTxt("patInviteText", d.patInviteText);
    setTxt("patBrideName", d.brideFull);
    setTxt("patGroomName", d.groomFull);
    setTxt("patDateText", d.patMuhurthamDateTime ? d.patMuhurthamDateTime.toUpperCase() : d.sealDateText.toUpperCase());
    setTxt("patPanchangamDetails", d.patPanchangamDetails);
    setTxt("patMuhurthamDateTime", d.patMuhurthamDateTime);
    setTxt("patLocationSummary", d.patLocationSummary);

    // Section 3: Rituals
    setTxt("ritualsTitle", d.ritualsTitle);
    setTxt("ritualsSubtitle", d.ritualsSubtitle);

    // Section 4: Events
    setTxt("eventsTitle", d.eventsTitle);
    setTxt("eventsSub", d.eventsSub);
    renderEventsList(d.events, lang);

    // Section 5: Feast
    setTxt("feastTitle", d.feastTitle);
    setTxt("feastSubtitle", d.feastSubtitle);

    // Section 6: Story Mandapam
    setTxt("storyVerseLine", d.storyVerseLine);
    setTxt("storyVerseSub", d.storyVerseSub);
    setTxt("storyMuhurthamTitle", d.storyMuhurthamTitle);
    setTxt("storyMuhurthamWhen", d.storyMuhurthamWhen);

    // Section 7: Couple
    setTxt("coupleHead", d.coupleHead);
    setTxt("coupleTale", d.coupleTale);
    setTxt("duoBride", lang === 'te' ? "పూర్ణ లత" : "Poorna Latha");
    setTxt("duoGroom", lang === 'te' ? "కృష్ణ చైతన్య" : "Krishna Chaitanya");
    setTxt("familyRoots", d.familyRoots);

    // Section 8: Venue
    setTxt("venueHead", d.venueHead);
    setTxt("venueName", lang === 'te' ? WEDDING_DATA.venue.nameTe : WEDDING_DATA.venue.name);
    setTxt("venueAddress", lang === 'te' ? WEDDING_DATA.venue.addressTe : WEDDING_DATA.venue.address);
    setTxt("mapBtnLabel", d.mapBtnLabel);

    // Section 9: RSVP
    setTxt("rsvpMainTitle", d.rsvpMainTitle);
    setTxt("rsvpLead", d.rsvpLead);
    setTxt("txtAccept", d.txtAccept);
    setTxt("txtDecline", d.txtDecline);
    setTxt("txtSubmit", d.txtSubmit);

    // Section 10: Countdown
    setTxt("countMainHead", d.countMainHead);
    setTxt("countdownExactDate", d.sealDateText);
    setTxt("cdLblDays", d.cdLblDays);
    setTxt("cdLblHours", d.cdLblHours);
    setTxt("cdLblMins", d.cdLblMins);
    setTxt("cdLblSecs", d.cdLblSecs);
    setTxt("lblAddGoogleCal", d.lblAddGoogleCal);

    // Section 11: Gallery
    setTxt("galleryMainTitle", d.galleryMainTitle);
    setTxt("gallerySubDesc", d.gallerySubDesc);
    setTxt("tapInstructions", d.tapInstructions);

    // Footer & Header
    setTxt("footerGratitude", d.footerGratitude);
    setTxt("footerFamilies", d.footerFamilies);
    setTxt("footerKalyanamNote", `Wedding Celebration of ${WEDDING_DATA.en.groom} & ${WEDDING_DATA.en.bride} · Vijayawada · 2026`);
    setTxt("roseShowerTxt", d.roseShowerTxt);
  }

  // --- RENDER EVENTS LIST ---
  function renderEventsList(events, lang) {
    const listEl = $("#eventsList");
    if (!listEl) return;

    listEl.innerHTML = events.map((ev, idx) => {
      const delayClass = idx % 2 === 1 ? " d1" : "";
      const mapBtnText = lang === 'te' ? "మ్యాప్ చూడండి" : "View Map";
      const whenLabel = lang === 'te' ? "సమయం:" : "When:";
      const whereLabel = lang === 'te' ? "వేదిక:" : "Where:";

      return `
        <article class="ev rv${delayClass}">
          <div class="ev-art" style="background-image:url('${ev.art}');">
            <span class="ev-badge">వేడుక ${idx + 1}</span>
            <h3 class="n">${ev.name}</h3>
          </div>
          <div class="ev-body">
            <p class="ev-desc">${ev.desc}</p>
            <div class="ev-meta">
              <b>${whenLabel}</b>
              <span>${ev.date} · ${ev.time}</span>
              <b>${whereLabel}</b>
              <span>${ev.place}</span>
            </div>
            <div class="ev-actions">
              <a class="btn btn-temple-gold" href="${ev.map}" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/>
                </svg>
                <span>${mapBtnText}</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    $$("#eventsList .rv").forEach(el => io.observe(el));
  }

  // --- LANGUAGE SWITCH BUTTONS ---
  const btnLangTe = $("#btnLangTe");
  const btnLangEn = $("#btnLangEn");

  if (btnLangTe && btnLangEn) {
    btnLangTe.addEventListener("click", () => {
      if (currentLang === 'te') return;
      btnLangTe.classList.add("active");
      btnLangEn.classList.remove("active");
      btnLangTe.setAttribute("aria-pressed", "true");
      btnLangEn.setAttribute("aria-pressed", "false");
      renderContent('te');
    });

    btnLangEn.addEventListener("click", () => {
      if (currentLang === 'en') return;
      btnLangEn.classList.add("active");
      btnLangTe.classList.remove("active");
      btnLangEn.setAttribute("aria-pressed", "true");
      btnLangTe.setAttribute("aria-pressed", "false");
      renderContent('en');
    });
  }

  // --- SCROLL INTERPOLATION & PARALLAX ENGINE (LOW LATENCY) ---
  const tf = (el, val) => { if (el) el.style.transform = val; };
  const op = (el, val) => { if (el) el.style.opacity = val; };

  const SCENES = [];
  let rafId = 0;
  let forceSnap = true;

  function registerScene(id, totalTime, updateFn) {
    const el = document.getElementById(id);
    if (el) {
      SCENES.push({
        el,
        T: totalTime,
        update: updateFn,
        cur: 0,
        tgt: 0,
        drawn: -1
      });
    }
  }

  function loop() {
    rafId = 0;
    let needsMoreFrames = false;
    const vh = window.innerHeight;

    for (const sc of SCENES) {
      const rect = sc.el.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(1, sc.el.offsetHeight - vh));
      sc.tgt = progress;

      if (rect.bottom < -vh || rect.top > 2 * vh) {
        sc.cur = sc.tgt;
        continue;
      }

      const diff = sc.tgt - sc.cur;
      if (forceSnap || Math.abs(diff) < 0.0006) {
        sc.cur = sc.tgt;
      } else {
        sc.cur += 0.16 * diff;
        needsMoreFrames = true;
      }

      if (sc.drawn !== sc.cur) {
        sc.update(sc.cur * sc.T);
        sc.drawn = sc.cur;
      }
    }

    forceSnap = false;
    if (needsMoreFrames) {
      kick();
    }
  }

  function kick() {
    if (!rafId) {
      rafId = requestAnimationFrame(loop);
    }
  }

  window.addEventListener("scroll", kick, { passive: true });
  window.addEventListener("resize", () => {
    forceSnap = true;
    kick();
  });

  // 1. Hero Gopuram Entrance Parallax
  (function initHeroScene() {
    const sky = $("#skyBg");
    const gop = $("#heroGopuram");
    const names = $("#heroContent");
    const treeL = $("#heroTreeL");
    const treeR = $("#heroTreeR");
    const clouds = $$("#hero .cloud");
    const flash = $("#heroFlash");

    registerScene("hero", 6.8, (t) => {
      const gopZoom = seg(t, 0, 4);
      const gopAscent = eIn(seg(t, 4, 7));
      const treeReveal = seg(t, 0.5, 3.5);
      const cloudP = seg(t, 4.4, 6.4);

      if (sky) {
        tf(sky, `scale(${1 + 0.14 * seg(t, 0, 6)}) translateY(${lerp(0, -3.5, seg(t, 0, 6))}%)`);
      }

      tf(gop, `translate(-50%, ${lerp(8, -8, gopZoom) + lerp(0, -50, gopAscent)}%) scale(${1 + 5.2 * gopAscent})`);
      tf(names, `translateY(${-45 * gopZoom}%)`);
      op(names, 1 - seg(t, 3.4, 4.6));

      tf(treeL, `translate(${-80 * gopAscent}%, ${lerp(0, 30, gopAscent)}%) scale(${1 + 0.9 * gopAscent})`);
      tf(treeR, `translate(${80 * gopAscent}%, ${lerp(0, 30, gopAscent)}%) scale(${1 + 0.9 * gopAscent})`);

      clouds.forEach(cl => {
        const speed = parseFloat(cl.dataset.speed) || 40;
        tf(cl, `translateX(${1.5 * speed * seg(t, 0, 7)}px) scale(${1 + 0.6 * cloudP})`);
        op(cl, 1 - cloudP);
      });

      op(flash, 0.35 * seg(t, 5.6, 6.8));
    });
  })();

  // 2. Pelli Patrika Stagger Reveal
  (function initPatrikaScene() {
    const items = $$("#patrikaSection .pat-item");
    const totalDuration = 0.42 * Math.max(0, items.length - 1) + 0.9;
    const patrikaEl = $("#patrikaSection");
    if (patrikaEl) {
      patrikaEl.style.height = Math.round(140 + 14 * items.length) + "vh";
    }

    registerScene("patrikaSection", totalDuration, (t) => {
      items.forEach((item, idx) => {
        const p = eOut(seg(t, 0.42 * idx - 0.5, 0.42 * idx + 0.15));
        op(item, p);
        tf(item, `translateY(${24 * (1 - p)}px)`);
      });
    });
  })();

  // 3. Story Mandapam & Couple Reveal
  (function initStoryScene() {
    const world = $("#storyWorld");
    const clouds = $$("#storyScene .s-cloud");
    const sidePillars = $$("#storyScene .s-back");
    const gop = $("#storyMainGopuram");
    const leafL = $("#storyLeafL");
    const leafR = $("#storyLeafR");
    const lotus = $("#storyLotus");
    const couple = $("#storyCouple");
    const cap1 = $("#storyCap1");
    const cap2 = $("#storyCap2");

    registerScene("storyScene", 6.6, (t) => {
      const scrollProgress = seg(t, 0, 6);
      const couplePop = eOut(seg(t, 2, 4.4));

      tf(world, `translateY(${-46 * scrollProgress}%)`);
      clouds.forEach(c => tf(c, `translateY(${160 * scrollProgress}%)`));
      sidePillars.forEach(p => tf(p, `translateY(${14 * scrollProgress}%)`));
      tf(gop, `translateY(${6 * scrollProgress}%) scale(${1 + 0.04 * scrollProgress})`);
      tf(leafL, `translateY(${-14 * scrollProgress}%) rotate(${-5 * scrollProgress}deg)`);
      tf(leafR, `translateY(${-14 * scrollProgress}%) rotate(${5 * scrollProgress}deg)`);
      tf(lotus, `translateY(${-70 * scrollProgress}%)`);
      tf(couple, `translateY(${6 * (1 - couplePop)}%) scale(${0.9 + 0.1 * couplePop})`);

      const c1P = seg(t, 0.3, 1.0);
      const c1Fade = seg(t, 2.1, 2.7);
      const c2P = seg(t, 1.2, 2.0);
      const c2Fade = seg(t, 5.4, 6.2);

      op(cap1, c1P * (1 - c1Fade));
      tf(cap1, `translateY(${24 * (1 - c1P) - 20 * c1Fade}px)`);

      op(cap2, c2P * (1 - c2Fade));
      tf(cap2, `translateY(${20 * (1 - c2P) - 16 * c2Fade}px)`);

      if (t > 0.05 && t < 6.4) {
        startStoryRoseRain();
      } else {
        stopStoryRoseRain();
      }
    });
  })();

  // 4. RSVP Behind Royal Velvet Curtains
  (function initRsvpScene() {
    const curL = $("#curtainLeft");
    const curR = $("#curtainRight");
    const rItems = $$("#rsvpScene .r-item");

    registerScene("rsvpScene", 3.6, (t) => {
      const curtainPart = eIO(seg(t, 0.2, 2.2));
      tf(curL, `translateX(${-104 * curtainPart}%)`);
      tf(curR, `translateX(${104 * curtainPart}%)`);

      rItems.forEach((item, idx) => {
        const p = eOut(seg(t, 1.4 + 0.25 * idx, 1.9 + 0.25 * idx));
        op(item, p);
        tf(item, `translateY(${20 * (1 - p)}px)`);
      });
    });
  })();

  // --- INTERSECTION OBSERVER FOR REVEALS ---
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".rv").forEach(el => io.observe(el));



  // --- REAL-TIME LIVE COUNTDOWN TO SUMUHURTHAM ---
  function updateCountdown() {
    const target = new Date(WEDDING_DATA.weddingAt).getTime();
    const now = Date.now();
    const diff = target - now;

    const cdDays = $("#cdDays");
    const cdHours = $("#cdHours");
    const cdMins = $("#cdMins");
    const cdSecs = $("#cdSecs");

    if (!cdDays) return;

    if (diff <= 0) {
      cdDays.textContent = "00";
      cdHours.textContent = "00";
      cdMins.textContent = "00";
      cdSecs.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMins.textContent = String(mins).padStart(2, '0');
    cdSecs.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- GOOGLE CALENDAR & .ICS GENERATOR ---
  (function initCalendarLinks() {
    const eventTitle = "Wedding of Krishna Chaitanya & Poorna Latha (కళ్యాణ మహోత్సవం)";
    const eventDesc = "With the blessings of our elders, Chi. Krishna Chaitanya weds Chi.La.Sou. Poorna Latha at Athidhi Function Hall, Gollapudi, Vijayawada.";
    const eventLoc = `${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`;
    const startIso = "20261029T140000Z"; // 07:30 PM IST (14:00 UTC)
    const endIso = "20261029T183000Z";

    const calBtn = $("#btnGoogleCalendar");
    if (calBtn) {
      calBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(eventDesc)}&location=${encodeURIComponent(eventLoc)}`;
    }

    const btnIcs = $("#btnDownloadIcs");
    if (btnIcs) {
      btnIcs.addEventListener("click", () => {
        const icsContent = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//Telugu Wedding Invitation//EN",
          "BEGIN:VEVENT",
          `UID:${Date.now()}@wedding-invitation`,
          `DTSTAMP:${startIso}`,
          `DTSTART:${startIso}`,
          `DTEND:${endIso}`,
          `SUMMARY:${eventTitle}`,
          `DESCRIPTION:${eventDesc}`,
          `LOCATION:${eventLoc}`,
          "STATUS:CONFIRMED",
          "END:VEVENT",
          "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Lakshmi_Krishna_Wedding.ics";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  })();

  // --- INTERACTIVE POLAROID PHOTO GALLERY ---
  (function initInteractiveGallery() {
    const galleryEl = $("#momentsGallery");
    if (!galleryEl) return;
    const photos = WEDDING_DATA.gallery;
    const total = photos.length;

    const cards = photos.map(src => {
      const card = document.createElement("div");
      card.className = "pc";
      card.innerHTML = `<div class="ph" style="background-image:url('${src}')"></div>`;
      galleryEl.appendChild(card);
      return card;
    });

    const getDims = () => ({
      w: galleryEl.clientWidth,
      h: galleryEl.clientHeight
    });

    const setCardPos = (el, x, y, rot, scale, dur = 0, ease = "ease") => {
      el.style.transition = dur ? `transform ${dur}s ${ease}` : "none";
      el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
    };

    const layoutStack = () => {
      const { w, h } = getDims();
      cards.forEach((card, i) => {
        setCardPos(
          card,
          w / 2 - 50 + 6 * (i % 3 - 1),
          0.52 * h - 60 + 2 * i,
          (i * 18) - 25,
          1,
          0
        );
      });
    };

    layoutStack();

    let state = 0;
    let timerId = 0;

    function scatterPhotos() {
      clearTimeout(timerId);
      const { w, h } = getDims();

      if (state === 0) {
        cards.forEach((card, i) => {
          const randX = 15 + Math.random() * (w - 130);
          const randY = 30 + Math.random() * (h - 180);
          const randRot = 44 * Math.random() - 22;
          setTimeout(() => {
            setCardPos(card, randX, randY, randRot, 1, 0.75, "cubic-bezier(0.2, 0.8, 0.2, 1)");
          }, i * 35);
        });

        timerId = setTimeout(() => {
          cards.forEach((card, i) => {
            const angle = (i / total) * Math.PI * 2;
            const radius = Math.min(w, h) / 36;
            const hx = w / 2 + 15 * Math.pow(Math.sin(angle), 3) * radius - 50;
            const hy = 0.54 * h - (12 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle)) * radius - 60;
            setCardPos(card, hx, hy, 16 * Math.random() - 8, 1, 1.1, "cubic-bezier(0.65, 0, 0.35, 1)");
          });
        }, 900);
        state = 1;
      } else {
        layoutStack();
        state = 0;
      }
    }

    galleryEl.addEventListener("click", () => {
      scatterPhotos();
      triggerRealisticRoseShower(window.innerWidth / 2, window.innerHeight * 0.7, 30);
    });

    galleryEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scatterPhotos();
      }
    });

    window.addEventListener("resize", () => {
      if (state === 0) layoutStack();
    });
  })();

  // --- TEMPLE BELLS INTERACTION ---
  (function initTempleBells() {
    const bellsContainer = $("#bellsBar");
    if (!bellsContainer) return;

    const bellSvg = `
      <svg viewBox="0 0 22 70" aria-hidden="true" title="Ring Sacred Temple Bell">
        <line x1="11" y1="0" x2="11" y2="40" stroke="#d4af37" stroke-width="1.5"/>
        <path d="M3,62 Q3,44 11,42 Q19,44 19,62 Z" fill="#e2b24e" stroke="#8a5a14"/>
        <rect x="1" y="61" width="20" height="3" rx="1.5" fill="#a8741f"/>
        <circle cx="11" cy="67" r="2.6" fill="#a8741f"/>
      </svg>
    `;

    bellsContainer.innerHTML = bellSvg.repeat(7);

    $$("#bellsBar svg").forEach(b => {
      b.addEventListener("click", () => {
        b.style.animation = "none";
        b.offsetHeight;
        b.style.animation = "swingTempleBell 0.8s ease-in-out 3";
        playBellChime();
      });
    });
  })();

  // --- BACKGROUND MUSIC: TELUGU WEDDING TUNE & TEMPLE CHIMES ---
  const weddingBgm = $("#weddingBgm");
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    return audioCtx;
  }

  function playBellChime() {
    // Disabled - ting notification sound removed
  }

  function updateMusicButtonUI(isPlaying) {
    const btn = $("#musicToggle");
    if (!btn) return;
    if (isPlaying) {
      btn.classList.add("playing");
      btn.classList.remove("muted");
      btn.setAttribute("title", "సంగీతం ఆపండి (Pause Telugu Wedding Tune)");
      btn.setAttribute("aria-label", "Pause Telugu Wedding Tune");
    } else {
      btn.classList.remove("playing");
      btn.classList.add("muted");
      btn.setAttribute("title", "మంగళ వాయిద్యాలు ప్రారంభించండి (Play Telugu Wedding Tune)");
      btn.setAttribute("aria-label", "Play Telugu Wedding Tune");
    }
  }

  function startMangalaMusic() {
    if (!weddingBgm) return;
    try {
      weddingBgm.volume = 0.85;
      const p = weddingBgm.play();
      if (p !== undefined) {
        p.then(() => {
          updateMusicButtonUI(true);
        }).catch(err => {
          console.warn("Autoplay deferred until user gesture:", err);
        });
      }
    } catch (e) {
      console.warn("Music play error:", e);
    }
  }

  function stopMangalaMusic() {
    if (!weddingBgm) return;
    try {
      weddingBgm.pause();
      updateMusicButtonUI(false);
    } catch (e) {
      console.warn("Music pause error:", e);
    }
  }

  if (weddingBgm) {
    weddingBgm.addEventListener("play", () => updateMusicButtonUI(true));
    weddingBgm.addEventListener("pause", () => updateMusicButtonUI(false));
    weddingBgm.addEventListener("ended", () => updateMusicButtonUI(false));
  }

  const musicBtn = $("#musicToggle");
  if (musicBtn) {
    musicBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!weddingBgm) return;
      if (weddingBgm.paused) {
        startMangalaMusic();
      } else {
        stopMangalaMusic();
      }
    });
  }

  // --- 3D TEMPLE DOORS UNLOCK & OPEN ---
  const templeGate = $("#templeGate");
  const openInviteBtn = $("#openInviteBtn");

  function unlockSanctum() {
    document.body.classList.remove("locked");
    forceSnap = true;
    kick();
    startMangalaMusic();
  }

  if (openInviteBtn && templeGate) {
    openInviteBtn.addEventListener("click", () => {
      startMangalaMusic();
      templeGate.classList.add("open");
      setTimeout(unlockSanctum, 850);
      setTimeout(() => templeGate.classList.add("gone"), 1900);
    });
  }

  // ====================================================================
  // REALISTIC ROSE & JASMINE PETALS PARTICLE PHYSICS (NOT CONFETTI!)
  // ====================================================================
  const canvas = $("#rosePetalsCanvas");
  let ctx = null;
  let rosePetals = [];
  let animPetalId = 0;

  if (canvas) {
    ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  /**
   * Represents an organic, velvety Rose Petal or Jasmine Flower
   * with true curved geometry, 3D tumbling (pitch/roll/yaw), and air drift.
   */
  class OrganicRosePetal {
    constructor(x, y, isJasmine = false, isGentleRain = false) {
      this.x = x;
      this.y = y;
      this.isJasmine = isJasmine;
      this.isGentleRain = isGentleRain;

      if (isGentleRain) {
        // Slow graceful downward float with air cushion
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = 0.65 + Math.random() * 0.75;
        this.gravity = 0.003 + Math.random() * 0.004;
        this.airFriction = 0.997;

        // Smooth fade-in and fade-out
        this.alpha = 0;
        this.maxAlpha = 0.75 + Math.random() * 0.25;
        this.fadeInSpeed = 0.02 + Math.random() * 0.015;
        this.isFadingIn = true;
        this.isFadingOut = false;
        this.fadeOutSpeed = 0.012 + Math.random() * 0.01;

        // Fluttering wave
        this.swaySpeed = 0.016 + Math.random() * 0.018;
        this.swayDistance = 1.1 + Math.random() * 1.5;
        this.phase = Math.random() * Math.PI * 2;

        // 3D rotation
        this.yaw = Math.random() * Math.PI * 2;
        this.yawSpeed = (Math.random() - 0.5) * 0.025;
        this.pitch = Math.random() * Math.PI * 2;
        this.pitchSpeed = (Math.random() - 0.5) * 0.035;
      } else {
        // Realistic initial dispersion velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 7;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 2.5;

        // Petal physical properties
        this.gravity = 0.08 + Math.random() * 0.08;
        this.airFriction = 0.985;
        this.alpha = 1;
        this.decay = 0.0035 + Math.random() * 0.005;

        // Natural fluttering wave parameters
        this.swaySpeed = 0.02 + Math.random() * 0.03;
        this.swayDistance = 1.2 + Math.random() * 2.2;
        this.phase = Math.random() * Math.PI * 2;

        // 3D rotation angles (yaw, pitch, roll)
        this.yaw = Math.random() * Math.PI * 2;
        this.yawSpeed = (Math.random() - 0.5) * 0.06;
        this.pitch = Math.random() * Math.PI * 2;
        this.pitchSpeed = (Math.random() - 0.5) * 0.08;
      }

      if (this.isJasmine) {
        // Fragrant Jasmine Petal (ivory white with golden base)
        this.baseWidth = 10 + Math.random() * 6;
        this.baseHeight = 16 + Math.random() * 8;
        this.colorGrad = [
          { stop: 0, color: "#ffffff" },
          { stop: 0.6, color: "#fffded" },
          { stop: 1, color: "#ffe082" }
        ];
      } else {
        // Velvety Rose Petal (Crimson red, deep maroon, blush pink variations)
        this.baseWidth = 14 + Math.random() * 10;
        this.baseHeight = 20 + Math.random() * 14;

        const colorPresets = [
          // 1. Rich Crimson Red Rose
          [
            { stop: 0, color: "#ff4d6d" },
            { stop: 0.45, color: "#c9184a" },
            { stop: 1, color: "#590d22" }
          ],
          // 2. Velvet Deep Maroon Rose
          [
            { stop: 0, color: "#e63946" },
            { stop: 0.5, color: "#9b111e" },
            { stop: 1, color: "#4a0404" }
          ],
          // 3. Romantic Coral & Rose Pink
          [
            { stop: 0, color: "#ff8fa3" },
            { stop: 0.5, color: "#ff4d6d" },
            { stop: 1, color: "#800f2f" }
          ]
        ];

        this.colorGrad = colorPresets[Math.floor(Math.random() * colorPresets.length)];
      }
    }

    update() {
      this.vx *= this.airFriction;
      this.vy += this.gravity;

      // Lateral breeze sway
      this.phase += this.swaySpeed;
      this.x += this.vx + Math.sin(this.phase) * this.swayDistance;
      this.y += this.vy;

      // 3D rotation update
      this.yaw += this.yawSpeed;
      this.pitch += this.pitchSpeed;

      if (this.isGentleRain) {
        if (this.isFadingIn) {
          this.alpha += this.fadeInSpeed;
          if (this.alpha >= this.maxAlpha) {
            this.alpha = this.maxAlpha;
            this.isFadingIn = false;
          }
        }
        const screenH = canvas ? canvas.height : window.innerHeight;
        if (this.y > screenH * 0.65) {
          this.isFadingOut = true;
        }
        if (this.isFadingOut) {
          this.alpha -= this.fadeOutSpeed;
        }
      } else {
        this.alpha -= this.decay;
      }
    }

    draw(c) {
      c.save();
      c.globalAlpha = Math.max(0, this.alpha);
      c.translate(this.x, this.y);
      c.rotate(this.yaw);

      // 3D perspective tumbling illusion (scale along pitch axis)
      const scaleY = Math.sin(this.pitch);
      c.scale(1, Math.max(0.12, Math.abs(scaleY)));

      const w = this.baseWidth;
      const h = this.baseHeight;

      // Create natural radial gradient for velvety petal sheen
      const grad = c.createRadialGradient(0, -h * 0.2, w * 0.1, 0, 0, h);
      this.colorGrad.forEach(cg => {
        grad.addColorStop(cg.stop, cg.color);
      });
      c.fillStyle = grad;

      // Draw Organic Curved Rose Petal Geometry (Not rectangular confetti!)
      c.beginPath();
      // Start from stem tip at base
      c.moveTo(0, h * 0.5);

      // Curve out to left shoulder
      c.bezierCurveTo(-w * 0.65, h * 0.35, -w * 0.85, -h * 0.15, -w * 0.5, -h * 0.45);

      // Top notch / soft curl
      c.bezierCurveTo(-w * 0.25, -h * 0.55, 0, -h * 0.42, 0, -h * 0.45);
      c.bezierCurveTo(0, -h * 0.42, w * 0.25, -h * 0.55, w * 0.5, -h * 0.45);

      // Curve down through right shoulder to base
      c.bezierCurveTo(w * 0.85, -h * 0.15, w * 0.65, h * 0.35, 0, h * 0.5);
      c.closePath();
      c.fill();

      // Subtle delicate petal curl highlight on edge
      c.strokeStyle = "rgba(255, 255, 255, 0.28)";
      c.lineWidth = 1;
      c.stroke();

      c.restore();
    }
  }

  function triggerRealisticRoseShower(x, y, count = 45) {
    if (!ctx) return;
    for (let i = 0; i < count; i++) {
      const isJasmine = Math.random() > 0.65;
      rosePetals.push(new OrganicRosePetal(x, y, isJasmine, false));
    }
    if (!animPetalId) {
      animateRosePetals();
    }
  }

  // Story Scene Gentle Rose Rain Controller
  let storyRainInterval = null;
  let isStoryRainActive = false;

  function spawnGentlePetal(initialRandomY = false) {
    if (!ctx) return;
    const canW = canvas ? canvas.width : window.innerWidth;
    const canH = canvas ? canvas.height : window.innerHeight;
    const x = Math.random() * canW;
    const y = initialRandomY 
      ? Math.random() * (canH * 0.62)
      : -25 - Math.random() * 30;
    const isJasmine = Math.random() > 0.78;
    const petal = new OrganicRosePetal(x, y, isJasmine, true);
    if (initialRandomY) {
      petal.alpha = 0.25 + Math.random() * 0.6;
      petal.isFadingIn = false;
    }
    rosePetals.push(petal);
  }

  function startStoryRoseRain() {
    if (isStoryRainActive) return;
    isStoryRainActive = true;

    // Immediately seed petals across view
    const currentGentle = rosePetals.filter(p => p.isGentleRain).length;
    if (currentGentle < 12) {
      for (let i = 0; i < 12; i++) {
        spawnGentlePetal(true);
      }
    }

    if (!animPetalId) animateRosePetals();

    if (!storyRainInterval) {
      storyRainInterval = setInterval(() => {
        if (!isStoryRainActive) {
          clearInterval(storyRainInterval);
          storyRainInterval = null;
          return;
        }
        const activeGentle = rosePetals.filter(p => p.isGentleRain).length;
        if (activeGentle < 28) {
          spawnGentlePetal(false);
          if (Math.random() > 0.45) spawnGentlePetal(false);
        }
        if (!animPetalId) animateRosePetals();
      }, 340);
    }
  }

  function stopStoryRoseRain() {
    isStoryRainActive = false;
    if (storyRainInterval) {
      clearInterval(storyRainInterval);
      storyRainInterval = null;
    }
    rosePetals = [];
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (animPetalId) {
      cancelAnimationFrame(animPetalId);
      animPetalId = 0;
    }
  }

  function animateRosePetals() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = rosePetals.length - 1; i >= 0; i--) {
      const p = rosePetals[i];
      p.update();
      p.draw(ctx);
      if (p.alpha <= 0 || p.y > canvas.height + 60) {
        rosePetals.splice(i, 1);
      }
    }

    if (rosePetals.length > 0) {
      animPetalId = requestAnimationFrame(animateRosePetals);
    } else {
      animPetalId = 0;
    }
  }

  // Header Rose Shower Button
  const roseShowerBtn = $("#roseShowerBtn");
  if (roseShowerBtn) {
    roseShowerBtn.addEventListener("click", () => {
      const rect = roseShowerBtn.getBoundingClientRect();
      triggerRealisticRoseShower(rect.left + rect.width / 2, rect.bottom + 10, 65);
      playBellChime();
    });
  }



  // --- RSVP FORM WITH DIRECT WHATSAPP INTEGRATION ---
  (function initRsvpForm() {
    const form = $("#weddingRsvpForm");
    if (!form) return;
    const rsvpCardBox = $("#rsvpCardBox");
    const rsvpSuccess = $("#rsvpSuccess");
    const formFeedback = $("#formFeedback");
    const btnAccept = $("#btnJoyfullyAccept");
    const btnDecline = $("#btnRegretDecline");
    const btnWhatsApp = $("#btnWhatsAppDirect");
    const btnReset = $("#btnResetRsvp");

    let isAttending = true;

    if (btnAccept && btnDecline) {
      btnAccept.addEventListener("click", () => {
        isAttending = true;
        btnAccept.classList.add("on");
        btnDecline.classList.remove("on");
        $("#guestCountRow").style.display = "flex";
      });

      btnDecline.addEventListener("click", () => {
        isAttending = false;
        btnDecline.classList.add("on");
        btnAccept.classList.remove("on");
        $("#guestCountRow").style.display = "none";
      });
    }

    try {
      if (localStorage.getItem("telugu_kalyanam_rsvp_done") === "1") {
        if (form && rsvpSuccess) {
          form.style.display = "none";
          rsvpSuccess.style.display = "block";
        }
      }
    } catch (e) {}

    if (btnReset) {
      btnReset.addEventListener("click", () => {
        form.style.display = "flex";
        rsvpSuccess.style.display = "none";
      });
    }

    // Direct WhatsApp share
    if (btnWhatsApp) {
      btnWhatsApp.addEventListener("click", () => {
        const name = form.guestName.value.trim() || "Guest";
        const guests = isAttending ? form.guests.value : "0";
        const wishes = form.message.value.trim();
        const attendingText = isAttending 
          ? "🌸 తప్పక విచ్చేస్తాము! (Joyfully Accepting - We will attend)" 
          : "🙏 రాలేకపోతున్నాము, మా హృదయపూర్వక ఆశీస్సులు! (Regretfully Declining)";

        const waText = [
          `*వివాహ ఆహ్వాన ప్రత్యుత్తరం (Wedding RSVP)*`,
          `💍 *లక్ష్మి ప్రియ & శ్రీ కృష్ణ కళ్యాణ మహోత్సవం*`,
          `👤 *పేరు / Name:* ${name}`,
          `✨ *హాజరు / Attendance:* ${attendingText}`,
          isAttending ? `👥 *అతిథుల సంఖ్య / Guests:* ${guests}` : "",
          wishes ? `💌 *శుభాకాంక్షలు / Blessings:* ${wishes}` : ""
        ].filter(Boolean).join("\n");

        const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, "_blank");
      });
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        formFeedback.textContent = "";

        const name = form.guestName.value.trim();
        if (!name) {
          form.guestName.focus();
          return;
        }

        if (form.website && form.website.value) return;

        const rsvpPayload = {
          name,
          attending: isAttending,
          guests: isAttending ? form.guests.value : 0,
          phone: form.phone.value.trim(),
          wishes: form.message.value.trim(),
          timestamp: new Date().toISOString()
        };

        try {
          localStorage.setItem("telugu_kalyanam_rsvp_done", "1");
          localStorage.setItem("telugu_kalyanam_rsvp_data", JSON.stringify(rsvpPayload));
        } catch (err) {}

        form.style.display = "none";
        rsvpSuccess.style.display = "block";
        triggerRealisticRoseShower(window.innerWidth / 2, window.innerHeight / 2, 75);
        playBellChime();
      });
    }
  })();

  // ====================================================================
  // WHOLE SCREEN TRADITIONAL COCONUT STARTING ANIMATION
  // ====================================================================
  function initWholeScreenCoconutIntro() {
    const stage = $("#fullscreenIntroStage");
    const actor = $("#introCoconutActor");
    const target = $("#kalashamEmblem");
    const card = $("#sealCard");
    const ripple = $("#introDockRipple");
    const heading = stage ? stage.querySelector(".intro-sacred-heading") : null;

    if (!stage || !actor || !target || !card) return;

    let hasDocked = false;

    function performDock() {
      if (hasDocked) return;
      hasDocked = true;

      // Compute exact destination coordinates of the target emblem on the card
      const targetRect = target.getBoundingClientRect();
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      // Starting center of viewport
      const startCenterX = window.innerWidth / 2;
      const startCenterY = window.innerHeight / 2;

      const deltaX = targetCenterX - startCenterX;
      const deltaY = targetCenterY - startCenterY;

      // Compute scale factor to match the emblem's final size
      const actorWidth = actor.offsetWidth || 170;
      const targetScale = (targetRect.width || 76) / actorWidth;

      // Position ripple wave exactly at the landing target
      if (ripple) {
        ripple.style.left = `${targetCenterX}px`;
        ripple.style.top = `${targetCenterY}px`;
      }

      // Smooth cinematic travel across the whole screen into "that place"
      actor.style.transition = "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), filter 1.1s ease, opacity 0.3s ease 0.95s";
      actor.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(${targetScale})`;
      actor.style.filter = "drop-shadow(0 2px 10px rgba(212, 175, 55, 0.7))";

      if (heading) {
        heading.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        heading.style.opacity = "0";
        heading.style.transform = "translateX(-50%) translateY(-25px)";
      }

      // At moment of landing:
      setTimeout(() => {
        // Dock into that place
        target.classList.add("docked");
        card.classList.add("card-revealed");

        // Fire golden ripple wave
        if (ripple) ripple.classList.add("fire-ripple");

        // Hide actor
        actor.style.opacity = "0";

        // Fade away full-screen intro stage smoothly
        setTimeout(() => {
          stage.classList.add("intro-finished");
        }, 500);
      }, 1050);
    }

    // Tap/Click anywhere on the full-screen intro to fast-forward
    stage.addEventListener("click", () => {
      performDock();
    });

    // Run automatically on reload: display grand full-screen darshanam for 850ms, then swoop into place
    setTimeout(performDock, 850);
  }

  // --- INITIALIZE DEFAULT CONTENT & RENDER ---
  renderContent('en');
  kick();
  initWholeScreenCoconutIntro();

})();
