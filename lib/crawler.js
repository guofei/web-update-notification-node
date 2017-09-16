const puppeteer = require('puppeteer');
const { logger } = require('./logger');

async function renderByBrowser(browser, url) {
  let page = null;
  try {
    page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    const text = await page.plainText();
    const title = await page.title();
    return { title, text };
  } catch (err) {
    throw err;
  } finally {
    if (page) {
      try {
        await browser.close();
      } catch (e) {
        logger.info(e.message);
      }
    }
  }
}

async function createBrowser() {
  const b = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
    ],
  });
  return b;
}

const render = (url) => {
  const res = createBrowser()
    .then(b => renderByBrowser(b, url))
    .catch((e) => {
      const { message = '' } = e;
      if (/not opened/i.test(message) || /crash/i.test(message)) {
        logger.info(message);
      }
      throw e;
    });
  return res;
};

exports.render = render;
