/**
 * @author Maor M.
 * Handles all the wizdom requests.
 */

const superagent = require('superagent');
const config = require('../config');

const getSubs = async (titleId, season, episode) => {
  let subsArr = [];
  try {
    const titleInfo = (
      await superagent
        .get(new URL(titleId, config.wizdom_title_info).href)
        .timeout(10000)
    ).body;

    subsArr = titleInfo.subs;
    if (season || episode) {
      subsArr = subsArr[season][episode] ?? [];
    }
  } catch (err) {
    console.error('getSubs has thrown an error: ', err);
  }
  return subsArr;
};

/**
 * returns a file stream of requested sub's id zip file.
 * @param {number} subId
 * @returns {superagent.SuperAgentRequest} A request to the requested id's zip file.
 */
const downloadSubZip = (subId) => {
  const subZipURL = new URL(subId, config.wizdom_sub_download_url);
  return superagent.get(subZipURL.href);
};

module.exports = { getSubs, downloadSubZip };
