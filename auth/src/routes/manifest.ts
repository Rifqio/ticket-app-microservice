import express, { Response } from 'express';
import boom from 'express-boom';
import cookieSession from 'cookie-session';

import AuthRoutes from './AuthRoutes';
import { HttpLogger } from '@rifqioktario/ticketing-common';
import passport from 'passport';

const app = express();

app.use(HttpLogger);
app.use(
    cookieSession({
        signed: false,
        secure: false,
        maxAge: 24 * 60 * 60 * 100,
        name: 'auth:token',
        httpOnly: false
    }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(boom());

app.use('/api/users', AuthRoutes);

app.all('*', (_, res: Response) => {
    return res.boom.notFound('Route not found');
});

export default app;
