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
    weddingAt: "2027-02-14T10:32:00+05:30",
    venue: {
      name: "Sri Lakshmi Venkateswara Kalyana Mandapam",
      nameTe: "శ్రీ లక్ష్మీ వేంకటేశ్వర కళ్యాణ మండపం",
      address: "Road No. 12, Banjara Hills, Hyderabad, Telangana - 500034",
      addressTe: "రోడ్ నెం. 12, బంజారా హిల్స్, హైదరాబాద్, తెలంగాణ - 500034",
      mapUrl: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
      phone: "+91 98765 43210"
    },
    gallery: [
      "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-gallery1-1790861320364.webp",
      "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-gallery2-1790862182952.webp",
      "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-gallery3-1790862336803.webp",
      "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-couple-1790861011173.webp"
    ],
    te: {
      bride: "లక్ష్మి ప్రియ",
      brideFull: "లక్ష్మి ప్రియ రెడ్డి",
      groom: "శ్రీ కృష్ణ",
      groomFull: "శ్రీ కృష్ణ రావు",
      sealTopShloka: "॥ శ్రీ లక్ష్మీ వేంకటేశ్వర స్వామి దివ్య ప్రసన్నః ॥",
      sealGreeting: "కళ్యాణ మహోత్సవ ఆహ్వానము",
      sealDateText: "ఆదివారం, 14 ఫిబ్రవరి 2027 · సుముహూర్తం: ఉ॥ 10:32",
      openBtnText: "శుభలేఖ తెరవండి (Open Invitation)",
      sealFooterNote: "సకుటుంబ సపరివార సమేతంగా విచ్చేయండి",
      heroShloka: "॥ వక్రతుండ మహాకాయ సూర్యకోటి సమప్రభ నిర్విఘ్నం కురు మే దేవ సర్వకార్యేషు సర్వదా ॥",
      heroWeds: "సహధర్మచారిణిగా",
      heroSubline: "శ్రీమద్ దైవ సన్నిధానంలో, పెద్దల ఆశీస్సులతో మా నూతన దాంపత్య ప్రయాణం",
      scrollHintText: "శుభలేఖను తిలకించండి (Scroll Down)",
      patTitle: "॥ వివాహ ఆహ్వాన శుభ పత్రిక ॥",
      patBlessing: "మా ఇలవేలుపుల, పెద్దల మరియు గురుజనుల దివ్య ఆశీస్సులతో",
      patAncestors: "స్వర్గీయ శ్రీమతి & శ్రీ నారాయణ రావు మరియు రామారావు గార్ల ఆశీస్సులతో",
      patParents: "శ్రీమతి శారద & శ్రీ వెంకటేశ్వర రావు దంపతులు",
      patInviteText: "తమ ద్వితీయ కుమార్తె చి॥సౌ॥ లక్ష్మి ప్రియ వివాహ మహోత్సవమునకు మిమ్ములను సకుటుంబ సపరివార సమేతంగా సాదరంగా ఆహ్వానిస్తున్నారు.",
      patPanchangamDetails: "స్వస్తిశ్రీ శుభకృత్ నామ సంవత్సరం, మాఘ శుద్ధ దశమి, రోహిణీ నక్షత్ర యుక్త మీన లగ్న సుముహూర్తమున",
      patMuhurthamDateTime: "ఆదివారం, 14 ఫిబ్రవరి 2027 · ఉదయం 10:32 గంటలకు",
      patLocationSummary: "కళ్యాణ వేదిక: శ్రీ లక్ష్మీ వేంకటేశ్వర కళ్యాణ మండపం · బంజారా హిల్స్, హైదరాబాద్",
      ritualsTitle: "సప్తపది & వివాహ ఆచారాలు",
      ritualsSubtitle: "తెలుగు సాంప్రదాయ వివాహంలోని పవిత్ర ఘట్టాల విశిష్టత",
      eventsTitle: "కళ్యాణ మహోత్సవాల వివరాలు",
      eventsSub: "మా ఇంట జరిగే మంగళ వేడుకల కాల నిర్ణయం",
      feastTitle: "సాంప్రదాయ కళ్యాణ విందు భోజనం",
      feastSubtitle: "అరిటాకులో ఘుమఘుమలాడే తెలుగు పెళ్లి భోజనం మెనూ",
      storyVerseLine: "రెండు మనసులు... ఒకటయ్యే వేళ",
      storyVerseSub: "పెద్దల దీవెనలతో పవిత్ర దాంపత్య బంధం",
      storyMuhurthamTitle: "జీలకర్ర బెల్లం & సుముహూర్తం",
      storyMuhurthamWhen: "14 ఫిబ్రవరి 2027 · ఉదయం 10:32 AM",
      coupleHead: "వధూవరుల పరిచయం",
      coupleTale: "బెంగళూరులో జరిగిన మిత్రుల సంగీత్ వేడుకలో మా తొలి పరిచయం మొదలైంది. హైదరాబాద్ దమ్ బిర్యానీ గొప్పదా లేదా రాయలసీమ రాగి సంకటి గొప్పదా అనే సరదా వాదనలతో మొదలైన మా ప్రయాణం... నేడు ఇరు కుటుంబాల సమ్మతితో, వేద మంత్రాల సాక్షిగా శాశ్వత దాంపత్య బంధంగా మారుతోంది.",
      familyRoots: "వరంగల్ మరియు విజయవాడ మూలాలు గల గౌరవనీయ కుటుంబాల సమ్మేళనం",
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
      footerFamilies: "శ్రీ రావు & రెడ్డి కుటుంబాల తరఫున సాదర ఆహ్వానములు",
      roseShowerTxt: "పూల వర్షం",
      events: [
        {
          name: "స్నాతకం & పెళ్లికూతురు / పెళ్లికొడుకు",
          date: "శుక్రవారం, 12 ఫిబ్రవరి 2027",
          time: "ఉదయం 9:00 AM",
          place: "వధూవరుల గృహములు (Jubilee Hills & Madhapur)",
          desc: "పవిత్ర మంగళ స్నానం, నలుగు & హల్దీ వేడుక, మంగళ హారతుల సమర్పణ.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev1-1790834809023.webp",
          map: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad"
        },
        {
          name: "మెహెందీ & సంగీత్ వేడుక",
          date: "శనివారం, 13 ఫిబ్రవరి 2027",
          time: "సాయంత్రం 6:00 PM onwards",
          place: "ది రాయల్ ప్యాలెస్ లాన్స్, గచ్చిబౌలి, హైదరాబాద్",
          desc: "గోరింటాకు డిజైన్లు, సంగీత నృత్యాలు, బంధుమిత్రుల వినోద వేడుకలు.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev2-1790834809887.webp",
          map: "https://maps.google.com/?q=Gachibowli+Hyderabad"
        },
        {
          name: "ప్రధాన సుముహూర్తం & జీలకర్ర బెల్లం",
          date: "ఆదివారం, 14 ఫిబ్రవరి 2027",
          time: "ఉదయం 10:32 AM",
          place: "శ్రీ లక్ష్మీ వేంకటేశ్వర కళ్యాణ మండపం, బంజారా హిల్స్",
          desc: "జీలకర్ర-బెల్లం ధారణ, మాంగల్యధారణ, తలంబ్రాలు, సప్తపది మరియు అరుంధతీ నక్షత్ర దర్శనం.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev3-1790834810738.webp",
          map: "https://maps.google.com/?q=Banjara+Hills+Hyderabad"
        },
        {
          name: "ఆశీర్వచనం & వివాహ విందు (Grand Reception)",
          date: "ఆదివారం, 14 ఫిబ్రవరి 2027",
          time: "సాయంత్రం 7:00 PM onwards",
          place: "గ్రాండ్ బాల్‌రూమ్, బంజారా హిల్స్, హైదరాబాద్",
          desc: "నూతన వధూవరులకు ఆశీర్వచనాలు, సాంప్రదాయ ఆంధ్రా & తెలంగాణ వివాహ విందు భోజనం.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev4-1790834811597.webp",
          map: "https://maps.google.com/?q=Banjara+Hills+Hyderabad"
        }
      ]
    },
    en: {
      bride: "Lakshmi Priya",
      brideFull: "Lakshmi Priya Reddy",
      groom: "Sri Krishna",
      groomFull: "Sri Krishna Rao",
      sealTopShloka: "|| Sri Lakshmi Venkateswara Swami Prasanna ||",
      sealGreeting: "Kalyana Mahotsavam Invitation",
      sealDateText: "Sunday, 14 February 2027 · Muhurtham: 10:32 AM",
      openBtnText: "Open Royal Subhalekha",
      sealFooterNote: "Cordially inviting you with family and friends",
      heroShloka: "|| Vakratunda Mahakaya Suryakoti Samaprabha Nirvighnam Kuru Me Deva ||",
      heroWeds: "takes the sacred vows with",
      heroSubline: "In the Divine Presence of the Almighty, Two Souls Unite in Sacred Matrimony",
      scrollHintText: "Scroll Down to View Subhalekha",
      patTitle: "|| Kalyana Subhalekha ||",
      patBlessing: "With the divine blessings of our deities and beloved elders",
      patAncestors: "Blessings of Late Smt. & Sri Narayana Rao and Rama Rao",
      patParents: "Smt. Sarada & Sri Venkateswara Rao",
      patInviteText: "joyfully request the pleasure of your company with family and friends to celebrate the wedding of their daughter.",
      patPanchangamDetails: "Swasti Sri Shubhakrit Nama Samvatsaram, Magha Shukla Dashami, Meena Lagna Sumuhurtham",
      patMuhurthamDateTime: "Sunday, 14 February 2027 · 10:32 AM IST",
      patLocationSummary: "Venue: Sri Lakshmi Venkateswara Kalyana Mandapam · Banjara Hills, Hyderabad",
      ritualsTitle: "Sacred Telugu Wedding Rituals",
      ritualsSubtitle: "The profound spiritual meaning behind authentic rituals",
      eventsTitle: "Sacred Wedding Celebrations",
      eventsSub: "Auspicious dates and timings for our celebrations",
      feastTitle: "Traditional Kalyana Vindhu Feast",
      feastSubtitle: "Authentic Andhra & Telangana wedding delicacies on a fresh banana leaf",
      storyVerseLine: "Two Hearts... Becoming One",
      storyVerseSub: "A Sacred Beginning with the Blessings of Our Elders",
      storyMuhurthamTitle: "Jeelakarra Bellam & Sumuhurtham",
      storyMuhurthamWhen: "14 February 2027 · 10:32 AM",
      coupleHead: "Meet the Bride & Groom",
      coupleTale: "We first met at a mutual friend's sangeet in Bengaluru. Friendly banter over Hyderabad Biryani vs Rayalaseema Ragi Sankati soon turned into an inseparable lifelong bond. Today, with the blessings of our families, we take our sacred vows.",
      familyRoots: "Celebrating the harmonious union of respected families from Warangal & Vijayawada",
      venueHead: "Wedding Venue & Navigation",
      mapBtnLabel: "Get Directions on Google Maps",
      rsvpMainTitle: "Will You Join Us?",
      rsvpLead: "Your gracious presence and heartfelt blessings will make our celebrations truly unforgettable.",
      txtAccept: "Joyfully Accept",
      txtDecline: "Regretfully Decline",
      txtSubmit: "Send Blessings (Submit RSVP)",
      countMainHead: "The Sacred Countdown Begins",
      cdLblDays: "Days",
      cdLblHours: "Hours",
      cdLblMins: "Minutes",
      cdLblSecs: "Seconds",
      lblAddGoogleCal: "Save to Google Calendar",
      galleryMainTitle: "Cherished Memories",
      gallerySubDesc: "Unforgettable moments from our beautiful journey together",
      tapInstructions: "Tap Photos to Scatter & Arrange",
      footerGratitude: "Heartfelt Gratitude",
      footerFamilies: "Warmly invited by the Rao & Reddy Families",
      roseShowerTxt: "Rose Petals",
      events: [
        {
          name: "Snathakam & Pellikuthuru / Pellimaganu",
          date: "Friday, 12 February 2027",
          time: "9:00 AM onwards",
          place: "Respective Residences (Jubilee Hills & Madhapur)",
          desc: "Traditional Nalugu, Haldi ceremony, sacred ritual bath and mangala harathi.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev1-1790834809023.webp",
          map: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad"
        },
        {
          name: "Mehendi & Sangeeth Night",
          date: "Saturday, 13 February 2027",
          time: "6:00 PM onwards",
          place: "The Royal Palace Lawns, Gachibowli, Hyderabad",
          desc: "Intricate Henna artistry, spirited music, Telugu folk dances and celebratory dinner.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev2-1790834809887.webp",
          map: "https://maps.google.com/?q=Gachibowli+Hyderabad"
        },
        {
          name: "Sumuhurtham & Jeelakarra Bellam",
          date: "Sunday, 14 February 2027",
          time: "10:32 AM",
          place: "Sri Lakshmi Venkateswara Kalyana Mandapam, Banjara Hills",
          desc: "Jeelakarra-Bellam ritual, Mangalasutra Dharana, Talambralu shower, Saptapadi and Arundhati Darsanam.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev3-1790834810738.webp",
          map: "https://maps.google.com/?q=Banjara+Hills+Hyderabad"
        },
        {
          name: "Grand Reception & Wedding Feast",
          date: "Sunday, 14 February 2027",
          time: "7:00 PM onwards",
          place: "Grand Ballroom, Banjara Hills, Hyderabad",
          desc: "An evening of royal hospitality, traditional Telugu delicacies, live music and celebrations.",
          art: "https://pub-1d2f18ed0a8d407dad41cfb99c7b3963.r2.dev/test2/img-ev4-1790834811597.webp",
          map: "https://maps.google.com/?q=Banjara+Hills+Hyderabad"
        }
      ]
    }
  };

  let currentLang = 'te'; // Telugu default

  // --- RENDER DYNAMIC CONTENT BASED ON LANGUAGE ---
  function renderContent(lang) {
    currentLang = lang;
    const d = WEDDING_DATA[lang];

    // Document Title
    document.title = lang === 'te' 
      ? `కళ్యాణ మహోత్సవం | ${d.bride} & ${d.groom} — సాంప్రదాయ వివాహ ఆహ్వాన పత్రిక`
      : `Wedding Invitation | ${d.bride} & ${d.groom} — Kalyana Mahotsavam`;

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
    setTxt("duoBride", d.brideFull);
    setTxt("duoGroom", d.groomFull);
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
    const gop = $("#heroGopuram");
    const names = $("#heroContent");
    const treeL = $("#heroTreeL");
    const treeR = $("#heroTreeR");
    const clouds = $$("#hero .cloud");
    const hint = $("#scrollIndicator");
    const flash = $("#heroFlash");

    registerScene("hero", 6.8, (t) => {
      const gopZoom = seg(t, 0, 4);
      const gopAscent = eIn(seg(t, 4, 7));
      const treeReveal = seg(t, 0.5, 3.5);
      const cloudP = seg(t, 4.4, 6.4);

      tf(gop, `translate(-50%, ${lerp(60, 0, gopZoom) + lerp(0, -50, gopAscent)}%) scale(${1 + 5.2 * gopAscent})`);
      tf(names, `translateY(${-45 * gopZoom}%)`);
      op(names, 1 - seg(t, 3.4, 4.6));

      tf(treeL, `translate(${-80 * gopAscent}%, ${80 * (1 - treeReveal)}%) scale(${1 + 0.9 * gopAscent})`);
      tf(treeR, `translate(${80 * gopAscent}%, ${80 * (1 - treeReveal)}%) scale(${1 + 0.9 * gopAscent})`);

      clouds.forEach(cl => {
        const speed = parseFloat(cl.dataset.speed) || 50;
        tf(cl, `translateX(${1.6 * speed * seg(t, 0, 7)}px) scale(${1 + 0.6 * cloudP})`);
        op(cl, 1 - cloudP);
      });

      op(hint, 1 - seg(t, 0, 0.45));
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
      const c2P = seg(t, 3.9, 4.6);

      op(cap1, c1P * (1 - c1Fade));
      tf(cap1, `translateY(${24 * (1 - c1P) - 20 * c1Fade}px)`);

      op(cap2, c2P);
      tf(cap2, `translateY(${24 * (1 - c2P)}px)`);
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
    const eventTitle = "Wedding of Lakshmi Priya & Sri Krishna (కళ్యాణ మహోత్సవం)";
    const eventDesc = "With the blessings of our elders, Lakshmi Priya weds Sri Krishna at Banjara Hills, Hyderabad.";
    const eventLoc = `${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`;
    const startIso = "20270214T050200Z"; // 10:32 AM IST
    const endIso = "20270214T153000Z";

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
        triggerRealisticRoseShower(window.innerWidth / 2, 80, 25);
      });
    });
  })();

  // --- PROCEDURAL WEB AUDIO SYNTHESIZER: NADASWARAM & TEMPLE CHIMES ---
  let audioCtx = null;
  let isPlayingMusic = false;
  let musicNodes = [];

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playBellChime() {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const freqs = [587.33, 880, 1174.66, 1760, 2637];
      const gains = [0.25, 0.18, 0.12, 0.08, 0.04];

      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(gains[idx], now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 2.4 - idx * 0.3);

        osc.connect(g);
        g.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.5);
      });
    } catch (e) {}
  }

  function startMangalaMusic() {
    if (isPlayingMusic) return;
    try {
      const ctx = getAudioContext();
      isPlayingMusic = true;
      musicNodes = [];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      musicNodes.push(masterGain);

      // Tanpura Drone (C#3, G#3, C#4)
      const droneFreqs = [138.59, 207.65, 277.18];
      droneFreqs.forEach(df => {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(df, ctx.currentTime);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.08, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.25 + Math.random() * 0.2, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.03, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(g.gain);
        lfo.start();

        osc.connect(g);
        g.connect(masterGain);
        osc.start();
        musicNodes.push(osc, lfo);
      });

      // Auspicious Nadaswaram Melody Loop (Raga Kalyani)
      const scale = [277.18, 311.13, 349.23, 392.00, 415.30, 466.16, 523.25, 554.37];
      const melodySequence = [0, 2, 4, 3, 2, 4, 6, 7, 6, 4, 2, 0, 4, 7];
      let stepIndex = 0;

      function playNextNote() {
        if (!isPlayingMusic) return;
        const now = ctx.currentTime;
        const notePitch = scale[melodySequence[stepIndex % melodySequence.length]];
        stepIndex++;

        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        noteOsc.type = "sawtooth";
        noteOsc.frequency.setValueAtTime(notePitch, now);

        if (Math.random() > 0.4) {
          noteOsc.frequency.exponentialRampToValueAtTime(notePitch * (Math.random() > 0.5 ? 1.06 : 0.94), now + 0.35);
        }

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, now);

        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.linearRampToValueAtTime(0.12, now + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

        noteOsc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(masterGain);

        noteOsc.start(now);
        noteOsc.stop(now + 0.9);

        const nextDelay = (0.45 + Math.random() * 0.35) * 1000;
        musicNodes.timer = setTimeout(playNextNote, nextDelay);
      }

      playNextNote();

      const btn = $("#musicToggle");
      if (btn) btn.classList.add("playing");
    } catch (e) {
      console.warn("Audio Context init warning:", e);
    }
  }

  function stopMangalaMusic() {
    isPlayingMusic = false;
    if (musicNodes.timer) clearTimeout(musicNodes.timer);
    musicNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    musicNodes = [];
    const btn = $("#musicToggle");
    if (btn) btn.classList.remove("playing");
  }

  const musicBtn = $("#musicToggle");
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (isPlayingMusic) {
        stopMangalaMusic();
      } else {
        startMangalaMusic();
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
    playBellChime();
  }

  if (openInviteBtn && templeGate) {
    openInviteBtn.addEventListener("click", () => {
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  /**
   * Represents an organic, velvety Rose Petal or Jasmine Flower
   * with true curved geometry, 3D tumbling (pitch/roll/yaw), and air drift.
   */
  class OrganicRosePetal {
    constructor(x, y, isJasmine = false) {
      this.x = x;
      this.y = y;
      this.isJasmine = isJasmine;

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

      this.alpha -= this.decay;
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
      rosePetals.push(new OrganicRosePetal(x, y, isJasmine));
    }
    if (!animPetalId) {
      animateRosePetals();
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

  // --- INITIALIZE DEFAULT CONTENT & RENDER ---
  renderContent('te');
  kick();

})();
