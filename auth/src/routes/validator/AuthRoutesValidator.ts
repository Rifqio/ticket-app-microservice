import { checkSchema } from 'express-validator';

export const SignupValidator = checkSchema({
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: 'Email must be valid',
        },
        trim: true,
        isEmpty: false
    },
    password: {
        in: ['body'],
        isLength: {
            errorMessage: 'Password must be between 4 and 20 characters',
            options: { min: 4, max: 20 },
        },
        trim: true,
        isEmpty: false
    },
});
