import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    mongoose.connection.on('connected', () => {
      console.log('✅ Database connected');
    });

    mongoose.connection.on('error', (err) => {
      console.log('❌ DB error:', err.message);
    });
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
  }
};

export default connectDB;
