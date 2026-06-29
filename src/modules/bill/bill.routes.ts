import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import * as billController from "./bill.controller";

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /bills:
 *   post:
 *     tags: [Bills]
 *     summary: Create a new bill
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, amount, due_date, category]
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: string
 *               due_date:
 *                 type: string
 *                 format: date
 *               due_time:
 *                 type: string
 *                 nullable: true
 *               category:
 *                 type: string
 *                 enum: [Utility, Housing, Transport, Food, Health, Insurance, Subscription, Other]
 *     responses:
 *       201:
 *         description: Bill created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bill:
 *                   $ref: "#/components/schemas/Bill"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", billController.create);

/**
 * @openapi
 * /bills:
 *   get:
 *     tags: [Bills]
 *     summary: List all bills for the authenticated user with total count
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bills with total count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bills:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Bill"
 *                 total:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 */
router.get("/", billController.list);

/**
 * @openapi
 * /bills/{id}:
 *   patch:
 *     tags: [Bills]
 *     summary: Update bill status (paid/unpaid)
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
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [paid, unpaid]
 *     responses:
 *       200:
 *         description: Bill status updated
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Bill not found
 */
router.patch("/:id", billController.updateStatus);

/**
 * @openapi
 * /bills/{id}:
 *   delete:
 *     tags: [Bills]
 *     summary: Delete a bill
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
 *         description: Bill deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Bill not found
 */
router.delete("/:id", billController.remove);

export default router;
