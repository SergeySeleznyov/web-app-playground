// @ts-check

const EventEmitter = require('node:events');
const amqplib = require('amqplib');
const config = require('./config');
const RabbitMQMessage = require('../../shared/src/model/RabbitMQMessage');

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
        console.log(`RabbitMQ connected.`); // TODO improve logging
        const _channel = await connection.createChannel();
        console.log(`RabbitMQ channel created.`); // TODO improve logging

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

        _channel.prefetch(1);
        _channel.consume(queueName, function(msg) {
            const jsonString = JSON.parse(msg?.content?.toString() || '');
            console.log(`RabbitMQ received message: ${jsonString}`);
            const rabbitMQMessage = RabbitMQMessage.fromString(jsonString);
            eventEmitter.emit(eventName, rabbitMQMessage);
        }, {
            noAck: true,
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
