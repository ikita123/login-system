import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60, 
});

export const rateLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || 'unknown'; 
  console.log(`Incoming request from IP: ${ip}`);

  try {
    await rateLimiter.consume(ip); 
    console.log(`IP ${ip} passed rate limiting`);
    next();
  } catch (err) {
    console.log(`IP ${ip} exceeded rate limit`);
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  }
};
