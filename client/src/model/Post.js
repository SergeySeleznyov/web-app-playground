// @ts-check
/** @module Post */

/** Class representing a post.*/
class Post {
    #id = /** @type {string} */ ('');
    /**
     * Get the id of the post.
     * @return {string} The id of the post.
     */
    get id() {
        return this.#id;
    }

    #title = /** @type {string} */ ('');
    /**
     * Get the title of the post.
     * @return {string} The title of the post.
     */
    get title() {
        return this.#title;
    }

    #content = /** @type {string} */ ('');
    /**
     * Get the content of the post.
     * @return {string} The content of the post.
     */
    get content() {
        return this.#content;
    }

    /**
     * Create a post.
     * @constructs Post
     * @param {string} id - The id of the post.
     * @param {string} title - The title of the post.
     * @param {string} content - The content of the post.
     */
    constructor(id = '', title = '', content = '') {
        this.#id = id;
        this.#title = title;
        this.#content = content;
    }
}

export default Post;
