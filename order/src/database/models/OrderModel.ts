import { Schema, model, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { OrderStatus } from '@rifqioktario/ticketing-common/build/project';

interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
}

interface OrderDocument extends Document, OrderAttrs {}

interface PaginatedOrderModel extends PaginateModel<OrderDocument> {}

const orderSchema = new Schema<OrderDocument>(
    {
        userId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(OrderStatus),
            default: OrderStatus.Created
        },
        expiresAt: {
            type: Schema.Types.Date,
            required: true
        },
        ticket: {
            type: Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(_, ret) {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

orderSchema.plugin(mongoosePaginate);

const Order = model<OrderDocument, PaginatedOrderModel>('Order', orderSchema);

export { Order };
