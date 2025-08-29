import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// ** THE FIX IS HERE **
// Load env vars right at the beginning
dotenv.config();

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Health First API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/appointments', appointmentRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));