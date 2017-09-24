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
    const backup = process.env.BACKUP_HOST;
    if (backup) {
      res.redirect(`${process.env.BACKUP_HOST}/api/articles?url=${url}`);
    } else {
      res.status(422).json(message);
    }
  });
});

module.exports = router;
