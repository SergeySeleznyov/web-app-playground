
const express = require('express');
const apiRoute = express.Router();

apiRoute.get('/', (req, res) => {
    const json = {
        "status": "success",
        "result": "42",
    };
    res.send(json);
});

module.exports = apiRoute;
