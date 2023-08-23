const express = require('express');

const router = express.Router();
const messages = require("./messages.controller");


router.post('/', async (req, res) => {
    const [status, message, data] = await messages.creatMessaage(req.user, req.body);
    return res.status(status).send({ message, data });
});

module.exports = {router};