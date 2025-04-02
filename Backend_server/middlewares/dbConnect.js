import { connectToDatabase } from "../db/db.js";

let isConnected = false;

export const dbMiddleware = async (req, res, next) => {
    try {
        if (!isConnected) {
            await connectToDatabase();
            isConnected = true;
        }
        next();
    } catch (error) {
        console.log('Database connection error:', error);
        res.status(500).json({ message: 'Failed to connect to database' });
    }
};
