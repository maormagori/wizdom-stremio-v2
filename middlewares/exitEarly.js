const logger = require('../common/logger');
module.exports = (res) => {
  logger.debug('Exiting early with empty subtitles array.');
  res.json({ subtitles: [] });
};
