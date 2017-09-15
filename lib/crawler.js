const puppeteer = require('puppeteer');

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
      await page.close();
    }
  }
}

let browser = null;

async function createBrowser() {
  const b = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  return b;
}

const clear = (e) => {
  const { m = '' } = e;
  if ((/not opened/i.test(m) || /crash/i.test(m)) && browser) {
    try {
      browser.close();
      browser = null;
    } catch (err) {
      browser = null;
    }
  }
  throw e;
};

const render = (url) => {
  if (browser) {
    return renderByBrowser(browser, url).catch(clear);
  }
  return createBrowser()
    .then((b) => {
      browser = b;
      return renderByBrowser(browser, url).catch(clear);
    })
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
};

exports.render = render;
