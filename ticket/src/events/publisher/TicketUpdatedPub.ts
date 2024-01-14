import { Publisher } from '@rifqioktario/ticketing-common';
import {
    Event,
    TicketUpdatedEvent,
} from '@rifqioktario/ticketing-common/build/project';

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Event.TicketUpdated;
}

export default TicketUpdatedPublisher;
