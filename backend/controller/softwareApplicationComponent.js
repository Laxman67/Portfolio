import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/error.js';
import SoftwareApplication from '../models/getAllApplicationSchema.js';
import cloudinary from 'cloudinary';

export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler('Software Application icons is Reqiured', 400)
    );
  }

  const { svg } = req.files;
  // Upload svg to Cloudinary
  let cloudinaryResponseForSVG;
  try {
    cloudinaryResponseForSVG = await cloudinary.uploader.upload(
      svg.tempFilePath,
      { folder: 'PORTFOLIO_APPLICATION' }
    );
  } catch (error) {
    return next(new ErrorHandler('Failed to upload svg to Cloudinary', 500));
  }

  const { name } = req.body;

  if (!name) {
    return next(new ErrorHandler(' Software name is Required', 400));
  }

  try {
    const softwareApplication = await SoftwareApplication.create({
      name,
      svg: {
        public_id: cloudinaryResponseForSVG.public_id,
        url: cloudinaryResponseForSVG.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: 'Software Application Added',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const software_application = await SoftwareApplication.findById(id);

  if (!software_application) {
    return next(new ErrorHandler('Software Application Not Found', 404));
  }

  const svgPublicId = software_application.svg.public_id;
  await cloudinary.uploader.destroy(svgPublicId);
  await software_application.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Software Application is deleted',
  });
});
export const getAllApplications = catchAsyncErrors(async (req, res, next) => {
  const software_application = await SoftwareApplication.find();
  res.status(200).json({
    success: true,
    software_application,
  });
});
