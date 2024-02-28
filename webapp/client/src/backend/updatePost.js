// @ts-check
import { apiUrl } from '../config';

/**
 * Updates post by its id.
 * @param {string} id - The id of the post to load.
 * @param {string} title - The title of the post to load.
 * @param {string} content - The content of the post to load.
 * @return {Promise}
 */
const updatePost = async (id, title, content) => {
    const url = `${apiUrl}/post`;
    const jsonBody = {
        id,
        title,
        content,
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBody),
    };
    const res = await fetch(url, options);
    if (res.status !== 200) {
        throw new Error(`Failed to update post.`);
    }
};

export default updatePost;
