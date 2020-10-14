const express = require("express"),
 config = require('./config'),
 {getSubs, fetchSrt, srtPath, deleteSrt} = require('./wizdom')

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

const respond = function (res, data) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  };

const sendSrt = (res, filepath) => {
	return new Promise((resolve, reject) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Headers', '*');
		res.status(200)
		res.sendFile(filepath, (err) => {
			if(err){
				console.log("Sending file error!")
				reject(err)
			}
			else
				resolve();
		})
	})
}

addon.get('/manifest.json', function (req, res) {
    respond(res, manifest);
});

addon.get('/subtitles/:type/:imdbId/:query.json', async (req, res) => {
	const subtitles = await getSubs(req.params.imdbId);
    respond(res, { "subtitles" : subtitles});
})


//TODO: store id requests. Block unidentified ids.
addon.get('/srt/:id.srt', async (req, res) => {
	try {
		id = req.params.id;
		await fetchSrt(id);
		filepath = await srtPath(id);
		await sendSrt(res, filepath.full);
		await deleteSrt(id);

		console.log(`${id} has been sent and deleted succesfully!`)
	} catch(error){
		throw error
	}
	
})


addon.listen(config.port, function() {
	console.log(config)
    console.log(`Add-on Repository URL: ${config.local}/manifest.json`)
  });



  
  