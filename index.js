const config = require('./config');
const addon = require('./server.js');

addon.listen(config.port, function () {
  console.log(config);
  console.log(`Add-on Repository URL: ${config.local}/manifest.json`);
});
