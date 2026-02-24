import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/pingup`);

    mongoose.connection.on('connect', () => console.log('Database connected'));
  } catch (error) {
    console.log('Database connection failed:', error.message);
  }
};

export default connectDB;
