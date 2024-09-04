import User from '../models/userSchema.js';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/error.js';
import { v2 as cloudinary } from 'cloudinary';
import { generateToken } from '../utils/jwtToken.js';

export const register = catchAsyncErrors(async (req, res, next) => {
  // Check if files are provided
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler('Avatar and Resume are required', 400));
  }

  const { avatar, resume } = req.files;

  // Check for duplicate email
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(new ErrorHandler('Email is already registered', 400));
  }

  // Upload avatar to Cloudinary
  let cloudinaryResponseForAvatar;
  try {
    cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: 'AVATAR' }
    );
  } catch (error) {
    return next(new ErrorHandler('Failed to upload avatar to Cloudinary', 500));
  }

  // Upload resume to Cloudinary
  let cloudinaryResponseForResume;
  try {
    cloudinaryResponseForResume = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: 'RESUME' }
    );
  } catch (error) {
    return next(new ErrorHandler('Failed to upload resume to Cloudinary', 500));
  }

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    facebookURL,
    twitterURL,
  } = req.body;

  // Create new user
  try {
    const user = await User.create({
      fullName,
      email,
      phone,
      aboutMe,
      password,
      portfolioURL,
      githubURL,
      instagramURL,
      facebookURL,
      twitterURL,
      avatar: {
        public_id: cloudinaryResponseForAvatar.public_id,
        url: cloudinaryResponseForAvatar.secure_url,
      },
      resume: {
        public_id: cloudinaryResponseForResume.public_id,
        url: cloudinaryResponseForResume.secure_url,
      },
    });

    generateToken(user, 'User Created', 200, res);
  } catch (error) {
    return next(new ErrorHandler('Failed to register user', 500));
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return next(new ErrorHandler('Email and Password are Required', 400));
  }

  try {
    // Find by user
    const user = await User.findOne({ email }).select('+password');

    // If no email required

    if (!user) {
      return next(new ErrorHandler('Invalid Email or Password', 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Invalid Email or Password', 400));
    }

    generateToken(user, 'Logged In', 200, res);
  } catch (error) {
    return next(new ErrorHandler(error, 404));
  }
});
