/**
 * @author Maor M.
 * Handles all the wizdom requests.
 */

const superagent = require('superagent');
const config = require('./config');
const { distance } = require('fastest-levenshtein');

/**
 * request's all the subs available for a specific imdb id.
 * The given imdb id also contains the season and episode numbers, divide by colons.
 * @param {string} imdbID   Title's imdb ID and season and episode numbers.
 * @param {string} filename Video file name
 * @returns {Array} An array of subtitles object.
 */
const getSubs = async (imdbID, filename) => {
  let subsArr = [];
  try {
    const imdbIdSplit = imdbID.split(':');
    const titleId = imdbIdSplit.shift();
    const season = imdbIdSplit.shift();
    const episode = imdbIdSplit.shift();

    const titleInfo = (
      await superagent
        .get(new URL(titleId, config.wizdom_title_info).href)
        .timeout(10000)
    ).body;

    subsArr = titleInfo.subs;
    if (season || episode) {
      subsArr = subsArr[season][episode] ?? [];
    }

    if (filename) {
      subsArr.sort((firstSub, secondSub) => {
        return (
          distance(filename, firstSub.version) -
          distance(filename, secondSub.version)
        );
      });
    }
  } catch (err) {
    console.error('getSubs has thrown an error: ', err);
  }
  return mapSubsJson(subsArr);
};

/**
 * Builds an array of subtitle object: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/subtitles.md
 * Since version 2.2.3 I've added id to each sub.
 * @param {Array} subsArr An array of subs id's, name and version.
 * @returns {Array} Array of stremio's subtitle object.
 */
const mapSubsJson = (subsArr) => {
  const subtitles = [];
  subsArr.map((sub) => {
    const subURL = new URL(
      `${sub.id}.srt`,
      config.local + config.srt_unzipper_path
    );
    subtitles.push({
      url: subURL.href,
      lang: 'heb',
      id: `[WIZDOM]${sub.id}`,
    });
  });

  return subtitles;
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
