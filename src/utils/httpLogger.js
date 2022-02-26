const expressWinston = require('express-winston');
const { format, transports } = require('winston');

module.exports = (logger) =>
  expressWinston.logger({
    winstonInstance: logger,
    level: 'http',
    transports: [new transports.Console({ prettyPrint: true })],
    format: format.combine(format.colorize(), format.json()),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
    ignoreRoute() {
      return false;
    }, // optional: allows to skip some log messages based on request and/or response,
  });
