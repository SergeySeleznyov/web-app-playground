import { api_url } from "../config";

const updatePost = async (id, title, content) => {
    const url = `${api_url}/post`;
    const jsonBody = {
        id,
        title,
        content
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBody)
    };
    const res = await fetch(url, options);
    if (res.status !== 200)
        throw new Error(`Failed to update post.`);
}

export default updatePost
