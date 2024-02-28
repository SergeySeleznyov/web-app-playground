// @ts-check

const config = require('./config');
const logger = require('./logger');

// const { amqplain } = require("amqplib/lib/credentials");
const amqplib = require('amqplib');

// /** @typedef {require('./model/RabbitMQCommand').default} RabbitMQCommand */
/** @typedef {import('../../shared/src/model/RabbitMQMessage')} RabbitMQMessage */

const connectionString = config.rabbitmq.connection_string;
const queueName = config.rabbitmq.queue_name;
const channelReopenTimeout = config.rabbitmq.channelReopenTimeout;

let channel = null;

const createRabbitMQChannel = async (connectionString) => {
    if (config.isTest) return;

    try {
        if (channel !== null) return;

        const connection = await amqplib.connect(connectionString);
        logger.info(`[AMQP] connected.`);
        const _channel = await connection.createChannel();
        logger.info(`[AMQP] channel created.`);

        // TODO think about moving it after .on('error') and .on('close')
        await _channel.assertQueue(queueName, {
            durable: true,
        });
        logger.info(`[AMQP] queue asserted.`);

        _channel.on('error', function(err) {
            logger.error('[AMQP] channel error', err.message);
        });

        _channel.on('close', function() {
            logger.info('[AMQP] channel closed');
            logger.info('[AMQP] reconnecting...');
            channel = null;

            return setTimeout(async () => {
                await createRabbitMQChannel(connectionString);
            }, channelReopenTimeout);
        });

        channel = _channel;
    } catch (innerError) {
        const errorMessage = `createRabbitMQChannel Error: ${innerError.message}`;
        const error = new Error(errorMessage);
        logger.error(error);
        throw error;
    }
};

(async () => {
    if (config.isTest) return;

    const initRabbitMQ = async () => await createRabbitMQChannel(connectionString);
    initRabbitMQ();
})();


/**
 * Sends a {@link message} to the RabbitMQ queue.
 * @param {RabbitMQMessage} message - The delay in milliseconds.
 */
const sendMessage = (message) => {
    if (config.isTest) return;

    if (!channel) {
        throw Error(`RabbitMQ Connection is not ready`);
        // TODO apply repeater
    }
    const undefinedConverterHelper = (key, value) => (value !== undefined) ? value : null;
    const serializedMessage = JSON.stringify(message, undefinedConverterHelper);
    channel.sendToQueue(queueName, Buffer.from(serializedMessage), { persistent: true });
    logger.info(` [AMQP] Sent message=${serializedMessage}`);
};

module.exports = {
    sendMessage,
};
