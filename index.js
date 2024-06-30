const config = require('config');
const addon = require('./server.js');

const HOSTNAME = config.get('hostname');
const PORT = config.get('port');

addon.listen(PORT, function () {
  console.log(`Add-on Repository URL: ${HOSTNAME}:${PORT}/manifest.json`);
});
