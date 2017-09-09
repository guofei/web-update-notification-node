const express = require('express');
const { createBrowser, render } = require('../lib/crawler');

let browser = null;
createBrowser().then((b) => { browser = b; });

const router = express.Router();

router.get('/', (req, res) => {
  const { url } = req.query;
  if (!url || !browser) {
    res.status(400).json({ message: 'invalid' });
    return;
  }
  render(browser, url).then((data) => {
    res.json(data);
  }).catch(() => {
    res.status(400).json({ message: 'Problems parsing Article' });
  });
});

module.exports = router;
