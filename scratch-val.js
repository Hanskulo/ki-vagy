const { chromium } = require("playwright-core");
(async () => {
  const exe = "/home/webteam/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
  const b = await chromium.launch({ executablePath: exe, args:["--no-sandbox"] });
  const p = await b.newPage({ viewport:{ width:1280, height:820 }, locale:"hu-HU", timezoneId:"Europe/Budapest" });
  const errs=[]; p.on("pageerror",e=>errs.push("PAGEERR: "+e.message));
  await p.goto("http://localhost:8099/index.html", { waitUntil:"domcontentloaded" }).catch(()=>{});
  await p.evaluate(()=>{ const i=document.querySelector('#intro'); if(i){i.classList.add('gone'); i.style.display='none';} }).catch(()=>{});
  await p.waitForTimeout(700);
  await p.click('.door.mat-gold'); // palace, no redirect
  await p.waitForTimeout(4200); // door open 2.2s + windows + typing
  const info = await p.evaluate(()=>{
    const wins=Array.from(document.querySelectorAll("#windows .termwin"));
    return {
      count: wins.length,
      titles: wins.map(w=>w.querySelector(".tw-title").textContent),
      bodyLens: wins.map(w=>w.querySelector(".tw-body").textContent.length),
      sample: wins.map(w=>w.querySelector(".tw-body").textContent.slice(0,60)),
      entered: !document.querySelector("#gate").classList.contains("gone")===false,
    };
  });
  await p.screenshot({ path:"/home/webteam/projects/ki-vagy/scratch-win.png" });
  console.log(JSON.stringify({ info, errs }, null, 2));
  await b.close();
})().catch(e=>{ console.error(e); process.exit(1); });
