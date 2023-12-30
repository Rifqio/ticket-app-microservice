import { Schema, model, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

interface TicketDocument extends Document, TicketAttrs {}

interface PaginatedTicketModel extends PaginateModel<TicketDocument> {}

const ticketSchema = new Schema<TicketDocument>(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
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

const Ticket = model<TicketDocument, PaginatedTicketModel>('Ticket', ticketSchema);

export { Ticket };
