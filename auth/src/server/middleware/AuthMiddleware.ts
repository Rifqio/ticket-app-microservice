import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Logger } from '../../helpers';

interface TokenPayload {
    id: string,
    email: string,
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: TokenPayload
        }
    }
}

export const AuthHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { JWT_SECRET } = process.env;
        const token = req.session?.token || req.headers.authorization?.split(' ')[1]; 

        if (!token) return res.boom.unauthorized('Not authorized');

        const payload = jwt.verify(token, JWT_SECRET as string) as TokenPayload;
        req.currentUser = payload;
        
        return next();   
    } catch (error: any) {
        Logger.error(`[AuthHandler] ${error.message} | ${error.stack}`);
        if (error.message === 'invalid signature') {
            return res.boom.unauthorized('Invalid Signature');
        }
        return res.boom.badImplementation('Internal Server Error');
    }
}