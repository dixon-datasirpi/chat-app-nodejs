const express = require('express');
const router = express.Router();
const rooms = require('./rooms.controller');


router.get('/:alertId', async (req, res) => {
    const [status, message, data] = await rooms.getRoomByAlertId(req.user, req.params.alertId, req.headers.authorization);
    return res.status(status).send({ message, data });
});


module.exports = {
    router
}
