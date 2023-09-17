import { api_url } from "../config";

const deletePost = async (id) => {
    const url = `${api_url}/post/${id}`;
    const res = await fetch(
        url,
        { method: 'DELETE' }
    );
    if (res.status !== 200)
        throw new Error(`Failed to delete post.`);
}

export default deletePost
