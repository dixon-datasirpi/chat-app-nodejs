const socketIo = require('socket.io');

const Room = require("../api/rooms/rooms.model");
const Messages = require("../api/messages/messeges.model")

let io;
function initialize(server) {

    io = new socketIo.Server(server);

    io.on('connection', (socket) => {
        console.log('A new user has been connected: ', socket.id)

        socket.on('joinGroup', (data) => {
            console.log("joining group", data.alertId);
            socket.join(data.alertId)
            // Store the mapping of group name or user ID to socket ID
        });

        // socket.on('sendMessage', async ({ messageData, room }) => {
        //     const roomData = await Room.getRoomByAlertId(messageData.assignedTo);
        //     const newMessage = await Messages.createmessage(messageData)
        //     await roomData.messages.push(newMessage);
        //     await roomData.save();
        //     const roomMessages = await Messages.getMessagesByRoomId(room);
        //     const reponseData = {
        //         room: room,
        //         messages: roomMessages
        //     }
        //     io.emit('newMessage', reponseData)
        // })
    })
    return io;
}

function emitNewMessage() {
    return io;
}


module.exports = { initialize, emitNewMessage };