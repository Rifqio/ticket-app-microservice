import { ServerRoute } from '@hapi/hapi';
import * as OrderController from './controller/OrderController';
import { AddOrderSchema } from './lib/schema/RequestSchema';

export const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/',
        handler: OrderController.GetOrder,
        options: {
            description: 'Get Order',
            tags: ['api', 'order'],
            auth: 'jwt'
        }
    },
    {
        method: 'POST',
        path: '/',
        handler: OrderController.AddOrder,
        options: {
            description: 'Add Order',
            tags: ['api', 'order'],
            validate: {
                payload: AddOrderSchema
            },
            auth: 'jwt'
        }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: OrderController.GetSingleOrder,
        options: {
            description: 'Get Single Order',
            tags: ['api', 'order']
        }
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: OrderController.DeleteOrder,
        options: {
            description: 'Delete Single Order',
            tags: ['api', 'order']
        }
    }
];
