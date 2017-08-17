const puppeteer = require('puppeteer');

(async() => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.yahoo.co.jp/');
  const text = await page.plainText();
  console.log(text);

  browser.close();
})();
