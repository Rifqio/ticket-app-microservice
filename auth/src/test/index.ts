import express from 'express';
import 'dotenv/config';
import routes from '../routes/manifest';

const APP_NAME = 'Auth-Service-Test';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(routes);

export default app;