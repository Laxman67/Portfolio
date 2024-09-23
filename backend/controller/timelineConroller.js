import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../middleware/error.js';
import Timeline from '../models/timlineSchema.js';

//  postTimeline,

export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });

  res.status(200).json({
    success: true,
    message: 'Timline Added',
    newTimeline,
  });
});
export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler('Timeline not Found', 404));
  }

  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: 'Timeline Deleted',
  });
});
export const getTimeline = catchAsyncErrors(async (req, res, next) => {
  const timelines = await Timeline.find().select('-createdAt -updatedAt -__v');

  res.status(200).json({
    success: true,
    timelines,
  });
});
