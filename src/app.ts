import express from "express";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import taskRoutes from "./modules/task/task.routes";
import billRoutes from "./modules/bill/bill.routes";
import shoppingListRoutes from "./modules/shopping-list/shopping-list.routes";
import shoppingItemRoutes from "./modules/shopping-item/shopping-item.routes";
import { swaggerSpec } from "./docs/swagger";

const app = express();

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("Remindr API is running");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/bills", billRoutes);
app.use("/api/v1/shopping-lists", shoppingListRoutes);
app.use("/api/v1/shopping-lists", shoppingItemRoutes);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;