import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Api/Auth.js'; 
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { loginUser } = useAuth(); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(credentials);
            if (data.success || data.token) {
                loginUser({token:data.token,...data.user}); 
                alert("Login Successful!");
                navigate('/events');
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            alert("Connection error. Is your backend running?");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <div>
                <p>Don't have an account? </p>
                <Link  to="/register" style={{color:'blue', cursor:'pointer', textDecoration:'underline'}}>
                Click here to Register
                </Link>
            </div>
        </div>
    );
};

export default Login;