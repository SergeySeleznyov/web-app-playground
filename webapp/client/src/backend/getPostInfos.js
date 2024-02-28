// @ts-check
import { apiUrl } from '../config';
import PostInfo from '../model/PostInfo';

/**
 * Loads infos about all the posts.
  * @return {Promise<PostInfo[]>}
 */
const getPostInfos = async () => {
    const url = `${apiUrl}/posts`;
    const res = await fetch(url);
    const resBodyJson = await res.json();
    if (res.status !== 200) {
        throw new Error(`Failed to get posts.`);
    }
    const postInfos = resBodyJson.map((i) => new PostInfo(i.id, i.title));
    return postInfos;
};

export default getPostInfos;
