// @ts-check

// const { amqplain } = require("amqplib/lib/credentials");
const amqplib = require('amqplib');
const config = require('./config');

// /** @typedef {require('./model/RabbitMQCommand').default} RabbitMQCommand */
/** @typedef {import('./model/RabbitMQMessage')} RabbitMQMessage */

const connectionString = config.rabbitmq.connection_string;
const queueName = config.rabbitmq.queue_name;
const channelReopenTimeout = config.rabbitmq.channelReopenTimeout;

let channel = null;

const createRabbitMQChannel = async (connectionString) => {
    try {
        if (channel !== null) return;

        const connection = await amqplib.connect(connectionString);
        console.log(`RabbitMQ connected.`); // TODO improve logging
        const _channel = await connection.createChannel();
        console.log(`RabbitMQ channel created.`); // TODO improve logging

        // TODO think about moving it after .on('error') and .on('close')
        await _channel.assertQueue(queueName, {
            durable: true,
        });
        console.log(`RabbitMQ queue asserted.`); // TODO improve logging

        _channel.on('error', function(err) {
            console.error('[AMQP] channel error', err.message); // TODO improve logging
        });

        _channel.on('close', function() {
            console.log('[AMQP] channel closed'); // TODO improve logging
            console.log('[AMQP] reconnecting...'); // TODO improve logging
            channel = null;

            return setTimeout(async () => {
                await createRabbitMQChannel(connectionString);
            }, channelReopenTimeout);
        });

        channel = _channel;
    } catch (err) {
        throw err;
    }
};

const initRabbitMQ = async () => await createRabbitMQChannel(connectionString);

(async () => {
    initRabbitMQ();
})();


/**
 * Sends a {@link message} to the RabbitMQ queue.
 * @param {RabbitMQMessage} message - The delay in milliseconds.
 */
const sendMessage = (message) => {
    if (!channel) {
        throw Error(`RabbitMQ Connection is not ready`);
        // TODO apply repeater
    }
    const undefinedConverterHelper = (key, value) => (value !== undefined) ? value : null;
    const serializedMessage = JSON.stringify(message, undefinedConverterHelper);
    channel.sendToQueue(queueName, Buffer.from(serializedMessage), {persistent: true});
    console.log(' [x] Sent %s', serializedMessage); // TODO improve logging
};

module.exports = {
    sendMessage,
};
