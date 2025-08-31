import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoute';
import artistRoutes from './routes/artistRoute';
import albumRoutes from './routes/albumRoute';
import trackRoutes from './routes/trackRoute';
import favoriteRoutes from './routes/favoriteRoute';
import accessLogRoutes from './routes/accessLogRoute';
import { validateUserId } from './middlewares/validateUserId';
import { AppError } from './middlewares/AppError';

const app = express();

app.use(bodyParser.json());

app.use(validateUserId);

app.use('/api', userRoutes);
app.use('/api', artistRoutes);
app.use('/api', albumRoutes);
app.use('/api', trackRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', accessLogRoutes);

app.use((err: AppError, req: Request, res: Response) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
