import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Name Required'],
    },
    email: {
      type: String,
      required: [true, 'Email Required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone Number is Required'],
    },
    aboutMe: {
      type: String,
      required: [true, 'AboutMe Field is Required'],
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minLength: [8, 'Password must contain at least 8 Characters'],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    portfolioURL: {
      type: String,
      required: [true, 'Portfolio URL is Required!'],
    },
    githubURL: String,
    instagramURL: String,
    facebookURL: String,
    twitterURL: String,
    linkedInURL: String,
    resetPasswordToken: String,
    resetPasswordExpired: Date,
  },
  { timestamps: true }
);

// For Hashing Password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// For Comparing Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating JSON Web Token
userSchema.methods.generateJsonWebToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Exporting the User Model
const User = model('User', userSchema);
export default User;
