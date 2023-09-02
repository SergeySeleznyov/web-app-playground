const express = require("express");
const app = new express();
const apiRoute = require('./routes/api');
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.use(express.static('html'));

app.use('/api', apiRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
