import { Document, Schema, model } from 'mongoose';

interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

interface TicketDocument extends Document, TicketAttrs {}

const ticketSchema = new Schema<TicketDocument>(
    {
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 1
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(_, ret: Record<string, unknown>) {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

const Ticket = model<TicketDocument>('Ticket', ticketSchema);

export { Ticket };
