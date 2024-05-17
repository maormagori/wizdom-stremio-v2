import manifestConfig from "../configs/manifestConfig.js";
import indexService from "../services/indexService.js";
import landingPageService from "../services/landingPageService.js";
import extractData from "../utils/dataExtractor.js";


const getIndex = async (req, res) => { res.send(landingPageService.landingPage(manifestConfig)) };
const getReadMe = async (req, res) => { res.sendFile("README.md", { root: "./" }); };
const getManifest = async (req, res) => { res.send(manifestConfig); };

const getSubtitleSrt = async (req, res) => {
    const { subtitleID } = req.params;

    const srtContent = await indexService.extractSubtitleFromWizdom(subtitleID);

    res.send(srtContent);
};

const getSubtitlesList = async (req, res) => {
    const { imdbID, season, episode, filename } = extractData(req.params);

    const wizdomSubtitles = await indexService.fetchSubtitlesFromWizdom(imdbID, season, episode);
    const sortedSubtitles = indexService.sortSubtitlesByFilename(wizdomSubtitles, filename);
    const stremioSubtitles = indexService.mapSubtitlesToStremio(sortedSubtitles);

    res.send({ subtitles: stremioSubtitles });
};


const indexController = {
    getIndex,
    getReadMe,
    getManifest,
    getSubtitleSrt,
    getSubtitlesList
};


export default indexController;