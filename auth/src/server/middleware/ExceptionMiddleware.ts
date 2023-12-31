import { NextFunction, Request, Response } from "express";
import { Logger } from "../../helpers/logger";

export const ExceptionHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    process.on('uncaughtException', (err: Error) => {
        Logger.error(`[ExceptionHandler] | URL: ${req.method} ${req.originalUrl} | Message: ${err.message} | Stack: ${err.stack}`);
        return res.boom.badImplementation();
    });
    process.on('unhandledRejection', (err: Error) => {
        Logger.error(`[ExceptionHandler] | URL: ${req.method} ${req.originalUrl} | Message: ${err.message} | Stack: ${err.stack}`);
        return res.boom.badImplementation();
    });
    next();
}