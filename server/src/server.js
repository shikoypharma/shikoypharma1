import express from 'express';
import routes from './routes/routes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser"
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001

connectDB();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}
));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);
app.use('/api/upload', uploadRoutes);

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log('Server started on PORT: ', PORT);
    });
}

export default app;