const puppeteer = require('puppeteer');
const { logger } = require('./logger');

process.setMaxListeners(Infinity);

async function renderByBrowser(browser, url) {
  try {
    const page = await browser.newPage();
    await page.goto(url, { timeout: 60000 });
    const text = await page.plainText();
    const title = await page.title();
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

const render = url => createBrowser().then(b => renderByBrowser(b, url));

exports.render = render;
