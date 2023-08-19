const express = require('express');
const router = express.Router();
const users = require('./user.controller');

router.post('/', async (req, res) => {
    console.log(req);
    const [status, message, data] = await users.createUser(req.body);
    return res.status(status).send({ message, data });
});

module.exports = {router}