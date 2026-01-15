import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authenticate from './src/modules/middleware/auth.middleware.js';
import autherizeRole from './src/modules/middleware/role.middleware.js';
import authRoutes from './src/modules/auth/auth.route.js';
import errorHandler from './src/modules/middleware/error.middleware.js';
import EventRoutes from './src/modules/events/events.routes.js';
import RegisterRoutes from './src/modules/registrations/register.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/events',EventRoutes);
app.use('/api/register',RegisterRoutes);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is listening to port ${PORT}`);
});