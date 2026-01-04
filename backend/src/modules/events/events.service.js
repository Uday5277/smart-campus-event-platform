import { error } from "console";
import pool from "../../config/db.js";
import client from "../../config/redis.js";

const CreateEvent = async (eventData)=>{
    const {title, description, totalSeats, startTime, endTime} = eventData;
    try{
    if(!title || !description || !totalSeats || !startTime || !endTime){
        throw new Error("Missing required event fields");
    }
    const result = await pool.query('INSERT INTO events(title,description,total_seats,start_time,end_time) VALUES($1,$2,$3,$4,$5) RETURNING id,total_seats',[title,description,totalSeats,startTime,endTime]);

    const eventId = result.rows[0].id;
    await client.set(`event:${eventId}:available_seats`,String(result.rows[0].total_seats));
    return eventId;
}catch(err){
    console.log("Event Service error:",err.message);
    throw(err);
}
};

const GetAllEvents = async ()=>{
    try{
        const result = await pool.query('SELECT * FROM events');
        return result.rows;

    }catch(err){
        console.log("Event service error: ",err.message);
        throw(err);
    }
};

const GetEventById = async (eventId)=>{
    try{
         const result = await pool.query('SELECT * FROM events WHERE id = $1',[eventId]);
         return result.rows[0].id;

    }catch(err){
        console.log("Event service error: ",err.message);
        throw(err);
    }
};

export {CreateEvent,GetAllEvents,GetEventById};