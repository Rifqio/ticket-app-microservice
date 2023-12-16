import express from 'express';
import { currentUser } from '../controller/AuthController';

const route = express.Router();

route.get('/currentuser', currentUser);

export default route;