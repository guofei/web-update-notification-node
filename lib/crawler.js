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
        await page.close();
      } catch (e) {
        logger.info(e.message);
      }
    }
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
    logger.info('exit');
    process.exit(1);
  }
  return null;
}

let browser = null;
createBrowser()
  .then((b) => {
    browser = b;
  })
  .catch((e) => {
    logger.info(e.message);
  });

const clear = (e) => {
  if (!browser) {
    throw e;
  }
  const { message = '' } = e;
  if (/not opened/i.test(message) || /crash/i.test(message)) {
    logger.info(message);
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
  logger.info('create browser');
  return createBrowser().then((b) => {
    browser = b;
    return renderByBrowser(browser, url).catch(clear);
  });
};

exports.render = render;
