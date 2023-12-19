import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Logger } from '../helpers';

let mongo: any;

const Namespace = '[Test-Setup]';

beforeAll(async () => {
    Logger.info(`${Namespace} 🧪 Initiating test setup...`);
    mongoose.set('debug', true);
    
    if (mongoose.connection.readyState !== 1) {
        Logger.info(`${Namespace} Creating MongoDB Memory Server...`);
        mongo = await MongoMemoryServer.create();
        const mongoUri = mongo.getUri();
        Logger.info(`${Namespace} MongoMemoryServer created URI: ${mongoUri}`);

        Logger.info(`${Namespace} Connecting to MongoDB Memory Server...`);
        await mongoose.connect(mongoUri);
        Logger.info(`${Namespace} Connected to MongoDB Memory Server...`);
    } else {
        Logger.info(`${Namespace} MongoDB is already connected. Skipping connection setup.`);
    }
});

beforeEach(async () => {
    Logger.info(`${Namespace} Clearing database...`);
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        Logger.info(`${Namespace} Clearing collection...`);
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        Logger.info(`${Namespace} Stopping MongoDB Memory Server...`);
        await mongo.stop();
    }
   
    await mongoose.connection.close();
    Logger.info(`${Namespace} MongoDB Memory Server stopped...`);
});

