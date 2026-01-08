import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const AdminDashboard = () => {
    const [stats, setStats] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events/admin/stats', {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const data = await response.json();
                if (Array.isArray(data)) setStats(data);
            } catch (err) {
                console.error("Failed to fetch stats", err);
            }
        };
        fetchStats();
    }, [user]);

    return (
        <div className="admin-dashboard">
            <h2>Admin Event Overview</h2>
            <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Event Title</th>
                        <th>Total Seats</th>
                        <th>Total Registrations</th>
                        <th>Fill Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map(s => (
                        <tr key={s.id}>
                            <td>{s.title}</td>
                            <td>{s.total_seats}</td>
                            <td>{s.registered_count}</td>
                            <td>{((s.registered_count / s.total_seats) * 100).toFixed(1)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;