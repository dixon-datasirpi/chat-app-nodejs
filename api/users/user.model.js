const mongoose = require('mongoose');
const { Schema, Document, model } = mongoose;


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  isOnline: {
    type: Boolean,
    required: true,
    default: true,
  },
  lastOnline: {
    type: Date,
    required: true,
    default: Date.now,
  },
 
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Users = mongoose.model(
    'Users',
    UserSchema,
    'users'
);

exports.create = function (users) {
    return Users.create(users);
};

exports.getUserByUserId = function(userId) {
    return Users.findOne({userId : userId});
}