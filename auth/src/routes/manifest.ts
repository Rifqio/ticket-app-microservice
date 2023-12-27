import express, { Response } from 'express';
import boom from 'express-boom';
import cookieSession from 'cookie-session';

import AuthRoutes from './AuthRoutes';
import { HttpLogger } from '@rifqioktario/ticketing-common';

const app = express();

app.use(HttpLogger);
app.use(cookieSession({ signed: false, secure: false }));
app.use(boom());

app.use('/api/users', AuthRoutes);

app.all('*', (_, res: Response) => {
    return res.boom.notFound('Route not found');
});

export default app;
