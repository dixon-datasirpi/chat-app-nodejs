const express = require('express');
const router = express.Router();
const rooms = require('./rooms.controller');


router.post('/group/:userId', async (req, res) => {
    console.log(req.body);
    const [status, message, data] = await rooms.createRoomForGroup(req.params.userId, req.body.users);
    return res.status(status).send({ message, data });
});


router.post('/', async (req, res) => {
    const [status, message, data] = await rooms.createRoom(req.body.users);
    return res.status(status).send({ message, data });
});


router.get('/list/:userId', async (req, res) => {
    const [status, message, data] = await rooms.get(req.params.userId);
    return res.status(status).send({ message, data });
});

router.get('/:id', async (req, res) => {
    const [status, message, data] = await rooms.getRoomById(req.params.id);
    return res.status(status).send({ message, data });
});


module.exports = {
    router
}
