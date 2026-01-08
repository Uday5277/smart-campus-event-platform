import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/RegisterTemp.jsx";
import Login from "./pages/LoginTemp.jsx";
import Events from "./pages/Events.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";
import UserRegistrations from "./pages/UserRegistrations.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Smart Campus Event Platform</h1>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />

          <Route
            path="/reg-history"
            element={
              <ProtectedRoute roleRequired="Student">
                <UserRegistrations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-event"
            element={
              <ProtectedRoute roleRequired="Admin">
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute roleRequired="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/events" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
