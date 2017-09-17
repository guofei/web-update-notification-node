const express = require('express');
const { render } = require('../lib/crawler');

const router = express.Router();

router.get('/', (req, res) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ message: 'invalid' });
    return;
  }
  render(url).then((data) => {
    res.json(data);
  }).catch((e) => {
    res.status(400).json(e.message);
  });
});

module.exports = router;
