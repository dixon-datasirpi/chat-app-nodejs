const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
        ref: "users",
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "Rooms",
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
    received: {
        type: Boolean,
        default: true,
    },
    viewed: {
        type: Boolean,
        default: false,
    }
});


//   messageSchema.plugin(timestamps);
const Messages = mongoose.model(
    'Messages',
    messageSchema,
    'messages'
);

exports.createmessage = function (message) {
    return Messages.create(message);
};

exports.getMessagesWithPopulateUser = function () {
    return Messages.find().populate("users");
};

exports.getMessagesByIds = function(messageId) {
    messageId = mongoose.Types.ObjectId(messageId);
    return Messages.findById(messageId).lean();
} 
