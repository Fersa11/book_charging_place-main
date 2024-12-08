import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import chargingRoutes from "./routes/chargingPlace.routes.js";

const app = express();
dotenv.config();

const PORT = process.env._PORT || 5555;

app.use(express.json());
app.use("/api/chargingplaces", chargingRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on ${PORT}`);
});
