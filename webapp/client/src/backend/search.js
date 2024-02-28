// @ts-check
import { apiUrl } from '../config';
import SearchResult from '../model/SearchResult';

/**
 * Searches Posts that contains the {@link text}
 * @param {string} text
 * @return {Promise<SearchResult[]>}
 */
const search = async (text) => {
    const url = `${apiUrl}/search`;
    const jsonBody = {
        text: text,
    };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonBody),
    };
    const res = await fetch(url, options);
    const resBodyJson = await res.json();
    if (res.status !== 200) {
        throw new Error(`Failed to get posts.`);
    }
    const searchResults = resBodyJson.map((i) => new SearchResult(i._id, i._source.title, i.highlight.content));
    return searchResults;
};

export default search;
