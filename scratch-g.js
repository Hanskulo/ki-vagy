const { chromium } = require("playwright-core");
(async () => {
  const exe = "/home/webteam/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
  const b = await chromium.launch({ executablePath: exe, args:["--no-sandbox"] });
  // desktop
  const p = await b.newPage({ viewport:{ width:1280, height:820 }, locale:"hu-HU", timezoneId:"Europe/Budapest" });
  const errs=[]; p.on("pageerror",e=>errs.push(e.message));
  await p.goto("http://localhost:8099/index.html",{waitUntil:"domcontentloaded"});
  await p.evaluate(()=>{const i=document.querySelector("#intro");if(i){i.classList.add("gone");i.style.display="none";}});
  await p.waitForTimeout(4500);
  const gh = await p.evaluate(()=>{ const f=document.querySelector(".pfig"); const r=f?f.getBoundingClientRect():null; const d=document.querySelector(".dstage").getBoundingClientRect(); return { guardH:r?Math.round(r.height):0, doorH:Math.round(d.height), left:f?f.style.left:null }; });
  await p.screenshot({ path:"scratch-gd.png" });
  await p.close();
  // mobile portrait
  const m = await b.newPage({ viewport:{ width:384, height:832 }, locale:"hu-HU", isMobile:true });
  await m.goto("http://localhost:8099/index.html",{waitUntil:"domcontentloaded"});
  await m.evaluate(()=>{const i=document.querySelector("#intro");if(i){i.classList.add("gone");i.style.display="none";}});
  await m.waitForTimeout(3000);
  await m.screenshot({ path:"scratch-gm.png", fullPage:false });
  console.log(JSON.stringify({ gh, errs }));
  await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
