const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postScheme = new Schema({
    title: String,
    content: String,
});

const Post = mongoose.model("Post", postScheme);

module.exports = {
    Post
}
