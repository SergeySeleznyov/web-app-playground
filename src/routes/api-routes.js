
const express = require('express');
const { Post } = require('../schemas/Post');
const { getPostInfos, getPost } = require('../controllers/posts');
const apiRoute = express.Router();

apiRoute.get('/posts', async (req, res) => {
    try {
        const postInfos = await getPostInfos()
        if (postInfos) res.send(postInfos);

        else res.sendStatus(404);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

apiRoute.get('/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await getPost(postId)
        if (post) res.send(post);

        else res.sendStatus(404);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = apiRoute;
