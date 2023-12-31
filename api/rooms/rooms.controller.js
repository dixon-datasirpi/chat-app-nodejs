
const Room = require("./rooms.model");
const Message = require("../messages/messeges.model")

exports.createRoom = async (users) => {
    const isDuplicatedUser = !!([...new Set(users)].length);
    if (!isDuplicatedUser) {
        return [400, "same user cannot be in a room", {}];
    }
    const isRoomsAlreadyExists = (await Room.getRoomsByQuery({ users: { $in: users } }).length);
    if(isRoomsAlreadyExists) {
        return [400, 'Room already exists', {}];
    }
    const room = await Room.create(users);
    return[200, "Room created sucsessfully", room];
}

exports.get = async (userId) => {
    const roomLists = await Room.getRoomsByUserId(userId);
    if (!roomLists.length) {
        return [400, "No rooms found", {}];
    }
    return [200, "Rooms fetched successfully", roomLists];
}

exports.getRoomById = async (id) => {
    const room = await Room.getRoomsById(id);
    const messages = [];
    const messageIds = room.messages;
    for (const element of messageIds) {
        const mess = await Message.getMessagesByIds(element);
        messages.push(mess);
    }
    if(!room) {
        return [404, "Room not found", {}];
    }
    return [200, "Room fetched successfully", {room, messages}];
}

exports.createRoomForGroup = async (userId, users) => {
    let userIds = [];
    userIds = users;
    userIds.push(userId);
    const isGroupAlreadyExists = !!(await Room.getRoomsByQuery({users: {$in: userIds}, createdBy: userId}).length)   
    if(isGroupAlreadyExists) {
        return [400, "Same group already exists", {}];
    }
    const room = await Room.createRoomForGroup(userIds, userId);
    return [200, "Group chat created successfully", room];
}
