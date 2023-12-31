import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { Logger } from '../../helpers';

export const ValidationHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    
    const responseBuilder = {
        statusCode: 400,
        message: 'Invalid request parameters',
        error: 'Bad Request',
        ...errors.formatWith(error => error.msg as string),
    };

    if (!errors.isEmpty()) {
        Logger.error(`[ValidationHandler] URL: ${req.method} ${req.originalUrl} | errors: ${JSON.stringify(errors.array())}`);
        return res.status(400).json(responseBuilder);
    };
    next();
};