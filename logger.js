const config = require("./config");

const splunkLogger = require("splunk-logging").Logger;

let buffer = [];
const logger = new splunkLogger(config.logger);
logger.error = (err, ctx) => {
  console.error("Error occurred while sending data to splunk", err);
};

const streamLogs = {
  write: (msg) => {
    buffer.push(msg);
    if (buffer.length === 3) {
      logger.send({ message: createMsgBody(buffer) });
      buffer = [];
    }
  },
};

const createMsgBody = (buffer) => {
  const log = {};
  log.request = buffer[0].replace("Request:", "");
  log.responseBody = buffer[1].replace("Response Body:", "");
  log.response = buffer[2].replace("Response:", "");

  return log;
};

module.exports = streamLogs;
