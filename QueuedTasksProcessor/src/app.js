// TODO npm delete express
const {connectToDataBase, disconnectFromDatabse} = require('./app-mongodb');
const {subscribe} = require('./app-rabbitmq');

(async () => {
    try {
        await connectToDataBase();
        subscribe(); // TODO Replace with real usage
    } catch (err) {
        return console.log(err);
    }
})();

// Wait fot (ctrl-c)
process.on('SIGINT', async () => {
    await disconnectFromDatabse();
    console.log('The app was stopped.');
    process.exit();
});
