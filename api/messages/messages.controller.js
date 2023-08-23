
const Messages = require('./messeges.model')
const Room = require('../rooms/rooms.model')

exports.creatMessaage = async (user, body) => {
  const room = await Room.getRoomByAlertId(body.assignedTo);
  if(!room) {
    return [404, "Room  not available", {}]
  }
  const isAvailableUser = !!(room.users.find(_ => (_ === user.userId)));
  if(!isAvailableUser) {
     return [400, "you are not supposed to be here", {}];
  }
  body.user = user.userId;
  body.senderName = user.name
  const newMessage = await Messages.createmessage(body)

  await room.messages.push(newMessage);
  await room.save();

  return [200, "Message created sucessfully", newMessage]
}