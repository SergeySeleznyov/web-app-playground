const { Client } = require('@elastic/elasticsearch');
const config = require('../config');


const client = new Client({
    node: config.elasticsearch.url,
    auth: {
        username: config.elasticsearch.login,
        password: config.elasticsearch.password,
    },
});

client.info()
    .then(response => console.log(`Elastic Search connection check: ${JSON.stringify(response)}`))
    .catch(error => console.error(`Elastic Search connection error: ${error}`))

const indexName = 'blog-index';

const index = async (id, title, content) => {
    const document = {
        id: id,
        index: indexName,
        body: {
            title,
            content,
        }
    };
    const options = {
        // id
    };
    const response = await client.index(document, options);
    console.log(` Elastic Search index response=${JSON.stringify(response)}`);
    return response;
}

const search = async (text) => {
    const document = {
        index: indexName,
        allow_partial_search_results: true,
        query: {
            match_phrase: { content: text }
        },
        // fields: [
        //     "title^1",
        //     "content^2"
        // ],
        highlight: {
            type: "plain", //'plain' | 'fvh' | 'unified'
            max_analyzed_offset: 10000000,
            number_of_fragments: 1,
            fragmenter: "simple", //"simple", "span"
            fragment_size: 200,
            // phrase_limit: 256, // Controls the number of matching phrases in a document that are considered.
            pre_tags: ["<highlight>"],
            post_tags: ["</highlight>"],
            encoder: 'html', // 'default' | 'html'
            fields: {
                content: {},
                title: {}
            },

        }
    };
    const response = await client.search(document);
    return response?.hits?.hits.map(i => { i._source.content = ''; return i });
    // return response;
}

module.exports = {
    index,
    search,
};
