const puppeteer = require('puppeteer');

async function render(browser, url) {
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
      await page.close();
    }
  }
}

async function createBrowser() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  return browser;
}

exports.render = render;
exports.createBrowser = createBrowser;
