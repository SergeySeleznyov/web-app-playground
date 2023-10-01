
const express = require('express');
const { index, search } = require('../elastic-search/elastic-search-dal');
const { nanoid } = require('nanoid');
// eslint-disable-next-line new-cap
const apiRoute = express.Router();
const {
    getPostInfos,
    getPost,
    setPost,
    deletePost } = require('../controllers/posts');

apiRoute.get('/posts', async (req, res) => {
    try {
        const postInfos = await getPostInfos();
        if (postInfos) {
            res.send(postInfos);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
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
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

apiRoute.post('/post', async (req, res) => {
    try {
        const id = req.body.id;
        const title = req.body.title;
        const content = req.body.content;

        const uniqueId = id ? id : nanoid();

        await setPost(uniqueId, title, content);

        await index(uniqueId, title, content);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

apiRoute.delete('/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        await deletePost(postId);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

apiRoute.post('/search/', async (req, res) => {
    try {
        // const text = req.params.text; // GET
        const text = req.body.text;

        const searchResult = await search(text);
        if (!searchResult) {
            throw new Error(`Empty elastic search response (${searchResult})`);
        }

        res.send(searchResult);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send(err.message);
    }
});

module.exports = apiRoute;
