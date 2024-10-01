import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dbConnection from './database/dbConnection.js';
import { errorMiddleware } from './middleware/error.js';
import messageRouter from './router/messageRouter.js';
import userRouter from './router/userRouter.js';
import timelineRouter from './router/timelineRouter.js';
import softwareApplicationRouter from './router/softwareApplicationRouter.js';
import skillsRouter from './router/skillRouter.js';
import projectRouter from './router/ProjectRouter.js';

const app = express();

// Dotenv Config
dotenv.config({ path: './config/config.env' });

// Middleware

// CORS configuration
app.use(
  cors({
    origin: [
      'https://portfolio-frontend-i43y.onrender.com',
      'https://portfolio-dashboard-bwfa.onrender.com',
      'http://localhost:5173',
    ], // Ensure correct URLs
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// Trust proxy configuration
app.set('trust proxy', 1);

// Middleware to log client IP address
app.use((req, res, next) => {
  console.log('Client IP:', req.ip); // Real client IP if trust proxy is set
  next();
});

// API Routes
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/timeline', timelineRouter);
app.use('/api/v1/softwareapplication', softwareApplicationRouter);
app.use('/api/v1/skill', skillsRouter);
app.use('/api/v1/project', projectRouter);

// Database Connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
