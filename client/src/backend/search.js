import { api_url } from "../config";

const search = async (text) => {
    const url = `${api_url}/search`;
    const jsonBody = {
        text: text
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBody)
    };
    const res = await fetch(url, options);
    const resBodyJson = await res.json();
    if (res.status !== 200)
        throw new Error(`Failed to get posts.`);
    return resBodyJson;
}

export default search;