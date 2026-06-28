import dotenv from "dotenv";
import app from "./app";
import pool from "./config/database";

dotenv.config();

const PORT = process.env.PORT || 4000;

pool.query("SELECT NOW()")
 .then(()=> console.log("Database connected"))
 .catch((err)=> console.error("Databse connection error", err))
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});