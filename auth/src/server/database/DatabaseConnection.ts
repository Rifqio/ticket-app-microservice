import mongoose from "mongoose";
import { Logger } from "../../helpers/logger";

const { MONGO_URL } = process.env;

export const DatabaseConnection = async () => {
    try {
        await mongoose.connect(MONGO_URL as string);
        mongoose.set('debug', true);
        Logger.info("[Database-Connection] Connected to database");
    } catch (error: any) {
        Logger.error(`[Database-Connection] Failed to connect to database ${error.message} ${error.stack}`);
        process.exit(1);
    }
};