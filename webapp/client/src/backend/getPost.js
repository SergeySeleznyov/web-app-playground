// @ts-check
import { apiUrl } from '../config';
import Post from '../model/Post';

/**
 * Loads post by its id.
 * @param {string} id - The id of the post to load.
 * @return {Promise<Post>}
 */
const getPost = async (id) => {
    const url = `${apiUrl}/post/${id}`;
    const res = await fetch(url);
    const resBodyJson = await res.json();
    if (res.status !== 200) {
        throw new Error(`Failed to send post.`);
    }
    const post = new Post(resBodyJson.id, resBodyJson.title, resBodyJson.content);
    return post;
};

export default getPost;
