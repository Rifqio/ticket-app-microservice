import { Request, ResponseToolkit } from '@hapi/hapi';

export const GetOrder = (request: Request, reply: ResponseToolkit) => {
    return reply.response({ message: 'Hello from order' });
};

export const AddOrder = (request: Request, reply: ResponseToolkit) => {
    console.info(request.auth.credentials, 'HERE');
    return reply.response({ message: 'Add Order' }).code(201);
};

export const GetSingleOrder = (request: Request, reply: ResponseToolkit) => {
    return reply.response({ message: 'Get Single Order' });
};

export const DeleteOrder = (request: Request, reply: ResponseToolkit) => {
    return reply.response({ message: 'Delete Order' });
};
