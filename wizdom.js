/**
 * @author Maor M.
 * Handles all the wizdom requests.
 */

const superagent = require("superagent"),
    config = require('./config'),
    { distance } = require('fastest-levenshtein')

/**
 * request's all the subs available for a specific imdb id.
 * The given imdb id also contains the season and episode numbers, divide by colons.
 * @param {string} imdbID   Title's imdb ID and season and episode numbers.
 */
const getSubs = async (imdbID, filename) => {
    try {
        let imdbIdSplit = imdbID.split(":")

        const result = await superagent.get(`https://json.${config.wizdom_url}/search.php?action=by_id&imdb=${imdbIdSplit[0]}&season=${imdbIdSplit[1] || 0}&episode=${imdbIdSplit[2] || 0}&version=${0}`)
            .timeout(10000);
        data = result.body;

        //Levenshtein sorting the subs.
        const compareSubs = (firstSub, secondSub) => {
            return (distance(filename, firstSub.versioname) - distance(filename, secondSub.versioname));
        }

        data.sort(compareSubs);

        return mapSubsJson(data);

    } catch (err) {
        console.log("getSubs has thrown an error:");
        console.log(err);
    }
}


/**
 * Builds an array of subtitle object: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/subtitles.md
 * Since version 2.2.3 I've added id to each sub.
 * @param {} data An array of subs id's, name and version.
 */
const mapSubsJson = (data) => {
    subtitles = [];
    data.map((sub => {
        subtitles.push({ url: `http://127.0.0.1:11470/subtitles.vtt?from=https://zip.${config.wizdom_url}/${sub.id}.zip`, lang: "heb", id: `[WIZDOM]${sub.id}` })

    }));

    //console.log(subtitles)


    return subtitles;
}


module.exports = {
    getSubs: getSubs
}
