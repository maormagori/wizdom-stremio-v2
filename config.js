/**
 * @author Maor M.
 * @summary Addon configuration module.
 *
 * Contains all the info the addon needs about server addresses and ports.
 */

var env = "beamup";
var config = {
    wizdom_host: "wizdom.xyz",
    wizdom_url: "https://wizdom.xyz/",
    wizdom_api: "https://wizdom.xyz/api/",
    wizdom_title_info: "https://wizdom.xyz/api/releases/",
    wizdom_sub_download_url: "https://wizdom.xyz/api/files/sub/",
    stremio_server_subtitle_url: "http://127.0.0.1:11470/subtitles.vtt",
};

switch (env) {
    //Public server build.
    case "beamup":
        config.port = process.env.PORT;
        config.local =
            "https://4b139a4b7f94-wizdom-stremio-v2.baby-beamup.club";
        break;

    //Local sever build.
    case "local":
        config.port = 7000;
        config.local = "http://127.0.0.1:" + config.port;
        break;
}

module.exports = config;
