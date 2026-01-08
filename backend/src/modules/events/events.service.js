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
        const events = result.rows;

        const eventsWithSeats = await Promise.all(events.map(async(event)=>{
            const availableSeats = await client.get(`event:${event.id}:available_seats`);
            return {
                ...event,
                availableSeats: availableSeats !== null ? parseInt(availableSeats): event.total_seats
            };
        }));

        return eventsWithSeats;

    }catch(err){
        console.log("Event service error: ",err.message);
        throw(err);
    }
};

const GetEventById = async (eventId)=>{
    try{
         const result = await pool.query('SELECT * FROM events WHERE id = $1',[eventId]);
         return result.rows[0];

    }catch(err){
        console.log("Event service error: ",err.message);
        throw(err);
    }
};

const GetAdminStats = async () => {
    try {
        const query = `
            SELECT 
                e.id, 
                e.title, 
                e.total_seats, 
                COUNT(r.id) AS registered_count
            FROM events e
            LEFT JOIN registrations r ON e.id = r.event_id
            GROUP BY e.id;
        `;
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error("Admin Stats Service Error:", err.message);
        throw err;
    }
};

export { CreateEvent, GetAllEvents, GetEventById, GetAdminStats };
