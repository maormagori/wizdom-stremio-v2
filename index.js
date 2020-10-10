const express = require("express")
const addon = express()

const manifest = {
	"id": "xyz.stremio.wizdom",
	"version": "0.0.1",
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

var respond = function (res, data) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  };

addon.get('/manifest.json', function (req, res) {
    respond(res, manifest);
});

addon.listen(7000, function() {
    console.log('Add-on Repository URL: http://127.0.0.1:7000/manifest.json')
  });

addon.get('/subtitles/:type/:id/:extra.json', (req, res) => {
    console.log(req);
    respond(res, { "subtitles" : []})
})

// addon.get('/',(req,res) => {console.log(req);});


  
  