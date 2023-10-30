const logger = require('../logger');
const {PostDTO} = require('../model/PostDTO');
const PostInfoDTO = require('../model/PostInfoDTO');

const mongoose = require('mongoose');
module.exports.mongoose = mongoose;
const {Post} = require('../../../shared/src/schemas/Post');

const getPostInfos = async () => {
    try {
        const postsDBO = await Post.find({});
        const postInfos = postsDBO.map((i) => new PostInfoDTO(
            i.id,
            i.title,
        ));
        return postInfos;
    } catch (innerError) {
        const errorMessage = `getPostInfos controller: ${innerError.message}`;
        logger.error(errorMessage);

        const e = new Error(errorMessage, {cause: innerError});
        throw e;
    }
};

const getPost = async (postId) => {
    try {
        if (!postId) {
            throw new Error(`Post id can't be empty.`);
        }

        const postDBO = await Post.findOne({'id': postId});
        const postDTO = new PostDTO(postDBO.id, postDBO.title, postDBO.content);

        return postDTO;
    } catch (innerError) {
        const errorMessage = `getPost controller: ${innerError.message}`;
        logger.error(errorMessage);

        const e = new Error(errorMessage, {cause: innerError});
        throw e;
    }
};

const setPost = async (id, title, content) => {
    const exists = await Post.exists({id: id});
    if (exists) {
        await Post.updateOne(
            {
                id: id,
            },
            {
                title: title,
                content: content,
            },
        );
    } else {
        const postDTO = new PostDTO(id, title, content);
        const postDBO = postDTO.toDBO();
        await postDBO.save();
    }
};

const deletePost = async (id) => {
    await Post.deleteOne({id: id});
};

module.exports = {
    ...module.exports,
    getPostInfos,
    getPost,
    setPost,
    deletePost,
};
