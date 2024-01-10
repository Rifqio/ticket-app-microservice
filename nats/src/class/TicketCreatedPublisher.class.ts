import Event from "../constant/event-name";
import { Publisher } from "./base/Publisher.class";
import TicketCreatedEvent from "./interface/TicketCreated.interface";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Event.TicketCreated;

}