import { Request, Response } from 'express';
import { registerUser, loginUser, sendMagicLink } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const ip = req.ip || 'unknown';  
  
    try {
      const user = await registerUser(email, password, ip);
      res.status(201).json(user);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error:any) {
    res.status(401).json({ error: error.message });
  }
};

export const sendMagicLinkController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    await sendMagicLink(email);
    res.json({ message: 'Magic link sent!' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
