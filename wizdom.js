/**
 * @author Maor M.
 * Handles all the wizdom requests.
 */

const superagent = require("superagent"),
  config = require("./config"),
  wizdomApi = require("./apis/wizdomApi").default,
  AdmZip = require("adm-zip"),
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
    const [id, season = 0, episode = 0] = imdbID.split(":");
    const url = `${config.wizdom_content_url}/search?action=by_id&imdb=${id}&season=${season}&episode=${episode}`;
    const response = await superagent.get(url);

    subsArr = response.body;

    if (filename) {
      subsArr.sort((firstSub, secondSub) => {
        return (
          distance(filename, firstSub.version) -
          distance(filename, secondSub.version)
        );
      });
    }
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
    let subURL = new URL(
      `${sub.id}.srt`,
      config.local + config.srt_unzipper_path
    );
    subtitles.push({
      url: subURL.href,
      lang: "heb",
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
const downloadSubZip = async (subtitleID) => {
  const url = `${wizdomApi.DOWNLOAD_URL}/${subtitleID}`;
  const response = await superagent.get(url).buffer(true)

  const zip = new AdmZip(response.body);
  const zipEntries = zip.getEntries();
  const srtEntry = zipEntries.find(entry => entry.entryName.endsWith('.srt'));
  const srtContent = srtEntry.getData().toString('utf8');

  return srtContent;
};

module.exports = { getSubs, downloadSubZip };
