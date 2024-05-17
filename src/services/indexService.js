import AdmZip from "adm-zip";
import levenshtein from "fastest-levenshtein";

import wizdomApi from "../apis/wizdomApi.js";
import baseConfig from "../configs/baseConfig.js";
import request from "../utils/request.js";


const fetchSubtitlesFromWizdom = async (imdbID, season, episode) => {
    const url = `${wizdomApi.CONTENT_URL}/search?action=by_id&imdb=${imdbID}&season=${season}&episode=${episode}`;
    const response = await request.get(url);
    const wizdomSubtitles = response.body;

    return wizdomSubtitles;
};

const sortSubtitlesByFilename = (subtitles, filename) => {
    return subtitles.sort((a, b) => {
        const similarityA = levenshtein.distance(a.versioname, filename);
        const similarityB = levenshtein.distance(b.versioname, filename);

        return similarityA - similarityB;
    });
};

const mapSubtitlesToStremio = (subtitles) => {
    return subtitles.map((s) => ({
        id: `[WIZDOM]${s.id}`,
        url: `${baseConfig.BASE_URL}/${s.id}.srt`,
        lang: "heb",
    }));
};

const extractSubtitleFromWizdom = async (subtitleID) => {
    const url = `${wizdomApi.DOWNLOAD_URL}/${subtitleID}`;
    const response = await request.getBuffer(url);

    const zip = new AdmZip(response.body);
    const zipEntries = zip.getEntries();
    const srtEntry = zipEntries.find(entry => entry.entryName.endsWith('.srt'));
    const srtContent = srtEntry.getData().toString('utf8');

    return srtContent;
};

const indexService = {
    fetchSubtitlesFromWizdom,
    sortSubtitlesByFilename,
    mapSubtitlesToStremio,
    extractSubtitleFromWizdom,
};


export default indexService;