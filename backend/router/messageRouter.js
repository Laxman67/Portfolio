import express from 'express';
import {
  getAllMessage,
  sendMessage,
  deleteMessage,
} from '../controller/messageController.js';
import { isAuthenticated } from '../middleware/auth.js';

const messageRouter = express.Router();

messageRouter.post('/send', sendMessage);
messageRouter.get('/getall', getAllMessage);
messageRouter.delete('/delete/:id', isAuthenticated, deleteMessage);

export default messageRouter;
