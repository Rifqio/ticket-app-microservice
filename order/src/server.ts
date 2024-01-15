import Hapi, { Server, ServerApplicationState } from '@hapi/hapi';
import { Logger } from './helpers';
import { routes } from './routes';
import { HttpLogger, AuthStrategies } from './plugins';
import 'dotenv/config';
import { DatabaseConnection } from './database';

let server: Server;

const init = async (): Promise<Server> => {
    const routePrefix = process.env.ROUTE_PREFIX || '/api/orders';
    server = Hapi.server({
        port: process.env.APP_PORT || 5500,
        host: process.env.APP_HOST || 'localhost'
    });
    await DatabaseConnection();
    await server.register(HttpLogger);
    await server.register(AuthStrategies);
    server.realm.modifiers.route.prefix = routePrefix;
    routes.forEach((route) => server.route(route));
    await server.initialize();

    return server as Server<ServerApplicationState>;
};

const start = (): Promise<void> => {
    const instance = 'Order-Service';
    const host = server.settings.host;
    const port = server.settings.port;
    Logger.info(`[${instance}] is listening on http://${host}:${port} 🚀`);
    return server.start();
};

const bootstrap = async (): Promise<Server> => {
    await init();
    await start();
    return server;
};

process.on('unhandledRejection', (err: Error) => {
    if (err instanceof Error) {
        Logger.error('unhandledRejection');
        Logger.error(err + err.stack!);
        process.exit(1);
    }
});

bootstrap();
