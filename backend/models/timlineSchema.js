import { Schema, model } from 'mongoose';

const timelineSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, ' Title is required!'],
    },
    description: {
      type: String,
      required: [true, ' Description is required!'],
    },
    timeline: {
      from: {
        type: String,
        required: [true, 'Starting Date is Required'],
      },
      to: String,
    },
  },
  {
    timestamps: true,
    select: false, // This will automatically create 'createdAt' and 'updatedAt' fields
  }
);

const Timeline = model('Timeline', timelineSchema);

export default Timeline;
