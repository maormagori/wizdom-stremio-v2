const config = require('../config');
/**
 * Builds an array of subtitle object: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/subtitles.md
 * Since version 2.2.3 I've added id to each sub.
 */
const mapToStremioSubs = (req, res) => {
  const subtitles = req?.subs?.map?.((sub) => {
    const subURL = new URL(
      `${sub.id}.srt`,
      config.local + config.srt_unzipper_path
    );
    return {
      url: subURL.href,
      lang: 'heb',
      id: `[WIZDOM]${sub.id}`,
    };
  });

  res.json({ subtitles: subtitles || [] });
};

module.exports = mapToStremioSubs;
