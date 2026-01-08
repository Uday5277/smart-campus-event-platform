import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../Api/Auth.js';

const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        role: 'Student' // Default role
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page from refreshing
        try {
            const data = await register(formData);
            if (data.success) {
                alert("Registration Successful! Please login.");
                navigate('/events'); 
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Register Error:", error);
            alert("Server error. Is your backend running?");
        }
    };

    return (
        <div className="register-container">
            <h2>Register for Smart Campus</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    name="userName" 
                    placeholder="UserName" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    required 
                />
                <select name="role" onChange={handleChange}>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default Register;