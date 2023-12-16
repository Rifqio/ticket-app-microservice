import { NextFunction, Request, Response } from "express";
import { Logger } from "../helpers/logger";

export const HttpLogger = (req: Request, res: Response, next: NextFunction): void => {
    const start = process.hrtime();

    Logger.http({
        message: `Request | Method: ${req.method} | URL: ${req.originalUrl}`,
    });

    res.on('finish', () => {
        const duration = process.hrtime(start);
        const durationInMs = duration[0] * 1000 + duration[1] / 1e6;

        Logger.http({
            message: `Response | Method: ${req.method} | URL: ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${durationInMs.toFixed(2)} ms`,
        });
    });

    next();
};