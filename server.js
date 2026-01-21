import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./config/db.js";
import userRoute from './routes/userRoute.js'
import taskRoute from './routes/taskRoute.js'


const app = express();
app.use(express.json());


app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
