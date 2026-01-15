import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();


const client = createClient({
    url: process.env.REDIS_URL || undefined,
    ...(!process.env.REDIS_URL && {
        socket: {
            host: process.env.REDIS_DB_HOST || 'localhost',
            port: process.env.REDIS_DB_PORT || 6379
        },
        password: process.env.REDIS_DB_PASSWORD || undefined
    })
});

client.on('error', err => console.log('Redis Client Error', err));
client.on('ready', () => console.log('Redis Client Ready!'));

(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error('Initial Redis Connection Error:', err);
    }
})();

export default client;