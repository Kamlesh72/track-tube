import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { requireSignIn } from "./middlewares/authMiddleware.js";
import path from "path";

const app = express();
dotenv.config();
connectDB();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// routes
app.use(express.static(path.resolve("build")));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", requireSignIn, dashboardRoutes);
app.use("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build/index.html"));
});
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build/index.html"));
});

app.listen(process.env.PORT, (req, res) => {
  console.log("Server running on 8080");
});
