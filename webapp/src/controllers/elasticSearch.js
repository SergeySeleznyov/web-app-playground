const logger = require('../logger');
const {sendMessage} = require('../app-rabbitmq');
const RabbitMQMessage = require('../../../shared/src/model/RabbitMQMessage');
const RabbitMQCommand = require('../../../shared/src/model/RabbitMQCommand');

const {elasticsearch} = require('../config');
const {Client} = require('@elastic/elasticsearch');

const initElasticSearchClient = () => {
    const client = new Client({
        node: elasticsearch.url,
        auth: {
            username: elasticsearch.login,
            password: elasticsearch.password,
        },
    });
    client.info()
        .then((response) => logger.info(`Elastic Search connection check: ${JSON.stringify(response)}`))
        .catch((error) => logger.error(`Elastic Search connection error: ${error}`));
    return client;
};
const client = elasticsearch.enable ? initElasticSearchClient() : null;
module.exports.esClient = client;
const {
    indexDocument: esIndexDocument,
    search: esSearch,
    deleteDocument: esDeleteDocument,
} = require('../../../shared/src/elastic-search-dal');

const indexDocument = async (uniqueId, title, content) => {
    if (elasticsearch.enable) {
        if (elasticsearch.local) {
            await esIndexDocument(uniqueId, title, content);
        } else {
            const message = new RabbitMQMessage(uniqueId, RabbitMQCommand.INDEX);
            const jsonMessage = JSON.stringify(message);
            await sendMessage(jsonMessage);
        }
    }
};

const deleteDocument = async (postId) => {
    if (elasticsearch.enable) {
        if (elasticsearch.local) {
            await esDeleteDocument(postId);
        } else {
            const message = new RabbitMQMessage(postId, RabbitMQCommand.DELETE);
            const jsonMessage = JSON.stringify(message);
            await sendMessage(jsonMessage);
        }
    }
};

const searchDocuments = async (text) => {
    return esSearch(text);
};

module.exports = {
    indexDocument,
    deleteDocument,
    searchDocuments,
};
