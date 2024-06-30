const express = require('express');
const cors = require('cors');
const { downloadSubZip } = require('./client/wizdom');
const landing = require('./middlewares/landingTemplate');
const extractTitle = require('./middlewares/extractTitle');
const unzipper = require('unzipper');
const manifest = require('./data/manifest');
const mapToStremioSubs = require('./middlewares/sendMappedSubs');
const getWizdomSubs = require('./middlewares/getWizdomSubs');
const logger = require('./common/logger');
const errorHandler = require('./middlewares/errorMiddleware');

const addon = express();
addon.use(cors());

//Landing page request.
addon.get('/', landing);

//manifest request.
addon.get('/manifest.json', function (req, res) {
  res.send(manifest);
});

//Addon's readme request
addon.get('/README.md', (req, res) => {
  res.sendFile(`${__dirname}/README.md`);
});

//Subtitles request.
addon.get('/subtitles/:type/:imdbId/:query?.json', [
  extractTitle,
  getWizdomSubs,
  mapToStremioSubs,
]);

/**
 * unzips Wizdom zip files and send the srt file in it.
 */
addon.get('/srt/:id.srt', (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
    downloadSubZip(req.params.id).pipe(unzipper.ParseOne()).pipe(res);
  } catch (err) {
    logger.error(err, {
      ktuvitTitleID: req.params.id,
      description: 'Error downloading SRT file.',
    });
  }
});

addon.use(errorHandler);

module.exports = addon;
