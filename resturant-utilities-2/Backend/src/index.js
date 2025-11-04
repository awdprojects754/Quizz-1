// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./connection.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";


dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())

app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
));

// Database Connection
connectDB();

// Routes
app.use("/auth", userRouter);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
