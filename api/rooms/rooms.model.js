const mongoose = require("mongoose");
const { Schema, Document, model } = mongoose;


const RoomSchema = new Schema ({
  alertId: {
    type: String,
    required: true
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Messages",
    },
  ],
  users: [
    {
     type: String,
      // ref: "users",
      // required: true,
    },
  ],
  // unreadMessages: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     // ref: "users",
  //     required: false,
  //   },
  // ],
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

exports.create = function (payload) {
    return Rooms.create(payload);
};

exports.getRoomByAlertId = function (alertId) {
  return Rooms.findOne({ alertId: alertId});
};

exports.getRoomById = function(id) {
    return Rooms.findById(id).populate('Messages')
}