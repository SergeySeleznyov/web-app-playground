const {Post} = require('../../../shared/src/schemas/Post');
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

    /** Returnes a JSON representation of the Post.
    * @return {Post} Representation object of the Post class.
    */
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
