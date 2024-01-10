import Event from '../../constant/event-name';

interface TicketCreatedEvent {
    subject: Event.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
    };
}

export default TicketCreatedEvent;
