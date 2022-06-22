/**
 * @author Maor M.
 * Handles all the wizdom requests.
 */

const superagent = require("superagent"),
  config = require("./config"),
  { distance } = require("fastest-levenshtein");

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
    const imdbIdSplit = imdbID.split(":");
    const titleId = imdbIdSplit.shift(),
      season = imdbIdSplit.shift(),
      episode = imdbIdSplit.shift();

    const titleInfo = (
      await superagent
        .get(new URL(titleId, config.wizdom_title_info).href)
        .timeout(10000)
    ).body;

    subsArr = titleInfo.subs;
    if (season || episode) subsArr = subsArr[season][episode];

    subsArr.sort((firstSub, secondSub) => {
      return (
        distance(filename, firstSub.version) -
        distance(filename, secondSub.version)
      );
    });
  } catch (err) {
    console.error("getSubs has thrown an error: ", err);
  } finally {
    return mapSubsJson(subsArr);
  }
};

/**
 * Builds an array of subtitle object: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/subtitles.md
 * Since version 2.2.3 I've added id to each sub.
 * @param {Array} subsArr An array of subs id's, name and version.
 * @returns {Array} Array of stremio's subtitle object.
 */
const mapSubsJson = (subsArr) => {
  subtitles = [];
  subsArr.map((sub) => {
    let subURL = new URL(sub.id, config.wizdom_sub_download_url);
    subtitles.push({
      url: `${config.stremio_server_subtitle_url}?from=${subURL.href}`,
      lang: "heb",
      id: `[WIZDOM]${sub.id}`,
    });
  });

  return subtitles;
};

module.exports = getSubs;
