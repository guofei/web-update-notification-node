const express = require('express');
const { render } = require('../lib/crawler');
const { logger } = require('../lib/logger');

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
    const { message = '' } = e;
    logger.info(message);
    res.status(422).json(message);
  });
});

module.exports = router;
