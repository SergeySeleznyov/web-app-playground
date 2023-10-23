// @ts-check
/** @module SearchResult */

import Post from './Post';

/**
 * Class representing a result of a post searching.
 * @extends Post
*/
class SearchResult extends Post {
    /**
     * Create a SearchResult.
     * @constructs SearchResult
     * @param {string} id - The id of the post.
     * @param {string} title - The title of the post.
     * @param {string} content - The content of the post.
     */
    constructor(id = '', title = '', content = '') {
        super(id, title, content);
    }
}

export default SearchResult;
