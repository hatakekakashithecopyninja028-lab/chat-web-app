import express, { Router } from "express";
import dotenv from "dotenv";
import authrouter from "./src/routes/auth.route.js";
import { connectDB } from "./src/lib/db.js";
import cors from "cors";
import path from "path";

import cookieParser from "cookie-parser";
import messagerouter from "./src/routes/message.route.js";
import { app, server } from "./src/socket.js";

dotenv.config(); 
connectDB();


const port =process.env.PORT || 5000
const __dirname = path.resolve();
app.use(cookieParser());
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth",authrouter)
app.use("/api/messages",messagerouter)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

 
  app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
