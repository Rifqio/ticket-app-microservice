import { Request, Response } from 'express';
import { Logger } from '../helpers/logger';
import { ExceptionHandler } from '../server/exception/ExceptionHandler';
import BaseResponse from '../server/response/ResponseHandler';

const Namespace = 'AuthController';

export const currentUser = (req: Request, res: Response): Response => {
    return res.json({ currentUser: null });
};

export const signin = (req: Request, res: Response): Response => {
    return res.json({ currentUser: null });
};

export const signup = async (req: Request, res: Response) => {
    Logger.info(`[${Namespace}, signup] | body: ${JSON.stringify(req.body)}`);
    return res.json(
        BaseResponse.successResponse({
            data: null,
            message: 'User created successfully',
        }),
    );
};

export const signout = (req: Request, res: Response): Response => {
    return res.json({ currentUser: null });
};
