const logger = require('../logger');
const { PostDTO } = require('../model/PostDTO');
const PostInfoDTO = require('../model/PostInfoDTO');

const mongoose = require('mongoose');
module.exports.mongoose = mongoose;
const postsDal = require('../../../shared/src/posts-dal');

const getPostInfos = async () => {
    try {
        logger.info(`[MongoDB] Document list getting...`);
        const postsDBO = await postsDal.list();
        const postInfos = postsDBO.map((i) => new PostInfoDTO(
            i.id,
            i.title,
        ));
        logger.info(`[MongoDB] Document list (count=${postInfos.length}) returned`);
        return postInfos;
    } catch (innerError) {
        const errorMessage = `getPostInfos controller: ${innerError.message}`;
        logger.error(errorMessage);

        const e = new Error(errorMessage, { cause: innerError });
        throw e;
    }
};

const getPost = async (id) => {
    try {
        logger.info(`[MongoDB] Document (id=${id}) getting...`);

        const postDBO = await postsDal.get(id);
        const postDTO = new PostDTO(postDBO.id, postDBO.title, postDBO.content);

        logger.info(`[MongoDB] Document returned.`);
        return postDTO;
    } catch (innerError) {
        const errorMessage = `getPost controller: ${innerError.message}`;
        logger.error(errorMessage);

        const e = new Error(errorMessage, { cause: innerError });
        throw e;
    }
};

const setPost = async (id, title, content) => {
    try {
        logger.info(`[MongoDB] Document (id=${id}) is about to be persisted in the DB...`);

        const postDTO = new PostDTO(id, title, content);
        await postsDal.set(postDTO);

        logger.info(`[MongoDB] Document persisted in the DB.`);
    } catch (innerError) {
        const errorMessage = `setPost controller: ${innerError.message}`;
        logger.error(errorMessage);

        const e = new Error(errorMessage, { cause: innerError });
        throw e;
    }
};

const deletePost = async (id) => {
    try {
        logger.info(`[MongoDB] Document (id=${id}) is about to be deleted from the DB...`);
        await postsDal.del(id);
        logger.info(`[MongoDB] Document has been deleted from the DB.`);
    } catch (innerError) {
        const errorMessage = `deletePost controller: ${innerError.message}`;
        logger.error(errorMessage);

        const e = new Error(errorMessage, { cause: innerError });
        throw e;
    }
};

module.exports = {
    ...module.exports, // INFO required for source sharing
    getPostInfos,
    getPost,
    setPost,
    deletePost,
};
