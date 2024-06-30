const logger = require('../common/logger');

function errorHandler(err, req, res) {
  logger.error(err, {
    description: 'Global errror occured',
    req: req.originalUrl,
  });
  res?.status?.(500)?.json?.({ error: 'Internal Server Error' });
}

module.exports = errorHandler;
