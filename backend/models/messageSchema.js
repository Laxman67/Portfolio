import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    senderName: {
      type: String,
      minLength: [2, 'Name must contain at least two characters!'],
      required: [true, 'Sender name is required!'],
    },
    subject: {
      type: String,
      minLength: [2, 'Subject must contain at least two characters!'],
      required: [true, 'Subject is required!'],
    },
    message: {
      type: String,
      minLength: [2, 'Message must contain at least two characters!'],
      required: [true, 'Message is required!'],
    },
  },
  {
    timestamps: true, // This will automatically create 'createdAt' and 'updatedAt' fields
  }
);

// You may also want to create and export a model
const Message = model('Message', messageSchema);

export default Message;
