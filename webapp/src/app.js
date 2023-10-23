const express = require('express');
// eslint-disable-next-line new-cap
const app = new express();
const apiRoute = require('./routes/api-routes');
const cors = require('cors');
const {connectToDataBase, disconnectFromDatabse} = require('./app-mongodb');
const config = require('./config');
require('dotenv').config();

app.use(cors());

app.use(express.static('html'));

app.use(express.json({limit: '50mb'}));
app.use('/api', apiRoute);

(async () => {
    try {
        await connectToDataBase();
        app.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`);
        });
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
