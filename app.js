const compression = require('compression');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const texts = require('./routes/texts');
const health = require('./routes/health');

const app = express();
app.use(compression());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/api/texts', texts);
app.use('/healthz', health);

module.exports = app;
