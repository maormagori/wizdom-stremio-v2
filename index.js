const config = require('config');
const addon = require('./server.js');
const logger = require('./common/logger');

const HOSTNAME = config.get('hostname');
const PORT = config.get('port');

addon.listen(PORT, function () {
  logger.debug(`Is production: ${config.get('isProduction')}`);
  logger.info(`Add-on Repository URL: ${HOSTNAME}:${PORT}/manifest.json`);
});
