import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/error.js';
import Project from '../models/projectSchema.js';
import cloudinary from 'cloudinary';

export const AddProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler('Project Banner  is Reqiured', 400));
  }

  const { projectBanner } = req.files;
  // Upload svg to Cloudinary
  let cloudinaryResponseForSVG;
  try {
    cloudinaryResponseForSVG = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: 'PROJECT IMAGES' }
    );
  } catch (error) {
    return next(
      new ErrorHandler('Failed to upload Project Bannner to Cloudinary', 500)
    );
  }

  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
  } = req.body;

  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !technologies ||
    !stack ||
    !deployed
  ) {
    return next(new ErrorHandler('Please Provide all Fields', 400));
  }

  try {
    const project = await Project.create({
      title,
      description,
      gitRepoLink,
      projectLink,
      technologies,
      stack,
      deployed,
      projectBanner: {
        public_id: cloudinaryResponseForSVG.public_id,
        url: cloudinaryResponseForSVG.secure_url,
      },
    });
    res.status(201).json({
      success: true,
      message: 'New Project Added',
    });
  } catch (error) {
    return next(new ErrorHandler(error, message, 400));
  }
});
export const deleteProject = catchAsyncErrors(async (req, res, next) => {});
export const updateProject = catchAsyncErrors(async (req, res, next) => {});
export const getAllProject = catchAsyncErrors(async (req, res, next) => {});
export const getSingleProject = catchAsyncErrors(async (req, res, next) => {});
