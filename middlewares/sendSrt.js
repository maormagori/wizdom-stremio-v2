const { downloadSubZip } = require('../client/wizdom');
const unzipper = require('unzipper');
const logger = require('../common/logger');

function sendSrt(req, res, next) {
  const srtId = req.params?.id;

  if (!srtId) {
    return res.status(400).json({ error: 'Invalid srt ID' });
  }

  res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');

  const unzippedSrt = downloadSubZip(srtId).pipe(unzipper.ParseOne());

  unzippedSrt.on('error', (err) => {
    logger.error(err.message, {
      ktuvitTitleID: srtId,
      description: 'Error downloading SRT file.',
    });
    next(err);
  });

  unzippedSrt.pipe(res);
}

module.exports = sendSrt;
