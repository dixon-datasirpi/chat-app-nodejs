// import { io } from "../app"
// // // import { Socket } from 'socket.io'
// // import { UnreadMessages } from "../models/UnreadMessages"

// const Room = require("./api/rooms/rooms.model")

// io.on('connection', (socket) => {
//   console.log('A new user has been connected: ', socket.id)

//   socket.on('joinGroup', (data) => {
//     io.to(data.alertId)
//     // Store the mapping of group name or user ID to socket ID
//   });

//   socket.on('sendMessage', async ({ messageData, room }) => {

//     const roomData = await Room.getRoomByAlertId(messageData.assignedTo);
//     const newMessage = await Messages.createmessage(messageData);
   
//     await roomData.messages.push(newMessage);
//     await roomData.save();
//     io.to(room).emit('newMessage', { newMessage })
//   })
// })



