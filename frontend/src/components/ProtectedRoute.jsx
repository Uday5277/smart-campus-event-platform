import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roleRequired }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;
    
    if (roleRequired && user.role !== roleRequired) {
        return <Navigate to="/events" />; // Redirect if role doesn't match
    }

    return children;
};

export default ProtectedRoute;