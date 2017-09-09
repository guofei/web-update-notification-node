const express = require('express');
const { crawler } = require('../lib/crawler');

const router = express.Router();

router.get('/', (req, res) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ message: 'invalid' });
    return;
  }
  crawler(url).then((data) => {
    res.json(data);
  }).catch(() => {
    res.status(400).json({ message: 'Problems parsing Article' });
  });
});

module.exports = router;
