const { Post } = require("./schemas/Post");

const postsDal = {
    getAll: async () => {
        const ret = await Post.find({})
        return ret;
    },
};

module.exports = {
    postsDal,
};
