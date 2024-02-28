const logger = require('../logger');

const express = require('express');
// eslint-disable-next-line new-cap
const apiRoute = express.Router();
const { nanoid } = require('nanoid');

const postController = require('../controllers/posts');

const elasticSearchController = require('../controllers/elasticSearch');

apiRoute.get('/posts', async (req, res) => {
    try {
        const postInfos = await postController.getPostInfos();
        if (postInfos) {
            res.send(postInfos);
        } else {
            res.sendStatus(404);
        }
    } catch (innerError) {
        const errorMessage = `Error during a list of Posts getting: ${innerError.message}`;
        const error = new Error(errorMessage, { cause: innerError });
        logger.error(error.message);

        res.status(500);
        res.send(errorMessage);
    }
});

apiRoute.get('/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await postController.getPost(postId);
        if (post) {
            res.send(post);
        } else {
            res.sendStatus(404);
        }
    } catch (innerError) {
        const errorMessage = `Error during a Post getting: ${innerError.message}`;
        const error = new Error(errorMessage, { cause: innerError });
        logger.error(error.message);

        res.status(500);
        res.send(errorMessage);
    }
});

apiRoute.post('/post', async (req, res) => {
    try {
        const id = req.body.id;
        const title = req.body.title;
        const content = req.body.content;

        const uniqueId = id ? id : nanoid();

        await postController.setPost(uniqueId, title, content);

        await elasticSearchController.indexDocument(uniqueId, title, content);

        res.sendStatus(200);
    } catch (innerError) {
        const errorMessage = `Error during a Post posting: ${innerError.message}`;
        const error = new Error(errorMessage, { cause: innerError });
        logger.error(error.message);

        res.status(500);
        res.send(errorMessage);
    }
});

apiRoute.delete('/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            throw new Error(`Post id is not specified`);
        } // TODO look for validation

        await postController.deletePost(postId);

        await elasticSearchController.deleteDocument(postId);

        res.sendStatus(200);
    } catch (innerError) {
        const errorMessage = `Error during a Post deleting: ${innerError.message}`;
        const error = new Error(errorMessage, { cause: innerError });
        logger.error(error.message);

        res.status(500);
        res.send(errorMessage);
    }
});

apiRoute.post('/search/', async (req, res) => {
    try {
        const text = req.body.text;

        const searchResult = await elasticSearchController.searchDocuments(text);
        if (!searchResult) {
            throw new Error(`Empty elastic search response (${searchResult})`);
        }

        res.send(searchResult);
    } catch (innerError) {
        const errorMessage = `Error during a searching: ${innerError.message}`;
        const error = new Error(errorMessage, { cause: innerError });
        logger.error(error.message);

        res.status(500);
        res.send(errorMessage);
    }
});

module.exports = apiRoute;
