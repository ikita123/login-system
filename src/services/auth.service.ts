import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { sendMagicLinkEmail } from '../utils/email';

export const registerUser = async (email: string, password: string, ip: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ email, password: hashedPassword, ip });
  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return token;
};

export const sendMagicLink = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  const magicLink = `${process.env.FRONTEND_URL}/magic-login?token=${token}`;

  await sendMagicLinkEmail(email, magicLink);
};
