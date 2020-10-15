const express = require("express"),
 config = require('./config'),
 cors = require('cors'),
 {getSubs} = require('./wizdom'),
 { retrieveSrt } = require("subtitles-grouping/lib/retriever");
 
const addon = express()
addon.use(cors())


const manifest = {
	"id": "xyz.stremio.wizdom",
	"version": process.env.npm_package_version,
	"catalogs": [],
	"resources": [
		"subtitles"
	],
	"types": [
		"movie",
		"series"
	],
	"name": "Wizdom Subtitles",
	"description": "An unofficial Stremio addon for Hebrew subtitles from wizdom.xyz. Developed by Maor Development",
	"logo": "https://i.ibb.co/KLYK0TH/wizdon256.png"
}

const respond = function (res, data) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  };


addon.get('/manifest.json', function (req, res) {
    respond(res, manifest);
});

addon.get('/', function (req, res) {
    respond(res, manifest);
});



addon.get('/subtitles/:type/:imdbId/:query.json', async (req, res) => {
	const subtitles = await getSubs(req.params.imdbId);
    respond(res, { "subtitles" : subtitles});
})


//TODO: Create cache system.
addon.get('/srt/:id.srt', async (req, res) => {

	retrieveSrt(`https://zip.${config.wizdom_url}/${req.params.id}.zip`, (err,buffer) => {
		if(err){
			console.log(`error retrieving ${req.params.id}`)
			console.log(err);
		}
		else {
			res.status(200);
			res.set({'content-type': 'text/srt; charset=utf-8'})
			res.send(buffer);
		}
	})
})

addon.listen(config.port, function() {
	console.log(config)
    console.log(`Add-on Repository URL: ${config.local}/manifest.json`)
  });



  
  