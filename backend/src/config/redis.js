import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
    username: process.env.REDIS_DB_USERNAME,
    password: process.env.REDIS_DB_PASSWORD || undefined,
    socket: {
        host: process.env.REDIS_DB_HOST,
        port: process.env.REDIS_DB_PORT
    }
});

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connecting...'));
client.on('ready', () => console.log('Redis Client Ready!'));

// Initialize the connection
(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error('Initial Redis Connection Error:', err);
    }
})();

export default client;

