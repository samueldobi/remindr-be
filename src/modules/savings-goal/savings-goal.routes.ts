import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import * as savingsGoalController from "./savings-goal.controller";

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /savings-goals:
 *   post:
 *     tags: [Savings Goals]
 *     summary: Create a new savings goal
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, target_amount]
 *             properties:
 *               title:
 *                 type: string
 *               target_amount:
 *                 type: string
 *     responses:
 *       201:
 *         description: Savings goal created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 goal:
 *                   $ref: "#/components/schemas/SavingsGoal"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", savingsGoalController.create);

/**
 * @openapi
 * /savings-goals:
 *   get:
 *     tags: [Savings Goals]
 *     summary: List all savings goals for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of savings goals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 goals:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/SavingsGoal"
 *       401:
 *         description: Unauthorized
 */
router.get("/", savingsGoalController.list);

/**
 * @openapi
 * /savings-goals/{id}:
 *   patch:
 *     tags: [Savings Goals]
 *     summary: Update title, target amount, or current amount
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               target_amount:
 *                 type: string
 *               current_amount:
 *                 type: string
 *     responses:
 *       200:
 *         description: Savings goal updated
 *       400:
 *         description: Validation error (e.g. current amount exceeds target)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Savings goal not found
 */
router.patch("/:id", savingsGoalController.update);

/**
 * @openapi
 * /savings-goals/{id}:
 *   delete:
 *     tags: [Savings Goals]
 *     summary: Delete a savings goal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Savings goal deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Savings goal not found
 */
router.delete("/:id", savingsGoalController.remove);

export default router;
