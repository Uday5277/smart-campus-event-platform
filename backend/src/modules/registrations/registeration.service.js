import pool from "../../config/db.js";

const RegisterForEvent = async (userId,eventId)=>{
    const existingEvent = await pool.query('SELECT * FROM events WHERE id = $1',[eventId]);

    if (existingEvent.rows.length === 0) {
        return -1; // Event not found
    }

    if(existingEvent.rows.length > 0){
        const result = await pool.query('SELECT COUNT(*) FROM registrations WHERE event_id = $1',[eventId]);
        const currentRegistrations = parseInt(result.rows[0].count);
        if(currentRegistrations >= existingEvent.rows[0].total_seats){
            return 0;
        }
         const registeredData = await pool.query('INSERT INTO registrations(user_id,event_id) VALUES($1,$2) RETURNING id',[userId,eventId]);
        return registeredData.rows[0].id;
    }
    
}

export default RegisterForEvent;