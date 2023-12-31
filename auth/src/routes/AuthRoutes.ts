import express from 'express';
import {
    currentUser,
    signin,
    signout,
    signup,
} from '../controller/AuthController';
import { SignupValidator } from './validator/AuthRoutesValidator';
import { ValidationHandler } from '../middleware/HandleValidator';

const route = express.Router();

route.post('/signup', SignupValidator, ValidationHandler, signup);
route.post('/signin', signin);
route.post('/signout', signout);
route.get('/currentuser', currentUser);

export default route;
