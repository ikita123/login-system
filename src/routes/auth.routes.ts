import { Router } from 'express';
import { register, login, sendMagicLinkController } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/magic-link', sendMagicLinkController);

export default router;
