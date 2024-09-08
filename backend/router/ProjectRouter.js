import express from 'express';
import {
  AddProject,
  deleteProject,
  getAllProject,
  updateProject,
  getSingleProject,
} from '../controller/projectController.js';
import { isAuthenticated } from '../middleware/auth.js';

const projectRouter = express.Router();

projectRouter.post('/add', isAuthenticated, AddProject);
projectRouter.delete('/delete/:id', isAuthenticated, deleteProject);
projectRouter.put('/update/:id', isAuthenticated, updateProject);
projectRouter.get('/getall', getAllProject);
projectRouter.get('/get/:id', getSingleProject);

export default projectRouter;
