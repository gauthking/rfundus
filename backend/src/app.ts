import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import otpRoutes from "./routes/otpRoutes";
import authRoutes from "./routes/authRoutes";

// app setup
const app = express();

//middleware
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

//routes 
app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);

export default app;