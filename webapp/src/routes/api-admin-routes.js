const logger = require('../logger');

const express = require('express');
// eslint-disable-next-line new-cap
const apiRoute = express.Router();

const {elasticsearch} = require('../config');
const {Client} = require('@elastic/elasticsearch');
const client = new Client({
    node: elasticsearch.url,
    auth: {
        username: elasticsearch.login,
        password: elasticsearch.password,
    },
});
client.info()
    .then((response) => logger.info(`Elastic Search connection check: ${JSON.stringify(response)}`))
    .catch((error) => logger.error(`Elastic Search connection error: ${error}`));
module.exports.esClient = client;
const {
    getAllIndexedDocumentInfos: esGetIndexedDocument,
    deleteDocument: esDeleteDocument,
} = require('../../../shared/src/elastic-search-dal');

apiRoute.get('/es-index', async (req, res) => {
    try {
        const result = await esGetIndexedDocument();
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    } catch (innerError) {
        const errorMessage = `Error during a list of indexed document getting: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        logger.error(error.message);

        // res.sendStatus(500);
        res.status(500);
        res.send(errorMessage);
    }
});

apiRoute.delete('/es-delete-document/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            throw new Error(`Post id is not specified`);
        } // TODO look for validation

        const result = await esDeleteDocument(postId);
        res.status(200);
        res.send(result);
    } catch (innerError) {
        const errorMessage = `Error during indexed document deleting: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        logger.error(error.message);

        // res.sendStatus(500);
        res.status(500);
        res.send(errorMessage);
    }
});

module.exports = apiRoute;
