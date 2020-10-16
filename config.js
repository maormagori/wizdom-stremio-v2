//TODO: Creates a circular dependency. Fix this.
//const {getWizDomain} = require('./wizdom.js');

var env = process.env.NODE_ENV ? 'beamup':'local';
var config = {

    //TODO: Add wizdom server not responding.
    wizdom_url: 'wizdom.xyz' 
    
}

switch (env) {
    case 'beamup':
		config.port = process.env.PORT
        config.local = "https://4b139a4b7f94-wizdom-stremio-v2.baby-beamup.club"
        break;
    case 'local':
		config.port = 7000
        config.local = "http://127.0.0.1:" + config.port;
        break;
}

module.exports = config;