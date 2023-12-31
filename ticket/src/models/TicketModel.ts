import { Schema, model } from 'mongoose';

interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

const ticketSchema = new Schema<TicketAttrs>(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(_, ret) {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            },
        },
    },
);


export const Ticket = model('Ticket', ticketSchema)<TicketAttrs>;
