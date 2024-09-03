import express from 'express';
import { getme, login, logout, signup } from '../Controler/controler.js';
import protecRoute from '../Middlewares/protectRoute.js';
const router = express.Router();
router.get('/me', protecRoute, getme);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
export default router;
