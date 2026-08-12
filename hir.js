/* EBER // akta -- teljes cikk a kozos news-data.js-bol, valos ideju kliens-csavarral.
   Nincs backend, nincs naplo. Minden a latogato gepen fut. Marveen-csapat, 2026. */
(() => {
  "use strict";
  const $ = (s)=>document.querySelector(s);
  const qs = new URLSearchParams(location.search);
  let lang = (qs.get("lang")||"").toLowerCase();
  if(!["hu","en","de"].includes(lang)){ const n=(navigator.language||"en").toLowerCase(); lang=n.startsWith("hu")?"hu":n.startsWith("de")?"de":"en"; }
  document.documentElement.lang = lang;
  let id = parseInt(qs.get("id"),10); if(!(id>=1)) id=1;

  const DATA = (window.EBER_NEWS && window.EBER_NEWS[lang]) ? window.EBER_NEWS[lang] : null;

  /* ---- kliens jelek ---- */
  function safe(fn,d){ try{ const v=fn(); return (v==null||v==="")?d:v; }catch(e){ return d; } }
  function os(){ const u=navigator.userAgent||""; if(/Windows NT 10/.test(u))return"Windows 10/11"; if(/Windows/.test(u))return"Windows"; if(/Mac OS X/.test(u))return"macOS"; if(/Android/.test(u))return"Android"; if(/(iPhone|iPad|iPod)/.test(u))return"iOS"; if(/Linux/.test(u))return"Linux"; return"ismeretlen"; }
  function clock(){ const d=new Date(); return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"); }
  const sig = {
    tz: safe(()=>Intl.DateTimeFormat().resolvedOptions().timeZone,"?"),
    res: safe(()=>screen.width,"?")+"x"+safe(()=>screen.height,"?"),
    lang: navigator.language||"?", os: os(), clock: clock(),
  };
  let points=0;
  [navigator.userAgent,navigator.language,screen.width,screen.colorDepth,navigator.hardwareConcurrency,
   navigator.deviceMemory,sig.tz,navigator.maxTouchPoints,navigator.platform,screen.pixelDepth,
   navigator.vendor,window.devicePixelRatio].forEach(v=>{ if(v!=null&&v!=="") points++; });
  points = 40 + points*3 + sig.res.length;
  function hashNum(){ const s=[navigator.userAgent,sig.tz,sig.res,navigator.language].join("|"); let h=0; for(let i=0;i<s.length;i++){ h=(h*31+s.charCodeAt(i))>>>0; } return h; }
  const fileNo = (hashNum()%9000000+1000000);
  const today = new Date().toLocaleDateString(lang==="hu"?"hu-HU":lang==="de"?"de-DE":"en-GB",{year:"numeric",month:"long",day:"numeric"});

  const UI = {
    hu:{meta:"MEGFIGYELESI AKTA", live:"elo megfigyeles", more:"tovabbi aktak", back:"← vissza a terminalhoz", byl:(k)=>`EBER // ${k} · ${today}`},
    en:{meta:"SURVEILLANCE FILE", live:"live observation", more:"more files", back:"← back to the terminal", byl:(k)=>`EBER // ${k} · ${today}`},
    de:{meta:"UEBERWACHUNGSAKTE", live:"live-beobachtung", more:"weitere akten", back:"← zurueck zum terminal", byl:(k)=>`EBER // ${k} · ${today}`},
  }[lang];

  function esc(s){ return String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])); }
  function mark(s){ return esc(s).replace(/\{([^{}]*)\}/g,(_,g)=>`<b>${g}</b>`); }

  if(!DATA){ $("#headline").textContent="akta nem elerheto"; return; }
  const items = DATA.items || [];
  const bank = DATA.bank || [];
  const gb = DATA.genbody;
  const bi = parseInt(qs.get("b"),10);
  const isBank = qs.has("b") && bank.length && bi>=0;
  let art, bodyParas;
  if(isBank){
    art = bank[Math.min(bi, bank.length-1)];
    bodyParas = [];
    if(gb){
      bodyParas.push(gb.lead(art.h));
      const m1=gb.mid[fileNo % gb.mid.length], m2=gb.mid[(fileNo+2) % gb.mid.length];
      bodyParas.push(m1); if(m2!==m1) bodyParas.push(m2);
      bodyParas.push(gb.close[fileNo % gb.close.length]);
    } else { bodyParas = [art.h]; }
  } else {
    const idx = Math.min(Math.max(id,1), items.length) - 1;
    art = items[idx]; bodyParas = art.b;
  }
  const catLabel = (DATA.cat && DATA.cat[art.cat]) ? DATA.cat[art.cat] : "akta";

  document.title = art.h.slice(0,48) + " // EBER";
  $("#mast-meta").textContent = UI.meta;
  $("#kicker").textContent = catLabel;
  $("#headline").textContent = art.h;
  $("#byline").textContent = UI.byl(catLabel.toLowerCase());
  const body = $("#body");
  bodyParas.forEach((p,i)=>{ const el=document.createElement("p"); if(i===0) el.className="lead drop"; el.textContent=p; body.appendChild(el); });

  // live csavar -- a kozos sablonokbol, determinisztikus valasztas a fileNo alapjan
  const lv = DATA.live[fileNo % DATA.live.length];
  $("#live-h").textContent = UI.live;
  $("#live-body").innerHTML = mark(lv(sig, points, fileNo)) + " ";
  $("#live").hidden = false;

  // tovabbi aktak -- items + bank kevert, 4 db, az aktualist kizarva
  $("#more-h").textContent = UI.more;
  const more = $("#more");
  const curHref = isBank ? `hir.html?b=${bi}&lang=${lang}` : `hir.html?id=${id}&lang=${lang}`;
  const pool = [];
  items.forEach((it,i)=>pool.push({href:`hir.html?id=${i+1}&lang=${lang}`, h:it.h}));
  bank.forEach((it,i)=>pool.push({href:`hir.html?b=${i}&lang=${lang}`, h:it.h}));
  const pool2 = pool.filter(p=>p.href!==curHref);
  for(let i=pool2.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=pool2[i]; pool2[i]=pool2[j]; pool2[j]=t; }
  pool2.slice(0,4).forEach(p=>{ const a=document.createElement("a"); a.href=p.href; a.textContent=p.h; more.appendChild(a); });

  const back=$("#back"); back.textContent=UI.back; back.href=`./?lang=${lang}`;
})();
