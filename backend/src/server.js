import express from 'express';
import dotenv from 'dotenv';
import authenticate from './modules/middleware/auth.middleware.js';
import autherizeRole from './modules/middleware/role.middleware.js';
import authRoutes from './modules/auth/auth.route.js';
import errorHandler from './modules/middleware/error.middleware.js';
import EventRoutes from './modules/events/events.routes.js';
import RegisterRoutes from './modules/registrations/register.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/events',EventRoutes);
app.use('/api/register',RegisterRoutes);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is listening to port ${PORT}`);
});