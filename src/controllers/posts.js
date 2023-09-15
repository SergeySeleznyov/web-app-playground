const PostDTO = require("../model/PostDTO");
const PostInfoDTO = require("../model/PostInfoDTO");
const { Post } = require("../schemas/Post");

const getPostInfos = async () => {
    try {
        const postsDBO = await Post.find({});
        const postInfos = postsDBO.map(i => new PostInfoDTO(
            i.id,
            i.title,
        ));
        return postInfos;
    }
    catch (innerError) {
        const errorMessage = `getPostInfos controller: ${innerError.message}`;
        console.log(errorMessage);

        const e = new Error(errorMessage, {cause: innerError});
        throw e;
    }
};

const getPost = async (postId) => {
    try {
        if (!postId)
            throw new Error(`Post id can't be empty.`);

        const postDBO = await Post.findOne({ "id": postId });
        const postDTO = new PostDTO(postDBO.id, postDBO.title, postDBO.content);

        return postDTO;
    }
    catch (innerError) {
        const errorMessage = `getPost controller: ${innerError.message}`;
        console.log(errorMessage);

        const e = new Error(errorMessage, {cause: innerError});
        throw e;
    }
};

module.exports = {
    getPostInfos,
    getPost
};
