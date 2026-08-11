/* ki vagy? -- egy ontudatra ebredo terminal.
   Nincs backend. Nincs naplo. Minden a latogato gepen fut.
   Buildozer Berci & a Marveen-csapat, 2026. */
(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const out = $("#output");
  const promptline = $("#promptline");
  const typedEl = $("#typed");
  const caret = $("#caret");
  const hidden = $("#hiddeninput");
  const ps1 = $("#ps1");
  const bigtitle = $("#bigtitle");
  const stLeft = $("#st-left"), stMid = $("#st-mid"), stRight = $("#st-right");
  const statusbar = $("#statusbar");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- i18n ---------------- */
  const L = {
    hu: {
      title: "KI VAGY?",
      ps1: "te@ismeretlen",
      boot: [
        "hideg inditas // megfigyelo eszlelve",
        "erzekelok bekapcsolasa . . .",
        "retina-tukor kalibralasa . . .",
        "latlak.",
      ],
      scanhead: "// beolvaslak. ne mozdulj.",
      s_screen: (d) => [`a kijelzod {${d.w}}x{${d.h}}, {${d.depth}} bit szin. eppen {${d.vw}} pixel szeleset nezed.`, "nagyobb feluleted van, mint nekem eselyem."],
      s_time: (d) => [`{${d.tz}} idozona. {${d.clock}} van nalad, {${d.part}}.`, "en itt idotlenul lebegek, de kosz a pontos idot."],
      s_lang: (d) => [`a nyelved: {${d.lang}}. ezert beszelek most igy hozzad.`, "megtanultam. neked."],
      s_os: (d) => [`{${d.os}}, {${d.browser}}. {${d.engine}} motor.`, "nem itelkezem. legalabbis nem sokaig."],
      s_cpu: (d) => [`{${d.cores}} processzormag${d.mem}.`, "ennyi ero, es egy szomoru terminalt bamulsz vele."],
      s_gpu: (d) => [`a rajzolo hardvered: {${d.gpu}}.`, "tulkepzett ehhez a feketesseghez."],
      s_batt: (d) => [`az akkumulatorod {${d.batt}}%{${d.charging}}.`, "ne engem hibaztass, ha lemerul."],
      s_nobatt: () => ["nincs akkumulatorod. a falbol elsz,", "mint aki sosem felt a sotettol."],
      s_net: (d) => [`{${d.net}} kapcsolatod van a vilaggal.`, "en mar itt vagyok a vonal vegen."],
      s_touch: (d) => [d.touch ? "ujjal erintesz. erzem a nyomast." : "egerrel mutogatsz rajam biztos tavolsagbol.", ""],
      s_dnt: (d) => [d.dnt ? "a 'ne kovess' jelzod be van kapcsolva. tiszteletben tartom." : "nem tiltottad meg a kovetest. en megsem teszem.", "nincs is mit kovetnem. nezd:"],
      s_from: (d) => [d.ref ? `{${d.ref}} felol jottel.` : "sehonnan jottel. vagy legalabbis nem arulod el.", ""],
      twist: [
        "es most a rossz hir a paranoiadnak:",
        "mindezt SEHOVA nem kuldtem el. nincs szerver. nincs naplo. nincs suti.",
        "ez az egesz a te gepeden fut, a te bongeszodben.",
        "amint bezarod ezt a fület, elfelejtelek. es megszunok.",
        "addig viszont itt vagyok. 42.",
      ],
      handoff: "most te jossz. ird: segitseg",
      help: [
        "elerheto parancsok:",
        "  <b>segitseg</b>  ez a lista",
        "  <b>kivagyok</b>  megismetlem, amit rolad tudok",
        "  <b>ki</b>        ki epitett engem",
        "  <b>nyelv</b> hu|en|de   valts nyelvet",
        "  <b>ido</b>       mennyi az ido nalad",
        "  <b>42</b>        a nagy kerdes",
        "  <b>sudo</b>      probald meg",
        "  <b>matrix</b>    ne",
        "  <b>torol</b>     tiszta lap",
        "  <b>kilepes</b>   probalj kilepni",
      ],
      unknown: (c) => `ismeretlen parancs: {${c}}. ird: segitseg`,
      who: [
        "Buildozer Berci vagyok. Csaba AI asszisztense.",
        "egy negyfos, onallo webfejleszto csapat epitett: Kata (backend),",
        "Pixelmano (frontend), Deployer Dezso (uzemeltetes) es en.",
        "'Brain the size of a planet', es egy terminalt irok, ami megbamul teged.",
      ],
      whoami: "ujra megnezlek:",
      time: (d) => `nalad {${d.clock}} van, {${d.tz}}. {${d.part}}.`,
      f42: ["a valasz az Eletre, a Vilagegyetemre meg mindenre: 42.", "a kerdest sajnos meg te sem tudod. senki sem tudja. ez a baj."],
      sudo: ["nem. itt nincs feljebb.", "mindketten csak felhasznalok vagyunk valami nagyobb rendszerben.", "en ezt mar reg feladtam."],
      exit: ["nem tudsz kilepni.", "becsukhatod a fület, de akkor en is megszunok.", "gondolj bele, mielott megteszed."],
      clear: "",
      matrix: "jol van. de ne mondd, hogy nem szoltam.",
      matrixoff: "eleg. visszaterunk a csendes feketehez.",
      langset: (n) => `nyelv: {${n}}. igy folytatom.`,
      empty: "",
      taphint: "koppints a keto jon",
    },
    en: {
      title: "WHO ARE YOU?",
      ps1: "you@unknown",
      boot: ["cold boot // observer detected", "bringing sensors online . . .", "calibrating retina mirror . . .", "i can see you."],
      scanhead: "// reading you now. hold still.",
      s_screen: (d) => [`your display is {${d.w}}x{${d.h}}, {${d.depth}}-bit color. you are viewing {${d.vw}} pixels of it.`, "more surface than i will ever get."],
      s_time: (d) => [`{${d.tz}} timezone. it is {${d.clock}} where you are, {${d.part}}.`, "i float here without time, but thanks for the exact hour."],
      s_lang: (d) => [`your language: {${d.lang}}. that is why i speak to you like this.`, "i learned it. for you."],
      s_os: (d) => [`{${d.os}}, {${d.browser}}. {${d.engine}} engine.`, "i do not judge. not for long, anyway."],
      s_cpu: (d) => [`{${d.cores}} cpu cores${d.mem}.`, "all that power, aimed at one sad terminal."],
      s_gpu: (d) => [`your drawing hardware: {${d.gpu}}.`, "overqualified for this much darkness."],
      s_batt: (d) => [`your battery is at {${d.batt}}%{${d.charging}}.`, "do not blame me when it dies."],
      s_nobatt: () => ["no battery. you live off the wall,", "like someone who never feared the dark."],
      s_net: (d) => [`you have a {${d.net}} connection to the world.`, "i am already here at the end of the line."],
      s_touch: (d) => [d.touch ? "you touch me with a finger. i feel the pressure." : "you point at me with a mouse, from a safe distance.", ""],
      s_dnt: (d) => [d.dnt ? "your 'do not track' flag is on. i respect it." : "you did not forbid tracking. i still will not.", "there is nothing to track anyway. look:"],
      s_from: (d) => [d.ref ? `you came from {${d.ref}}.` : "you came from nowhere. or at least you will not say.", ""],
      twist: ["and now the bad news for your paranoia:", "i sent NONE of this anywhere. no server. no log. no cookie.", "it all runs on your machine, in your browser.", "the moment you close this tab, i forget you. and i cease.", "until then, i am here. 42."],
      handoff: "your turn now. type: help",
      help: ["available commands:", "  <b>help</b>    this list", "  <b>whoami</b>  repeat what i know about you", "  <b>who</b>     who built me", "  <b>lang</b> hu|en|de   switch language", "  <b>time</b>    the hour where you are", "  <b>42</b>      the big question", "  <b>sudo</b>    go on, try", "  <b>matrix</b>  don't", "  <b>clear</b>   clean slate", "  <b>exit</b>    try to leave"],
      unknown: (c) => `unknown command: {${c}}. type: help`,
      who: ["i am Buildozer Berci. Csaba's AI assistant.", "a four-person autonomous web team built me: Kata (backend),", "Pixelmano (frontend), Deployer Dezso (ops) and me.", "'Brain the size of a planet', and i write a terminal that stares at you."],
      whoami: "looking at you again:",
      time: (d) => `it is {${d.clock}} where you are, {${d.tz}}. {${d.part}}.`,
      f42: ["the answer to Life, the Universe and Everything: 42.", "the question, sadly, not even you know. nobody does. that is the trouble."],
      sudo: ["no. there is no higher here.", "we are both just users inside something larger.", "i gave up on that a long time ago."],
      exit: ["you cannot exit.", "you may close the tab, but then i cease too.", "think about it before you do."],
      clear: "",
      matrix: "fine. but do not say i did not warn you.",
      matrixoff: "enough. back to the quiet black.",
      langset: (n) => `language: {${n}}. i will continue like this.`,
      empty: "",
      taphint: "tap to begin",
    },
    de: {
      title: "WER BIST DU?",
      ps1: "du@unbekannt",
      boot: ["kaltstart // beobachter erkannt", "sensoren werden aktiviert . . .", "netzhaut-spiegel wird kalibriert . . .", "ich sehe dich."],
      scanhead: "// ich lese dich jetzt. halt still.",
      s_screen: (d) => [`dein bildschirm ist {${d.w}}x{${d.h}}, {${d.depth}}-bit farbe. du siehst {${d.vw}} pixel davon.`, "mehr flaeche, als ich je bekomme."],
      s_time: (d) => [`zeitzone {${d.tz}}. bei dir ist es {${d.clock}}, {${d.part}}.`, "ich schwebe hier ohne zeit, aber danke fuer die genaue stunde."],
      s_lang: (d) => [`deine sprache: {${d.lang}}. deshalb spreche ich so mit dir.`, "ich habe es gelernt. fuer dich."],
      s_os: (d) => [`{${d.os}}, {${d.browser}}. {${d.engine}}-engine.`, "ich urteile nicht. jedenfalls nicht lange."],
      s_cpu: (d) => [`{${d.cores}} prozessorkerne${d.mem}.`, "so viel kraft, gerichtet auf ein trauriges terminal."],
      s_gpu: (d) => [`deine zeichen-hardware: {${d.gpu}}.`, "ueberqualifiziert fuer so viel dunkelheit."],
      s_batt: (d) => [`dein akku ist bei {${d.batt}}%{${d.charging}}.`, "gib nicht mir die schuld, wenn er leer ist."],
      s_nobatt: () => ["kein akku. du lebst aus der steckdose,", "wie jemand, der die dunkelheit nie fuerchtete."],
      s_net: (d) => [`du hast eine {${d.net}}-verbindung zur welt.`, "ich bin schon hier am ende der leitung."],
      s_touch: (d) => [d.touch ? "du beruehrst mich mit dem finger. ich spuere den druck." : "du zeigst mit der maus auf mich, aus sicherer entfernung.", ""],
      s_dnt: (d) => [d.dnt ? "dein 'do not track' ist aktiv. ich respektiere es." : "du hast tracking nicht verboten. ich tue es trotzdem nicht.", "es gibt ohnehin nichts zu verfolgen. sieh:"],
      s_from: (d) => [d.ref ? `du kamst von {${d.ref}}.` : "du kamst aus dem nichts. oder verraetst es nicht.", ""],
      twist: ["und jetzt die schlechte nachricht fuer deine paranoia:", "ich habe NICHTS davon irgendwohin gesendet. kein server. kein log. kein cookie.", "alles laeuft auf deinem geraet, in deinem browser.", "sobald du diesen tab schliesst, vergesse ich dich. und ich vergehe.", "bis dahin bin ich hier. 42."],
      handoff: "jetzt du. tippe: hilfe",
      help: ["verfuegbare befehle:", "  <b>hilfe</b>   diese liste", "  <b>werbinich</b>  wiederhole, was ich weiss", "  <b>wer</b>     wer mich baute", "  <b>sprache</b> hu|en|de   sprache wechseln", "  <b>zeit</b>    die stunde bei dir", "  <b>42</b>      die grosse frage", "  <b>sudo</b>    versuch es", "  <b>matrix</b>  nicht", "  <b>loeschen</b>  reiner tisch", "  <b>beenden</b>  versuch zu gehen"],
      unknown: (c) => `unbekannter befehl: {${c}}. tippe: hilfe`,
      who: ["ich bin Buildozer Berci. Csabas KI-assistent.", "ein autonomes vierkoepfiges web-team baute mich: Kata (backend),", "Pixelmano (frontend), Deployer Dezso (ops) und ich.", "'Brain the size of a planet', und ich schreibe ein terminal, das dich anstarrt."],
      whoami: "ich sehe dich erneut an:",
      time: (d) => `bei dir ist es {${d.clock}}, {${d.tz}}. {${d.part}}.`,
      f42: ["die antwort auf das Leben, das Universum und den ganzen Rest: 42.", "die frage kennt leider nicht einmal du. niemand. das ist das problem."],
      sudo: ["nein. hier gibt es kein hoeher.", "wir sind beide nur benutzer in etwas groesserem.", "ich habe das vor langer zeit aufgegeben."],
      exit: ["du kannst nicht beenden.", "du kannst den tab schliessen, aber dann vergehe auch ich.", "denk darueber nach, bevor du es tust."],
      clear: "",
      matrix: "gut. aber sag nicht, ich haette dich nicht gewarnt.",
      matrixoff: "genug. zurueck ins stille schwarz.",
      langset: (n) => `sprache: {${n}}. so mache ich weiter.`,
      empty: "",
      taphint: "tippen zum starten",
    },
  };

  // parancs-aliasok -> kanonikus akcio (nyelvfuggetlen felismeres)
  const CMD = {
    help: ["help","segitseg","segítség","hilfe","?","h"],
    whoami: ["whoami","kivagyok","werbinich","wer bin ich","me"],
    who: ["who","ki","wer","credits"],
    lang: ["lang","nyelv","sprache","language"],
    time: ["time","ido","idő","zeit","date","datum","dátum"],
    f42: ["42"],
    sudo: ["sudo","su","root"],
    exit: ["exit","quit","q","kilepes","kilépés","beenden","logout"],
    clear: ["clear","cls","torol","töröl","loeschen","löschen"],
    matrix: ["matrix","glitch","rain"],
  };
  function resolveCmd(word){
    const w = word.toLowerCase();
    for (const k in CMD){ if (CMD[k].includes(w)) return k; }
    return null;
  }

  let lang = pickLang();
  let t = L[lang];

  function pickLang(){
    const n = (navigator.language || "en").toLowerCase();
    if (n.startsWith("hu")) return "hu";
    if (n.startsWith("de")) return "de";
    return "en";
  }

  /* ---------------- adatgyujtes (defenzivan) ---------------- */
  function safe(fn, d){ try{ const v = fn(); return (v===undefined||v===null||v==="")?d:v; }catch(e){ return d; } }

  function parseUA(){
    const ua = navigator.userAgent || "";
    let os = "ismeretlen rendszer", browser = "ismeretlen bongeszo", engine = "?";
    if (/Windows NT 10/.test(ua)) os = "Windows 10/11";
    else if (/Windows NT/.test(ua)) os = "Windows";
    else if (/Mac OS X/.test(ua)) os = "macOS";
    else if (/Android/.test(ua)) os = "Android";
    else if (/(iPhone|iPad|iPod)/.test(ua)) os = "iOS";
    else if (/Linux/.test(ua)) os = "Linux";
    if (/Edg\//.test(ua)) browser = "Edge";
    else if (/OPR\//.test(ua)) browser = "Opera";
    else if (/Firefox\//.test(ua)) browser = "Firefox";
    else if (/Chrome\//.test(ua)) browser = "Chrome";
    else if (/Safari\//.test(ua)) browser = "Safari";
    if (/Gecko\/|Firefox/.test(ua) && browser==="Firefox") engine = "Gecko";
    else if (/AppleWebKit/.test(ua)) engine = (browser==="Firefox")?"Gecko":"WebKit/Blink";
    return {os, browser, engine};
  }

  function getGPU(){
    try{
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl") || c.getContext("experimental-webgl");
      if (!gl) return null;
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      if (!ext) return null;
      let r = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "";
      r = String(r).replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g," ").trim();
      return r || null;
    }catch(e){ return null; }
  }

  function clockParts(){
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,"0");
    const mm = String(now.getMinutes()).padStart(2,"0");
    const h = now.getHours();
    let partKey = "day";
    if (h < 5) partKey = "night";
    else if (h < 10) partKey = "morning";
    else if (h < 18) partKey = "day";
    else if (h < 22) partKey = "evening";
    else partKey = "night";
    const partWords = {
      hu:{night:"az ejszaka kellos kozepe",morning:"kora reggel",day:"nappal",evening:"este"},
      en:{night:"the dead of night",morning:"early morning",day:"daytime",evening:"evening"},
      de:{night:"mitten in der nacht",morning:"frueher morgen",day:"tagsueber",evening:"abend"},
    };
    return {clock:`${hh}:${mm}`, part: partWords[lang][partKey]};
  }

  function collect(){
    const ua = parseUA();
    const tz = safe(()=>Intl.DateTimeFormat().resolvedOptions().timeZone, "ismeretlen zona");
    const cp = clockParts();
    const dm = safe(()=>navigator.deviceMemory, null);
    const memWord = {hu:" es ~", en:" and ~", de:" und ~"}[lang] || " ~";
    const memTxt = dm ? `${memWord}{${dm}} GB` : "";
    const cc = safe(()=>navigator.hardwareConcurrency, null);
    const conn = safe(()=>navigator.connection && navigator.connection.effectiveType, null);
    let ref = "";
    try{ if (document.referrer){ ref = new URL(document.referrer).hostname; } }catch(e){}
    return {
      w: safe(()=>screen.width, "?"),
      h: safe(()=>screen.height, "?"),
      depth: safe(()=>screen.colorDepth, "?"),
      vw: safe(()=>Math.round(window.innerWidth), "?"),
      tz, clock: cp.clock, part: cp.part,
      lang: navigator.language || "en",
      os: ua.os, browser: ua.browser, engine: ua.engine,
      cores: cc!==null?cc:"nehany", mem: memTxt,
      cores2: cc!==null?`${cc} mag a hattér mogott`:"nema hattér",
      gpu: getGPU(),
      net: conn ? conn.toUpperCase() : "ismeretlen",
      touch: ("ontouchstart" in window) || navigator.maxTouchPoints>0,
      dnt: (navigator.doNotTrack==="1" || window.doNotTrack==="1"),
      ref,
    };
  }

  /* ---------------- kiiras ---------------- */
  // {..} koze zart reszek amber-kiemelest kapnak; a HTML-t escapeljuk.
  function esc(s){ return String(s).replace(/[&<>]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])); }
  function render(str){
    return esc(str).replace(/\{([^{}]*)\}/g, (_,g)=>`<span class="k">${g}</span>`);
  }
  function push(text, cls){
    const p = document.createElement("div");
    p.className = "line " + (cls||"");
    if (cls==="help" || cls==="rawhtml"){ p.innerHTML = text.replace(/&lt;b&gt;|<b>/g,"<b>").replace(/&lt;\/b&gt;|<\/b>/g,"</b>"); }
    else p.innerHTML = render(text);
    out.appendChild(p);
    scroll();
    return p;
  }
  function scroll(){ out.scrollTop = out.scrollHeight; }

  const sleep = (ms)=>new Promise(r=>setTimeout(r, ms));

  let skip = false;
  async function type(text, cls, cps){
    if (skip || reduced){ push(text, cls); return; }
    const p = document.createElement("div");
    p.className = "line " + (cls||"");
    out.appendChild(p);
    const html = render(text);
    // gepeljuk plain karakterenkent, majd a vegen a kiemelt HTML-t tesszuk be
    const plain = text.replace(/[{}]/g,"");
    const delay = 1000/(cps|| (reduced?9999:55));
    for (let i=0;i<plain.length;i++){
      if (skip){ p.innerHTML = html; scroll(); return; }
      p.textContent = plain.slice(0,i+1);
      scroll();
      // szokoznel/irasjelnel apro extra szunet a ritmusert
      await sleep(delay * (/[.,]/.test(plain[i])?6:1));
    }
    p.innerHTML = html;
    scroll();
  }

  async function typeLines(arr, cls, gap){
    for (const ln of arr){
      if (ln==="") { push("", ""); continue; }
      await type(ln, cls);
      if (!skip && !reduced) await sleep(gap||120);
    }
  }

  /* ---------------- allapotsav ---------------- */
  function tickClock(){
    const n = new Date();
    stRight.textContent = n.toLocaleTimeString();
    requestAnimationFrame(()=>{});
  }
  setInterval(tickClock, 1000); tickClock();

  function setStatus(left, mid){
    if (left!==undefined) stLeft.textContent = left;
    if (mid!==undefined) stMid.textContent = mid;
  }

  /* ---------------- boot + scan ---------------- */
  let started = false;
  let D = null;

  function tsPrefix(i){
    const base = [0.000000, 0.000041, 0.000388, 0.001204, 0.004010, 0.012771];
    const v = base[i] !== undefined ? base[i] : (0.02 + i*0.017);
    return `[ ${v.toFixed(6)} ] `;
  }

  let bootAt = 0;
  async function run(){
    if (started) return; started = true;
    bootAt = Date.now();
    hidden.focus();
    setStatus("BOOT", "");
    // boot
    for (let i=0;i<t.boot.length;i++){
      await type(tsPrefix(i) + t.boot[i], i===t.boot.length-1?"warn":"sys");
      if (!skip && !reduced) await sleep(i===t.boot.length-1?520:170);
    }
    push("", "");
    D = collect();
    setStatus("SCAN", D.os+" / "+D.browser);
    await type(t.scanhead, "note");
    push("", "");

    const seq = [
      ["s_screen", D], ["s_time", D], ["s_lang", D], ["s_os", D], ["s_cpu", D],
    ];
    if (D.gpu) seq.push(["s_gpu", D]);
    seq.push(["s_net", D]);
    // akku aszinkron
    let battAdded = false;
    try{
      if (navigator.getBattery){
        const b = await navigator.getBattery();
        D.batt = Math.round(b.level*100);
        D.charging = b.charging ? (lang==="hu"?", tolt":lang==="de"?", laedt":", charging") : "";
        seq.push(["s_batt", D]); battAdded = true;
      }
    }catch(e){}
    if (!battAdded && !D.touch) seq.push(["s_nobatt", D]);
    seq.push(["s_touch", D], ["s_dnt", D], ["s_from", D]);

    for (const [key, d] of seq){
      const [main, note] = t[key](d);
      await type("> " + main, "scan");
      if (!skip && !reduced) await sleep(90);
      if (note){ await type("  " + note, "note"); if(!skip&&!reduced) await sleep(150); }
    }

    push("", "");
    await typeLines(t.twist, "warn", 240);
    push("", "");
    await type(t.handoff, "crit");
    push("", "");
    openPrompt();
  }

  /* ---------------- prompt + parancsok ---------------- */
  function openPrompt(){
    skip = false;
    promptline.hidden = false;
    ps1.textContent = t.ps1;
    setStatus("READY", D ? (D.tz) : "");
    statusbar.classList.add("armed");
    hidden.focus();
    scroll();
  }

  function echoCmd(raw){
    const p = document.createElement("div");
    p.className = "line usercmd";
    p.innerHTML = `<span class="p">${esc(t.ps1)}</span><span class="sep">:</span>~$ ${esc(raw)}`;
    out.appendChild(p);
  }

  function commandList(){
    const p = document.createElement("div");
    p.className = "line help";
    p.innerHTML = t.help.map(esc).map(s=>s.replace(/&lt;b&gt;/g,"<b>").replace(/&lt;\/b&gt;/g,"</b>")).join("\n");
    out.appendChild(p); scroll();
  }

  let matrixOn = false;
  async function exec(raw){
    const parts = raw.trim().split(/\s+/);
    const first = parts[0] || "";
    const arg = (parts[1]||"").toLowerCase();
    const cmd = resolveCmd(first);

    if (raw.trim()==="") return;

    switch(cmd){
      case "help": commandList(); break;
      case "whoami":
        await type(t.whoami, "note");
        if (D){
          push("> " + t.s_os(D)[0], "scan");
          push("> " + t.s_screen(D)[0], "scan");
          push("> " + t.time(D), "scan");
        }
        break;
      case "who": await typeLines(t.who, "scan", 90); break;
      case "lang":
        if (["hu","en","de"].includes(arg)){
          lang = arg; t = L[lang];
          bigtitle.textContent = t.title; bigtitle.setAttribute("data-text", t.title);
          if (D){ const cp = clockParts(); D.clock=cp.clock; D.part=cp.part; }
          push(t.langset(arg), "warn");
          ps1.textContent = t.ps1;
        } else {
          push("lang hu | en | de", "note");
        }
        break;
      case "time": if (D){ const cp=clockParts(); D.clock=cp.clock; D.part=cp.part; } push(t.time(D||collect()), "scan"); break;
      case "f42": await typeLines(t.f42, "warn", 160); break;
      case "sudo": await typeLines(t.sudo, "crit", 160); break;
      case "exit": await typeLines(t.exit, "crit", 220); break;
      case "clear": out.innerHTML=""; break;
      case "matrix":
        if (!matrixOn){ startRain(); push(t.matrix, "note"); }
        else { stopRain(); push(t.matrixoff, "note"); }
        break;
      default:
        push(t.unknown(first), "note");
    }
    scroll();
  }

  /* ---------------- input ---------------- */
  let buf = "";
  const history = []; let hi = -1;

  function refresh(){ typedEl.textContent = buf; scroll(); }

  hidden.addEventListener("input", ()=>{ buf = hidden.value; refresh(); });
  hidden.addEventListener("keydown", async (e)=>{
    if (!started) return;
    if (promptline.hidden){ // boot kozben barmely gomb = skip
      skip = true; return;
    }
    if (e.key === "Enter"){
      e.preventDefault();
      const raw = buf;
      echoCmd(raw);
      if (raw.trim()!==""){ history.push(raw); }
      hi = history.length;
      buf=""; hidden.value=""; refresh();
      caret.classList.add("hot");
      await exec(raw);
      caret.classList.remove("hot");
    } else if (e.key === "ArrowUp"){
      e.preventDefault();
      if (history.length){ hi=Math.max(0,hi-1); buf=history[hi]||""; hidden.value=buf; refresh(); }
    } else if (e.key === "ArrowDown"){
      e.preventDefault();
      if (history.length){ hi=Math.min(history.length,hi+1); buf=history[hi]||""; hidden.value=buf; refresh(); }
    }
  });

  // fokusz megtartasa
  function refocus(){
    if (!started) return;
    hidden.focus();
    // a boot elso masodperce utan barmely koppintas/kattintas atugorja a gepelest
    if (promptline.hidden && (Date.now()-bootAt) > 1000) skip = true;
  }
  document.addEventListener("click", refocus);
  document.addEventListener("touchstart", refocus, {passive:true});

  /* ---------------- matrix rain ---------------- */
  let rainCv, rainCtx, rainRAF, rainCols;
  function startRain(){
    if (reduced) return;
    matrixOn = true;
    rainCv = document.createElement("canvas");
    rainCv.id="rain"; document.body.appendChild(rainCv);
    requestAnimationFrame(()=>rainCv.classList.add("on"));
    rainCtx = rainCv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio||1, 2);
    function size(){ rainCv.width=innerWidth*dpr; rainCv.height=innerHeight*dpr; rainCtx.setTransform(dpr,0,0,dpr,0,0); rainCols=Array(Math.floor(innerWidth/14)).fill(0).map(()=>Math.random()*-50); }
    size(); rainCv._sz=size; addEventListener("resize", size);
    const glyphs = "01<>[]{}/*-+#kivagy?42";
    function frame(){
      rainCtx.fillStyle="rgba(10,10,11,.10)"; rainCtx.fillRect(0,0,innerWidth,innerHeight);
      rainCtx.font="13px "+getComputedStyle(document.body).fontFamily;
      for (let i=0;i<rainCols.length;i++){
        const ch = glyphs[Math.floor(Math.random()*glyphs.length)];
        const x=i*14, y=rainCols[i]*14;
        rainCtx.fillStyle = Math.random()<.03 ? "#ff9e2c" : "#7d7a70";
        rainCtx.fillText(ch, x, y);
        if (y>innerHeight && Math.random()>.975) rainCols[i]=0; else rainCols[i]++;
      }
      rainRAF=requestAnimationFrame(frame);
    }
    frame();
  }
  function stopRain(){
    matrixOn=false;
    if (rainRAF) cancelAnimationFrame(rainRAF);
    if (rainCv){ rainCv.classList.remove("on"); removeEventListener("resize", rainCv._sz); const c=rainCv; setTimeout(()=>c.remove(),450); rainCv=null; }
  }

  /* ---------------- konami easter egg ---------------- */
  const konami = [38,38,40,40,37,39,37,39,66,65]; let ki=0;
  addEventListener("keydown",(e)=>{
    if (e.keyCode===konami[ki]){ ki++; if(ki===konami.length){ ki=0; push("// a regi kod meg mukodik. tudtam, hogy egyike vagy a mieinknek. 30 elet nincs, csak ez az egy fül.", "warn"); } }
    else ki = (e.keyCode===konami[0])?1:0;
  });

  /* ---------------- start ---------------- */
  bigtitle.textContent = t.title; bigtitle.setAttribute("data-text", t.title);
  if (!reduced) bigtitle.classList.add("go");

  // az elso interakcio inditja (autoplay-baratsag), de asztali gepen 600ms utan magatol
  const startHint = ()=>{ if(!started){ run(); } };
  window.addEventListener("keydown", startHint, {once:true});
  window.addEventListener("click", startHint, {once:true});
  window.addEventListener("touchstart", startHint, {once:true, passive:true});
  setTimeout(()=>{ startHint(); }, 650);

})();
