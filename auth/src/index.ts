import express from 'express';
import { Logger } from './helpers';
import routes from './routes/manifest';
import dotenv from 'dotenv';
import { DatabaseConnection } from './server/database/DatabaseConnection';

dotenv.config();

const APP_PORT = process.env.APP_PORT || 3000;
const APP_NAME = 'Auth-Service';
const app = express();

DatabaseConnection();
app.use(express.json());
app.use(routes);

app.listen(APP_PORT, () => {
    Logger.info(`[${APP_NAME}] listening on port ${APP_PORT} 🚀`);
});
