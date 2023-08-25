
const Messages = require('./messeges.model')
const Room = require('../rooms/rooms.model')
const socket = require('../../socket-config/socket.config');

exports.creatMessaage = async (user, body) => {
  const room = await Room.getRoomByAlertId(body.assignedTo);
  if (!room) {
    return [404, "Room  not available", {}]
  }
  const isAvailableUser = (room.users.filter(_ => (_ == user.userId)));
  if (!isAvailableUser) {
    return [400, "you are not supposed to be here", {}];
  }
  body.user = user.userId;
  body.senderName = user.name
  const newMessage = await Messages.createmessage(body);
  const [, , roomMessages] = await Promise.all([room.messages.push(newMessage), room.save(), Messages.getMessagesByRoomId(room.alertId)])
  const reponseData = {
    room: room,
    messages: roomMessages
  }
  const ioInstance = socket.emitNewMessage();
  room.users.forEach(user => {
    ioInstance.emit(user+room.alertId, reponseData)
  });
  return [200, "Message created sucessfully", newMessage]
}