import User from '../models/userSchema.js';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/error.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('User is not authenticated', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    // If user is not Found
    if (!req.user) {
      return next(new ErrorHandler('User not found', 404));
    }

    // actually we're passing req. object in next so that we can extract it out to next middleware
    next();
  } catch (error) {
    return next(new ErrorHandler('Invalid or expired token', 401)); // Handle token errors
  }
});
