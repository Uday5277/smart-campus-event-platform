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

const getUserRegistrations = async (userId)=>{
   try{
    const result = await pool.query('SELECT registrations.id as reg_id, event_id,title,description,start_time,end_time FROM events JOIN registrations ON events.id = registrations.event_id WHERE registrations.user_id = $1',[userId]);
    return result.rows;

   }catch(err){
    console.log("Registration Service Error",err.message);
    throw err;
   }
};

export {RegisterForEvent, getUserRegistrations};