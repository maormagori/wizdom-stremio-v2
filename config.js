/**
 * @author Maor M.
 * @summary Addon configuration module.
 *
 * Contains all the info the addon needs about server addresses and ports.
 */

let env = process.env.DEPLOYMENT ?? "local";
const config = {
  remoteLogging: process.env.LOGGER ?? false,
};


//Prod logs are sent to log server
config.logger = {
  token: process.env.HEC_TOKEN ?? "",
  host: process.env.INDEX_HOST ?? "",
  path: "/splunk",
  protocol: "http",
  port: 80,
  batchInterval: 5000,
  maxBatchCount: 10,
  maxBatchSize: 5120, // 5kb
};

module.exports = config;
