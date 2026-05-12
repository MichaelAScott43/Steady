import { Router } from 'express';
import { requireAuth } from '../middleware/auth';

export const apiRouter = Router();
apiRouter.use(requireAuth);
apiRouter.get('/dashboard', (_req, res) => res.json({ balances: [], risks: [], recurring: [], insights: [] }));
apiRouter.get('/transactions', (_req, res) => res.json({ items: [] }));
apiRouter.get('/insights', (_req, res) => res.json({ items: [] }));
