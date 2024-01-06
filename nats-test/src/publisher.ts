import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.clear();
    console.log('PUBLISHER - Publisher connected to NATS');
    
    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20
    });

    stan.publish('Ticket::Created', data, () => {
        console.log('PUBLISHER - Event published | Ticket::Created');
    });
});


