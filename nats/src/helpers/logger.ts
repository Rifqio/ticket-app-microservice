import pino from 'pino';
export const Logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            colorizeObjects: true,
            ignore: 'pid,hostname',
            translateTime: 'dd/mm/yyyy HH:MM:ss',
        },
    },
});