import express from 'express';
import {
  addNewApplication,
  deleteApplication,
  getAllApplications,
} from '../controller/softwareApplicationComponent.js';
import { isAuthenticated } from '../middleware/auth.js';

const softwareApplicationRouter = express.Router();

softwareApplicationRouter.post('/add', isAuthenticated, addNewApplication);
softwareApplicationRouter.delete(
  '/delete/:id',
  isAuthenticated,
  deleteApplication
);
softwareApplicationRouter.get('/getall', getAllApplications);

export default softwareApplicationRouter;
