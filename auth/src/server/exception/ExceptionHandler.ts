import { Request, Response } from 'express';
import { Logger } from '../../helpers';

export const ExceptionHandler = (err: Error, req: Request, res: Response) => {
    Logger.error(`[ExceptionHandler] | URL: ${req.method} ${req.originalUrl} | Message: ${err.message} | Stack: ${err.stack}`);
    return res.boom.badImplementation();
};