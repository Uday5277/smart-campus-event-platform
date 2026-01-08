import { useEffect, useState } from "react";
import { getUserRegistrations } from "../Api/Events.js";
import { useAuth } from "../context/AuthContext.jsx";

const UserRegistrations = ()=>{
    const[currentRegistrations,setCurrentRegistrations] = useState([]);
    const {user} = useAuth();

    useEffect(()=>{
        const getRegistrations = async ()=>{
            try{
                const response = await getUserRegistrations(user.id,user.token);
                if(response.success && Array.isArray(response.registerData))
                    {
                        setCurrentRegistrations(response.registerData);
                    }else {
                    console.error("Fetch failed:", response.message);
                    setCurrentRegistrations([]);
                }

            }catch(err){
                console.log("Fetch Failed",err);
            }
        };
        getRegistrations();
    },[user])

    return (
        <div className="reg-events">
            <h2>My Registrations</h2>
            {currentRegistrations.length === 0 ? 
            (<p>You have not registered for any Events.</p>):
            (
                currentRegistrations.map((event)=>{
                    return (<div key={event.reg_id} className="event-card">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p><strong>Start Time:</strong>{event.start_time}</p>
                         <p><strong>End Time:</strong>{event.end_time}</p>
                    </div>);
                })
            )   
        
        }

        </div>
        
    );


};

export default UserRegistrations;