import { api_url } from "../config";

const deletePost = async (id) => {
    const url = `${api_url}/post/${id}`;
    const res = await fetch(
        url,
        { method: 'DELETE' }
    );
    const resBodyJson = await res.json();
    if (res.status !== 200)
        throw new Error(`Failed to delete post.`);
    return resBodyJson;
}

export default deletePost
