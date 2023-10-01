const {Post} = require('../schemas/Post');
const PostInfoDTO = require('./PostInfoDTO');

class PostDTO extends PostInfoDTO {
    #_content = '';
    get content() {
        return this.#_content;
    }

    constructor(id, title, content) {
        super(id, title);
        this.#_content = content;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
        };
    }

    toDBO() {
        const args = {
            id: this.id,
            title: this.title,
            content: this.content,
        };
        const post = new Post(args);
        return post;
    }
}

module.exports = PostDTO;
