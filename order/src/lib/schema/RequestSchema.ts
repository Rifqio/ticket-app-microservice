import Joi from 'joi';
import mongoose from 'mongoose';

export const AddOrderSchema = Joi.object({
    ticketId: Joi.string()
        .custom((value, helper) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helper.message({
                    'any.only': 'Invalid Ticket ID'
                });
            }
        })
        .required()
}).options({ stripUnknown: true });
