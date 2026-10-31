import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { chromium } from 'playwright';

const root = new URL('../dist/', import.meta.url).pathname;
const mime = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml' };
const server = createServer(async (req,res) => {
  try {
    const path = join(root, decodeURIComponent(req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0]));
    const content = await readFile(path);
    res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' });
    res.end(content);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
const base = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
try {
  const page = await browser.newPage({ viewport: {width: 1280,height: 800} });
  await page.goto(base);
  await page.locator('.architecture-diagram').waitFor();
  const diagram = page.locator('.arch-progress');
  const before = await diagram.evaluate(el => getComputedStyle(el).transform);
  await page.locator('#architecture-island').scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(250);
  const after = await diagram.evaluate(el => getComputedStyle(el).transform);
  if (before === after) throw new Error(`scroll animation unchanged: ${before}`);
  await page.goto(base+'#principles');
  if (await page.locator('#principles').count() !== 1) throw new Error('principles anchor missing');
  await page.reload();
  if (await page.locator('.architecture-diagram').count() !== 1) throw new Error('diagram missing on reload');
  const mobile = await browser.newPage({ viewport: {width:390,height:844}, reducedMotion:'reduce' });
  await mobile.goto(base);
  await mobile.locator('.architecture-diagram').waitFor();
  const widths = await mobile.evaluate(() => ({inner:innerWidth,scroll:document.documentElement.scrollWidth}));
  if (widths.scroll > widths.inner) throw new Error(`mobile overflow: ${JSON.stringify(widths)}`);
  const reduced = await mobile.locator('.arch-progress').evaluate(el => getComputedStyle(el).transform);
  const noJs = await browser.newPage({ javaScriptEnabled:false, viewport:{width:390,height:844} });
  await noJs.goto(base);
  if (!(await noJs.locator('.fallback-diagram').isVisible())) throw new Error('no-JS architecture fallback missing');
  console.log(JSON.stringify({scrollChanged:true,principlesLink:true,mobileNoOverflow:true,reducedMotionTransform:reduced,noJsFallback:true}));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
