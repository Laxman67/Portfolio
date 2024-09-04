import User from '../models/userSchema.js';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/error.js';

import JWT from 'jsonwebtoken';

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies;

  if (!token) {
    return next(new ErrorHandler('User is not Authenticated', 400));
  }
  const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  // TODO
  console.log(req.user);
  next();
});
