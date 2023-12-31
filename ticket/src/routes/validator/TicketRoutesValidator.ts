import { checkSchema } from 'express-validator';

export const CreateTicketValidator = checkSchema({
    title: {
        in: ['body'],
        isLength: {
            errorMessage: 'Title must be between 4 and 20 characters',
            options: { min: 4, max: 20 },
        },
        trim: true,
        isEmpty: false,
    },
    price: {
        in: ['body'],
        isNumeric: true,
        custom: {
            options: (value, { req }) => {
                const price = parseFloat(value);
                
                if (price <= 0) {
                    throw new Error('Price must be greater than 0');
                }

                return true;
            },
        },
        trim: true,
        isEmpty: false,
    },
});

export const GetTicketValidator = checkSchema({
    id: {
        in: ['params'],
        isMongoId: true,
        trim: true,
        isEmpty: false,
        errorMessage: 'Invalid Ticket ID',
    },
});
