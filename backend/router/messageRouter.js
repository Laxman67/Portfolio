import express from 'express';
import { getAllMessage, sendMessage } from '../controller/messageController.js';

const messageRouter = express.Router();

messageRouter.post('/send', sendMessage);
messageRouter.get('/getall', getAllMessage);

export default messageRouter;
