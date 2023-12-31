import express from 'express';
import {
    CurrentUser,
    Signin,
    Signout,
    Signup,
} from '../controller/AuthController';
import { SigninValidator, SignupValidator } from './validator/AuthRoutesValidator';
import { ValidationHandler } from '../server/middleware/HandleValidator';

const route = express.Router();

route.post('/signup', SignupValidator, ValidationHandler, Signup);
route.post('/signin', SigninValidator, ValidationHandler, Signin);
route.post('/signout', Signout);
route.get('/currentuser', CurrentUser);

export default route;
