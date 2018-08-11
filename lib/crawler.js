const puppeteer = require('puppeteer');
const { logger } = require('./logger');

process.setMaxListeners(Infinity);

const isContinue = (resourceType) => {
  if (resourceType === 'document' ||
      resourceType === 'script' ||
      resourceType === 'xhr' ||
      resourceType === 'fetch' ||
      resourceType === 'eventsource' ||
      resourceType === 'manifest') {
    return true;
  }
  return false;
};

async function renderByBrowser(browser, url, timeout = 10000) {
  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (isContinue(request.resourceType())) {
        request.continue();
      } else {
        request.abort();
      }
    });
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.waitFor(timeout);
    const title = await page.title();
    const text = await page.evaluate(() => document.body.innerText);
    return { title, text };
  } catch (err) {
    throw err;
  } finally {
    await browser.close();
  }
}

async function createBrowser() {
  try {
    const b = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
      ],
    });
    return b;
  } catch (e) {
    logger.info(e.message);
  }
  return null;
}

async function render(url) {
  const b = await createBrowser();
  return renderByBrowser(b, url);
}

exports.render = render;
