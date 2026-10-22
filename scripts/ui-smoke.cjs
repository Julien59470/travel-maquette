#!/usr/bin/env node
/**
 * Browser smoke tests against the actual GitHub Pages artifact.
 * Runs only during CI. It does not modify production files.
 */
const { chromium } = require('playwright-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '_site');
const allowed = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp'};
const pages = ['index.html','amerique.html','europe.html','concept.html','methode.html','prestations.html','faq.html','contact.html'];
const devices = [
  {name:'small-phone',width:320,height:700,isMobile:true,deviceScaleFactor:1},
  {name:'mobile',width:375,height:812,isMobile:true,deviceScaleFactor:1},
  {name:'large-phone',width:430,height:932,isMobile:true,deviceScaleFactor:1},
  {name:'tablet',width:768,height:1024,isMobile:true,deviceScaleFactor:1},
  {name:'laptop',width:1024,height:768,deviceScaleFactor:1},
  {name:'desktop',width:1440,height:900,deviceScaleFactor:1},
  {name:'wide-desktop',width:1920,height:1080,deviceScaleFactor:1}
];
const chromeCandidates = [
  process.env.CHROME_BIN,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/opt/google/chrome/chrome'
].filter(Boolean);
const browserExecutable = chromeCandidates.find(p => fs.existsSync(p));
if (!browserExecutable) {
  console.log('No system Chrome binary available; static validations remain mandatory.');
  process.exit(0);
}
const shots = path.resolve(root,'..','ui-screenshots');
fs.mkdirSync(shots,{recursive:true});
const server = http.createServer((req,res) => {
  const resource = decodeURIComponent((req.url || '/').split('?')[0]);
  const relative = resource === '/' ? 'index.html' : resource.replace(/^\/+/, '');
  const full = path.resolve(root,relative);
  if(!full.startsWith(root+path.sep) && full !== path.join(root,'index.html')) {
    res.writeHead(403).end();return;
  }
  fs.readFile(full,(err,body) => {
    if(err){res.writeHead(404).end('Not found');return;}
    res.writeHead(200,{'Content-Type':allowed[path.extname(full)] || 'application/octet-stream','Cache-Control':'no-store'}).end(body);
  });
});
(async () => {
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port = server.address().port;
  const browser = await chromium.launch({headless:true,executablePath:browserExecutable,args:['--no-sandbox','--disable-gpu']});
  let checked=0;
  try {
    for(const device of devices){
      const context=await browser.newContext({viewport:{width:device.width,height:device.height},isMobile:!!device.isMobile,deviceScaleFactor:device.deviceScaleFactor || 1,reducedMotion:'reduce'});
      for(const name of pages){
        const page=await context.newPage();
        const errors=[];
        page.on('pageerror',err=>errors.push(err.message));
        const response=await page.goto('http://127.0.0.1:'+port+'/'+name,{waitUntil:'domcontentloaded',timeout:25000});
        if(response.status()!==200)throw Error(name+' '+device.name+' returned '+response.status());
        await Promise.race([page.evaluate(() => document.fonts.ready),page.waitForTimeout(1500)]);
        await page.waitForTimeout(110);
        const state=await page.evaluate(()=>{
          const h1=document.querySelector('h1');
          const header=document.querySelector('.page-header');
          const cta=[...document.querySelectorAll('a')].filter(a=>(a.getAttribute('href')||'').startsWith('contact.html'));
          return {
            title:document.title,
            h1:h1?.innerText.trim(),h1rect:h1?.getBoundingClientRect().toJSON(),
            headRect:header?.getBoundingClientRect().toJSON(),
            scrollWidth:document.documentElement.scrollWidth,
            clientWidth:document.documentElement.clientWidth,
            ctaCount:cta.length,
            modernFont:!!document.querySelector('link[href*="Plus+Jakarta+Sans"]'),
            css:!!document.querySelector('link[href="modern.css"]')
          };
        });
        if(!state.h1 || !state.h1rect || state.h1rect.width<10)throw Error(name+': missing visible heading');
        if(state.scrollWidth>state.clientWidth+3){
          const offenders = await page.evaluate(() => [...document.querySelectorAll('body *')]
            .map(e=>({tag:e.tagName,cls:String(e.className || '').slice(0,90),text:(e.textContent||'').trim().slice(0,50),r:e.getBoundingClientRect().right,l:e.getBoundingClientRect().left}))
            .filter(x=>x.r>document.documentElement.clientWidth+3 || x.l < -3)
            .sort((a,b)=>b.r-a.r).slice(0,16));
          console.error('Overflow offenders',JSON.stringify(offenders,null,2));
          throw Error(name+' '+device.name+': horizontal overflow '+state.scrollWidth+'>'+state.clientWidth);
        }
        // Assertions against every comparable group; catch visual regressions
        // even when no document-level horizontal overflow occurs.
        const groups = [
          '.home-destination-grid > .home-destination-card',
          '.regions-cards > .region-card',
          '.regions-cards .region-image',
          '.home-steps-grid > .home-step',
          '.feature-grid > .feature',
          '.timeline > .timeline-item',
          '.europe-mood-grid > .europe-mood',
          '.europe-mood-grid > .europe-mood > img'
        ];
        const geometry = await page.evaluate(selectors => selectors
          .map(selector => ({
            selector,
            rects:[...document.querySelectorAll(selector)].map(element => {
              const r=element.getBoundingClientRect();
              return {x:r.x,y:r.y,width:r.width,height:r.height,
                marginTop:parseFloat(getComputedStyle(element).marginTop)||0};
            })
          })).filter(row=>row.rects.length>1),groups);
        for(const group of geometry){
          const {rects,selector}=group;
          const x=rects[0];
          const tolerance=3;
          const singleRow=device.width>650;
          for(const r of rects.slice(1)){
            const label=name+' '+device.name+' '+selector+' '+JSON.stringify(rects);
            if(Math.abs(r.width-x.width)>tolerance)throw Error('Card width mismatch: '+label);
            if(singleRow && Math.abs(r.y-x.y)>tolerance)throw Error('Staggered card top: '+label);
            if(Math.abs(r.height-x.height)>tolerance)throw Error('Card/image height mismatch: '+label);
          }
        }
        if(name==='index.html'){
          const anchor=page.locator('.home-hero-actions a[href="#destinations"]');
          if(await anchor.count()){
            await anchor.click();
            const anchored=await page.evaluate(()=>{
              const section=document.querySelector('#destinations');
              const header=document.querySelector('.page-header');
              return {top:section.getBoundingClientRect().top,
                headerHeight:header.getBoundingClientRect().height};
            });
            if(anchored.top<anchored.headerHeight-3){
              throw Error('Anchor heading hidden behind navigation: '+JSON.stringify(anchored));
            }
            await page.evaluate(()=>window.scrollTo(0,0));
          }
        }

        if(!state.ctaCount)throw Error(name+' '+device.name+': missing contact CTA');
        if(!state.modernFont || !state.css)throw Error(name+': missing font/theme');
        if(errors.length)throw Error(name+' '+device.name+': JS errors '+errors.join('; '));
        if((['index.html','amerique.html','europe.html','contact.html'].includes(name)) && (['mobile','tablet','desktop','wide-desktop'].includes(device.name))){
          await page.screenshot({path:path.join(shots,device.name+'-'+name+'.png'),fullPage:true,animations:'disabled'});
        }
        if(name==='contact.html' && device.name==='mobile'){
          await page.goto('http://127.0.0.1:'+port+'/contact.html?destination=europe',{waitUntil:'domcontentloaded'});
          const selected=await page.locator('select[name=destination]').inputValue();
          if(selected!=='europe')throw Error('Contact destination query parameter not respected');
        }
        checked++;
        await page.close();
      }
      await context.close();
    }
    console.log('Browser OK: '+checked+' render checks (8 pages × '+devices.length+' viewports), aligned equal-height cards and images, anchors, no overflow, h1/CTA/JS verified.');
  }finally{await browser.close();server.close();}
})().catch(err=>{console.error(err);server.close();process.exitCode=1;});
