import express from 'express';
import {
  postTimeline,
  deleteTimeline,
  getTimeline,
} from '../controller/timelineConroller.js';
import { isAuthenticated } from '../middleware/auth.js';

const timelineRouter = express.Router();

timelineRouter.post('/add', isAuthenticated, postTimeline);
timelineRouter.delete('/delete/:id', isAuthenticated, deleteTimeline);
timelineRouter.get('/getall', isAuthenticated, getTimeline);

export default timelineRouter;
