import express from 'express';
import { Logger } from './helpers/logger';
import routes from './routes/manifest';

const APP_PORT = 3000;
const APP_NAME = 'Auth-Service';
const app = express();

app.use(express.json());

app.use(routes);

app.listen(APP_PORT, () => {
    Logger.info(`[${APP_NAME}] listening on port ${APP_PORT} 🚀`);
});
