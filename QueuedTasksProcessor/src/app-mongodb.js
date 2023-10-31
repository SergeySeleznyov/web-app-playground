const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const connectToDataBase = async () => {
    try {
        if (!config.mongodb.connection_string) {
            throw new Error(`MongoDB connection string is empty`);
        }

        await mongoose.connect(config.mongodb.connection_string, {
            useNewUrlParser: true,
            dbName: config.mongodb.database_name,
        });

        logger.info(`MongoDB database successful connected.`);
    } catch (innerError) {
        const errorMessage = `Error connecting to database: ${innerError}`;
        // await disconnectFromDatabse();
        throw new Error(errorMessage, innerError);
    }
};

const disconnectFromDatabse = async () => {
    try {
        await mongoose.disconnect();
        logger.info(`MongoDB database successful disconnected.`);
    } catch (innerError) {
        logger.error(`Error disconnecting from database: ${innerError}`);
    }
};

module.exports = {
    connectToDataBase,
    disconnectFromDatabse,
};
