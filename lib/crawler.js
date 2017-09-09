const puppeteer = require('puppeteer');

exports.crawler = async (url) => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url);
    const text = await page.plainText();
    const title = await page.title();
    browser.close();
    return { title, text };
  } catch (err) {
    browser.close();
    throw new Error('error');
  }
};
