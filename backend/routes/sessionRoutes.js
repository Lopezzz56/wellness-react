// routes/sessionRoutes.js
import express from 'express';
import {
  getPublicSessions,
  getMySessions,
  getMySessionById,
  saveDraft,
  publishSession,
  searchSessions
} from '../controllers/sessionController.js';

import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/sessions', getPublicSessions);
router.get('/sessions/search', searchSessions);

router.get('/my-sessions', verifyToken, getMySessions);
router.get('/my-sessions/:id', verifyToken, getMySessionById);
router.post('/my-sessions/save-draft', verifyToken, saveDraft);
router.post('/my-sessions/publish', verifyToken, (req, res, next) => {
  console.log('📨 Hit /my-sessions/publish');
  next();
}, publishSession);


export default router;

