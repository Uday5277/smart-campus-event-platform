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
        <nav style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '20px', 
            padding: '15px 30px', 
            background: '#004a99',
            color: 'white' 
        }}>
            <Link to="/events" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Events</Link>
            {user?.role === 'Student' && <Link to="/reg-history" style={{ color: 'white', textDecoration: 'none' }}>My Registrations</Link>}
            {user?.role === 'Admin' && (
                <>
                    <Link to="/create-event" style={{ color: 'white', textDecoration: 'none' }}>Create Event</Link>
                    <Link to="/admin-dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                </>
            )}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '0.9rem' }}>{user?.name} ({user?.role})</span>
                <button onClick={handleLogout} style={{ 
                    width: 'auto', 
                    padding: '5px 15px', 
                    background: 'white', 
                    color: '#004a99',
                    fontSize: '0.8rem'
                }}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;