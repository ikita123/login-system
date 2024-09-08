import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  clientIp?: string;  // Adding clientIp property to the Request type

}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ip: { type: String, required: false },
});

export const User = mongoose.model<IUser>('User', userSchema);
