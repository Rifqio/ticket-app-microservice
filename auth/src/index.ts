import express from 'express';
import 'dotenv/config';
import { Logger } from './helpers';
import routes from './routes/manifest';
import { DatabaseConnection } from './server/database/DatabaseConnection';

const APP_PORT = process.env.APP_PORT || 3000;
const APP_NAME = 'Auth-Service';

const app = express();

DatabaseConnection();
app.set('trust proxy', true);
app.use(express.json());
app.use(routes);

app.listen(APP_PORT, () => {
    Logger.info(`[${APP_NAME}] listening on port ${APP_PORT} 🚀`);
});
