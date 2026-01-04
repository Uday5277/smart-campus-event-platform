import pool from "../../config/db.js";
import client from "../../config/redis.js";

const RegisterForEvent = async (userId,eventId)=>{
    const redisKey = `event:${eventId}:available_seats`;
    const remainingSeats = await client.decr(redisKey);
    if(remainingSeats<0)
    {
        await client.incr(redisKey);  // Increment back, because it is overdecremented 
        return 0;
    }
    const postgresClient = await pool.connect();
    try{
        await postgresClient.query('BEGIN');
        const res = await postgresClient.query('INSERT INTO registrations(user_id,event_id) VALUES($1,$2) RETURNING id',[userId,eventId]);
        await postgresClient.query('COMMIT');
        return res.rows[0].id;

    }catch(err){
        await postgresClient.query('ROLLBACK');

        await client.incr(redisKey);
        throw err;
    }finally{
        await postgresClient.release();
    }
    
}

export default RegisterForEvent;