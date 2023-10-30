const winston = require('winston');
// const LogstashTransport = require('winston-logstash/lib/winston-logstash-latest');
const config = require('./config');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

winston.addColors({
    error: 'red',
    warn: 'italic yellow',
    info: 'blue',
    debug: 'bold green',
    http: 'white',
});

const consoleTransport = new winston.transports.Console({
    level: 'debug',
    format: winston.format.cli({
        levels,
    }),
    // prettyPrint: true,
    // colorize: true,
    // timestamp: true,
});

// const logstashTransport = new LogstashTransport({
//     level: 'warn',
//     host: config.logstash.host,
//     port: config.logstash.port,
// });

const getTransports = () => {
    const transports = [
        consoleTransport,
    ];

    // if (config.logstash.enabled) {
    //     transports.push(logstashTransport);
    // }

    // Add logging go MongoDB
    return transports;
};

const logger = winston.createLogger({
    level: config.LogLevel || 'info',
    levels: levels,
    defaultMeta: {
        'service': config.nodeName,
        'node-ip': '127.0.0.1',
    },
    format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.label({label: config.nodeName}), // TODO Find a better way to use label here
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSSZ',
        }),
        winston.format.align(),
        winston.format.errors({stack: true}),
        winston.format.json({levels}),
        // winston.format.cli({levels}),
    ),
    transports: getTransports(),
    // exceptionHandlers: [
    //     new winston.transports.File({filename: 'exception.log'}),
    // ],
    // rejectionHandlers: [
    //     new winston.transports.File({filename: 'rejections.log'}),
    // ],
});

logger.on('error', (error) => {
    const errorMessage = `Stop the press, logging not working: ${error.message}`;
    throw new Error(errorMessage, {cause: error});
});

// TODO use profiling
// start a timer
// logger.profile('test');

// setTimeout(() => {
//     // End the timer and log the duration
//     logger.profile('test');
// }, 1000);

module.exports = logger;
