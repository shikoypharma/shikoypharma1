import express from 'express'; 
import routes from './routes/routes.js'
import { connectDB } from './config/db.js';
import dotenv from'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser"


dotenv.config();

const app=express();
const PORT=process.env.PORT || 5001

connectDB();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    }
));
app.use(express.json());
app.use(cookieParser());

app.use('/api',routes);

 
app.listen(5001,()=>{
    console.log('Server started on PORT: ',PORT);
});