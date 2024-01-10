import { Router } from 'express';
import {
    CurrentUser,
    Signin,
    Signout,
    Signup,
} from '../controller/AuthController';
import {
    SigninValidator,
    SignupValidator,
} from './validator/AuthRoutesValidator';
import { AuthHandler, ValidationHandler } from '@rifqioktario/ticketing-common';
import passport from '../controller/PassportController';
const { CLIENT_HOST } = process.env;

const route = Router();

route.post('/signup', SignupValidator, ValidationHandler, Signup);
route.post('/signin', SigninValidator, ValidationHandler, Signin);

route.get(
    '/signin/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);

route.get(
    '/signin/google/callback',
    passport.authenticate('google', {
        failureMessage: true,
        successRedirect: CLIENT_HOST,
    }),
);

route.use(AuthHandler);
route.post('/signout', Signout);
route.get('/currentuser', CurrentUser);

export default route;
