/**
 * @author Maor M.
 * @summary Addon configuration module.
 * 
 * Contains all the info the addon needs about server addresses and ports.
 */

//Wizdom lacks a secondary address at the moment so this will be a future feature.
// const wizdomMain = 'wizdom.xyz',
//     wizdomBackup = 'lolfw.com';


// const getWizDomain = async () =>{
//     try{
//         mainDomain = await superagent.get(wizdomMain)
//         if(mainDomain.status){
//             console.log(`wizdom url set to: ${wizdomMain}`)
//             return wizdomMain
//         }
//         console.log(`wizdom url set to: ${wizdomBackup}`)
//         return wizdomBackup;
//     } catch (err){
//         console.log("getWizDomain has thrown an error:");
//         console.log(err);
//     }
// }

var env = process.env.NODE_ENV ? 'beamup':'local';
var config = {

    wizdom_url: 'wizdom.xyz',

}

switch (env) {
    //Public server build.
    case 'beamup':
		config.port = process.env.PORT
        config.local = "https://4b139a4b7f94-wizdom-stremio-v2.baby-beamup.club"
        break;

    //Local sever build.
    case 'local':
		config.port = 7000
        config.local = "http://127.0.0.1:" + config.port;
        break;
}

module.exports = config;