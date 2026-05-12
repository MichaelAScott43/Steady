import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signAccess = (sub: string) => jwt.sign({ sub }, env.JWT_SECRET, { expiresIn: '15m' });
export const signRefresh = (sub: string) => jwt.sign({ sub }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
