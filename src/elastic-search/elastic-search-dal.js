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
        id:id,
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
    const { body } = await client.search({
        index: indexName,
        body: {
            query: {
                match: { quote: text }
            }
        }
    })
    console.log(body?.hits?.hits)
    return body?.hits?.hits;
}

module.exports = {
    index,
    search,
};
