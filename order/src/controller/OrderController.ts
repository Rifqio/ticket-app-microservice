import { Request, ResponseToolkit } from '@hapi/hapi';
import { Logger } from '../helpers';

export const GetOrder = (request: Request, reply: ResponseToolkit) => {
    return reply.response({ message: 'Hello from order' });
};
