require('newrelic');

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');

const index = require('./routes/index');
const articles = require('./routes/articles');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/api/articles', articles);

module.exports = app;

// clean zombie process
schedule.scheduleJob('* * * * 7', () => {
  process.exit(1);
});
