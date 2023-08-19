
const Messages = require('./messeges.model')
const Room =require('../rooms/rooms.model')

exports.creatMessaage = async (body) => {
    const { message, assignedTo, user } = body
    const newMessage = await Messages.createmessage({
      message, assignedTo, user
    })
    const room = await Room.getRoomsById(assignedTo);
    await room.messages.push(newMessage);
    await room.save();

    return [200, "Message created sucessfully", newMessage]
}

exports.get = async () => {
    const messages = await Messages.getMessagesWithPopulateUser();
    return [200, "Message fetched sucessfully", messages]
}