import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/error.js';
import Skills from '../models/skillSchema.js';
import cloudinary from 'cloudinary';

export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler('Skill SVG is Reqiured', 400));
  }

  const { svg } = req.files;
  // Upload svg to Cloudinary
  let cloudinaryResponseForSVG;
  try {
    cloudinaryResponseForSVG = await cloudinary.uploader.upload(
      svg.tempFilePath,
      { folder: 'PORTFOLIO_SKILLS_SVGS' }
    );
  } catch (error) {
    return next(new ErrorHandler('Failed to upload svg to Cloudinary', 500));
  }

  try {
    // Title and Proficiency
    const { title, proficiency } = req.body;

    if (!title || !proficiency) {
      return next(new ErrorHandler('Please Provide All fields details', 500));
    }
    const skill = await Skills.create({
      title,
      proficiency,
      svg: {
        public_id: cloudinaryResponseForSVG.public_id,
        url: cloudinaryResponseForSVG.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: 'New Skill Added',
      skill,
    });
  } catch (error) {
    return next(new ErrorHandler('Failed to Add New Skill', 500));
  }
});
export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skills.findById(id);
  if (!skill) {
    return next(new ErrorHandler('Skill Not Found', 404));
  }

  const skillSvgId = skill.svg.public_id;
  await cloudinary.uploader.destroy(skillSvgId);
  await skill.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Skill  is deleted',
  });
});
export const updateSkill = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let skill = await Skills.findById(id);
  if (!skill) {
    return next(new ErrorHandler('Skill Not Found', 404));
  }

  try {
    const { proficiency } = req.body;
    skill = await Skills.findByIdAndUpdate(
      id,
      { proficiency },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(201).json({
      success: true,
      message: 'Skill is Updated',
      skill,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});
export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
  const skills = await Skills.find().select('-createdAt -updatedAt -__v');

  res.status(200).json({
    success: true,
    skills,
  });
});
