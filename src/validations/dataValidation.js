const contentTypeCheck = (contentType) => { return ["series", "movie"].includes(contentType); };
const imdbIDCheck = (imdbID) => { return /^tt\d+$/.test(imdbID); };
const seasonCheck = (season) => { return /^\d+$/.test(season); };
const episodeCheck = (episode) => { return /^\d+$/.test(episode); };

const dataValidation = (contentType, imdbID, season, episode) => {
    if (contentTypeCheck(contentType) === false) return false;
    if (imdbIDCheck(imdbID) === false) return false;
    if (seasonCheck(season) === false) return false;
    if (episodeCheck(episode) === false) return false;

    return true;
};


export default dataValidation;