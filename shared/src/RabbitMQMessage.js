// @ts-check
/** @module Post */

/**
 * Class representing a RabbitMQ message.
 */
class RabbitMQMessage {
    #postId = /** @type {string} */ ('');
    /**
     * @property {string} postId Getter of the id of the post.
     */
    get postId() {
        return this.#postId;
    }

    #command = /** @type {string} */ ('');
    /**
     * @property {string} command Getter of the  command applied to the post.
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

    /**
     * Serializes this instance of {@link RabbitMQMessage} class to JSON.
     * @method toJSON
     * @return {object} JSON representation of this instance of {@link RabbitMQMessage} class.
     */
    toJSON() {
        const json = {
            'postId': this.postId,
            'command': this.command,
        };
        return json;
    }

    /**
     * DeSerializes this instance of {@link RabbitMQMessage} class from JSON.
     * @method fromJSON
     * @static
     * @param {JSON} json - JSON representation of an instance of {@link RabbitMQMessage} class.
     * @return {RabbitMQMessage} New instance of {@link RabbitMQMessage} class created from json parameter.
     */
    static fromJSON(json) {
        const postId = json['postId'];
        const command = json['command'];
        const newInstance = new RabbitMQMessage(postId, command);
        return newInstance;
    }

    /**
     * Serializes this instance of {@link RabbitMQMessage} class to JSON string.
     * @method toString
     * @return {string} Stringified JSON representation of this instance of {@link RabbitMQMessage} class.
     */
    toString() {
        const json = this.toJSON();
        const jsonString = JSON.stringify(json);
        return jsonString;
    }

    /**
     * Serializes this instance of {@link RabbitMQMessage} class to JSON string.
     * @method toString
     * @static
     * @param {string} jsonString - Stringified JSON representation of an instance of {@link RabbitMQMessage} class.
     * @return {RabbitMQMessage} New instance of {@link RabbitMQMessage} class created from jsonString parameter.
     */
    static fromString(jsonString) {
        const json = JSON.parse(jsonString);
        const newInstance = RabbitMQMessage.fromJSON(json);
        return newInstance;
    }
}

module.exports = RabbitMQMessage;
