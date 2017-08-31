const puppeteer = require('puppeteer');

const makeRequest = async() => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto('https://www.yahoo.co.jp/');
    const text = await page.plainText();
    console.log(text);
  } catch(err) {
    console.log(err);
  } finally {
    browser.close();
  }
};

makeRequest();
