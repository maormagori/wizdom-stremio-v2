const exitEarlyWithEmptySubtitlesArray = require('./exitEarly');
const logger = require('../common/logger');

const VALID_IMDB_ID = /^tt\d{7,9}$/;

const deconstructImdbId = (imdbParam) => {
  return imdbParam.split(':');
};

const extractExtraArgs = (query) => {
  if (!query) {
    return {};
  }

  const extraArgs = {};
  for (const arg of query.split('&')) {
    const [key, value] = arg.split('=');
    extraArgs[key] = value;
  }

  return extraArgs;
};

function extractTitle(req, res, next) {
  const type = req.params.type;
  const [imdbID, season, episode] = deconstructImdbId(req.params.imdbId);

  if (!VALID_IMDB_ID.test(imdbID)) {
    exitEarlyWithEmptySubtitlesArray(res);
    logger.debug('Invalid imdb ID', { imdbID });
    return;
  }

  const extraArgs = extractExtraArgs(req.params?.query);

  req.title = { type, imdbID, season, episode, ...extraArgs };

  next();
}

module.exports = extractTitle;
