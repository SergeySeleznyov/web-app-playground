
const express = require('express');
const { Post } = require('../schemas/Post');
const { getPostInfos, getPost, setPost, deletePost } = require('../controllers/posts');
const PostDTO = require('../model/PostDTO');
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

apiRoute.post('/post', async (req, res) => {
    try {
        const id = req.body.id;
        const title = req.body.title;
        const content = req.body.content;

        await setPost(id, title, content);

        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

apiRoute.delete('/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        await deletePost(postId);

        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = apiRoute;
