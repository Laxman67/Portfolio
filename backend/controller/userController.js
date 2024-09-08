import User from '../models/userSchema.js';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/error.js';
import { v2 as cloudinary } from 'cloudinary';
import { generateToken } from '../utils/jwtToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';

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

export const logout = catchAsyncErrors(async (req, res, next) => {
  // const { token } = req.cookies;

  res
    .status(200)
    .cookie('token', '', { expires: new Date(Date.now()), httpOnly: true })
    .json({
      message: 'Logged Out',
      success: true,
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    portfolioURL: req.body.portfolioURL,
    githubURL: req.body.githubURL,
    instagramURL: req.body.instagramURL,
    facebookURL: req.body.facebookURL,
    twitterURL: req.body.twitterURL,
  };

  // Check for Files Update Reqest
  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    /*
req.user={
  ....
  ....
  id:zyx.....
}

*/
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;

    // To delete exisiting One
    await cloudinary.uploader.destroy(profileImageId);

    // Upload avatar to Cloudinary
    let cloudinaryResponseForAvatar;
    try {
      cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        { folder: 'AVATAR' }
      );

      newUser.avatar = {
        public_id: cloudinaryResponseForAvatar.public_id,
        url: cloudinaryResponseForAvatar.secure_url,
      };
    } catch (error) {
      return next(
        new ErrorHandler('Failed to upload avatar to Cloudinary', 500)
      );
    }
  }

  // Check for Resume Update Reqest
  if (req.files && req.files.resume) {
    const resume = req.files.resume;

    const user = await User.findById(req.user.id);
    const resumeId = user.resume.public_id;
    // To delete exisiting One
    await cloudinary.uploader.destroy(resumeId);

    // Upload avatar to Cloudinary
    let cloudinaryResponseForResume;
    try {
      cloudinaryResponseForResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        { folder: 'RESUME' }
      );

      // Save tobe Update

      newUser.resume = {
        public_id: cloudinaryResponseForResume.public_id,
        url: cloudinaryResponseForResume.secure_url,
      };
    } catch (error) {
      return next(
        new ErrorHandler('Failed to upload Resume to Cloudinary', 500)
      );
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: 'Profile Updated',
    user,
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler('Please Fill All Fields', 404));
  }

  const user = await User.findById(req.user.id).select('+password');
  const isPasswordMatched = await user.comparePassword(currentPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Incorrect Current Password', 404));
  }

  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler(' New Password and Confirm Password do not Match', 404)
    );
  }

  // Update Password
  user.password = newPassword;
  // Then Save =>is Must
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password Updated',
  });
});

export const getUserForProfile = catchAsyncErrors(async (req, res, next) => {
  const id = '66d8943362e03a7ecd909025';
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user,
  });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler('User not Found', 404));
  }
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = ` ${process.env.DASHBOARD_URL}/password/reset/${resetToken}`;

  const message = `Your Password recovery link : \n\n ${resetPasswordURL} \n  If you've not requested Please Ignore`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Personal Portfolio Dashboard Recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to  ${user.email} successfuly`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;

  //  fetch passed token and convert then check for matched
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler('Reset Password token is invalid or Expired', 404)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler('Password and Confirm Password do not Match', 404)
    );
  }

  user.password = req.body.confirmPassword;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  generateToken(user, 'Reset Password Successfully', 200, res);
});
