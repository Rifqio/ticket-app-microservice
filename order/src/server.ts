import Hapi, { Server, ServerApplicationState } from '@hapi/hapi';
import { Logger } from './helpers';
import { routes } from './routes';
import { HttpLogger } from './plugins';

let server: Server;

const init = async (): Promise<Server> => {
    const routePrefix = process.env.ROUTE_PREFIX || '/api/orders';
    server = Hapi.server({
        port: process.env.APP_PORT || 5500,
        host: process.env.APP_HOST || 'localhost'
    });

    server.realm.modifiers.route.prefix = routePrefix;
    routes.forEach((route) => server.route(route));
    await server.initialize();
    await server.register(HttpLogger);

    return server as Server<ServerApplicationState>;
};

const start = (): Promise<void> => {
    const host = server.settings.host;
    const port = server.settings.port;
    Logger.info(`Listening on http://${host}:${port} 🚀`);
    return server.start();
};

const bootstrap = async (): Promise<Server> => {
    await init();
    await start();
    return server;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on('unhandledRejection', (err: any) => {
    Logger.error('unhandledRejection');
    Logger.error(err + err.stack);
    process.exit(1);
});

bootstrap();
