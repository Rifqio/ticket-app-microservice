import { Logger } from '@rifqioktario/ticketing-common';
import nats, { Stan } from 'node-nats-streaming';
const { NATS_CLUSTER_ID, NATS_HOST, NATS_CLIENT_ID } = process.env;

class NatsConfig {
    private _client?: Stan;

    public get client(): Stan {
        if (!this._client) {
            throw new Error('Cannot access NATS client before connecting');
        }
        return this._client;
    }

    connect(clustedId: string, clientId: string, url: string) {
        this._client = nats.connect(clustedId, clientId, { url });

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                Logger.info('[NATS] - NATS connection established!');
                resolve();
            });

            this.client.on('error', (err) => {
                Logger.error('[NATS] - Failed to connect NATS');
                reject(err);
            });
        });
    }
}

const natsSvc = new NatsConfig();
function NatsConnection() {
    natsSvc.connect(NATS_CLUSTER_ID!, NATS_CLIENT_ID!, NATS_HOST!);

    natsSvc.client.on('close', () => {
        Logger.info('[NATS] - Connection closed!');
        process.exit();
    });

    process.on('SIGINT', () => natsSvc.client.close());
    process.on('SIGTERM', () => natsSvc.client.close());
}

export { NatsConnection, natsSvc };
