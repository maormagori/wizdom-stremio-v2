//TODO: Creates a circular dependency. Fix this.
//const {getWizDomain} = require('./wizdom.js');

//var env = process.argv[2] || 'heroku';
var env = 'local'
var config = {

    //TODO: Add wizdom server not responding.
    wizdom_url: 'wizdom.xyz' 
    
}

switch (env) {
    case 'heroku':
		config.port = process.env.PORT
        config.local = "http://addic7ed-stremio-addon.herokuapp.com"
        break;
    case 'local':
		config.port = 7000
        config.local = "http://127.0.0.1:" + config.port;
        break;
}

module.exports = config;