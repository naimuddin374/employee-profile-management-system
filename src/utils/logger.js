const { createLogger, format, transports } = require('winston');
const config = require('config')

// {error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6}

const level = config.util.getEnv('LOG_LEVEL') || 'debug';


function formatParams(info) {
    const { timestamp, level, message, ...args } = info

    const ts = timestamp.slice(0, 19).replace('T', ' ');

    return `${ts} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args) : ''
        }`
}


// DEV FORMAT
const devFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
)


// PRODUCTION FORMAT
const prodFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
)


let logger = null


if (config.env === 'production') {
    logger = createLogger({
        level,
        format: prodFormat,
        transports: [
            new transports.File({ filename: 'logs/error.log', level: 'error' }),
            new transports.File({ filename: 'logs/combined' }),
            new transports.Console()
        ]
    })
} else {
    logger = createLogger({
        level,
        format: devFormat,
        transports: [new transports.Console()]
    })
}


module.exports = logger