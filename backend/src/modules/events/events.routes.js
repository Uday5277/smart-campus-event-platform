import express from 'express';
import { handleCreateEvent,handleGetEvents,handleGetEventsById, handleGetAdminStats } from './events.controller.js';
import authenticate from '../middleware/auth.middleware.js';
import autherizeRole from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/',authenticate,autherizeRole('Admin'),handleCreateEvent);
router.get('/',authenticate,handleGetEvents);
router.get('/:id',authenticate,handleGetEventsById);
router.get('/admin/stats',authenticate,autherizeRole('Admin'),handleGetAdminStats);

export default router;
