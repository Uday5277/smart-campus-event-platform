import express from 'express';
import handleRegisterForEvent from './register.controller.js';
import authenticate from '../middleware/auth.middleware.js';
import autherizeRole from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/:eventId',authenticate,autherizeRole('Student'),handleRegisterForEvent);

export default router;