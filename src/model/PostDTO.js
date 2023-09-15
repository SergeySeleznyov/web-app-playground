const PostInfoDTO = require("./PostInfoDTO");

class PostDTO extends PostInfoDTO {
    #_content = "";
    get content() { return this.#_content; }

    constructor(id, title, content) {
        super(id, title)
        this.#_content = content;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
        }
    }
}

module.exports = PostDTO;
