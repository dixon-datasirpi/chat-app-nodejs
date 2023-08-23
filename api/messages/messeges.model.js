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
    },
    assignedTo: {
        type: String,
        required: true,
    },
    senderName: {
        type: String,
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

const Messages = mongoose.model(
    'Messages',
    messageSchema,
    'messages'
);

exports.createmessage = function (payload) {
    return Messages.create(payload);
};

// exports.getMessagesByRoomId = function (alertId, limit = 10, page = 0) {
//     return Messages.find({assignedTo: alertId}).skip(limit * page).sort({ createdAt: -1 }).limit(10).lean();
// }

exports.getMessagesByRoomId = function (alertId) {
    return Messages.find({assignedTo: alertId}).sort({ createdAt: -1 }).lean();
}