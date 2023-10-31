// @ts-check

const EventEmitter = require('node:events');
const amqplib = require('amqplib');
const config = require('./config');
const RabbitMQMessage = require('../../shared/src/model/RabbitMQMessage');
const logger = require('./logger');

// /** @typedef {require('./model/RabbitMQCommand').default} RabbitMQCommand */
// /** @typedef {import('./model/RabbitMQMessage')} RabbitMQMessage */

const connectionString = config.rabbitmq.connection_string;
const queueName = config.rabbitmq.queue_name;
const channelReopenTimeout = config.rabbitmq.channelReopenTimeout;

const eventEmitter = new EventEmitter();
const eventName = 'message';

let channel = null;
const createRabbitMQChannel = async (connectionString) => {
    try {
        if (channel !== null) return;

        const connection = await amqplib.connect(connectionString);
        logger.info(`[AMQP] connected.`);
        const _channel = await connection.createChannel();
        logger.info(`[AMQP] channel created.`);

        _channel.on('error', function(err) {
            logger.error('[AMQP] channel error', err.message);
        });

        _channel.on('close', function() {
            logger.info('[AMQP] channel closed. Reconnecting...');
            channel = null;

            return setTimeout(async () => {
                await createRabbitMQChannel(connectionString);
            }, channelReopenTimeout);
        });

        _channel.prefetch(1);
        _channel.consume(queueName, function(msg) {
            const jsonString = JSON.parse(msg?.content?.toString() || '');
            logger.info(`[AMQP] received message: ${jsonString}`);
            const rabbitMQMessage = RabbitMQMessage.fromString(jsonString);
            eventEmitter.emit(eventName, rabbitMQMessage);
        }, {
            noAck: true,
        });

        channel = _channel;
    } catch (innerError) {
        const errorMessage = `createRabbitMQChannel Error: ${innerError.message}`;
        const error = new Error(errorMessage);
        logger.error(error);
        throw error;
    }
};

const initRabbitMQ = async () => await createRabbitMQChannel(connectionString);

(async () => {
    initRabbitMQ();
})();


const subscribe = (handler) => {
    if (!handler) return;

    eventEmitter.on(eventName, (message) => {
        handler(message);
    });
};
const unSubscribe = (handler) => {
    eventEmitter.removeListener(eventName, handler);
};

module.exports = {
    subscribe,
    unSubscribe,
};
