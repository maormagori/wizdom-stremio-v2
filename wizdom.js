const superagent = require("superagent"),
    config = require('./config')
    

const wizdomMain = 'wizdom.xyz',
    wizdomBackup = 'lolfw.com'

const getWizDomain = async () =>{
    try{
        mainDomain = await superagent.get(wizdomMain)
        if(mainDomain.status){
            console.log(`wizdom url set to: ${wizdomMain}`)
            return wizdomMain
        }
        console.log(`wizdom url set to: ${wizdomBackup}`)
        return wizdomBackup;
    } catch (err){
        console.log("getWizDomain has thrown an error:");
        console.log(err);
    }
}

const getSubs = async (imdbID) => {
    try{
        let imdbIdSplit = imdbID.split(":")
        
        console.log(`https://json.${config.wizdom_url}/search.php?action=by_id&imdb=${imdbIdSplit[0]}&season=${imdbIdSplit[1] || 0}&episode=${imdbIdSplit[2] || 0}&version=${0}`)
        const result = await superagent.get(`https://json.${config.wizdom_url}/search.php?action=by_id&imdb=${imdbIdSplit[0]}&season=${imdbIdSplit[1] || 0}&episode=${imdbIdSplit[2] || 0}&version=${0}`)
            .timeout(10000);
        data = result.body;

        return mapSubsJson(data);
        
    } catch (err){
        console.log("getSubs has thrown an error:");
        console.log(err);
    }
}

const mapSubsJson = (data) => {
    subtitles = [];
    data.map((sub => {
        subtitles.push({url: `${config.local}/srt/${sub.id}.srt`, lang: "heb"})
    }));
    
    return subtitles;
}


module.exports = {
    getSubs: getSubs,
    getWizDomain: getWizDomain,
}
