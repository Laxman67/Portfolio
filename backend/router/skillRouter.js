import express from 'express';
import {
  addNewSkill,
  deleteSkill,
  getAllSkills,
  updateSkill,
} from '../controller/skillController.js';
import { isAuthenticated } from '../middleware/auth.js';

const skillsRouter = express.Router();

skillsRouter.post('/add', isAuthenticated, addNewSkill);
skillsRouter.delete('/delete/:id', isAuthenticated, deleteSkill);
skillsRouter.put('/update/:id', isAuthenticated, updateSkill);
skillsRouter.get('/getall', getAllSkills);

export default skillsRouter;
