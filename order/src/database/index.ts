import mongoose from 'mongoose';

import { Logger } from '../helpers/logger';

const { MONGO_URL } = process.env;

export const DatabaseConnection = async () => {
    try {
        await mongoose.connect(MONGO_URL!);
        mongoose.set('maxTimeMS', 5000);
        mongoose.set('bufferTimeoutMS', 7500);
        mongoose.set('debug', true);
        Logger.info('[Database] Connected to database');
    } catch (error: Error | unknown) {
        if (error instanceof Error) {
            Logger.error(
                `[Database] Failed to connect to database ${error.message} ${error.stack}`
            );
            process.exit(1);
        }
    }
};
