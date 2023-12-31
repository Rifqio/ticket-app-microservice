import mongoose, { Error } from "mongoose";
import { Logger } from "../../helpers/logger";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URL } = process.env;

export const DatabaseConnection = async () => {
    try {
        if (!MONGO_URL) {
            Logger.error("[Database-Connection] MONGO_URL is not defined");
            throw new Error("Internal Server Error");
        }
        await mongoose.connect(MONGO_URL);
        mongoose.set('debug', true);
        Logger.info("[Database-Connection] Connected to database");
    } catch (error: any) {
        Logger.error(`[Database-Connection] Failed to connect to database ${error.message} ${error.stack}`);
        process.exit(1);
    }
};