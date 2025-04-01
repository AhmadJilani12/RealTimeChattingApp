import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';

import dotenv from 'dotenv';
import {connectDB}  from './lib/db.js';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();
app.use(express.json());

app.use(cookieParser());
app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoute);
const PORT = process.env.PORT || 5001;

app.listen(PORT , () => {
    console.log('Server is running on port'+PORT);
    connectDB();
});



