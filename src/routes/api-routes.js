
const express = require('express');
const { Post } = require('../schemas/Post');
const apiRoute = express.Router();

apiRoute.get('/posts', async (req, res) => {
    try{
        const postsDBO = await Post.find({});
        const posts = postsDBO.map(i => ({
            id: i.id
        }));
        if(posts) res.send(posts);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

apiRoute.get('/post/:id', async (req, res) => {
    try{
        const postId = req.params.id;
        if(!postId)
            throw new Error(`Post id can't be empty.`);
        const post = await Post.find({"id": postId});
        if(post) res.send(post);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = apiRoute;
