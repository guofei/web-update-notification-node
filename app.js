const express = require('express');
const util = require('util');
const { crawler } = require('./lib/page.js');

const app = express();

app.post('/', (req, res) => {
  res.send({ hello: 'world' });
});

app.listen(3000, () => {
  console.log(util.inspect(crawler));
  crawler('http://www.yahoo.co.jp');
  console.log('Example app listening on port 3000!');
});
