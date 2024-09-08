import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  ipAddress?: string; 
}

export const trackIP = (req: CustomRequest, res: Response, next: NextFunction) => {
  const forwardedFor = req.headers['x-forwarded-for'] as string;
  const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : req.connection.remoteAddress || 'unknown';

  req.ipAddress = ipAddress;

  console.log(`Incoming request from IP: ${ipAddress}`);
  
  next();
};

