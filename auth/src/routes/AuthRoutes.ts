import express from 'express';
import {
    CurrentUser,
    Signin,
    Signout,
    Signup,
} from '../controller/AuthController';
import { SigninValidator, SignupValidator } from './validator/AuthRoutesValidator';
import { AuthHandler, ValidationHandler } from '@rifqioktario/ticketing-common';

const route = express.Router();

route.post('/signup', SignupValidator, ValidationHandler, Signup);
route.post('/signin', SigninValidator, ValidationHandler, Signin);

route.use(AuthHandler);
route.post('/signout', Signout);
route.get('/currentuser', CurrentUser);

export default route;
