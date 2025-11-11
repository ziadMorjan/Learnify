import mongoose from 'mongoose';

const connectDB = async (uri) => {
  if (!uri) {
    throw new Error('MONGO_URI is not defined');
  }

  mongoose.set('strictQuery', false);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  console.log('MongoDB connection established');
};

export default connectDB;
