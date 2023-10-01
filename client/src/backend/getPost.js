import {apiUrl} from '../config';

const getPost = async (id) => {
    const url = `${apiUrl}/post/${id}`;
    const res = await fetch(url);
    const resBodyJson = await res.json();
    if (res.status !== 200) {
        throw new Error(`Failed to send post.`);
    }
    return resBodyJson;
};

export default getPost;
