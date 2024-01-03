import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.clear();
    console.log('LISTENER - Listener connected to NATS');
    
    stan.on('close', () => {
        console.log('LISTENER - NATS connection closed');
        process.exit();
    });
    
    const options = stan.subscriptionOptions().setManualAckMode(true);
    const subscription = stan.subscribe(
        'Ticket::Created',
        'ticket-service-queue-group',
        options
    );

    subscription.on('message', (event: Message) => {
        console.log(`LISTENER - Message received | ID: ${event.getSequence()} | ${event.getSubject()} | Data: ${event.getData()}`);
        event.ack();
    });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());