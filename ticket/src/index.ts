import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import routes from './routes/manifest';
import { DatabaseConnection } from './server/database/DatabaseConnection';
import { Logger } from '@rifqioktario/ticketing-common';
import { NatsConnection } from './server/event/NatsConfig';

const APP_PORT = process.env.APP_PORT || 5000;
const APP_NAME = 'Ticket-Service';

const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}));

DatabaseConnection();
NatsConnection();

app.set('trust proxy', true);
app.use(express.json());
app.use(routes);

app.listen(APP_PORT, () => {
    Logger.info(`[${APP_NAME}] listening on port ${APP_PORT} 🚀`);
});
