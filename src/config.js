const dotenv = require('dotenv')
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const isTest = process.env.NODE_ENV === 'test';

const port = process.env.PORT;

const mongodb = {
    connection_string: isTest ? '' : process.env.MONGODB_CONNECTION_STRING,
    database_name: isTest ? '' : process.env.MONGODB_CONNECTION_DATABASE_NAME,
}

module.exports = {
    port,
    mongodb,
}
