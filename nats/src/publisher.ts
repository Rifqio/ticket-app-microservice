import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './class/TicketCreatedPublisher.class';
import { Logger } from './helpers';
import 'dotenv/config';

const stan = nats.connect('ticketing', 'abc', {
    url: process.env.NATS_URL,
});

stan.on('connect', async () => {
    Logger.info('[Publisher] - Publisher connected to NATS');
    const publisher = new TicketCreatedPublisher(stan);
    try {
        await publisher.publish({
            id: '123',
            title: 'concert',
            price: 20,
        });
    } catch (error) {
        Logger.error(`[Publisher] - ${error}]`);
    }
});
