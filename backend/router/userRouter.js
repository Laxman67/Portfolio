import express from 'express';
import {
  register,
  login,
  logout,
  getUser,
  updateProfile,
  updatePassword,
  getUserForProfile,
  forgotPassword,
  resetPassword,
} from '../controller/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', isAuthenticated, logout);

userRouter.get('/me', isAuthenticated, getUser);
userRouter.put('/update/me', isAuthenticated, updateProfile);
userRouter.put('/update/password', isAuthenticated, updatePassword);
userRouter.get('/me/porfolio', getUserForProfile);
userRouter.post('/password/forget', isAuthenticated, forgotPassword);
userRouter.put('/password/reset/:token', isAuthenticated, resetPassword);

export default userRouter;
