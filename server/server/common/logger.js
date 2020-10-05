const winston = require('winston');
// const config = require("config")

const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

const myFormat = printf( ({level, message, timestamp, ...metadata}) => {
    let msg = `${timestamp} [${level}] : ${message}`;
    if (Object.keys(metadata).length) {
        msg += JSON.stringify(metadata);
        // console.log('xxxxx')
    }
    // console.log(`msg=${msg}`)
    return msg;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        format.colorize(),
        splat(),
        // timestamp(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        myFormat,
    ),
    // format: winston.format.json(),
    transports: [
        new transports.File({
            filename: 'server.log',
            // json: true,
            level: 'debug',
        })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        // format: winston.format.simple(),
    }))
}

module.exports = logger;