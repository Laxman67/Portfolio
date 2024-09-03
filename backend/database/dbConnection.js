import mongoose from 'mongoose';

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: 'PORTFOLIO' })
    .then(() => {
      console.log('Connected to Database');
    })
    .catch((err) => {
      console.log(`Some Error Occured in Database ${err}`);
    });
};

export default dbConnection;
