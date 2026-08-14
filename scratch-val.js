const { chromium } = require("playwright-core");
(async () => {
  const exe = "/home/webteam/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
  const b = await chromium.launch({ executablePath: exe, args:["--no-sandbox"] });
  const p = await b.newPage({ viewport:{ width:1280, height:820 }, locale:"hu-HU", timezoneId:"Europe/Budapest" });
  const errs=[]; p.on("pageerror",e=>errs.push("PAGEERR: "+e.message));
  await p.goto("http://localhost:8099/index.html", { waitUntil:"domcontentloaded" }).catch(()=>{});
  await p.evaluate(()=>{ const i=document.querySelector('#intro'); if(i){i.classList.add('gone'); i.style.display='none';} }).catch(()=>{});
  await p.waitForTimeout(700);
  const info = await p.evaluate(()=>{
    const doors=Array.from(document.querySelectorAll("#doors .door"));
    return {
      count: doors.length,
      names: doors.map(d=>d.querySelector(".dname").textContent),
      open: doors.map(d=>d.getAttribute("data-open")),
      reveal: doors.map(d=>d.getAttribute("data-reveal")),
      curtain: !!document.querySelector(".door.mat-curtain"),
      guard: !!document.querySelector('.door.mat-gold .guardian.guard'),
      ghost: !!document.querySelector('.door.mat-stone .guardian.ghost'),
    };
  });
  // crypt click -> bats spawn
  await p.click('.door.mat-stone');
  await p.waitForTimeout(400);
  const bats = await p.evaluate(()=>document.querySelectorAll('.door.mat-stone .bat').length);
  await p.screenshot({ path:"/home/webteam/projects/ki-vagy/scratch-crypt.png" });
  await b.close();
  // separate: saloon -> streamhub redirect
  const b2 = await chromium.launch({ executablePath: exe, args:["--no-sandbox"] });
  const p2 = await b2.newPage({ viewport:{ width:1280, height:820 } });
  await p2.goto("http://localhost:8099/index.html", { waitUntil:"domcontentloaded" }).catch(()=>{});
  await p2.evaluate(()=>{ const i=document.querySelector('#intro'); if(i){i.classList.add('gone'); i.style.display='none';} }).catch(()=>{});
  await p2.waitForTimeout(600);
  await p2.click('.door.mat-wood');
  await p2.waitForTimeout(2800);
  const url = p2.url();
  await b2.close();
  console.log(JSON.stringify({ info, bats, redirectedTo:url, errs }, null, 2));
})().catch(e=>{ console.error(e); process.exit(1); });
