import { ServerRoute } from '@hapi/hapi';
import * as OrderController from './controller/OrderController';
import Joi from '@hapi/joi';

export const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/',
        handler: OrderController.GetOrder,
        options: {
            description: 'Get Order',
            tags: ['api', 'order']
        }
    },
    {
        method: 'POST',
        path: '/',
        handler: OrderController.GetOrder,
        options: {
            description: 'Add Order',
            tags: ['api', 'order'],
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    price: Joi.number().min(1).required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/{id}',
        handler: OrderController.GetOrder,
        options: {
            description: 'Get Single Order',
            tags: ['api', 'order']
        }
    },
    {
        method: 'DELETE',
        path: '/{id}',
        handler: OrderController.GetOrder,
        options: {
            description: 'Delete Single Order',
            tags: ['api', 'order']
        }
    }
];
