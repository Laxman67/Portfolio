import { Schema, model } from 'mongoose';

const softwareApplicationSchema = new Schema(
  {
    name: String,
    svg: {
      public_id: {
        type: String,
        required: true,
      },
      url: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// You may also want to create and export a model
const SoftwareApplication = model(
  'SoftwareApplication',
  softwareApplicationSchema
);

export default SoftwareApplication;
