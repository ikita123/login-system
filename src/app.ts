import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import helmet from 'helmet';
import { trackIP } from './middlewares/ipTracker';
import { rateLimiterMiddleware } from './middlewares/rateLimiter';

dotenv.config();

const app = express();
app.use(helmet()); 
app.use(express.json()); 
app.use(trackIP); 

connectDB();

app.use('/api/auth/login', rateLimiterMiddleware); 

app.use('/api/auth', authRoutes);

const PORT = parseInt(process.env.PORT || '5000', 10);



app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on port ${PORT}`);
});
