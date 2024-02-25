// TODO try to rid of mongo here
const mongoose = require('mongoose');
module.exports.mongoose = mongoose;
require('../../../shared/src/schemas/Post');

const PostInfoDTO = require('./PostInfoDTO');

/** Class representing Post Data Transfer Object */
class PostDTO extends PostInfoDTO {
    #_content = '';
    /** Content of Post.*/
    get content() {
        return this.#_content;
    }

    /** Create a PostDTO.
     * @param {string} id - The id of Post
     * @param {string} title - The title of Post
     * @param {string} content - The content of Post
    */
    constructor(id, title, content) {
        super(id, title);
        this.#_content = content;
    }

    /** Returnes a JSON representation of the Post.
     * @return {string} The JSON representation of the Post.
    */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
        };
    }
}

module.exports = {
    ...module.exports, // INFO required for source sharing
    PostDTO,
};
