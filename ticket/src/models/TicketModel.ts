import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
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

ticketSchema.plugin(mongoosePaginate);

export const Ticket = model('Ticket', ticketSchema)<TicketAttrs>;
