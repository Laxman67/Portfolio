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
export const updateProject = catchAsyncErrors(async (req, res, next) => {
  const newProject = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    technologies: req.body.technologies,
    stack: req.body.stack,
    deployed: req.body.deployed,
  };

  /** IF there is Files Update Request */
  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;

    const project = await Project.findById(req.params.id);
    const projectBannerId = project.projectBanner.public_id;

    // To delete exisiting One
    await cloudinary.uploader.destroy(projectBannerId);

    // Upload updated projectBanner to Cloudinary
    let cloudinaryResponseForProjectBanner;
    try {
      cloudinaryResponseForProjectBanner = await cloudinary.uploader.upload(
        projectBanner.tempFilePath,
        { folder: 'PROJECT IMAGES' }
      );

      // Save tobe Update

      newProject.projectBanner = {
        public_id: cloudinaryResponseForProjectBanner.public_id,
        url: cloudinaryResponseForProjectBanner.secure_url,
      };
    } catch (error) {
      return next(
        new ErrorHandler('Failed to upload Project Bannner to Cloudinary', 500)
      );
    }
  }

  /**
   *[✅ new: true:] This option is used in the findOneAndUpdate, findByIdAndUpdate, findOneAndReplace, and findByIdAndReplace methods. When set to true, it returns the modified document rather than the original document

   [✅runValidators:] true: This option ensures that the validators defined in your Mongoose schema are run when you perform update operations.

   [✅useFindAndModify:] false: This option is used to opt out of the deprecated findAndModify function in MongoDB. Mongoose previously used findAndModify for certain operations, but it has been replaced with more modern methods like findOneAndUpdate and findByIdAndUpdate. Setting this option to false ensures that Mongoose uses the newer methods.
   */

  const project = await Project.findByIdAndUpdate(req.params.id, newProject, {
    new: true, // Return the Updated One
    runValidators: true, // Run all the validators in Schema
    useFindAndModify: false, // use newer methods to update
  });

  res.status(200).json({
    success: true,
    message: 'Project Updated',
    project,
  });
});
export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler('Project Not Found', 404));
  }

  try {
    // Fetch Project Banner
    const projectBannerId = project.projectBanner.public_id;

    // Delete Project Banner from Cloudinary
    await cloudinary.uploader.destroy(projectBannerId);

    await project.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Project Deleted',
    });
  } catch (error) {
    return next(
      new ErrorHandler(
        `Failed to delete Project {Error} > ${error.message}  `,
        500
      )
    );
  }
});
export const getAllProject = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();
  res.status(200).json({
    success: true,
    projects,
  });
});
export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const projects = await Project.findById(id);
  if (!projects) {
    return next(new ErrorHandler('Project Not Found', 404));
  }
  res.status(200).json({
    success: true,
    projects,
  });
});
