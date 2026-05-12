import { connectDb } from '../config/db';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

(async () => {
  await connectDb();
  const hash = await bcrypt.hash('SteadyPass!2026', 12);
  await User.updateOne({ email: 'demo@steady.app' }, { email: 'demo@steady.app', name: 'Demo User', passwordHash: hash }, { upsert: true });
  console.log('Seed complete: demo@steady.app / SteadyPass!2026');
  process.exit(0);
})();
