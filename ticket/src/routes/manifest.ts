import express, { Response } from 'express';
import boom from 'express-boom';
import cookieSession from 'cookie-session';

import { HttpLogger } from '@rifqioktario/ticketing-common';

const app = express();

app.use(HttpLogger);
app.use(cookieSession({ signed: false, secure: false }));
app.use(boom());

// app.use('/api/tickets');

app.all('*', (_, res: Response) => {
    return res.boom.notFound('Route not found');
});

export default app;
