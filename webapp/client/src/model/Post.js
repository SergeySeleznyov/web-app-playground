// @ts-check
/** @module Post */

import PostInfo from './PostInfo';

/**
 * Class representing a post.
  @extends PostInfo
 */
class Post extends PostInfo {
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
        super(id, title);
        this.#content = content;
    }
}

export default Post;
