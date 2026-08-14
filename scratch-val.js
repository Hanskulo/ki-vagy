const { chromium } = require("playwright-core");
(async () => {
  const exe = "/home/webteam/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
  const b = await chromium.launch({ executablePath: exe, args:["--no-sandbox","--autoplay-policy=no-user-gesture-required"] });
  const p = await b.newPage({ viewport:{ width:1280, height:820 }, locale:"hu-HU", timezoneId:"Europe/Budapest" });
  const errs=[]; p.on("pageerror",e=>errs.push("PAGEERR: "+e.message));
  await p.goto("http://localhost:8099/index.html", { waitUntil:"networkidle" }).catch(()=>{});
  await p.waitForTimeout(1200);
  const v = await p.evaluate(()=>{
    const el=document.querySelector("#intro-vid");
    return { introPresent: !!document.querySelector("#intro"), vidReady: el?el.readyState:-1, vidSrc: el&&el.currentSrc };
  });
  await p.screenshot({ path:"/home/webteam/projects/ki-vagy/scratch-intro.png" });
  // wait past safety timeout
  await p.waitForTimeout(6500);
  const after = await p.evaluate(()=>({
    introGone: document.querySelector("#intro").classList.contains("gone"),
    doors: document.querySelectorAll("#doors .door").length,
  }));
  console.log(JSON.stringify({ v, after, errs }, null, 2));
  await b.close();
})().catch(e=>{ console.error(e); process.exit(1); });
