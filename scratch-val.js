const { chromium } = require("playwright-core");
(async () => {
  const exe = "/home/webteam/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
  const b = await chromium.launch({ executablePath: exe, args:["--no-sandbox"] });
  const p = await b.newPage({ viewport:{ width:1280, height:820 }, locale:"hu-HU", timezoneId:"Europe/Budapest" });
  const errs=[]; p.on("pageerror",e=>errs.push("PAGEERR: "+e.message)); p.on("console",m=>{ if(m.type()==="error") errs.push("CON: "+m.text()); });
  await p.goto("http://localhost:8099/index.html", { waitUntil:"networkidle" }).catch(()=>{});
  await p.waitForTimeout(1200);
  const info = await p.evaluate(()=>{
    const doors=Array.from(document.querySelectorAll("#doors .door"));
    return {
      count: doors.length,
      names: doors.map(d=>d.querySelector(".dname").textContent),
      mats: doors.map(d=>d.className.replace("door ","")),
      wings: doors.map(d=>d.getAttribute("data-wings")),
      guard: !!document.querySelector('.door.mat-gold .guardian.guard'),
      ghost: !!document.querySelector('.door.mat-stone .guardian.ghost'),
      hint: document.querySelector("#doors-hint").textContent,
    };
  });
  await p.screenshot({ path:"/home/webteam/projects/ki-vagy/scratch-doors.png" });
  // hover palace to see it open
  await p.hover('.door.mat-gold').catch(()=>{});
  await p.waitForTimeout(500);
  await p.screenshot({ path:"/home/webteam/projects/ki-vagy/scratch-hover.png" });
  // click crypt -> open sequence -> enter
  await p.click('.door.mat-stone');
  await p.waitForTimeout(2600);
  const after = await p.evaluate(()=>({
    gone: document.querySelector("#gate").classList.contains("gone"),
    outLines: document.querySelectorAll("#output .line").length,
    doorMem: localStorage.getItem("eber_door"),
  }));
  console.log(JSON.stringify({ info, after, errs }, null, 2));
  await b.close();
})().catch(e=>{ console.error(e); process.exit(1); });
