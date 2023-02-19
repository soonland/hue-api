const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'debug',
  format: format.combine(format.colorize(), format.timestamp(), format.simple()),
  transports: [new transports.Console()],
});

module.exports = () => logger.child();
// module.exports = (parOrigin) => logger.child({ origin: parOrigin });
