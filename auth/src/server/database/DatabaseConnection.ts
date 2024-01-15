import mongoose from "mongoose";
// import { MongoMemoryServer } from 'mongodb-memory-server';

import { Logger } from "../../helpers/logger";

const { MONGO_URL } = process.env;

export const DatabaseConnection = async () => {
    try {
        // const mongo = await MongoMemoryServer.create();
        // const mongoUri = mongo.getUri();
        await mongoose.connect(MONGO_URL!);
        mongoose.set('maxTimeMS', 5000)
        mongoose.set('debug', true);
        Logger.info("[Database-Connection] Connected to database");
    } catch (error: any) {
        Logger.error(`[Database-Connection] Failed to connect to database ${error.message} ${error.stack}`);
        process.exit(1);
    }
};