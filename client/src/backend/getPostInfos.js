import {apiUrl} from '../config';

// TODO rename -> getPostInfos
const getPostInfos = async () => {
    const url = `${apiUrl}/posts`;
    const res = await fetch(url);
    const resBodyJson = await res.json();
    if (res.status !== 200) {
        throw new Error(`Failed to get posts.`);
    }
    return resBodyJson;
};

export default getPostInfos;
