import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

mongoose.connect(DB_URI).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
