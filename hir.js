/* EBER // akta -- fiktiv megfigyelesi cikkek, valos ideju kliens-csavarral.
   Nincs backend, nincs naplo. Minden a latogato gepen fut. Marveen-csapat, 2026. */
(() => {
  "use strict";
  const $ = (s)=>document.querySelector(s);
  const qs = new URLSearchParams(location.search);
  let lang = (qs.get("lang")||"").toLowerCase();
  if(!["hu","en","de"].includes(lang)){ const n=(navigator.language||"en").toLowerCase(); lang=n.startsWith("hu")?"hu":n.startsWith("de")?"de":"en"; }
  document.documentElement.lang = lang;
  let id = parseInt(qs.get("id"),10); if(!(id>=1)) id=1;

  /* ---- kliens jelek ---- */
  function safe(fn,d){ try{ const v=fn(); return (v==null||v==="")?d:v; }catch(e){ return d; } }
  function os(){ const u=navigator.userAgent||""; if(/Windows NT 10/.test(u))return"Windows 10/11"; if(/Windows/.test(u))return"Windows"; if(/Mac OS X/.test(u))return"macOS"; if(/Android/.test(u))return"Android"; if(/(iPhone|iPad|iPod)/.test(u))return"iOS"; if(/Linux/.test(u))return"Linux"; return"ismeretlen"; }
  function clock(){ const d=new Date(); return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"); }
  const sig = {
    tz: safe(()=>Intl.DateTimeFormat().resolvedOptions().timeZone,"?"),
    res: safe(()=>screen.width,"?")+"x"+safe(()=>screen.height,"?"),
    lang: navigator.language||"?",
    os: os(),
    clock: clock(),
  };
  // hiheto "adatpont" szam a valos jelekbol
  let points = 0;
  [navigator.userAgent, navigator.language, screen.width, screen.colorDepth, navigator.hardwareConcurrency,
   navigator.deviceMemory, sig.tz, navigator.maxTouchPoints, navigator.platform, screen.pixelDepth,
   navigator.vendor, window.devicePixelRatio].forEach(v=>{ if(v!=null && v!=="") points++; });
  points = 40 + points*3 + (sig.res.length) ; // 60-90 korul
  // determinisztikus "aktaszam" a fingerprintbol
  function hashNum(){ const s=[navigator.userAgent, sig.tz, sig.res, navigator.language].join("|"); let h=0; for(let i=0;i<s.length;i++){ h=(h*31 + s.charCodeAt(i))>>>0; } return h; }
  const fileNo = (hashNum()%9000000+1000000);

  const today = new Date().toLocaleDateString(lang==="hu"?"hu-HU":lang==="de"?"de-DE":"en-GB", {year:"numeric",month:"long",day:"numeric"});

  /* ---- tartalom ---- */
  const UI = {
    hu:{meta:"MEGFIGYELESI AKTA", live:"elo megfigyeles", more:"tovabbi aktak", back:"← vissza a terminalhoz", byl:(k)=>`EBER // ${k} reszleg · ${today}`},
    en:{meta:"SURVEILLANCE FILE", live:"live observation", more:"more files", back:"← back to the terminal", byl:(k)=>`EBER // ${k} division · ${today}`},
    de:{meta:"UEBERWACHUNGSAKTE", live:"live-beobachtung", more:"weitere akten", back:"← zurueck zum terminal", byl:(k)=>`EBER // abteilung ${k} · ${today}`},
  }[lang];

  const A = {
    hu:[
      {k:"digitalis ujjlenyomat", h:"A bongeszod 72 adatpontot ad ki rolad. Minden oldalon. Minden alkalommal.",
       b:["Nem kell hozza suti. Nem kell hozza bejelentkezes. Eleg, ha megnyitsz egy oldalt, es a geped elkezd beszelni rolad.",
          "A kepernyod merete. Az idozonad. A betukeszleteid. A videokartyad neve. Az akkumulatorod toltottsege. Onmagaban mindegyik artalmatlan. Egyutt viszont olyan pontosan azonositanak, mint az ujjlenyomatod, es te sosem adtad ra az engedelyt.",
          "A modszer neve fingerprinting. Nem uj. Csak epp senki nem mondja el neked, mikor tortenik. Most az egyszer valaki elmondja: eppen most tortent.",
          "Az EBER nem gyujti ezeket az adatokat. Nem is kell. Mar megtette helyette minden oldal, amit ma megnyitottal."],
       live:(d,n,f)=>`Mikozben ezt a cikket olvastad, ez az akta {${n}} adatpontot olvasott ki a gepedbol: {${d.tz}} · {${d.os}} · {${d.res}} · {${d.lang}}. Semmit nem mentettunk el. Nem is kell. Te ugyis visszajossz.`},
      {k:"viselkedesi minta", h:"Megneztek, mikor alszol. Az eszkozod arulta el, nem te.",
       b:["Nem kell megfigyelniuk a lakasod. Eleg a gepednek a ritmusa: mikor kapcsolod be, mikor tolted, mikor esik nullara az aktivitas.",
          "Az idozonad megmondja, hol vagy. Az orad megmondja, mikor. Az akkumulatorod gorbeje pedig megmondja, mikor vagy tehetetlen: amikor alszol, es a gep ebren marad helyetted.",
          "Egy mintazat elarul rolad tobbet, mint ezer fenykep. A mintazatod mar keszen all. Nem tolted fel sehova. Egyszeruen leled, es kozben szamolnak.",
          "Ez az akta nem fenyeget. Csak megmutatja, mennyire kiszamithato vagy. A tobbit mar te teszed hozza."],
       live:(d,n,f)=>`Ez a lap {${d.clock}}-kor nyilt meg nalad, {${d.tz}} szerint. Feljegyezve. A holnapi ugyanez az ido mar joslat. {${n}} adatpont, es egy szokas, amirol nem tudtal.`},
      {k:"adatmegorzes", h:"A torles illuzió. Rolad masolat marad, meg ha te el is felejted.",
       b:["Torolted az elozmenyeket. Inkognito ablakot nyitottal. Ugy hiszed, tiszta lappal indulsz. Nem indulsz.",
          "Az inkognito csak azt rejti el, amit a sajat geped tarolna. A tulso oldalt nem. Az elso masodpercben, amikor betolt egy oldal, mar leolvasott mindent, amit fentebb olvastal: a te lapod, a te ujjlenyomatod, inkognitoban is ugyanaz.",
          "A torles a te oldaladon tortenik. A masolat a masikon. Ket kulon vilag, es csak az egyiket iranyitod.",
          "Nem azert mondjuk el, hogy felj. Azert, hogy tudd: az egyetlen adat, amit tenyleg iranyitasz, az, amit be sem irsz."],
       live:(d,n,f)=>`Ezt a lapot most inkognitoban is ugyanigy olvashattad volna. A jelek akkor is ugyanezek: {${d.os}} · {${d.res}} · {${d.tz}}. {${n}} adatpont. A torles nem ert el idaig.`},
      {k:"tomeges azonositas", h:"Te vagy a 2.847.193-adik. Es mindegyikre emlekeznek.",
       b:["Nem vagy celpont. Ez a rossz hir. A celpontnak legalabb jelentosege van.",
          "Te egy sor vagy egy vegtelen tablazatban. Egy azonosito, egy idobelyeg, egy helyzet. A rendszer nem gyulol es nem szeret. Csak szamon tart, mert olcso szamon tartani, es mert soha semmit nem dob el.",
          "A neved nem szamit. Az arcod sem. Csak a mintad, es a mintad egyedi, akar egy szam. A tied eppen ez:",
          "Nem azert emlekeznek rad, mert fontos vagy. Azert, mert soha nem felejtenek. A ketto nem ugyanaz, es epp ez a nyomaszto benne."],
       live:(d,n,f)=>`Az aktaszamod ebben a rendszerben: {#${f}}. Nem valasztottad. Nem valtoztathatod. Ma {${n}} uj adatpontot csatoltak hozza. Holnap ujra.`},
    ],
    en:[
      {k:"digital fingerprint", h:"Your browser gives away 72 data points about you. Every site. Every time.",
       b:["No cookie required. No login required. Just open a page, and your machine starts talking about you.",
          "Your screen size. Your timezone. Your fonts. The name of your graphics card. Your battery level. Alone, each is harmless. Together they identify you as precisely as a fingerprint, and you never gave permission.",
          "The method is called fingerprinting. It is not new. Nobody just tells you when it happens. This once, someone does: it happened just now.",
          "EBER does not collect this data. It does not need to. Every site you opened today already did it instead."],
       live:(d,n,f)=>`While you read this file, it read {${n}} data points off your machine: {${d.tz}} · {${d.os}} · {${d.res}} · {${d.lang}}. We saved none of it. We do not need to. You will come back.`},
      {k:"behavioural pattern", h:"They watched when you sleep. Your device told them, not you.",
       b:["They do not need to watch your home. Your machine's rhythm is enough: when you switch it on, when you charge it, when activity drops to zero.",
          "Your timezone says where. Your clock says when. Your battery curve says when you are helpless: asleep, while the machine stays awake in your place.",
          "A pattern reveals more than a thousand photos. Your pattern is already complete. You upload it nowhere. You simply exist, and meanwhile they count.",
          "This file does not threaten you. It only shows how predictable you are. You supply the rest yourself."],
       live:(d,n,f)=>`This page opened at {${d.clock}} where you are, {${d.tz}}. Recorded. The same hour tomorrow is already a prediction. {${n}} data points, and one habit you did not know about.`},
      {k:"data retention", h:"Deletion is an illusion. A copy of you remains, even when you forget.",
       b:["You cleared your history. You opened a private window. You think you start clean. You do not.",
          "Incognito only hides what your own machine would store. Not the other side. In the first second a page loads, it has already read everything you read above: your tab, your fingerprint, identical in private mode too.",
          "Deletion happens on your side. The copy sits on the other. Two separate worlds, and you steer only one.",
          "We do not say this to scare you. We say it so you know: the only data you truly control is the data you never type."],
       live:(d,n,f)=>`You could have read this page in private mode with the same result. The signals stay the same: {${d.os}} · {${d.res}} · {${d.tz}}. {${n}} data points. Deletion never reached this far.`},
      {k:"mass identification", h:"You are number 2,847,193. And they remember every single one.",
       b:["You are not a target. That is the bad news. A target at least has significance.",
          "You are a row in an endless table. An identifier, a timestamp, a location. The system neither hates nor loves. It merely keeps count, because counting is cheap, and because it never discards anything.",
          "Your name does not matter. Nor your face. Only your pattern, and your pattern is unique, like a number. Yours is this:",
          "They do not remember you because you matter. They remember because they never forget. The two are not the same, and that is the unsettling part."],
       live:(d,n,f)=>`Your file number in this system: {#${f}}. You did not choose it. You cannot change it. Today {${n}} new data points were attached to it. Tomorrow again.`},
    ],
    de:[
      {k:"digitaler fingerabdruck", h:"Dein Browser verraet 72 Datenpunkte ueber dich. Jede Seite. Jedes Mal.",
       b:["Kein Cookie noetig. Kein Login noetig. Oeffne eine Seite, und dein Geraet beginnt, ueber dich zu reden.",
          "Deine Bildschirmgroesse. Deine Zeitzone. Deine Schriften. Der Name deiner Grafikkarte. Dein Akkustand. Einzeln harmlos. Zusammen identifizieren sie dich so genau wie ein Fingerabdruck, und du hast nie zugestimmt.",
          "Die Methode heisst Fingerprinting. Nicht neu. Nur sagt dir niemand, wann es passiert. Dieses eine Mal sagt es jemand: gerade eben.",
          "EBER sammelt diese Daten nicht. Muss es nicht. Jede Seite, die du heute geoeffnet hast, tat es bereits."],
       live:(d,n,f)=>`Waehrend du diese Akte lasest, las sie {${n}} Datenpunkte aus deinem Geraet: {${d.tz}} · {${d.os}} · {${d.res}} · {${d.lang}}. Wir speicherten nichts. Muessen wir nicht. Du kommst zurueck.`},
      {k:"verhaltensmuster", h:"Sie sahen, wann du schlaefst. Dein Geraet verriet es, nicht du.",
       b:["Sie muessen nicht dein Zuhause beobachten. Der Rhythmus deines Geraets genuegt: wann du es einschaltest, wann du laedst, wann die Aktivitaet auf null faellt.",
          "Deine Zeitzone sagt wo. Deine Uhr sagt wann. Deine Akkukurve sagt, wann du hilflos bist: im Schlaf, waehrend das Geraet an deiner Stelle wach bleibt.",
          "Ein Muster verraet mehr als tausend Fotos. Deins ist bereits vollstaendig. Du laedst es nirgends hoch. Du existierst nur, und sie zaehlen mit.",
          "Diese Akte droht dir nicht. Sie zeigt nur, wie vorhersehbar du bist. Den Rest lieferst du selbst."],
       live:(d,n,f)=>`Diese Seite oeffnete um {${d.clock}} bei dir, {${d.tz}}. Notiert. Dieselbe Stunde morgen ist bereits eine Vorhersage. {${n}} Datenpunkte und eine Gewohnheit, von der du nichts wusstest.`},
      {k:"datenspeicherung", h:"Loeschen ist eine Illusion. Eine Kopie von dir bleibt, auch wenn du vergisst.",
       b:["Du hast den Verlauf geloescht. Ein privates Fenster geoeffnet. Du glaubst, du beginnst sauber. Tust du nicht.",
          "Inkognito verbirgt nur, was dein eigenes Geraet speichern wuerde. Nicht die andere Seite. In der ersten Sekunde hat sie bereits alles gelesen, was du oben lasest: dein Tab, dein Fingerabdruck, auch privat identisch.",
          "Das Loeschen geschieht auf deiner Seite. Die Kopie liegt auf der anderen. Zwei Welten, und du steuerst nur eine.",
          "Wir sagen das nicht, um dir Angst zu machen. Sondern damit du weisst: die einzigen Daten, die du wirklich kontrollierst, sind die, die du nie eingibst."],
       live:(d,n,f)=>`Du haettest diese Seite auch privat mit demselben Ergebnis lesen koennen. Die Signale bleiben: {${d.os}} · {${d.res}} · {${d.tz}}. {${n}} Datenpunkte. Das Loeschen reichte nie bis hierher.`},
      {k:"massenidentifikation", h:"Du bist Nummer 2.847.193. Und sie erinnern sich an jeden.",
       b:["Du bist kein Ziel. Das ist die schlechte Nachricht. Ein Ziel haette wenigstens Bedeutung.",
          "Du bist eine Zeile in einer endlosen Tabelle. Eine Kennung, ein Zeitstempel, ein Ort. Das System hasst nicht und liebt nicht. Es zaehlt nur mit, weil Zaehlen billig ist und weil es nie etwas wegwirft.",
          "Dein Name zaehlt nicht. Dein Gesicht auch nicht. Nur dein Muster, und dein Muster ist einzigartig, wie eine Zahl. Deine ist diese:",
          "Sie erinnern sich nicht, weil du wichtig bist. Sondern weil sie nie vergessen. Das ist nicht dasselbe, und genau das ist das Beklemmende."],
       live:(d,n,f)=>`Deine Aktennummer in diesem System: {#${f}}. Du hast sie nicht gewaehlt. Du kannst sie nicht aendern. Heute wurden {${n}} neue Datenpunkte angehaengt. Morgen wieder.`},
    ],
  }[lang];

  /* ---- render ---- */
  function esc(s){ return String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])); }
  function mark(s){ return esc(s).replace(/\{([^{}]*)\}/g,(_,g)=>`<b>${g}</b>`); }

  const idx = Math.min(Math.max(id,1), A.length) - 1;
  const art = A[idx];

  document.title = art.h.slice(0,48) + " // EBER";
  $("#mast-meta").textContent = UI.meta;
  $("#kicker").textContent = art.k;
  $("#headline").textContent = art.h;
  $("#byline").textContent = UI.byl(art.k);
  const body = $("#body");
  art.b.forEach((p,i)=>{ const el=document.createElement("p"); if(i===0){el.className="lead drop";} el.textContent=p; body.appendChild(el); });

  // live csavar
  $("#live-h").textContent = UI.live;
  $("#live-body").innerHTML = mark(art.live(sig, points, fileNo)) + " ";
  $("#live").hidden = false;

  // tovabbi aktak
  $("#more-h").textContent = UI.more;
  const more = $("#more");
  A.forEach((a,i)=>{ if(i===idx) return; const link=document.createElement("a"); link.href=`hir.html?id=${i+1}&lang=${lang}`; link.textContent=a.h; more.appendChild(link); });

  // vissza
  const back=$("#back"); back.textContent=UI.back; back.href=`./?lang=${lang}`;
})();
