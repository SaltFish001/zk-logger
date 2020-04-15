const winston = require('winston');
require('winston-daily-rotate-file');
const transports = winston.transports;
const combine = winston.format.combine;
const timestamp = winston.format.timestamp;
const label = winston.format.label;
const printf = winston.format.printf;

const myFormat = printf(({
  level,
  message,
  label,
  timestamp
}) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});


const transport_info = new (winston.transports.DailyRotateFile)({
  filename: '%DATE%_info.log',
  level: 'info',
  dirname: "./logs",
  datePattern: 'YYYY-MM-DD',
  // zippedArchive: true,
  maxSize: '500m',
  maxFiles: '30d'
});

/**
 * 
 * @param {string} labal 
 */
const logger = (labal) => {
  if (!labal || typeof labal !== 'string') {
    labla = "This project "
  }
  return winston.createLogger({
    format: combine(
      label({
        label: labal
      }),
      timestamp(),
      myFormat
    ),
    transports: [transport_info, new transports.Console()]
  });
}

module.exports = logger