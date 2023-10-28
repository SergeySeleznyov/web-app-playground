
const express = require('express');
const {getAllIndexedDocumentInfos: esGetIndexedDocument} = require('../elastic-search/elastic-search-dal');

// eslint-disable-next-line new-cap
const apiRoute = express.Router();

apiRoute.get('/es-index', async (req, res) => {
    try {
        let result = '';

        if (elasticsearch.enable) {
            if (elasticsearch.local) {
                result = await esGetIndexedDocument();
            } else {
                // TODO implement
            }
        }


        if (result) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
    } catch (innerError) {
        const errorMessage = `Error during a list of indexed document getting: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        console.error(error.message);

        // res.sendStatus(500);
        res.status(500);
        res.send(errorMessage);
    }
});
        const error = new Error(errorMessage, {cause: innerError});
        console.error(error.message);

        // res.sendStatus(500);
        res.status(500);
        res.send(errorMessage);
    }
});

module.exports = apiRoute;
