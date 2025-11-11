import 'dotenv/config';

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Learnify API listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
