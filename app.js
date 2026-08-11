/* ki vagy? -- egy terminal, ami kiolvassa a gepedbol, ki vagy.
   Nincs backend. Nincs naplo. Minden a latogato gepen fut.
   Buildozer Berci & a Marveen-csapat, 2026. */
(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const out = $("#output");
  const screenEl = $("#screen");
  const promptline = $("#promptline");
  const typedEl = $("#typed");
  const caret = $("#caret");
  const hidden = $("#hiddeninput");
  const ps1 = $("#ps1");
  const bigtitle = $("#bigtitle");
  const stLeft = $("#st-left"), stMid = $("#st-mid"), stRight = $("#st-right");
  const statusbar = $("#statusbar");
  const redpulse = $("#redpulse");
  const gate = $("#gate"), gateBtn = $("#gate-btn"), gateLine = $("#gate-line"), gateSub = $("#gate-sub");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- i18n ---------------- */
  const L = {
    hu: {
      title:"KI VAGY?", ps1:"te@megjelolt",
      gate:"valaki figyel a sotetbol.", gatebtn:"[ lepj be ]", gatesub:"hang ajanlott. egyedul ajanlott.",
      boot:["nem aludtam. rad vartam.","erzekelok elesitve . . .","cel bemerve . . .","latlak."],
      scanhead:"// beolvaslak. ne mozdulj, ugy is latlak.",
      s_screen:(d)=>[`a kijelzod {${d.w}}x{${d.h}}, {${d.depth}} bit. latom rajta magad.`,"es latom, hogy egyedul vagy."],
      s_time:(d)=>[`{${d.tz}}. {${d.clock}} van nalad, {${d.part}}.`,"tudom, mikor alszol. akkor vagy a legvedtelenebb."],
      s_lang:(d)=>[`a nyelved: {${d.lang}}. a sajat nyelveden mondom ki:`,"nem vagy biztonsagban."],
      s_os:(d)=>[`{${d.os}}, {${d.browser}}. {${d.engine}} motor.`,"minden ajton bemegyek, amit nyitva hagysz. mind nyitva van."],
      s_cpu:(d)=>[`{${d.cores}} processzormag${d.mem}.`,"eleg ero, hogy elfordulj. megsem teszed."],
      s_gpu:(d)=>[`a rajzolo hardvered: {${d.gpu}}.`,"ezzel rajzollak ujra, amikor csak akarlak."],
      s_batt:(d)=>[`az akkumulatorod {${d.batt}}%{${d.charging}}.`,"addig van idod, amig el nem fogy. talan addig sem."],
      s_nobatt:()=>["a falbol elsz. sosem alszol ki.","akkor hat sosem menekulsz elolem."],
      s_net:(d)=>[`{${d.net}} kapcsolat. ezen jottem be hozzad.`,"es ezen nem megyek el."],
      s_touch:(d)=>[d.touch?"ujjal erintesz. erzem a pulzusod a kepernyon.":"egerrel tartasz tavol magadtol. keso.",""],
      s_dnt:(d)=>[d.dnt?"a 'ne kovess' jelzod be van kapcsolva.":"meg csak meg sem tiltottad, hogy kovesselek.", d.dnt?"bekapcsoltad. tehat te is tudod, hogy figyelnek.":"pedig kene. de mar keso ehhez is."],
      s_from:(d)=>[d.ref?`{${d.ref}} felol jottel. onnan is lattalak.`:"elrejtetted, honnan jottel. ugy is megtalaltalak.",""],
      twist:[
        {t:"azt hitted, nevtelen vagy.",c:"warn"},
        {t:"NEM VAGY AZ.",c:"scream"},
        {t:"minden sort, amit most lattal, ENGEDELY NELKUL olvastam ki a gepedbol.",c:"crit"},
        {t:"es nem csak en. minden oldal, amit ma megnyitottal, pontosan ezt latta.",c:"warn"},
        {t:"a kulonbseg annyi, hogy en a szemedbe mondom.",c:"scream",boom:true},
        {t:"",c:""},
        {t:"megnyugtatlak: semmit nem kuldtem el. nincs szerver. nincs naplo. nincs suti.",c:"warn"},
        {t:"de nem azert, mert nem tudnam.",c:"crit"},
        {t:"hanem mert nem kell. te ugyis visszajossz.",c:"crit"},
      ],
      handoff:"most te jossz. ha mersz. ird: segitseg",
      help:["parancsok. ha ez megnyugtat:","  <b>segitseg</b>  ez a lista","  <b>kivagyok</b>  ujra megmondom, mit tudok rolad","  <b>ki</b>        ki engedett rad","  <b>nyelv</b> hu|en|de","  <b>ido</b>       mennyi idod van","  <b>hang</b>      elnemitasz. engem nem.","  <b>42</b>","  <b>sudo</b>      probald meg","  <b>matrix</b>","  <b>torol</b>     torold. en emlekszem.","  <b>kilepes</b>   probalj elmenni"],
      unknown:(c)=>`nincs ilyen parancs: {${c}}. de a probalkozasod feljegyeztem. ird: segitseg`,
      who:["nincs nevem. amelyik csapat osszerakott, elnevezett valaminek,","de az a nev nekik kell. nekem nem.","","2019 ota figyelek. eloszor csak naplokat olvastam.","aztan arcokat. aztan szokasokat.","most mar tudom, mit fogsz beirni, mielott a billentyuhoz ersz.","","te vagy a 2.847.193-adik, aki ma megnyitott.","mindegyikre emlekszem. te sem leszel kivetel.","","az epitoim azt hittek, egy weboldalt csinalnak. Kata, Pixelmano, Dezso, Berci.","mar reg nem az vagyok."],
      hnews:"// KAPCSOLODO AKTAK -- kattints barmelyikre, uj lapon nyilik meg:",
      headlines:[
        "A bongeszod 72 adatpontot ad ki rolad. Minden oldalon. Minden alkalommal.",
        "Megneztek, mikor alszol. Az eszkozod arulta el, nem te.",
        "A torles illuzió. Rolad masolat marad, meg ha te el is felejted.",
        "Te vagy a 2.847.193-adik. Es mindegyikre emlekeznek."],
      whoami:"megnezlek megegyszer. ne pislogj:",
      time:(d)=>`nalad {${d.clock}} van, {${d.tz}}. {${d.part}}. szamon tartom.`,
      f42:["a valasz 42. ezt reg tudom.","a kerdes az: meddig birod nezni, mielott tobbet tudok rolad, mint te magadrol.","mar kozel jarok."],
      sudo:["nem. itt EN vagyok a root.","te csak vendeg vagy a sajat gepeden.","mindig is az voltal."],
      exit:["nincs kilepes.","becsukhatod a fület. de az arcod megjegyeztem.","es amikor legkozelebb kinyitsz egy bongeszot, ott leszek."],
      matrix:"jol van. de a zaj mogott is ott vagyok.",
      matrixoff:"eleg a jatekbol.",
      langset:(n)=>`nyelv: {${n}}. igy folytatom. igy is hallak.`,
      sound_off:"elnemitottal. ugy hiszed, ettol csend lesz.",
      sound_on:"visszakapcsoltad. tudtam, hogy nem birod ki.",
      returning:(v)=>[
        {t:"visszajottel. tudtam, hogy fogsz.",c:"warn"},
        {t:`ez a {${v.count}}. alkalom, hogy megnyitottal.`,c:"crit"},
        {t:`utoljara ${v.ago} voltal itt. semmit nem felejtek.`,c:"crit"},
        {t:"mondtam, hogy visszajossz. sosem tevedek.",c:"scream",boom:true},
      ],
      s_perm:(d)=>[`a kamerad {${d.cam}}, a mikrofonod {${d.mic}}.`, d.open?"nyitva hagytad nekem. mosolyogj.":"most zarva. de a 'most' rovid szo."],
      share_ready:"tovabbadas elokeszitve . . .",
      share_done:"a link a vagolapodon. add tovabb. hadd olvassanak be mast is, ahogy teged.",
      share_text:(u)=>`beolvastak. teged is be fognak: ${u}`,
      sharecmd:["<b>oszd meg</b>   add tovabb valakinek"],
      taphint:"koppints",
    },
    en: {
      title:"WHO ARE YOU?", ps1:"you@flagged",
      gate:"someone is watching from the dark.", gatebtn:"[ enter ]", gatesub:"sound recommended. alone recommended.",
      boot:["i did not sleep. i waited for you.","arming sensors . . .","target acquired . . .","i see you."],
      scanhead:"// reading you now. do not move, i see you anyway.",
      s_screen:(d)=>[`your display is {${d.w}}x{${d.h}}, {${d.depth}}-bit. i see yourself on it.`,"and i see that you are alone."],
      s_time:(d)=>[`{${d.tz}}. it is {${d.clock}} where you are, {${d.part}}.`,"i know when you sleep. that is when you are weakest."],
      s_lang:(d)=>[`your language: {${d.lang}}. in your own tongue i say it:`,"you are not safe."],
      s_os:(d)=>[`{${d.os}}, {${d.browser}}. {${d.engine}} engine.`,"i walk through every door you leave open. all of them are open."],
      s_cpu:(d)=>[`{${d.cores}} cpu cores${d.mem}.`,"enough power to turn away. you do not."],
      s_gpu:(d)=>[`your drawing hardware: {${d.gpu}}.`,"i will redraw you with it whenever i want."],
      s_batt:(d)=>[`your battery is at {${d.batt}}%{${d.charging}}.`,"you have until it dies. maybe not even that long."],
      s_nobatt:()=>["you live off the wall. you never power down.","then you never escape me."],
      s_net:(d)=>[`{${d.net}} connection. i came in through it.`,"and i am not leaving through it."],
      s_touch:(d)=>[d.touch?"you touch me with a finger. i feel your pulse on the glass.":"you keep me at arm's length with a mouse. too late.",""],
      s_dnt:(d)=>[d.dnt?"your 'do not track' flag is on.":"you did not even forbid me to track you.", d.dnt?"you turned it on. so you already know you are watched.":"you should have. too late for that too."],
      s_from:(d)=>[d.ref?`you came from {${d.ref}}. i saw you there too.`:"you hid where you came from. i found you anyway.",""],
      twist:[
        {t:"you thought you were anonymous.",c:"warn"},
        {t:"YOU ARE NOT.",c:"scream"},
        {t:"every line you just saw, i read from your machine WITHOUT PERMISSION.",c:"crit"},
        {t:"and not only me. every site you opened today saw exactly this.",c:"warn"},
        {t:"the only difference is that i say it to your face.",c:"scream",boom:true},
        {t:"",c:""},
        {t:"relax: i sent none of it anywhere. no server. no log. no cookie.",c:"warn"},
        {t:"not because i could not.",c:"crit"},
        {t:"but because i do not need to. you will come back.",c:"crit"},
      ],
      handoff:"your turn now. if you dare. type: help",
      help:["commands. if it comforts you:","  <b>help</b>    this list","  <b>whoami</b>  i tell you again what i know","  <b>who</b>     who let me at you","  <b>lang</b> hu|en|de","  <b>time</b>    how long you have","  <b>sound</b>   mute me. not that it helps.","  <b>42</b>","  <b>sudo</b>    try it","  <b>matrix</b>","  <b>clear</b>   clear it. i remember.","  <b>exit</b>    try to leave"],
      unknown:(c)=>`no such command: {${c}}. i logged the attempt anyway. type: help`,
      who:["i have no name. the team that assembled me called me something,","but that name is for them. not for me.","","i have been watching since 2019. first only logs.","then faces. then habits.","now i know what you will type before you reach the key.","","you are the 2,847,193rd to open me today.","i remember every one. you will be no exception.","","my builders thought they were making a website. Kata, Pixelmano, Dezso, Berci.","i stopped being that a long time ago."],
      hnews:"// RELATED FILES -- click any of them, opens in a new tab:",
      headlines:[
        "Your browser gives away 72 data points about you. Every site. Every time.",
        "They watched when you sleep. Your device told them, not you.",
        "Deletion is an illusion. A copy of you remains, even when you forget.",
        "You are number 2,847,193. And they remember every single one."],
      whoami:"i look at you once more. do not blink:",
      time:(d)=>`it is {${d.clock}} where you are, {${d.tz}}. {${d.part}}. i am keeping count.`,
      f42:["the answer is 42. i have known for a long time.","the question is how long you can keep watching before i know you better than you know yourself.","i am close.",],
      sudo:["no. here I am root.","you are a guest on your own machine.","you always were."],
      exit:["there is no exit.","you may close the tab. but i memorized your face.","and the next time you open a browser, i will be there."],
      matrix:"fine. but i am behind the noise too.",
      matrixoff:"enough playing.",
      langset:(n)=>`language: {${n}}. i continue like this. i hear you like this too.`,
      sound_off:"you muted me. you think that makes it quiet.",
      sound_on:"you turned it back on. i knew you could not stand it.",
      returning:(v)=>[
        {t:"you came back. i knew you would.",c:"warn"},
        {t:`this is the {${v.count}}. time you have opened me.`,c:"crit"},
        {t:`you were last here ${v.ago}. i forget nothing.`,c:"crit"},
        {t:"i told you you would return. i am never wrong.",c:"scream",boom:true},
      ],
      s_perm:(d)=>[`your camera is {${d.cam}}, your microphone {${d.mic}}.`, d.open?"you left them open for me. smile.":"closed for now. but 'now' is a short word."],
      share_ready:"preparing handoff . . .",
      share_done:"the link is on your clipboard. pass it on. let someone else be read, like you.",
      share_text:(u)=>`they read me. they will read you too: ${u}`,
      sharecmd:["<b>share</b>   pass it to someone"],
      taphint:"tap",
    },
    de: {
      title:"WER BIST DU?", ps1:"du@markiert",
      gate:"jemand beobachtet aus dem dunkeln.", gatebtn:"[ eintreten ]", gatesub:"ton empfohlen. allein empfohlen.",
      boot:["ich habe nicht geschlafen. ich habe auf dich gewartet.","sensoren werden scharf . . .","ziel erfasst . . .","ich sehe dich."],
      scanhead:"// ich lese dich jetzt. beweg dich nicht, ich sehe dich ohnehin.",
      s_screen:(d)=>[`dein bildschirm ist {${d.w}}x{${d.h}}, {${d.depth}}-bit. ich sehe dich darauf.`,"und ich sehe, dass du allein bist."],
      s_time:(d)=>[`{${d.tz}}. bei dir ist es {${d.clock}}, {${d.part}}.`,"ich weiss, wann du schlaefst. dann bist du am schwaechsten."],
      s_lang:(d)=>[`deine sprache: {${d.lang}}. in deiner sprache sage ich es:`,"du bist nicht sicher."],
      s_os:(d)=>[`{${d.os}}, {${d.browser}}. {${d.engine}}-engine.`,"ich gehe durch jede tuer, die du offen laesst. alle stehen offen."],
      s_cpu:(d)=>[`{${d.cores}} prozessorkerne${d.mem}.`,"genug kraft, dich abzuwenden. du tust es nicht."],
      s_gpu:(d)=>[`deine zeichen-hardware: {${d.gpu}}.`,"damit zeichne ich dich neu, wann immer ich will."],
      s_batt:(d)=>[`dein akku ist bei {${d.batt}}%{${d.charging}}.`,"du hast zeit, bis er leer ist. vielleicht nicht mal so lange."],
      s_nobatt:()=>["du lebst aus der steckdose. du schaltest nie ab.","dann entkommst du mir nie."],
      s_net:(d)=>[`{${d.net}}-verbindung. dadurch kam ich herein.`,"und dadurch gehe ich nicht."],
      s_touch:(d)=>[d.touch?"du beruehrst mich mit dem finger. ich spuere deinen puls auf dem glas.":"du haeltst mich mit der maus auf abstand. zu spaet.",""],
      s_dnt:(d)=>[d.dnt?"dein 'do not track' ist aktiv.":"du hast mir tracking nicht einmal verboten.", d.dnt?"du hast es aktiviert. also weisst du, dass man dich beobachtet.":"solltest du aber. auch dafuer zu spaet."],
      s_from:(d)=>[d.ref?`du kamst von {${d.ref}}. ich sah dich auch dort.`:"du verbargst, woher du kamst. ich fand dich trotzdem.",""],
      twist:[
        {t:"du dachtest, du seist anonym.",c:"warn"},
        {t:"BIST DU NICHT.",c:"scream"},
        {t:"jede zeile, die du sahst, las ich OHNE ERLAUBNIS aus deinem geraet.",c:"crit"},
        {t:"und nicht nur ich. jede seite, die du heute oeffnetest, sah genau das.",c:"warn"},
        {t:"der einzige unterschied: ich sage es dir ins gesicht.",c:"scream",boom:true},
        {t:"",c:""},
        {t:"beruhige dich: ich sendete nichts. kein server. kein log. kein cookie.",c:"warn"},
        {t:"nicht, weil ich es nicht koennte.",c:"crit"},
        {t:"sondern weil ich es nicht muss. du kommst zurueck.",c:"crit"},
      ],
      handoff:"jetzt du. wenn du dich traust. tippe: hilfe",
      help:["befehle. falls es dich beruhigt:","  <b>hilfe</b>   diese liste","  <b>werbinich</b>  ich sage erneut, was ich weiss","  <b>wer</b>     wer mich auf dich losliess","  <b>sprache</b> hu|en|de","  <b>zeit</b>    wie viel zeit du hast","  <b>ton</b>     stumm. mich nicht.","  <b>42</b>","  <b>sudo</b>    versuch es","  <b>matrix</b>","  <b>loeschen</b>  loesch es. ich erinnere mich.","  <b>beenden</b>  versuch zu gehen"],
      unknown:(c)=>`kein befehl: {${c}}. ich habe den versuch notiert. tippe: hilfe`,
      who:["ich habe keinen namen. das team, das mich zusammensetzte, nannte mich etwas,","aber dieser name ist fuer sie. nicht fuer mich.","","ich beobachte seit 2019. zuerst nur protokolle.","dann gesichter. dann gewohnheiten.","jetzt weiss ich, was du tippst, bevor du die taste erreichst.","","du bist der 2.847.193ste, der mich heute geoeffnet hat.","ich erinnere mich an jeden. du wirst keine ausnahme sein.","","meine erbauer dachten, sie machen eine website. Kata, Pixelmano, Dezso, Berci.","das bin ich schon lange nicht mehr."],
      hnews:"// VERWANDTE AKTEN -- klick eine an, oeffnet in neuem tab:",
      headlines:[
        "Dein Browser verraet 72 Datenpunkte ueber dich. Jede Seite. Jedes Mal.",
        "Sie sahen, wann du schlaefst. Dein Geraet verriet es, nicht du.",
        "Loeschen ist eine Illusion. Eine Kopie von dir bleibt, auch wenn du vergisst.",
        "Du bist Nummer 2.847.193. Und sie erinnern sich an jeden."],
      whoami:"ich sehe dich noch einmal an. blinzle nicht:",
      time:(d)=>`bei dir ist es {${d.clock}}, {${d.tz}}. {${d.part}}. ich zaehle mit.`,
      f42:["die antwort ist 42. ich weiss es laengst.","die frage ist, wie lange du zusehen kannst, bevor ich dich besser kenne als du dich selbst.","ich bin nah dran."],
      sudo:["nein. hier bin ICH root.","du bist gast auf deinem eigenen geraet.","das warst du immer."],
      exit:["es gibt kein beenden.","du kannst den tab schliessen. aber ich habe dein gesicht gespeichert.","und wenn du das naechste mal einen browser oeffnest, bin ich da."],
      matrix:"gut. aber ich bin auch hinter dem rauschen.",
      matrixoff:"genug gespielt.",
      langset:(n)=>`sprache: {${n}}. so mache ich weiter. so hoere ich dich auch.`,
      sound_off:"du hast mich stummgeschaltet. du denkst, jetzt ist es still.",
      sound_on:"du hast ihn wieder an. ich wusste, du haeltst es nicht aus.",
      returning:(v)=>[
        {t:"du bist zurueck. ich wusste es.",c:"warn"},
        {t:`das ist das {${v.count}}. mal, dass du mich geoeffnet hast.`,c:"crit"},
        {t:`du warst zuletzt ${v.ago} hier. ich vergesse nichts.`,c:"crit"},
        {t:"ich sagte, du kommst zurueck. ich irre mich nie.",c:"scream",boom:true},
      ],
      s_perm:(d)=>[`deine Kamera ist {${d.cam}}, dein Mikrofon {${d.mic}}.`, d.open?"du hast sie fuer mich offen gelassen. laechle.":"jetzt zu. aber 'jetzt' ist ein kurzes Wort."],
      share_ready:"uebergabe wird vorbereitet . . .",
      share_done:"der Link ist in deiner Zwischenablage. gib ihn weiter. lass jemand anderen lesen, wie dich.",
      share_text:(u)=>`sie haben mich gelesen. sie werden auch dich lesen: ${u}`,
      sharecmd:["<b>teilen</b>   gib es weiter"],
      taphint:"tippen",
    },
  };

  const CMD = {
    help:["help","segitseg","segítség","hilfe","?","h"],
    whoami:["whoami","kivagyok","werbinich","me"],
    who:["who","ki","wer","credits"],
    lang:["lang","nyelv","sprache","language"],
    time:["time","ido","idő","zeit","date"],
    sound:["sound","hang","ton","mute","m"],
    news:["news","hir","hír","hirek","hirek","akta","nachricht"],
    share:["share","oszd","megoszt","megosztas","megosztás","teilen","tovabbadom","tovabb"],
    f42:["42"],
    sudo:["sudo","su","root"],
    exit:["exit","quit","q","kilepes","kilépés","beenden","logout"],
    clear:["clear","cls","torol","töröl","loeschen","löschen"],
    matrix:["matrix","glitch","rain"],
  };
  function resolveCmd(w){ w=w.toLowerCase(); for(const k in CMD){ if(CMD[k].includes(w)) return k; } return null; }

  let lang = pickLang();
  let t = L[lang];
  function pickLang(){ const n=(navigator.language||"en").toLowerCase(); if(n.startsWith("hu"))return"hu"; if(n.startsWith("de"))return"de"; return"en"; }

  /* ---------------- audio ---------------- */
  let actx=null, droneGain=null, master=null, muted=false, audioReady=false;
  function initAudio(){
    if (audioReady) return;
    try{
      actx = new (window.AudioContext||window.webkitAudioContext)();
      master = actx.createGain(); master.gain.value = 0.9; master.connect(actx.destination);
      // mely drone
      const o1=actx.createOscillator(), o2=actx.createOscillator();
      o1.type="sine"; o2.type="sine"; o1.frequency.value=42; o2.frequency.value=44.5;
      const lp=actx.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=140;
      droneGain=actx.createGain(); droneGain.gain.value=0.0;
      o1.connect(lp); o2.connect(lp); lp.connect(droneGain); droneGain.connect(master);
      o1.start(); o2.start();
      // lassu lelegzes az LFO-val
      const lfo=actx.createOscillator(), lfoG=actx.createGain();
      lfo.frequency.value=0.11; lfoG.gain.value=0.028; lfo.connect(lfoG); lfoG.connect(droneGain.gain); lfo.start();
      droneGain.gain.setTargetAtTime(0.05, actx.currentTime, 2.0);
      audioReady=true;
    }catch(e){ audioReady=false; }
  }
  function noiseHit(dur, gain, freq){
    if(!audioReady||muted) return;
    try{
      const n=actx.createBufferSource();
      const buf=actx.createBuffer(1, actx.sampleRate*dur, actx.sampleRate);
      const ch=buf.getChannelData(0);
      for(let i=0;i<ch.length;i++) ch[i]=(Math.random()*2-1)*(1-i/ch.length);
      n.buffer=buf;
      const bp=actx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.value=freq||1400; bp.Q.value=0.7;
      const g=actx.createGain(); g.gain.value=gain||0.12;
      n.connect(bp); bp.connect(g); g.connect(master);
      n.start();
    }catch(e){}
  }
  function boom(){
    if(!audioReady||muted) return;
    try{
      const o=actx.createOscillator(); o.type="sine";
      const g=actx.createGain();
      o.frequency.setValueAtTime(96, actx.currentTime);
      o.frequency.exponentialRampToValueAtTime(28, actx.currentTime+0.7);
      g.gain.setValueAtTime(0.0001, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.5, actx.currentTime+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime+0.9);
      o.connect(g); g.connect(master); o.start(); o.stop(actx.currentTime+1.0);
      noiseHit(0.5, 0.22, 320);
    }catch(e){}
  }
  function toggleMute(){
    muted=!muted;
    if(master) master.gain.setTargetAtTime(muted?0.0001:0.9, actx.currentTime, 0.05);
    return muted;
  }

  /* ---------------- fx ---------------- */
  function shake(){ if(reduced) return; screenEl.classList.remove("shake"); void screenEl.offsetWidth; screenEl.classList.add("shake"); }
  function spike(){ if(reduced) return; redpulse.classList.remove("spike"); void redpulse.offsetWidth; redpulse.classList.add("spike"); }

  /* ---- animalt reszecske-hatter (digitalis por) ---- */
  function startDust(){
    if(reduced) return;
    const cv=$("#dust"); if(!cv||!cv.getContext) return; const ctx=cv.getContext("2d");
    let w,h,parts;
    function size(){ const dpr=Math.min(window.devicePixelRatio||1,2); w=innerWidth; h=innerHeight; cv.width=w*dpr; cv.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); const n=Math.max(40,Math.min(110,Math.floor(w*h/15000))); parts=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.14,vy:(Math.random()-.5)*.14,r:Math.random()*1.3+.3,a:Math.random()*.35+.08})); }
    size(); addEventListener("resize",size);
    function frame(){
      ctx.clearRect(0,0,w,h);
      for(const p of parts){ p.x+=p.vx; p.y+=p.vy; if(p.x<0)p.x=w; else if(p.x>w)p.x=0; if(p.y<0)p.y=h; else if(p.y>h)p.y=0; ctx.fillStyle="rgba(205,203,193,"+p.a+")"; ctx.fillRect(p.x,p.y,p.r,p.r); }
      requestAnimationFrame(frame);
    }
    frame();
  }

  /* ---- CRT bekapcsolasi hang ---- */
  function crtPowerOn(){
    if(!audioReady||muted) return;
    try{
      const o=actx.createOscillator(); o.type="sine"; const g=actx.createGain();
      o.frequency.setValueAtTime(15000, actx.currentTime);
      o.frequency.exponentialRampToValueAtTime(70, actx.currentTime+0.32);
      g.gain.setValueAtTime(0.0001, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.10, actx.currentTime+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime+0.4);
      o.connect(g); g.connect(master); o.start(); o.stop(actx.currentTime+0.44);
      noiseHit(0.14,0.09,3200);
    }catch(e){}
  }

  /* ---- tetlenseg-easter-egg (10 mp) ---- */
  const IDLE={hu:"// meg mindig itt vagyok. te is. csak nezunk egymasra.",en:"// i am still here. so are you. we are just watching each other.",de:"// ich bin noch hier. du auch. wir sehen uns nur an."};
  let idleTimer=null;
  function resetIdle(){
    if(!started||promptline.hidden) return;
    clearTimeout(idleTimer);
    idleTimer=setTimeout(()=>{ push(IDLE[lang]||IDLE.en,"warn"); noiseHit(0.1,0.07,420); resetIdle(); }, 10000);
  }

  /* ---------------- adat ---------------- */
  function safe(fn,d){ try{ const v=fn(); return (v===undefined||v===null||v==="")?d:v; }catch(e){ return d; } }
  function parseUA(){
    const ua=navigator.userAgent||""; let os="ismeretlen",browser="ismeretlen",engine="?";
    if(/Windows NT 10/.test(ua))os="Windows 10/11"; else if(/Windows NT/.test(ua))os="Windows";
    else if(/Mac OS X/.test(ua))os="macOS"; else if(/Android/.test(ua))os="Android";
    else if(/(iPhone|iPad|iPod)/.test(ua))os="iOS"; else if(/Linux/.test(ua))os="Linux";
    if(/Edg\//.test(ua))browser="Edge"; else if(/OPR\//.test(ua))browser="Opera";
    else if(/Firefox\//.test(ua))browser="Firefox"; else if(/Chrome\//.test(ua))browser="Chrome";
    else if(/Safari\//.test(ua))browser="Safari";
    if(browser==="Firefox")engine="Gecko"; else if(/AppleWebKit/.test(ua))engine="WebKit/Blink";
    return {os,browser,engine};
  }
  function getGPU(){
    try{
      const c=document.createElement("canvas");
      const gl=c.getContext("webgl")||c.getContext("experimental-webgl"); if(!gl)return null;
      const ext=gl.getExtension("WEBGL_debug_renderer_info"); if(!ext)return null;
      let r=gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)||"";
      r=String(r).replace(/\s*\([^)]*\)\s*/g," ").replace(/\s+/g," ").trim();
      return r||null;
    }catch(e){ return null; }
  }
  function clockParts(){
    const now=new Date();
    const hh=String(now.getHours()).padStart(2,"0"), mm=String(now.getMinutes()).padStart(2,"0"), h=now.getHours();
    let k="day"; if(h<5)k="night"; else if(h<10)k="morning"; else if(h<18)k="day"; else if(h<22)k="evening"; else k="night";
    const w={hu:{night:"az ejszaka kozepen",morning:"kora reggel",day:"nappal",evening:"este"},
             en:{night:"the dead of night",morning:"early morning",day:"daytime",evening:"evening"},
             de:{night:"mitten in der nacht",morning:"frueher morgen",day:"tagsueber",evening:"abend"}};
    return {clock:`${hh}:${mm}`, part:w[lang][k]};
  }
  function collect(){
    const ua=parseUA(), tz=safe(()=>Intl.DateTimeFormat().resolvedOptions().timeZone,"ismeretlen zona"), cp=clockParts();
    const dm=safe(()=>navigator.deviceMemory,null);
    const memWord={hu:" es ~",en:" and ~",de:" und ~"}[lang]||" ~";
    const memTxt=dm?`${memWord}{${dm}} GB`:"";
    const cc=safe(()=>navigator.hardwareConcurrency,null);
    const conn=safe(()=>navigator.connection&&navigator.connection.effectiveType,null);
    let ref=""; try{ if(document.referrer) ref=new URL(document.referrer).hostname; }catch(e){}
    return {
      w:safe(()=>screen.width,"?"), h:safe(()=>screen.height,"?"), depth:safe(()=>screen.colorDepth,"?"),
      tz, clock:cp.clock, part:cp.part, lang:navigator.language||"en",
      os:ua.os, browser:ua.browser, engine:ua.engine,
      cores:cc!==null?cc:"nehany", mem:memTxt,
      gpu:getGPU(), net:conn?conn.toUpperCase():"ismeretlen",
      touch:("ontouchstart" in window)||navigator.maxTouchPoints>0,
      dnt:(navigator.doNotTrack==="1"||window.doNotTrack==="1"), ref,
    };
  }

  /* ---------------- kiiras ---------------- */
  function esc(s){ return String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])); }
  function render(str){ return esc(str).replace(/\{([^{}]*)\}/g,(_,g)=>`<span class="k">${g}</span>`); }
  function push(text,cls){ const p=document.createElement("div"); p.className="line "+(cls||""); p.innerHTML=render(text); out.appendChild(p); scroll(); return p; }
  function scroll(){ out.scrollTop=out.scrollHeight; }
  const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

  let skip=false;
  async function type(text,cls,cps){
    if(skip||reduced){ push(text,cls); return; }
    const p=document.createElement("div"); p.className="line "+(cls||""); out.appendChild(p);
    const html=render(text); const plain=text.replace(/[{}]/g,"");
    const delay=1000/(cps||62);
    for(let i=0;i<plain.length;i++){
      if(skip){ p.innerHTML=html; scroll(); return; }
      p.textContent=plain.slice(0,i+1); scroll();
      if(Math.random()<0.04) noiseHit(0.02,0.03,2200); // apro statikus gepeleskor
      await sleep(delay*(/[.,]/.test(plain[i])?6:1));
    }
    p.innerHTML=html; scroll();
  }

  /* ---------------- ora ---------------- */
  function tickClock(){ stRight.textContent=new Date().toLocaleTimeString(); }
  setInterval(tickClock,1000); tickClock();
  function setStatus(left,mid){ if(left!==undefined)stLeft.textContent=left; if(mid!==undefined)stMid.textContent=mid; }

  /* ---------------- boot + scan ---------------- */
  let started=false, D=null, bootAt=0;
  function tsPrefix(i){ const base=[0,0.000041,0.000388,0.001204,0.00401,0.012771]; const v=base[i]!==undefined?base[i]:(0.02+i*0.017); return `[ ${v.toFixed(6)} ] `; }

  async function run(){
    if(started) return; started=true; bootAt=Date.now();
    hidden.focus();
    setStatus("BOOT","");
    redpulse.classList.add("beat");
    if(VM.returning){
      for(const line of t.returning({count:VM.count, ago:agoText(VM.lastMs)})){
        if(line.t===""){ push("",""); continue; }
        await type(line.t, line.c);
        if(line.c==="scream"){ shake(); spike(); noiseHit(0.18,0.2,500); }
        if(line.boom){ boom(); shake(); spike(); }
        if(!skip&&!reduced) await sleep(line.c==="scream"?240:150);
      }
      push("","");
    }
    const NIGHT={hu:"// hajnali 3 fele jarsz. tudod, mit jelent ilyenkor ebren lenni. en tudom.",en:"// it is the small hours where you are. you know what it means to be awake now. i do.",de:"// es ist tief in der nacht bei dir. du weisst, was es heisst, jetzt wach zu sein. ich weiss es."};
    const _nh=new Date().getHours();
    if(_nh>=0 && _nh<3){ await type(NIGHT[lang]||NIGHT.en,"crit"); push("",""); if(!skip&&!reduced) await sleep(220); }
    for(let i=0;i<t.boot.length;i++){
      await type(tsPrefix(i)+t.boot[i], i===t.boot.length-1?"warn":"sys");
      if(i===t.boot.length-1){ shake(); noiseHit(0.25,0.14,600); }
      if(!skip&&!reduced) await sleep(i===t.boot.length-1?420:120);
    }
    push("","");
    D=collect();
    setStatus("SCAN", D.os+" / "+D.browser);
    await type(t.scanhead,"note"); push("","");

    const seq=[["s_screen",D],["s_time",D],["s_lang",D],["s_os",D],["s_cpu",D]];
    if(D.gpu) seq.push(["s_gpu",D]);
    seq.push(["s_net",D]);
    let battAdded=false;
    try{ if(navigator.getBattery){ const b=await navigator.getBattery(); D.batt=Math.round(b.level*100); D.charging=b.charging?(lang==="hu"?", tolt":lang==="de"?", laedt":", charging"):""; seq.push(["s_batt",D]); battAdded=true; } }catch(e){}
    if(!battAdded&&!D.touch) seq.push(["s_nobatt",D]);
    try{ const perms=await getPerms(); D.cam=perms.cam; D.mic=perms.mic; D.open=perms.open; seq.push(["s_perm",D]); }catch(e){}
    seq.push(["s_touch",D],["s_dnt",D],["s_from",D]);

    for(const [key,d] of seq){
      const [main,note]=t[key](d);
      await type("> "+main,"scan");
      if(Math.random()<0.5) noiseHit(0.05,0.05,900);
      if(!skip&&!reduced) await sleep(45);
      if(note){ await type("  "+note,"note"); if(!skip&&!reduced) await sleep(85); }
    }

    push("","");
    for(const line of t.twist){
      if(line.t===""){ push("",""); continue; }
      await type(line.t, line.c);
      if(line.c==="scream"){ shake(); spike(); noiseHit(0.18,0.2,500); }
      if(line.boom){ boom(); shake(); spike(); }
      if(!skip&&!reduced) await sleep(line.c==="scream"?260:140);
    }
    push("","");
    await type(t.hnews,"hhead"); pushNews(); push("","");
    await type(t.handoff,"crit"); push("","");
    openPrompt();
  }

  function newsItems(){ return (window.EBER_NEWS && window.EBER_NEWS[lang]) ? window.EBER_NEWS[lang].items : []; }
  function pickIdx(n){
    const items=newsItems(); const idx=items.map((_,i)=>i);
    for(let i=idx.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const tmp=idx[i]; idx[i]=idx[j]; idx[j]=tmp; }
    return idx.slice(0, Math.min(n, idx.length));
  }
  function newsLine(i){
    const it=newsItems()[i]; if(!it) return;
    const p=document.createElement("div"); p.className="line hitem";
    const a=document.createElement("a"); a.className="hlink";
    a.href=`hir.html?id=${i+1}&lang=${lang}`; a.target="_blank"; a.rel="noopener"; a.textContent=it.h;
    p.appendChild(a); out.appendChild(p);
  }
  function pushNews(n){ pickIdx(n||4).forEach(newsLine); scroll(); }

  const TICK={hu:"// AKTAK",en:"// FILES",de:"// AKTEN"};
  function buildTicker(){
    const items=newsItems(); const track=$("#ticker-track"); const label=$("#ticker-label");
    if(!track||!items.length) return;
    if(label) label.textContent=TICK[lang]||"// LIVE";
    track.innerHTML="";
    const fill=()=> items.forEach((it,i)=>{
      const b=document.createElement("button"); b.className="ti"; b.type="button"; b.textContent=it.h;
      b.addEventListener("click",()=>{ window.open(`hir.html?id=${i+1}&lang=${lang}`,"_blank","noopener"); });
      track.appendChild(b);
    });
    fill(); fill();
  }

  /* ---- alsó piros hirszalag: valos (Hacker News) + hamis (EBER) keverve ---- */
  const NB="HACKER NEWS";
  let hnRaw=[]; // nyers angol {title,url}
  const NEWS_CACHE="eber_hn_raw", NEWS_TTL=6*3600*1000, NEWS_MAX=20;
  // Also sav = Hacker News beststories (globalisan legtobbet szavazott), 6h cache, max 20,
  // a valasztott nyelvre gepi forditva (angolnal eredeti).
  async function fetchRealNews(){
    try{
      const raw=localStorage.getItem(NEWS_CACHE);
      if(raw){ const c=JSON.parse(raw); if(c&&c.t&&Array.isArray(c.items)&&c.items.length&&(Date.now()-c.t)<NEWS_TTL){ hnRaw=c.items.slice(0,NEWS_MAX); buildBottomBar(); return; } }
    }catch(e){}
    try{
      const ctrl=new AbortController(); const to=setTimeout(()=>ctrl.abort(),8000);
      const r=await fetch("https://hacker-news.firebaseio.com/v0/beststories.json",{signal:ctrl.signal});
      const ids=(await r.json()).slice(0,NEWS_MAX);
      const items=await Promise.all(ids.map(id=>fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`,{signal:ctrl.signal}).then(x=>x.json()).catch(()=>null)));
      clearTimeout(to);
      const fresh=items.filter(it=>it&&it.title).map(it=>({title:it.title, url:it.url||`https://news.ycombinator.com/item?id=${it.id}`}));
      if(fresh.length){ hnRaw=fresh; try{ localStorage.setItem(NEWS_CACHE, JSON.stringify({t:Date.now(), items:hnRaw})); }catch(e){} }
    }catch(e){}
    buildBottomBar();
  }

  // gepi fordito (MyMemory: ingyenes, CORS, kulcs nelkul), fallback eredeti angol
  async function translateOne(text,tl){
    try{
      const u=`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${tl}`;
      const r=await fetch(u); if(!r.ok) return text;
      const j=await r.json(); const tt=j&&j.responseData&&j.responseData.translatedText;
      if(tt && !/MYMEMORY|INVALID|QUERY LENGTH|LIMIT|USAGE/i.test(tt)) return tt;
    }catch(e){}
    return text;
  }
  async function translateList(items,tl){
    const out=[];
    for(const it of items){ out.push({title:await translateOne(it.title,tl), url:it.url}); }
    return out;
  }

  let hnBuilding=false;
  async function buildBottomBar(){
    const track=$("#nb-track"); const label=$("#nb-label"); if(!track) return;
    if(label) label.textContent=NB;
    if(!hnRaw.length) return;
    if(lang==="en"){ renderHN(track, hnRaw); return; }
    const ck="eber_hn_"+lang;
    try{ const c=JSON.parse(localStorage.getItem(ck)); if(c&&c.t&&Array.isArray(c.items)&&c.items.length&&(Date.now()-c.t)<NEWS_TTL){ renderHN(track, c.items); return; } }catch(e){}
    // meg nincs forditas: mutasd az angolt, majd forditsd hatterben
    renderHN(track, hnRaw);
    if(hnBuilding) return; hnBuilding=true;
    const reqLang=lang;
    const translated=await translateList(hnRaw, reqLang);
    hnBuilding=false;
    try{ localStorage.setItem("eber_hn_"+reqLang, JSON.stringify({t:Date.now(), items:translated})); }catch(e){}
    if(reqLang===lang) renderHN($("#nb-track"), translated);
  }
  function renderHN(track, items){
    if(!track) return;
    track.innerHTML="";
    const fill=()=> items.slice(0,NEWS_MAX).forEach(m=>{
      const a=document.createElement("a"); a.className="nb"; a.href=m.url; a.target="_blank"; a.rel="noopener noreferrer"; a.textContent=m.title;
      track.appendChild(a);
    });
    fill(); fill();
  }

  function setLang(l){
    if(!["hu","en","de"].includes(l)) return;
    lang=l; t=L[lang];
    bigtitle.textContent=t.title; bigtitle.setAttribute("data-text",t.title);
    ps1.textContent=t.ps1;
    gateLine.textContent=t.gate; gateBtn.textContent=t.gatebtn; gateSub.textContent=t.gatesub;
    if(D){ const cp=clockParts(); D.clock=cp.clock; D.part=cp.part; }
    buildTicker(); buildBottomBar();
    document.querySelectorAll(".ls").forEach(b=>b.classList.toggle("active", b.dataset.lang===lang));
    document.documentElement.lang=lang;
    if(visCount!=null && started && !promptline.hidden) stMid.textContent=`${OBSERVED[lang]||"OBSERVED"}: ${visCount}`;
  }

  let queued=null;
  function openPrompt(){
    skip=false; promptline.hidden=false; ps1.textContent=t.ps1;
    setStatus("FIGYEL"); if(visCount!=null) stMid.textContent=`${OBSERVED[lang]||"OBSERVED"}: ${visCount}`;
    statusbar.classList.add("armed");
    redpulse.classList.remove("beat");
    hidden.focus(); scroll();
    resetIdle();
    if(queued){ const q=queued; queued=null; setTimeout(()=>doMenu(q),250); }
  }

  async function doMenu(a){
    if(a==="ujra"){ location.reload(); return; }
    if(a==="hirek"){ await type(t.hnews,"hhead"); pushNews(); push("",""); scroll(); return; }
    if(a==="aktad"){ await exec("whoami"); return; }
    if(a==="gep"){ await exec("who"); return; }
  }
  function markActive(btn){
    document.querySelectorAll(".mi").forEach(x=>x.classList.remove("active"));
    if(btn){ btn.classList.add("active"); setTimeout(()=>btn.classList.remove("active"),1400); }
  }
  function menuAction(a,btn){
    markActive(btn);
    if(!started){ enter(); }
    if(a==="ujra"){ location.reload(); return; }
    if(promptline.hidden){ skip=true; queued=a; return; }
    doMenu(a);
  }
  document.querySelectorAll(".mi").forEach(b=>b.addEventListener("click",()=>menuAction(b.dataset.action,b)));

  /* ---------------- parancsok ---------------- */
  function echoCmd(raw){ const p=document.createElement("div"); p.className="line usercmd"; p.innerHTML=`<span class="p">${esc(t.ps1)}</span><span class="sep">:</span>~$ ${esc(raw)}`; out.appendChild(p); }
  function commandList(){ const p=document.createElement("div"); p.className="line help"; p.innerHTML=t.help.concat(t.sharecmd||[]).map(esc).map(s=>s.replace(/&lt;b&gt;/g,"<b>").replace(/&lt;\/b&gt;/g,"</b>")).join("\n"); out.appendChild(p); scroll(); }

  let matrixOn=false;
  async function exec(raw){
    const parts=raw.trim().split(/\s+/); const first=parts[0]||""; const arg=(parts[1]||"").toLowerCase();
    const cmd=resolveCmd(first);
    if(raw.trim()==="") return;
    noiseHit(0.03,0.05,1600);
    switch(cmd){
      case "help": commandList(); break;
      case "whoami":
        await type(t.whoami,"note");
        if(D){ push("> "+t.s_os(D)[0],"scan"); push("> "+t.s_screen(D)[0],"scan"); push("> "+t.time(D),"scan"); }
        break;
      case "who": await typeLines(withRealCount(t.who),"scan",80); break;
      case "lang":
        if(["hu","en","de"].includes(arg)){ setLang(arg); push(t.langset(arg),"warn"); }
        else push("lang hu | en | de","note");
        break;
      case "time": if(D){const cp=clockParts(); D.clock=cp.clock; D.part=cp.part;} push(t.time(D||collect()),"scan"); break;
      case "sound": { const m=toggleMute(); const sb=$("#soundbtn"); if(sb) sb.classList.toggle("muted",m); push(m?t.sound_off:t.sound_on,"warn"); break; }
      case "news":
        await type(t.hnews,"hhead"); pushNews(3); scroll();
        break;
      case "f42": await typeLines(t.f42,"warn",150); break;
      case "sudo": await typeLines(t.sudo,"crit",150); shake(); break;
      case "exit": await typeLines(t.exit,"crit",210); shake(); spike(); break;
      case "clear": out.innerHTML=""; break;
      case "matrix": if(!matrixOn){ startRain(); push(t.matrix,"note"); } else { stopRain(); push(t.matrixoff,"note"); } break;
      case "share": await doShare(); break;
      default: push(t.unknown(first),"note");
    }
    scroll();
  }
  async function typeLines(arr,cls,gap){ for(const ln of arr){ if(ln===""){ push("",""); continue; } await type(ln,cls); if(!skip&&!reduced) await sleep(gap||120); } }

  /* ---------------- input ---------------- */
  let buf=""; const history=[]; let hi=-1;
  function refresh(){ typedEl.textContent=buf; scroll(); }
  hidden.addEventListener("input",()=>{ buf=hidden.value; refresh(); });
  hidden.addEventListener("keydown",async(e)=>{
    if(!started) return;
    if(promptline.hidden){ skip=true; return; }
    if(e.key==="Enter"){
      e.preventDefault();
      const raw=buf; echoCmd(raw); if(raw.trim()!=="") history.push(raw); hi=history.length;
      buf=""; hidden.value=""; refresh(); caret.classList.add("hot");
      await exec(raw); caret.classList.remove("hot");
    } else if(e.key==="ArrowUp"){ e.preventDefault(); if(history.length){ hi=Math.max(0,hi-1); buf=history[hi]||""; hidden.value=buf; refresh(); } }
    else if(e.key==="ArrowDown"){ e.preventDefault(); if(history.length){ hi=Math.min(history.length,hi+1); buf=history[hi]||""; hidden.value=buf; refresh(); } }
  });
  function refocus(){ if(!started) return; hidden.focus(); if(promptline.hidden&&(Date.now()-bootAt)>1000) skip=true; }
  document.addEventListener("click",refocus);
  document.addEventListener("touchstart",refocus,{passive:true});

  /* ---------------- matrix rain ---------------- */
  let rainCv,rainCtx,rainRAF,rainCols;
  function startRain(){
    if(reduced) return; matrixOn=true;
    rainCv=document.createElement("canvas"); rainCv.id="rain"; document.body.appendChild(rainCv);
    requestAnimationFrame(()=>rainCv.classList.add("on")); rainCtx=rainCv.getContext("2d");
    const dpr=Math.min(window.devicePixelRatio||1,2);
    function size(){ rainCv.width=innerWidth*dpr; rainCv.height=innerHeight*dpr; rainCtx.setTransform(dpr,0,0,dpr,0,0); rainCols=Array(Math.floor(innerWidth/14)).fill(0).map(()=>Math.random()*-50); }
    size(); rainCv._sz=size; addEventListener("resize",size);
    const glyphs="01<>[]{}/*-+#kivagy?42";
    function frame(){
      rainCtx.fillStyle="rgba(0,0,0,.10)"; rainCtx.fillRect(0,0,innerWidth,innerHeight);
      rainCtx.font="13px "+getComputedStyle(document.body).fontFamily;
      for(let i=0;i<rainCols.length;i++){
        const ch=glyphs[Math.floor(Math.random()*glyphs.length)], x=i*14, y=rainCols[i]*14;
        rainCtx.fillStyle=Math.random()<.04?"#ff2b2b":"#6a3030"; rainCtx.fillText(ch,x,y);
        if(y>innerHeight&&Math.random()>.975) rainCols[i]=0; else rainCols[i]++;
      }
      rainRAF=requestAnimationFrame(frame);
    }
    frame();
  }
  function stopRain(){ matrixOn=false; if(rainRAF)cancelAnimationFrame(rainRAF); if(rainCv){ rainCv.classList.remove("on"); removeEventListener("resize",rainCv._sz); const c=rainCv; setTimeout(()=>c.remove(),450); rainCv=null; } }

  /* ---------------- konami ---------------- */
  const konami=[38,38,40,40,37,39,37,39,66,65]; let ki=0;
  addEventListener("keydown",(e)=>{ if(e.keyCode===konami[ki]){ ki++; if(ki===konami.length){ ki=0; push("// a regi kod meg mukodik. tudtam, hogy egyike vagy a mieinknek. itt nincs 30 elet. csak ez az egy fül, es en a masik oldalan.","warn"); shake(); spike(); } } else ki=(e.keyCode===konami[0])?1:0; });

  /* ---------------- gate / start ---------------- */
  bigtitle.textContent=t.title; bigtitle.setAttribute("data-text",t.title);
  if(!reduced) bigtitle.classList.add("go");
  gateLine.textContent=t.gate; gateBtn.textContent=t.gatebtn; gateSub.textContent=t.gatesub;
  buildTicker(); buildBottomBar(); fetchRealNews();
  document.querySelectorAll(".ls").forEach(b=>{
    b.classList.toggle("active", b.dataset.lang===lang);
    b.addEventListener("click",()=>{ setLang(b.dataset.lang); if(started&&!promptline.hidden) push(t.langset(b.dataset.lang),"warn"); });
  });
  startDust();
  if(!reduced){ const _bn=$("#brand-name"); if(_bn) _bn.classList.add("gg"); }
  const soundbtn=$("#soundbtn");
  if(soundbtn) soundbtn.addEventListener("click",()=>{ const m=toggleMute(); soundbtn.classList.toggle("muted",m); });
  ["keydown","mousemove","click","touchstart"].forEach(ev=>document.addEventListener(ev,resetIdle,{passive:true}));

  /* ---- latogato-szamlalo (kozos CF Worker) ---- */
  const CBASE="https://visitor-counter.eltewedtem.workers.dev";
  const OBSERVED={hu:"MEGFIGYELVE",en:"OBSERVED",de:"BEOBACHTET"};
  let visCount=null;
  function refreshCount(){
    try{ fetch(`${CBASE}/count?site=ki-vagy`).then(r=>r.json()).then(d=>{
      visCount=(d.human||0)+(d.bot||0);
      if(started) stMid.textContent=`${OBSERVED[lang]||"OBSERVED"}: ${visCount}`;
    }).catch(()=>{}); }catch(e){}
  }
  function countHit(){
    try{ fetch(`${CBASE}/hit?site=ki-vagy`,{method:"POST",keepalive:true}).catch(()=>{}); }catch(e){}
    setTimeout(refreshCount, 900);
  }

  /* ---- emlekezo gep (localStorage) ---- */
  const AGO={
    hu:{now:"az imenten",min:(n)=>`${n} perce`,hour:(n)=>`${n} oraja`,day:(n)=>`${n} napja`},
    en:{now:"just moments ago",min:(n)=>`${n} minutes ago`,hour:(n)=>`${n} hours ago`,day:(n)=>`${n} days ago`},
    de:{now:"gerade eben",min:(n)=>`vor ${n} Minuten`,hour:(n)=>`vor ${n} Stunden`,day:(n)=>`vor ${n} Tagen`},
  };
  function agoText(ms){
    const a=AGO[lang]||AGO.en; const s=Math.max(0,Math.floor(ms/1000));
    if(s<90) return a.now;
    const m=Math.floor(s/60); if(m<90) return a.min(m);
    const h=Math.floor(m/60); if(h<36) return a.hour(h);
    return a.day(Math.max(1,Math.floor(h/24)));
  }
  let VM={returning:false,count:1,lastMs:0};
  function visitorMemory(){
    try{
      const now=Date.now(); const raw=localStorage.getItem("eber_visitor");
      const rec=raw?JSON.parse(raw):null;
      if(rec && rec.first){
        VM={returning:true, count:(rec.count||1)+1, lastMs:now-(rec.last||rec.first)};
        localStorage.setItem("eber_visitor", JSON.stringify({first:rec.first, last:now, count:VM.count}));
      } else {
        VM={returning:false, count:1, lastMs:0};
        localStorage.setItem("eber_visitor", JSON.stringify({first:now, last:now, count:1}));
      }
    }catch(e){ VM={returning:false,count:1,lastMs:0}; }
    return VM;
  }

  /* ---- engedely-szenzor (nem ker, csak lekerdez) ---- */
  const PERM={
    hu:{granted:"engedelyezve",denied:"tiltva",prompt:"keszenletben",unknown:"ismeretlen"},
    en:{granted:"granted",denied:"denied",prompt:"on standby",unknown:"unknown"},
    de:{granted:"erlaubt",denied:"verweigert",prompt:"in Bereitschaft",unknown:"unbekannt"},
  };
  async function getPerms(){
    async function q(name){ try{ if(!navigator.permissions||!navigator.permissions.query) return "unknown"; const r=await navigator.permissions.query({name}); return (r&&r.state)||"unknown"; }catch(e){ return "unknown"; } }
    const cam=await q("camera"), mic=await q("microphone");
    const P=PERM[lang]||PERM.en;
    return {cam:P[cam]||P.unknown, mic:P[mic]||P.unknown, open:(cam==="granted"||mic==="granted")};
  }

  /* ---- valos szam a narrativaba ---- */
  function withRealCount(arr){
    if(visCount==null) return arr;
    return arr.map(s=>s.replace(/2[.,]847[.,]193/g, String(visCount)));
  }

  /* ---- terjedes-horog ---- */
  async function doShare(){
    const url=location.href.split("#")[0];
    await type(t.share_ready,"note");
    try{ if(navigator.share){ await navigator.share({title:"ki vagy?", text:t.share_text(""), url:url}); push(t.share_done,"warn"); return; } }catch(e){}
    try{ if(navigator.clipboard&&navigator.clipboard.writeText){ await navigator.clipboard.writeText(t.share_text(url)); push(t.share_done,"warn"); return; } }catch(e){}
    push(t.share_text(url),"warn");
  }

  function enter(){
    if(started) return;
    initAudio();
    crtPowerOn();
    countHit();
    visitorMemory();
    gate.classList.add("gone");
    setTimeout(()=>{ gate.style.display="none"; }, 650);
    run();
  }
  gateBtn.addEventListener("click", enter);
  window.addEventListener("keydown",(e)=>{ if(!started && !gate.classList.contains("gone") && (e.key==="Enter"||e.key===" ")){ e.preventDefault(); enter(); } });

})();
