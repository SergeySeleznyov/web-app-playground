const {sendMessage} = require('../app-rabbitmq');
const RabbitMQMessage = require('../../../shared/src/model/RabbitMQMessage');
const RabbitMQCommand = require('../../../shared/src/model/RabbitMQCommand');

const {elasticsearch} = require('../config');
const {Client} = require('@elastic/elasticsearch');
const client = new Client({
    node: elasticsearch.url,
    auth: {
        username: elasticsearch.login,
        password: elasticsearch.password,
    },
});
client.info()
    .then((response) => console.log(`Elastic Search connection check: ${JSON.stringify(response)}`))
    .catch((error) => console.error(`Elastic Search connection error: ${error}`));
module.exports.esClient = client;
const {
    index,
    search,
    deleteDocument: esDeleteDocument,
} = require('../../../shared/src/elastic-search-dal');

const indexDocument = async (uniqueId, title, content) => {
    if (elasticsearch.enable) {
        if (elasticsearch.local) {
            await index(uniqueId, title, content);
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
    return search(text);
};

module.exports = {
    indexDocument,
    deleteDocument,
    searchDocuments,
};
