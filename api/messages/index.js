const express = require('express');

const router = express.Router();
const messages = require("./messages.controller");


router.post('/', async (req, res) => {
    const [status, message, data] = await messages.creatMessaage(req.body);
    return res.status(status).send({ message, data });
});

router.get('/list', async (req, res) => {
    const [status, message, data] = await messages.get();
    return res.status(status).send({ message, data });
});

module.exports = {router};