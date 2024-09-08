import { Schema, model } from 'mongoose';

const skillSchema = new Schema(
  {
    title: String,
    proficiency: String,
    svg: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Skills = model('Skills', skillSchema);

export default Skills;
