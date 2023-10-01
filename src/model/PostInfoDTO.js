/** Class representing PostInfo Data Transfer Object */
class PostInfoDTO {
    #_id = '';
    /** ID of PostInfo.*/
    get id() {
        return this.#_id;
    }

    #_title = '';
    /** Title of PostInfo.*/
    get title() {
        return this.#_title;
    }

    /** Create a class PostInfoDTO {
     * @param {string} id - The id of PostInfo
     * @param {string} title - The title of PostInfo
    */
    constructor(id, title) {
        this.#_id = id;
        this.#_title = title;
    }

    /** Returnes a JSON representation of the PostInfo.
     * @return {string} The JSON representation of the PostInfo.
    */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
        };
    }
}

module.exports = PostInfoDTO;
