/**
 * @author Maor M.
 * @summary Addon configuration module.
 *
 * Contains all the info the addon needs about server addresses and ports.
 */

const env = process.env.DEPLOYMENT ?? 'local';
const config = {
  wizdom_host: 'wizdom.xyz',
  wizdom_url: 'https://wizdom.xyz/',
  wizdom_api: 'https://wizdom.xyz/api/',
  wizdom_title_info: 'https://wizdom.xyz/api/releases/',
  wizdom_sub_download_url: 'https://wizdom.xyz/api/files/sub/',
  stremio_server_subtitle_url: 'http://127.0.0.1:11470/subtitles.vtt',
  srt_unzipper_path: '/srt/',
  remoteLogging: process.env.LOGGER ?? false,
};

//Public server build.
if (env === 'beamup') {
  config.port = process.env.PORT;
  config.local = 'https://4b139a4b7f94-wizdom-stremio-v2.baby-beamup.club';
}
//Locally running
else {
  config.port = 7001;
  config.local = 'http://127.0.0.1:' + config.port;
}

//Prod logs are sent to log server
config.logger = {
  token: process.env.HEC_TOKEN ?? '',
  host: process.env.INDEX_HOST ?? '',
  path: '/splunk',
  protocol: 'http',
  port: 80,
  batchInterval: 5000,
  maxBatchCount: 10,
  maxBatchSize: 5120, // 5kb
};

module.exports = config;
