const winston = require('winston');
require('winston-mongodb');
const LogstashTransport = require('winston-logstash/lib/winston-logstash-latest');
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

const metadata = {
    service: config.nodeName,
    ip: '127.0.0.1', // TODO set real IP
};

const consoleTransport = new winston.transports.Console({
    level: 'debug',
    format: winston.format.cli({
        levels,
    }),
    // prettyPrint: true,
    // colorize: true,
    // timestamp: true,
    silent: config.isTest,
});

const mongoDBTransport = config.log.enableMongoDB && new winston.transports.MongoDB({
    level: 'info',
    // eslint-disable-next-line max-len
    db: config.mongodb.connection_string, // MongoDB connection uri, pre-connected MongoClient object or promise which resolves to a pre-connected MongoClient object.
    dbName: config.mongodb.database_name,
    collection: config.mongodb.log_collection_name,
    label: {
        service: config.nodeName,
    },
    tryReconnect: true,
    storeHost: true,
    decolorize: true,
    silent: config.isTest,
});


const logstashTransport = config.logstash.enabled && new LogstashTransport({
    level: 'warn',
    host: config.logstash.host,
    port: config.logstash.port,
    silent: config.isTest,
});

const getTransports = () => {
    const transports = [];

    transports.push(consoleTransport);

    if (config.logstash.enabled) {
        transports.push(logstashTransport);
    }

    if (config.log.enableMongoDB) {
        transports.push(mongoDBTransport);
    }

    return transports;
};

const logger = winston.createLogger({
    level: config.log.level || 'info',
    levels: levels,
    defaultMeta: metadata,
    format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.label({label: config.nodeName}), // TODO Find a better way to use label here
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSSZ',
        }),
        winston.format.metadata(),
        winston.format.align(),
        winston.format.errors({stack: true}),
        // winston.format.json({levels}),
        winston.format.cli({levels}),
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
