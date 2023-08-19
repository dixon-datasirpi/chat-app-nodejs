const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(200).send());


const user = require("./api/users")
const message = require("./api/messages")
const room = require('./api/rooms')


router.use('/message', message.router);
router.use('/user',  user.router);
router.use('/room', room.router);

module.exports = router;