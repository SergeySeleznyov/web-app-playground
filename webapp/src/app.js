const logger = require('./logger');
const morgan = require('morgan');

const express = require('express');
// eslint-disable-next-line new-cap
const app = new express();
const apiRoute = require('./routes/api-public-routes');
// const adminRoute = require('./routes/api-admin-routes');
const cors = require('cors');
const { connectToDataBase, disconnectFromDatabse } = require('./app-mongodb');
const config = require('./config');

const morganMiddleware = morgan(
    // ':method :url :status :res[content-length] - :response-time ms',
    function(tokens, req, res) {
        return JSON.stringify({
            method: tokens.method(req, res),
            url: tokens.url(req, res),
            status: Number.parseFloat(tokens.status(req, res)),
            content_length: tokens.res(req, res, 'content-length'),
            response_time: Number.parseFloat(tokens['response-time'](req, res)),
        });
    },
    {
        stream: {
            // Configure Morgan to use our custom logger with the http severity
            write: (message) => {
                logger.http(message.trim());
            },
        },
    },
);
app.use(morganMiddleware);

app.use(cors());

app.use(express.static('html'));

app.use(express.json({ limit: '50mb' }));

app.use('/api', apiRoute);
// app.use('/admin', adminRoute); // INFO for future admin-view feature

(async () => {
    try {
        await connectToDataBase();
        if (!config.isTest) {
            app.listen(config.port, () => {
                logger.info(`Server is listening on port ${config.port}`);
            });
        }
    } catch (err) {
        return logger.error(err);
    }
})();

// Wait fot (ctrl-c)
process.on('SIGINT', async () => {
    await disconnectFromDatabse();
    logger.warn('The app was stopped.');
    process.exit();
});

process.on('uncaughtException', (err, origin) => {
    const errorMessage = `Caught exception: ${err}\n` +
        `Exception origin: ${origin}`;

    logger.error(errorMessage);
});

module.exports = app;
