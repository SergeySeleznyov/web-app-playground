import { api_url } from "../config";

const requestPost = async (id) => {
    const url = `${api_url}/post/${id}`;
    const res = await fetch(url);
    const resBodyJson = await res.json();
    if (res.status !== 200)
        throw new Error(`Failed fetch post.`);
    return resBodyJson;
}

export default requestPost;