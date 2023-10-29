
const express = require('express');
const {index, search, deleteDocument: esDeleteDocument} = require('../../../shared/src/elastic-search-dal');
const {nanoid} = require('nanoid');
// eslint-disable-next-line new-cap
const apiRoute = express.Router();
const {
    getPostInfos,
    getPost,
    setPost,
    deletePost} = require('../controllers/posts');
const {sendMessage} = require('../app-rabbitmq');
const RabbitMQMessage = require('../../../shared/src/model/RabbitMQMessage');
const RabbitMQCommand = require('../../../shared/src/model/RabbitMQCommand');
const {elasticsearch} = require('../config');

apiRoute.get('/posts', async (req, res) => {
    try {
        const postInfos = await getPostInfos();
        if (postInfos) {
            res.send(postInfos);
        } else {
            res.sendStatus(404);
        }
    } catch (innerError) {
        const errorMessage = `Error during a list of Posts getting: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        console.error(error.message);

        // res.sendStatus(500);
        res.status(500);
        res.send(errorMessage);
    }
});

apiRoute.get('/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await getPost(postId);
        if (post) {
            res.send(post);
        } else {
            res.sendStatus(404);
        }
    } catch (innerError) {
        const errorMessage = `Error during a Post getting: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        console.error(error.message);

        // res.sendStatus(500);
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

        await setPost(uniqueId, title, content);

        if (elasticsearch.enable) {
            if (elasticsearch.local) {
                await index(uniqueId, title, content);
            } else {
                const message = new RabbitMQMessage(uniqueId, RabbitMQCommand.INDEX);
                const jsonMessage = JSON.stringify(message);
                await sendMessage(jsonMessage);
            }
        }

        res.sendStatus(200);
    } catch (innerError) {
        const errorMessage = `Error during a Post posting: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        console.error(error.message);

        // res.sendStatus(500);
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

        await deletePost(postId);

        if (elasticsearch.enable) {
            if (elasticsearch.local) {
                await esDeleteDocument(postId);
            } else {
                const message = new RabbitMQMessage(postId, RabbitMQCommand.DELETE);
                const jsonMessage = JSON.stringify(message);
                await sendMessage(jsonMessage);
            }
        }

        res.sendStatus(200);
    } catch (innerError) {
        const errorMessage = `Error during a Post deleting: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        console.error(error.message);

        // res.sendStatus(500);
        res.status(500);
        res.send(errorMessage);
    }
});

apiRoute.post('/search/', async (req, res) => {
    try {
        const text = req.body.text;

        const searchResult = await search(text);
        if (!searchResult) {
            throw new Error(`Empty elastic search response (${searchResult})`);
        }

        res.send(searchResult);
    } catch (innerError) {
        const errorMessage = `Error during a searching: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        console.error(error.message);

        res.status(500);
        res.send(errorMessage);
    }
});

module.exports = apiRoute;
