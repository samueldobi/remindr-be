import { Router } from "express";
import * as userController from "./user.controller";

const router = Router();

router.post("/register", userController.register);
router.get("/:id", userController.getProfile);

export default router;
