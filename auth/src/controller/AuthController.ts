import { Request, Response } from 'express';
import { Logger } from '../helpers/logger';
import { validationResult } from 'express-validator';

const Controller = 'AuthController';

export const currentUser = (req: Request, res: Response): Response => {
    Logger.info(`[${Controller}, currentUser]`);
    return res.json({ currentUser: null });
};

export const signin = (req: Request, res: Response): Response => {
    Logger.info(`[${Controller}, signin]`);
    return res.json({ currentUser: null });
};

export const signup = (req: Request, res: Response): Response => {    

    return res.json({ signup: null });
}

export const signout = (req: Request, res: Response): Response => {
    Logger.info(`[${Controller}, signout]`);
    return res.json({ currentUser: null });
}
