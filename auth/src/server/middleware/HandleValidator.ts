import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Logger } from '../../helpers';

export const ValidationHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        Logger.error(`[ValidationHandler] URL: ${req.method} ${req.originalUrl} | errors: ${JSON.stringify(errors.array())}`);
        return res.boom.badRequest('Invalid request parameters', errors.formatWith(error => error.msg as string));
    };
    next();
};
