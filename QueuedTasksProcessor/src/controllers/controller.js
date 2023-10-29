const RabbitMQCommand = require('../../../shared/src/RabbitMQCommand');

const mongoose = require('mongoose');
module.exports.mongoose = mongoose;
const {Post: PostMongoDBScheme} = require('../../../shared/src/schemas/Post');

const {
    index,
    deleteDocument: esDeleteDocument,
} = require('../../../shared/src/elastic-search-dal');

const dispatchCommand = async (message) => {
    try {
        const postId = message.postId;
        switch (message.command) {
        case RabbitMQCommand.INDEX:
            await indexDocument(postId);
            break;
        case RabbitMQCommand.DELETE:
            await deleteDocument(postId);
            break;
        default:
            break;
        }
    } catch (innerError) {
        const errorMessage = `Error during a rabbitMQ command dispatching: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        console.error(error.message);
    }
};

const indexDocument = async (postId) => {
    try {
        const postDBO = await PostMongoDBScheme.findOne({'id': postId});
        await index(postDBO.id, postDBO.title, postDBO.content);
    } catch (innerError) {
        const errorMessage = `Error during a document indexing: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        console.error(error.message);
    }
    console.log(`New document(${postId}) has been successfuly indexed.`);
};
const deleteDocument = async (postId) => {
    try {
        await esDeleteDocument(postId);
    } catch (innerError) {
        const errorMessage = `Error during a indexed document deleting: ${innerError.message}`;
        const error = new Error(errorMessage, {cause: innerError});
        console.error(error.message);
    }
    console.log(`Indexed document(${postId}) has been successfuly deleted.`);
};

module.exports = {
    ...module.exports,
    dispatchCommand,
};
