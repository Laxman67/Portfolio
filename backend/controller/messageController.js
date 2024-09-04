import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/error.js';

import Message from '../models/messageSchema.js';

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { senderName, subject, message } = req.body;

  if (!sendMessage || !subject || !message) {
    return next(new ErrorHandler('Please Enter Full form'), 400);
  }
  const data = await Message.create({ senderName, subject, message });

  res.status(200).json({
    success: true,
    message: 'Message Sent',
    data,
  });
});

export const getAllMessage = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findById(id);

  if (!message) {
    return next(new ErrorHandler('Message Already Deleted', 400));
  }

  await message.deleteOne(); //Delete only the find one

  res.status(200).json({
    success: true,
    message: 'Message Deleted',
  });
});
