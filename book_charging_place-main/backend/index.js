import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const PORT = process.env._PORT;

app.get("/", (req, res) => {
  console.log("this is the request " + req);

  res.send(`Server is working on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
