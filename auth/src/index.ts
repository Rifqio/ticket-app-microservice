import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { Logger } from './helpers';
import routes from './routes/manifest';
import { DatabaseConnection } from './server/database/DatabaseConnection';

const APP_PORT = process.env.APP_PORT || 4000;
const APP_NAME = 'Auth-Service';

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));

DatabaseConnection();
app.set('trust proxy', true);
app.use(express.json());
app.use(routes);

app.listen(APP_PORT, () => {
    Logger.info(`[${APP_NAME}] listening on port ${APP_PORT} 🚀`);
});
