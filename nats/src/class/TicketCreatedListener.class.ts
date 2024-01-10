import { Message } from "node-nats-streaming";
import { Logger } from "../helpers";
import Listener from "./base/Listener.class";
import Event from "../constant/event-name";
import QueueGroup from "../constant/queue-name";
import TicketCreatedEvent from "./interface/TicketCreated.interface";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Event.TicketCreated;
    readonly queueGroupName = QueueGroup.PaymentService;

    onMessage(data: TicketCreatedEvent['data'], message: Message): void {
        Logger.info(`[Listener, Event] Event data: ${data}`);
        message.ack();
    }
}

export default TicketCreatedListener;