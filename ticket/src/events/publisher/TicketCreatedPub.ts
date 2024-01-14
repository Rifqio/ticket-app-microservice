import { Publisher } from '@rifqioktario/ticketing-common';
import {
    Event,
    TicketCreatedEvent,
} from '@rifqioktario/ticketing-common/build/project';

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Event.TicketCreated;
}

export default TicketCreatedPublisher;
