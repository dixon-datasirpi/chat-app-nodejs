const mongoose = require("mongoose");
const { Schema, Document, model } = mongoose;


const RoomSchema = new Schema ({
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "messages",
    },
  ],
  users: [
    {
     type: String,
      // ref: "users",
      required: true,
    },
  ],
  unreadMessages: [
    {
      type: Schema.Types.ObjectId,
      // ref: "users",
      required: false,
    },
  ],
  createdBy: {
    type: String,
      // ref: "users",
      required: false,
  }
});

const Rooms = mongoose.model(
    'Rooms',
    RoomSchema,
    'rooms'
);

exports.create = function (users) {
    return Rooms.create({users});
};

exports.getRoomsByUserId = function (userId) {
    return Rooms.find({ users: {$all:userId} });
};

exports.getRoomsByQuery = function (query) {
    return Rooms.find(query);
};

exports.createRoomForGroup = function (users, userId) {
    return Rooms.create({ users: users, createdBy: userId})
}

exports.getRoomsById = function(id) {
    return Rooms.findById(id);
}