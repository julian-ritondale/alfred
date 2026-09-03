import express, { type Express } from 'express';
import cors from 'cors';
import taskRoutes from './modules/task/task.routes.ts';
import { errorHandler } from './middleware/error.middleware.ts';

const app: Express = express();

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') ?? [];

app.use(cors({
  origin: allowedOrigins,
}));

app.use(express.json());

app.use('/health', (_, res) => res.status(200).json({ message: 'OK' }));

app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

export default app;