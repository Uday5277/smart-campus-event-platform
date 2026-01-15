const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchEvents = async (token)=>{
    const response = await fetch(`${API_URL}/events`,{
            method:'GET',
            headers : {
        'Authorization':`Bearer ${token}`,
        'Content-type':'application/json'
            }
    })
    return response.json();
}

export const registerForEvent = async (eventId,token)=>{
    const response = await fetch(`${API_URL}/register/${eventId}`,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-type':'application/json'
        }
    });

    return response.json();
}

export const getUserRegistrations = async (userId,token)=>{
    const response = await fetch(`${API_URL}/register/reg-history/${userId}`,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-type':'application/json'
        }
    });
    return response.json();
};