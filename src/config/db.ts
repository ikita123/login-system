import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI  || "mongodb+srv://nikitasharma:nikita-sharma@cluster1.poqels0.mongodb.net/loginSystem?retryWrites=true&w=majority");
    console.log('MongoDB Connected');
};
