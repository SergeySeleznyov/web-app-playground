const { Post } = require("./schemas/Post");

const list = async () => {
    const postInfoList = await Post.find({});
    return postInfoList;
};
const get = async (id) => {
    const post = await Post.findOne({'id': id});
    return post;
};
const exists = async (id) => {
    const postExists = await Post.exists({id: id});
    return postExists;
};
const set = async (postDTO) => {
    const postExists = await exists(postDTO.id);
    if (postExists) {
        await Post.updateOne(
            {
                id: postDTO.id,
            },
            {
                title: postDTO.title,
                content: postDTO.content,
            },
        );
    } else {
        const args = {
            id: postDTO.id,
            title: postDTO.title,
            content: postDTO.content,
        };
        const post = new Post(args);
        await post.save();
    }
};

const del = async (id) => {
    await Post.deleteOne({id: id});
};

module.exports = {
    list,
    get,
    set,
    del,
};
