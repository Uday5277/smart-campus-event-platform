const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async(credentials)=>{
    const response = await fetch(`${API_URL}/auth/login`,{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(credentials)
    });

    return response.json();
}

export const register = async(userData)=>{
    const response = await fetch(`${API_URL}/auth/register`,{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(userData)
    });

    return response.json();
}



