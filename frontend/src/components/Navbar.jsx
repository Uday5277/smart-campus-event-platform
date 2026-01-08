import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#eee' }}>
            <Link to="/events">Events</Link>
            {user?.role === 'Student' && <Link to="/reg-history">My Registrations</Link>}
            {user?.role === 'Admin' && (
                <>
                <Link to="/admin-dashboard">Dashboard</Link>
                <Link to="/create-event">Create Event</Link>
                </>
                )}
            <button onClick={handleLogout}>Logout</button>
            <span style={{ marginLeft: 'auto' }}>Logged in as: {user?.name} ({user?.role})</span>
        </nav>
    );
};

export default Navbar;