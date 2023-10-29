const mongoose = module.parent.exports.mongoose;
const Schema = mongoose.Schema;

const postScheme = new Schema({
    id: {type: String, unique: true},
    title: String,
    content: String,
});

const Post = mongoose.model('Post', postScheme);

module.exports = {
    Post,
};
