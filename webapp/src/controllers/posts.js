const logger = require('../logger');
const {PostDTO} = require('../model/PostDTO');
const PostInfoDTO = require('../model/PostInfoDTO');

const mongoose = require('mongoose');
module.exports.mongoose = mongoose;
const {Post} = require('../../../shared/src/schemas/Post');
const {postsDal} = require('../../../shared/src/posts-dal');

const getPostInfos = async () => {
    try {
        logger.info(`[MongoDB] Document list getting...`);
        const postsDBO = await postsDal.getAll();
        const postInfos = postsDBO.map((i) => new PostInfoDTO(
            i.id,
            i.title,
        ));
        logger.info(`[MongoDB] Document list (count=${postInfos.length}) returned`);
        return postInfos;
    } catch (innerError) {
        const errorMessage = `getPostInfos controller: ${innerError.message}`;
        logger.error(errorMessage);

        const e = new Error(errorMessage, {cause: innerError});
        throw e;
    }
};

const getPost = async (id) => {
    try {
        logger.info(`[MongoDB] Document (id=${id}) getting...`);
        if (!id) {
            throw new Error(`Post id can't be empty.`);
        }

        const postDBO = await Post.findOne({'id': id});
        const postDTO = new PostDTO(postDBO.id, postDBO.title, postDBO.content);

        logger.info(`[MongoDB] Document returned.`);
        return postDTO;
    } catch (innerError) {
        const errorMessage = `getPost controller: ${innerError.message}`;
        logger.error(errorMessage);

        const e = new Error(errorMessage, {cause: innerError});
        throw e;
    }
};

const setPost = async (id, title, content) => {
    logger.info(`[MongoDB] Document (id=${id}) is about to be persisted in the DB...`);

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

        logger.info(`[MongoDB] Document persisted in the DB.`);
    }
};

const deletePost = async (id) => {
    logger.info(`[MongoDB] Document (id=${id}) is about to be deleted from the DB...`);
    await Post.deleteOne({id: id});
    logger.info(`[MongoDB] Document has been deleted from the DB.`);
};

module.exports = {
    getPostInfos,
    getPost,
    setPost,
    deletePost,
};
