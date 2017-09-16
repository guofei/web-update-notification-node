const log4js = require('log4js');
const log4jsExtend = require('log4js-extend');

log4js.configure({
  appenders: { system: { type: 'dateFile', filename: `${process.env.PWD}/tmp/logs/system.log` } },
  categories: { default: { appenders: ['system'], level: 'info' } },
});

log4jsExtend(log4js, {
  path: __dirname,
  format: 'at @name (@file:@line:@column)',
});


const logger = log4js.getLogger('system');

exports.logger = logger;
