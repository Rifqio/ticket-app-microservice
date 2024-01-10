import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';
import { Logger } from './helpers';
import TicketCreatedListener from './class/TicketCreatedListener.class';
import 'dotenv/config';

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: process.env.NATS_URL,
});

stan.on('connect', () => {
    Logger.info('[Listener] - Listener connected to NATS');

    stan.on('close', () => {
        Logger.info('[Listener] - NATS connection closed');
        process.exit();
    });

    new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
