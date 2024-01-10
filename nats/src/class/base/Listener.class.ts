import { Message, Stan } from 'node-nats-streaming';
import { Logger } from '../../helpers';
import EventName from '../../constant/event-name';

interface Event {
    subject: EventName;
    data: any;
}

abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], message: Message): void;

    private client: Stan;
    protected ackWait = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setDurableName(this.queueGroupName);
        // .ackWait(this.ackWait as number);
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        const sequence = msg.getSequence();
        if (typeof data === 'string') {
            return JSON.stringify(data) + ' Sequence: ' + sequence;
        }

        // If data type is buffer
        return JSON.parse(data.toString('utf8'));
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions(),
        );

        subscription.on('message', (msg: Message) => {
            Logger.info(
                `[Listener, Event] Message received: ${this.subject} / ${this.queueGroupName}`,
            );

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }
}

export default Listener;
