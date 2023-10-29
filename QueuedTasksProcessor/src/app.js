const {connectToDataBase, disconnectFromDatabse} = require('./app-mongodb');
const {dispatchCommand} = require('./controllers/controller');
const {
    subscribe: subscribeToRabbitMQMessages,
    unSubscribe: unSubscribeFromRabbitMQMessages,
} = require('./app-rabbitmq');

(async () => {
    try {
        await connectToDataBase();
        subscribeToRabbitMQMessages(dispatchCommand);
    } catch (err) {
        return console.log(err);
    }
})();

process.on('SIGINT', async () => {
    unSubscribeFromRabbitMQMessages(dispatchCommand);
    await disconnectFromDatabse();
    console.log('The app was stopped.');
    process.exit();
});
