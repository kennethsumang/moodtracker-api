import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import authRoutes from './routes/auth.route';
import errorMiddleware from './middlewares/error.middleware';
import userRoutes from './routes/user.route';

const app: Application = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error Handling
app.use(errorMiddleware);

export default app;