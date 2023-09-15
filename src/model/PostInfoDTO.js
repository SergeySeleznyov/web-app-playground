class PostInfoDTO {
    #_id = "";
    get id() { return this.#_id; }

    #_title = "";
    get title() { return this.#_title; }

    constructor(id, title) {
        this.#_id = id;
        this.#_title = title;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
        }
    }
}


module.exports = PostInfoDTO;
