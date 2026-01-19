import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const CreateEvent = () => {
    const [eventData, setEventData] = useState({ title: '', description: '', totalSeats: 10,startTime:'',endTime:'' });
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/events` || 'http://localhost:5000/api/events', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            const data = await response.json();
            if (data.success) alert("Event Created!");
        } catch (err) {
            alert("Error creating event");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Event</h2>
            <input placeholder="Title" onChange={e => setEventData({...eventData, title: e.target.value})} />
            <textarea placeholder="Description" onChange={e => setEventData({...eventData, description: e.target.value})} />
            <input type="number" placeholder="Seats" onChange={e => setEventData({...eventData, totalSeats: parseInt(e.target.value)})} />
            <input placeholder="Start Time" onChange={e => setEventData({...eventData,startTime:e.target.value})} />
             <input placeholder="End Time" onChange={e => setEventData({...eventData,endTime:e.target.value})} />
             <button type="submit">Create</button>
        </form>
    );
};

export default CreateEvent;