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
    const { message = '' } = e;
    if (/not opened/i.test(message) || /crash/i.test(message)) {
      res.redirect(`${process.env.BACKUP_HOST}/api/articles?url=${url}`);
    } else {
      res.status(422).json(e.message);
    }
  });
});

module.exports = router;
