const dotenv = require('dotenv');
dotenv.config();
dotenv.config({path: `.env.local`, override: true});

const isTest = process.env.NODE_ENV === 'test';

const port = process.env.PORT;

const mongodb = {
    connection_string: isTest ? '' : process.env.MONGODB_CONNECTION_STRING,
    database_name: isTest ? '' : process.env.MONGODB_CONNECTION_DATABASE_NAME,
};

const elasticsearch = {
    enable: isTest ? false : process.env.ELASTIC_SEARCH_ENABLE === 'true',
    local: isTest ? false : process.env.ELASTIC_SEARCH_LOCAL === 'true',
    url: isTest ? '' : process.env.ELASTIC_SEARCH_URL,
    login: isTest ? '' : process.env.ELASTIC_SEARCH_LOGIN,
    password: isTest ? '' : process.env.ELASTIC_SEARCH_PASSWD,
};

module.exports = {
    port,
    mongodb,
    elasticsearch,
};
