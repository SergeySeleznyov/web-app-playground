const dotenv = require('dotenv');
dotenv.config();
dotenv.config({path: `.env.local`, override: true});
// TODO Use convict

const isTest = process.env.NODE_ENV === 'test';

const port = process.env.PORT;

// TODO Use JSDoc
const mongodb = {
    connection_string: isTest ? '' : process.env.MONGODB_CONNECTION_STRING,
    database_name: isTest ? '' : process.env.MONGODB_CONNECTION_DATABASE_NAME,
};

// TODO Use JSDoc
const elasticsearch = {
    url: isTest ? '' : process.env.ELASTIC_SEARCH_URL,
    login: isTest ? '' : process.env.ELASTIC_SEARCH_LOGIN,
    password: isTest ? '' : process.env.ELASTIC_SEARCH_PASSWD,
};

// TODO Use JSDoc and remove ''.concat(...)
const rabbitmq = {
    connection_string: isTest ? '' : process.env.RABBITMQ_CONNECTION_STRING,
    queue_name: isTest ? '' : ''.concat(process.env.RABBITMQ_QUEUE_NAME),
    channelReopenTimeout: isTest ? 0 : parseInt(process.env.RABBITMQ_CHANNEL_REOPEN_TIMEOUT),
};

module.exports = {
    port,
    mongodb,
    elasticsearch,
    rabbitmq,
};
