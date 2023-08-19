const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const UnreadMessagesSchema = new Schema<IUnreadMessages>({
  user: {
    type: String,
    ref: 'users',
    required: true,
  },
  message: {
    type: Schema.Types.ObjectId,
    ref: 'messages',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'rooms',
    required: true,
  }
})

const UnreadMessages = model('unreadMessages', UnreadMessagesSchema)

export { UnreadMessages }
