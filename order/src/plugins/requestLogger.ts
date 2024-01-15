import { Server } from '@hapi/hapi';
import { Logger } from '../helpers';

const requestLogger = {
    name: 'requestLogger',
    register: (server: Server) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        server.events.on('response', (request: any) => {
            const { method, path, query } = request;
            const { responded, received } = request.info;
            const { statusCode } = request.response;
            let payload;

            const formattedQuery =
                Object.keys(query).length === 0
                    ? ' '
                    : ` | Query: ${JSON.stringify(query)} `;

            if (request?.payload === undefined) {
                payload = '';
            } else if (request?.payload !== null) {
                payload = `| Payload: ${JSON.stringify(request?.orig?.payload)} `;
            } else {
                payload = ' ';
            }

            const responseTime = responded - received;

            Logger.http(
                `${method.toUpperCase()} ${path}${formattedQuery}${payload}--> ${statusCode} (${responseTime}ms)`
            );
        });
    }
};

export default requestLogger;
