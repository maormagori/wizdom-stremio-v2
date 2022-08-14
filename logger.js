const config = require("./config");

const splunkLogger = require("splunk-logging").Logger;

const logger = new splunkLogger(config.logger);
logger.error = (err, ctx) => {
  console.error("Error occurred while sending data to splunk", err);
};

const streamLogs = {
  write: (msg) => {
    let requestId = msg.match(/(?<=\[)[a-z0-9|-]*?(?=\])/gm)[0];
    let payload = msg.replace(`[${requestId}]`, "");

    logger.send({
      message: {
        payload,
        requestId,
      },
    });
  },
};

module.exports = streamLogs;
