import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";

const app = express();

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("Remindr API is running");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

export default app;