const express = require("express"),
 superagent = require("superagent"),
 unzip = require("unzip-stream"),
 glob = require("glob")
 fs = require('fs');

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

addon.get('/subtitles/:type/:imdbId/:query.json', (req, res) => {
	const subtitles = [];
	subtitles.push({url: "", lang:"heb"})
	subtitles[0].url = "http://127.0.0.1:7000/srt/231375.srt"
    respond(res, { "subtitles" : subtitles});
})

addon.get('/srt/:id.srt', (req, res) => {
	superagent("https://zip.wizdom.xyz/231375.zip").pipe(unzip.Extract({ path: `srt/${req.params.id}` })
	.on('close', () => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', '*');
		
		let filepath=`srt/${req.params.id}/*.srt`;
		glob(filepath, (er, files) =>{
			if(er){
				console.log(er);
				console.log("glob error!")
			}
			filepath = files[0];
			console.log(files);
			console.log(`${__dirname}\\${filepath}`)
			res.status(200)
			res.sendFile(`${__dirname}\\${filepath}`, (err) => {
				if(err){
					console.log("express sendFile error!")
					console.log(err);
				}
				else
					console.log('sent: ' +filepath+ 'succesfully!' );
					fs.rmdir(`srt/${req.params.id}`,{recursive: true}, (err) => {
						if(!err)
							console.log(`${filepath} has been deleted.`)
					})
			})
		})
		
		
	}))
	
})



  
  