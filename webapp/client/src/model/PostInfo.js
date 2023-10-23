// @ts-check
/** @module PostInfo */

/**
 * Class representing an info about Post.
 */
class PostInfo {
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

    /**
     * Create a post.
     * @constructs Post
     * @param {string} id - The id of the post.
     * @param {string} title - The title of the post.
     */
    constructor(id = '', title = '') {
        this.#id = id;
        this.#title = title;
    }
}

export default PostInfo;
