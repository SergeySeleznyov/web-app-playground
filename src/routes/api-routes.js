
const express = require('express');
const { Post } = require('../schemas/Post');
const apiRoute = express.Router();

apiRoute.get('/posts', async (req, res) => {
    try{
        const posts = await Post.find({"title": "Blog post title #1"});
        if(posts) res.send(posts);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = apiRoute;
