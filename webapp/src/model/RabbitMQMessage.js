// @ts-check
/** @module Post */

/**
 * Class representing a RabbitMQ message.
 */
class RabbitMQMessage {
    #postId = /** @type {string} */ ('');
    /**
     * Get the id of the post.
     * @return {string} The id of the post.
     */
    get postId() {
        return this.#postId;
    }

    #command = /** @type {string} */ ('');
    /**
     * Get the id of the post.
     * @return {string} The id of the post.
     */
    get command() {
        return this.#command;
    }

    /**
     * Create a post.
     * @constructs Post
     * @param {string} postId - The id of the post.
     * @param {string} command - The command that has been applied to the post.
     */
    constructor(postId = '', command = '') {
        this.#postId = postId;
        this.#command = command;
    }
}

module.exports = RabbitMQMessage;
