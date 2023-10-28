const {Client} = require('@elastic/elasticsearch');
const config = require('../config');


const client = new Client({
    node: config.elasticsearch.url,
    auth: {
        username: config.elasticsearch.login,
        password: config.elasticsearch.password,
    },
});

client.info()
    .then((response) => console.log(`Elastic Search connection check: ${JSON.stringify(response)}`))
    .catch((error) => console.error(`Elastic Search connection error: ${error}`));

const indexName = 'blog-index';
// TODO Rename to IndexDocument
const index = async (id, title, content) => {
    const document = {
        id: id,
        index: indexName,
        body: {
            title,
            content,
        },
    };
    const response = await client.index(document);
    console.log(` Elastic Search index response=${JSON.stringify(response)}`);
    return response;
};

const getAllIndexedDocumentInfos = async () => {
    const queryAllDocuments = {
        match_all: {},
    };
    const result = await getIndexedDocumentInfos(queryAllDocuments);
    console.log(` Elastic Search count response=${JSON.stringify(result)}`);
    return result;
};
const getIndexedDocumentInfos = async (query) => {
    const searchRequest = {
        index: indexName,
        query: query,
        fields: [
            'id',
            'title',
        ],
    };
    const response = await client.search(searchRequest);
    const result = response?.hits?.hits.map((res) => ({
        'id': res._id,
        'title': res.fields['title'].join(','),
    }));
    return result;
};
const search = async (text) => {
    const query = {
        // match_phrase: { content: text } // Nearly whole phrase
        match: {content: text},
    };
    const response = await searchQuery(query);
    return response;
};
const searchQuery = async (query) => {
    const searchRequest = {
        index: indexName,
        allow_partial_search_results: true,
        query: query,
        // fields: [
        //     "title^1",
        //     "content^2"
        // ],
        highlight: {
            type: 'plain', // 'plain' | 'fvh' | 'unified'
            max_analyzed_offset: 10000000,
            number_of_fragments: 1,
            fragmenter: 'simple', // "simple", "span"
            fragment_size: 256,
            // phrase_limit: 256, // Controls the number of matching phrases in a document that are considered.
            // pre_tags: ["<em>"],
            // post_tags: ["</em>"],
            encoder: 'html', // 'default' | 'html'
            fields: {
                content: {},
                title: {},
            },

        },
    };
    const response = await client.search(searchRequest);
    return response?.hits?.hits.map((i) => {
        i._source.content = ''; return i;
    });
};

module.exports = {
    index,
    search,
    getAllIndexedDocumentInfos,
};
