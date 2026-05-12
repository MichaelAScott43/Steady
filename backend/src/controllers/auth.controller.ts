import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { signAccess, signRefresh } from '../auth/tokens';

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash, name });
  return res.status(201).json({ accessToken: signAccess(user.id), refreshToken: signRefresh(user.id) });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: 'Invalid credentials' });
  return res.json({ accessToken: signAccess(user.id), refreshToken: signRefresh(user.id) });
}
