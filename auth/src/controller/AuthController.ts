import { Request, Response } from 'express';
import { Logger } from '../helpers';
import BaseResponse from '../server/response/ResponseHandler';
import { User } from '../models';

const Namespace = 'AuthController';

export const CurrentUser = (req: Request, res: Response) => {
    return res.json({ currentUser: null });
};

export const Signin = (req: Request, res: Response) => {
    return res.json({ currentUser: null });
};

export const Signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    Logger.info(`[${Namespace}, Signup] Finding existing user: ${email}`);
    const findExistingUser = await User.findOne({ email });
    
    if (findExistingUser) {
        Logger.error(`[${Namespace}, Signup] Email in use: ${email}`);
        return res.boom.badRequest('Email Already Used');
    }
    
    const user = await new User({ email, password }).save();
    return res.status(201).json(
        BaseResponse.successResponse({
            data: user.email,
            message: 'User created successfully',
        }),
    );
};

export const Signout = (req: Request, res: Response) => {
    return res.json({ currentUser: null });
};
