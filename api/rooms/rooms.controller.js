
const Room = require("./rooms.model");
const Message = require("../messages/messeges.model")
const keycloakService = require('../../services/keyClaokService')

exports.getRoomByAlertId = async (user, alertId, token) => {
    const room = await Room.getRoomByAlertId(alertId);
    if (!room) {
        let userDetails = await keycloakService.getUsersFromKeyCloak(token);
        userDetails = userDetails.payload.map(_ => _.id)
        if(!userDetails.length) {
          return [400, "No users found in keyCloak", {}];
        }
        const roomPayload = {
            alertId: alertId,
            users: userDetails,
            createdBy: user.userId
        }
        const createdRoom = await Room.create(roomPayload);
        return [200, "New room created successFully", createdRoom]
    }
    const isAvailableUser = !!(room.users.find(_ => (_ === user.userId)));
    if(!isAvailableUser) {
        [400, "you are not supposed to be here", {}];
    }
    const roomMessages = await Message.getMessagesByRoomId(alertId);
    const reponseData = { 
        room: room,
        messages: roomMessages
    }
   return [200, "room and messages fetched successfully", reponseData]
}
