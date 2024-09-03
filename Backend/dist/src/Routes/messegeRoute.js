import express from 'express';
import protecRoute from '../Middlewares/protectRoute.js';
import { getMessage, getUserForSidebar, sendMessage } from '../Controler/message.controller.js';
const router = express.Router();
router.get('/conversations', protecRoute, getUserForSidebar);
router.get("/:id", protecRoute, getMessage);
router.post('/send/:id', protecRoute, sendMessage);
export default router;
