const puppeteer = require('puppeteer');
const log4js = require('log4js');

log4js.configure({
  appenders: { system: { type: 'dateFile', filename: `${process.env.PWD}/tmp/logs/system.log` } },
  categories: { default: { appenders: ['system'], level: 'info' } },
});

const logger = log4js.getLogger('system');

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
  try {
    const b = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
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

const clear = (e) => {
  const { m = '' } = e;
  if (!browser) {
    throw e;
  }
  if (/not opened/i.test(m) || /crash/i.test(m)) {
    logger.info(m);
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
