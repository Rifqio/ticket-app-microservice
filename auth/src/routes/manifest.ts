import express from 'express';
import AuthRoutes from './AuthRoutes';
import { HttpLogger } from '../middleware/HttpLogger';

const app = express();
app.use(HttpLogger);

app.use('/api/users', AuthRoutes);

export default app;