import cron from 'node-cron'
import { updateRefreshToken } from './tokensWorker'

cron.schedule("*/15 * * * * *", async () => {
    try {
        console.log("Cron job running...");
        await updateRefreshToken();  
    } catch (error) {
        console.error("Error in cron job:", error);
    }
});