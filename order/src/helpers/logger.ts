import winston, { Logform, createLogger, transports } from 'winston';
import moment from 'moment';

const { format } = winston;

export const Logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.ms(),
        format.colorize(),
        format.prettyPrint(),
        format.timestamp({
            format: () => moment().format('ddd, DD MMM YYYY HH:mm:ss')
        }),
        format.printf((info: Logform.TransformableInfo) => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        })
    ),
    transports: [new transports.Console()]
});
