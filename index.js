const express = require('express');
const config = require('./config');
const cors = require('cors');
const { getSubs, downloadSubZip } = require('./wizdom');
const landing = require('./landingTemplate');
const unzipper = require('unzipper');
const morganBody = require('morgan-body');
const logger = require('./logger');
const requestId = require('express-request-id');

const addon = express();
addon.use(cors());
addon.use(requestId({ setHeader: false }));

// Setting up the logger
morganBody(addon, {
  prettify: false,
  timezone: 'Israel',
  logRequestBody: false,
  stream: config.remoteLogging ? logger : null,
  noColors: true,
  includeNewLine: false,
  logIP: true,
  logRequestId: true,
  skip: (req) => {
    return !req.path.includes('subtitles');
  },
});

/**
 * The addon manifest: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/manifest.md
 */
const manifest = {
  id: 'xyz.stremio.wizdom',
  contactEmail: 'maor@magori.online',
  version: process.env.npm_package_version,
  catalogs: [],
  resources: ['subtitles'],
  types: ['movie', 'series'],
  name: 'Wizdom Subtitles',
  description:
    'An unofficial Stremio addon for Hebrew subtitles from wizdom.xyz. Developed by Maor Development',
  logo: 'https://i.ibb.co/KLYK0TH/wizdon256.png',
};

/**
 * Adds simple headers to a response.
 * @param {import("superagent").Response} res 	The request's response object
 * @param {*} data 		The data to respond with.
 */
const respondWithHeaders = function (res, data) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
};

//manifest request.
addon.get('/manifest.json', function (req, res) {
  respondWithHeaders(res, manifest);
});

//Landing page request.
addon.get('/', function (req, res) {
  res.set('Content-Type', 'text/html');
  res.send(landing(manifest));
});

//Addon's readme request
addon.get('/README.md', (req, res) => {
  res.sendFile(`${__dirname}/README.md`);
});

//Subtitles request.
addon.get('/subtitles/:type/:imdbId/:query?.json', async (req, res) => {
  try {
    let filename;
    if (req.params.query) filename = req.params.query.split('=').pop();

    const subtitles = await getSubs(req.params.imdbId, filename);
    respondWithHeaders(res, { subtitles: subtitles });
  } catch (err) {
    console.error('get subs error: ', err);
  }
});

/**
 * unzips Wizdom zip files and send the srt file in it.
 */
addon.get('/srt/:id.srt', (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
    downloadSubZip(req.params.id).pipe(unzipper.ParseOne()).pipe(res);
  } catch (err) {
    console.error('error occurred while sending unzipped srt file: ', err);
  }
});

//Starting the addon
addon.listen(config.port, function () {
  console.log(config);
  console.log(`Add-on Repository URL: ${config.local}/manifest.json`);
});
