const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(200).send());


const user = require("./api/users")
const message = require("./api/messages")
const room = require('./api/rooms');
const {authenticate} = require('./authenticater')


router.use('/message', authenticate, message.router);
// router.use('/user', authenticate, user.router);
router.use('/room', authenticate, room.router);

module.exports = router;