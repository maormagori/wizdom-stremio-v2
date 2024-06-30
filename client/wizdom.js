/**
 * @author Maor M.
 * Handles all the wizdom requests.
 */

const superagent = require('superagent');

const WIZDOM_TIMEOUT = 10000;

const WIZDOM_HOST = 'wizdom.xyz';
const WIZDOM_URL = `https://${WIZDOM_HOST}/`;
const WIZDOM_API = `${WIZDOM_URL}api/`;
const WIZDOM_SUB_DOWNLOAD_URL = `${WIZDOM_API}files/sub`;

/**
 * Builds a URL to get the requested title's info.
 * @param titleId - The title's imdb id.
 * @param season - The requested season.
 * @param episode - The requested episode.
 * @returns {`${string}search?action=by_id&imdb=${string}&season=${string}&episode=${string}`}
 */
const buildTitleInfoURL = (titleId, season, episode) =>
  `${WIZDOM_API}search?action=by_id&imdb=${titleId}&season=${season}&episode=${episode}`;

/**
 * Fetches the requested title's subs from wizdom.
 * @param titleId - The title's imdb id.
 * @param season - The requested season.
 * @param episode   - The requested episode.
 * @returns {Promise<*|*[]>} - The requested title's subs.
 */
const fetchSubsFromWizdom = async (titleId, season, episode) => {
  const titleUrl = buildTitleInfoURL(titleId, season, episode);

  try {
    const subs = (await superagent.get(titleUrl).timeout(WIZDOM_TIMEOUT)).body;
    return subs || [];
  } catch (err) {
    console.error('getSubs has thrown an error: ', err);
    return [];
  }
};

/**
 * returns a file stream of requested sub's id zip file.
 * @param {number} subId
 * @returns {Request} - The requested sub's zip file.
 */
const downloadSubZip = (subId) => {
  return superagent.get(`${WIZDOM_SUB_DOWNLOAD_URL}/${subId}`);
};

module.exports = { fetchSubsFromWizdom, downloadSubZip };
