import { Request, Response } from 'express';
import { Logger } from '../helpers/logger';

const Controller = 'AuthController';

export const currentUser = (req: Request, res: Response): Response => {
    Logger.info(`[${Controller}] currentUser`);
    return res.json({ currentUser: null });
};
