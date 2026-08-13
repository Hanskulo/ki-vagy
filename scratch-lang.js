const { chromium } = require("playwright-core");
(async () => {
  const exe = "/home/webteam/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
  const b = await chromium.launch({ executablePath: exe, args:["--no-sandbox"] });
  for (const loc of ["hu-HU","de-DE","en-US"]) {
    const p = await b.newPage({ viewport:{ width:1200, height:800 }, locale:loc });
    const errs=[]; p.on("pageerror",e=>errs.push(e.message));
    await p.goto("http://localhost:8099/index.html", { waitUntil:"networkidle" }).catch(()=>{});
    await p.waitForTimeout(5000);
    const r = await p.evaluate(()=>{
      const top=Array.from(document.querySelectorAll("#ticker-track .ti")).map(x=>x.textContent);
      return { htmlLang:document.documentElement.lang, topLbl:document.querySelector("#ticker-label").textContent,
        top: top.slice(0,3), n:top.length,
        artifacts: top.some(t=>/&nbsp;|­|​/.test(t)) };
    });
    console.log(loc, "html:"+r.htmlLang, "n="+r.n, "artifacts:"+r.artifacts, "errs:"+errs.length);
    r.top.forEach(t=>console.log("    "+t));
    await p.close();
  }
  await b.close();
})().catch(e=>{ console.error(e); process.exit(1); });
