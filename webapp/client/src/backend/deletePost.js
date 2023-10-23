// @ts-check
import {apiUrl} from '../config';

/**
 * Deleted post by its id.
 * @param {string} id - The id of the post to delete.
 * @return {Promise}
 */
const deletePost = async (id) => {
    const url = `${apiUrl}/post/${id}`;
    const res = await fetch(
        url,
        {method: 'DELETE'},
    );
    if (res.status !== 200) {
        throw new Error(`Failed to delete post.`);
    }
};

export default deletePost;
