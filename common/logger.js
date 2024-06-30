const { createLogger, format, transports } = require('winston');

const customFormat = format.printf((info) => {
  const { level, message, timestamp, stack, ...meta } = info;
  const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';

  // Handle multi-line stack trace
  const formattedMessage = stack
    ? `${timestamp} [${level}]: ${stack}`
    : `${timestamp} [${level}]: ${message}`;

  // Add meta string if present
  return metaString ? `${formattedMessage} ${metaString}` : formattedMessage;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat()
  ),
  transports: [
    new transports.Console({
      format: customFormat,
    }),
  ],
});

module.exports = logger;
