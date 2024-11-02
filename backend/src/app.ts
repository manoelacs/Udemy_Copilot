import express from 'express';
import cors from 'cors';
import { EmployeesRoutes } from './routes/employeesRoute';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    ],
    credentials: true,
  })
);
app.use(express.json());

// Routes
new EmployeesRoutes(app);

// Error handling middleware
app.use(errorHandler);

export default app;
