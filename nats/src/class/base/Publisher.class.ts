import { Stan } from 'node-nats-streaming';
import { Logger } from '../../helpers';

interface Event {
    subject: string;
    data: any;
}

export abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    private client: Stan;

    constructor(client: Stan) {
        this.client = client;
    }

    publish(data: T['data']): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                if (err) {
                    Logger.error(`[Publisher, Event] Event publish failed: ${this.subject} | Data ${JSON.stringify(data)}`);
                    return reject(err); 
                }
                Logger.info(`[Publisher, Event] Event published: ${this.subject} | Data ${JSON.stringify(data)}`);
                resolve();
            });
        });
    }
}
