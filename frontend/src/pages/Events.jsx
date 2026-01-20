import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchEvents, registerForEvent } from '../Api/Events.js';
import { useAuth } from '../context/AuthContext.jsx';
import EventCard from '../components/EventCard.jsx';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); 

    useEffect(() => {
        const getEvents = async () => {
            if (!user || !user.token) {
                setLoading(false);
                return;
            }

            try {
                const data = await fetchEvents(user.token);
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    console.error("Fetch failed:", data.message);
                    setEvents([]);
                }
            } catch (error) {
                console.error("Connection error:", error);
            } finally {
                setLoading(false);
            }
        };

        getEvents();
    }, [user]); 

    const handleRegister = async (eventId)=>{
        try{
            const confirmed = window.confirm("Do you want to Register For this Event?");
            if(!confirmed) return;
            const data = await registerForEvent(eventId,user.token);
            if(data.success){
                alert("Successfully registered for event!");
                const updatedData = await fetchEvents(user.token);
                if(Array.isArray(updatedData)) setEvents(updatedData);
            }else{
                alert(data.message || "Registration failed.");
            }


        }catch(err){
            console.error("Registration Error",err);
        }


    }



    if (loading) return <div>Loading events...</div>;

    return (
        <div className="events-list">
            <h2>Available Events</h2>
            {events.length === 0 ? (
                <p>No events found. Please check your login or server.</p>
            ) : (
                events.map(event => (
                    <EventCard event={event} onRegister={handleRegister} />
                    
                ))
            )}
        </div>
    );
};

export default Events;