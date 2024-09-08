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

// Cors cross origin resources
app.use(
  cors({
    origin: [process.env.PORTFOLIO_UR, process.env.DASHBOARD_UR],
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

app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/timeline', timelineRouter);
app.use('/api/v1/softwareapplication', softwareApplicationRouter);
app.use('/api/v1/skill', skillsRouter);
app.use('/api/v1/project', projectRouter);

// Databse Connection
dbConnection();
app.use(errorMiddleware);

export default app;
