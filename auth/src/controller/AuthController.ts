import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Logger } from '@rifqioktario/ticketing-common';

import { User } from '../models';
import { Encrypt } from '../helpers';
import BaseResponse from '../server/response/ResponseHandler';
import { ExceptionHandler } from '../server/exception/ExceptionHandler';
const { JWT_SECRET } = process.env;

const Namespace = 'AuthController';
export const CurrentUser = (req: Request, res: Response) => {
    try {
        Logger.info(
            `[${Namespace}, CurrentUser] User found, payload: ${JSON.stringify(
                req.currentUser,
            )}`,
        );
        return res.json(
            BaseResponse.successResponse({
                data: req.currentUser,
                message: 'User found',
            }),
        );
    } catch (error: any) {
        Logger.error(`[${Namespace}, CurrentUser] Error: ${error.message}`);
        return ExceptionHandler(error, req, res);
    }
};

export const Signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            Logger.error(`[${Namespace}, Signin] User not found: ${email}`);
            return res.boom.badRequest('Email or password mismatch');
        }

        const passwordMatch = await Encrypt.compare(user.password, password);
        if (!passwordMatch) {
            Logger.error(`[${Namespace}, Signin] Password mismatch: ${email}`);
            return res.boom.badRequest('Email or password mismatch');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET!,
            { expiresIn: '1d' },
        );

        Logger.info(
            `[${Namespace}, Signin] User signin successfully: ${email}`,
        );

        const responseBuilder = {
            data: {
                email: user.email,
                id: user.id,
                token,
            },
            message: 'User signin successfully',
        };

        req.session = { token };
        return res.json(BaseResponse.successResponse(responseBuilder));
    } catch (error: any) {
        Logger.error(`[${Namespace}, Signin] Error: ${error.message}`);
        return ExceptionHandler(error, req, res);
    }
};

export const Signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        Logger.info(`[${Namespace}, Signup] Finding existing user: ${email}`);
        const findExistingUser = await User.findOne({ email });

        if (findExistingUser) {
            Logger.error(`[${Namespace}, Signup] Email in use: ${email}`);
            return res.boom.badRequest('Email Already Used');
        }

        const user = await new User({ email, password }).save();
        const userJwt = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET!,
            { expiresIn: '1d' },
        );

        Logger.info(
            `[${Namespace}, Signup] User created successfully: ${email}`,
        );

        req.session = { token: userJwt };
        const responseBuilder = {
            data: { user, token: userJwt },
            message: 'User created successfully',
        };

        return res
            .status(201)
            .json(BaseResponse.successResponse(responseBuilder));
    } catch (error: any) {
        Logger.error(`[${Namespace}, Signup] Error: ${error.message}`);
        return ExceptionHandler(error, req, res);
    }
};

export const Signout = (req: Request, res: Response) => {
    try {
        if (!req.session?.token) {
            Logger.warn(`[${Namespace}, Signout] Authentication required`);
            return res.boom.unauthorized('Authentication required');
        }

        req.session = null;
        const responseBuilder = {
            data: null,
            message: 'User signout successfully',
        };

        Logger.info(`[${Namespace}, Signout] User signout successfully`);
        return res.json(BaseResponse.successResponse(responseBuilder));
    } catch (error: any) {
        Logger.error(`[${Namespace}, Signout] Error: ${error.message}`);
        return ExceptionHandler(error, req, res);
    }
};
