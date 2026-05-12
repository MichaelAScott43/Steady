import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { connectDb } from './config/db';
import { authRouter } from './routes/auth.routes';
import { apiRouter } from './routes';

const app = express();
app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 120 }));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.use('/auth', authRouter);
app.use('/api', apiRouter);

connectDb().then(() => {
  app.listen(env.PORT, () => console.log(`STEADY backend on ${env.PORT}`));
});
