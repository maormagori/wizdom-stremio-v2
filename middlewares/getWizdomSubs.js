const exitEarlyWithEmptySubtitlesArray = require('./exitEarly');
const { fetchSubsFromWizdom } = require('../client/wizdom');
const sortSubs = require('../util/sortSubs');

async function getWizdomSubs(req, res, next) {
  if (!req.title || !req.title.imdbID) {
    exitEarlyWithEmptySubtitlesArray(res);
  }

  const { imdbID, season, episode, filename } = req.title;
  const subs = await fetchSubsFromWizdom(imdbID, season, episode);

  if (!subs) {
    exitEarlyWithEmptySubtitlesArray(res);
  }

  if (filename) {
    sortSubs(subs, filename);
  }

  req.subs = subs;
  next();
}

module.exports = getWizdomSubs;
