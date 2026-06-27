import express from "express";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Remindr API is running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});