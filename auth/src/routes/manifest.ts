import express from 'express';
import boom from 'express-boom';
import { HttpLogger } from '../middleware/HttpLogger';

import AuthRoutes from './AuthRoutes';

const app = express();

app.use(HttpLogger);
app.use(boom());

app.use('/api/users', AuthRoutes);

export default app;