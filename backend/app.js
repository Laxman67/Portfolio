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
    origin: ["https://portfolio-frontend-i43y.onrender.com", "https://your-dashboard-url.com"], // Ensure correct URLs
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  })
);


// app.use(
//   cors({
//     origin: ["https://portfolio-t9ru.onrender.com/", process.env.DASHBOARD_URL], // Remove trailing slash
//     methods: ['GET', 'POST', 'DELETE', 'PUT'],
//     credentials: true, // Allows cookies and other credentials in cross-origin requests
//   })
// );

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
