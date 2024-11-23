import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import authRoutes from './routes/auth.route';
import errorMiddleware from './middlewares/error.middleware';

const app: Application = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Error Handling
app.use(errorMiddleware);

export default app;