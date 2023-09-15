import { api_url } from "../config";

const requestPostIDs = async () => {
    const url = `${api_url}/posts`;
    const res = await fetch(url);
    const resBodyJson = await res.json();
    if (res.status !== 200)
        throw new Error(`Failed fetch posts.`);
    return resBodyJson;
}

export default requestPostIDs;