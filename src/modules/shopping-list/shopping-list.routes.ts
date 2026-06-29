import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import * as shoppingListController from "./shopping-list.controller";

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /shopping-lists:
 *   post:
 *     tags: [Shopping Lists]
 *     summary: Create a new shopping list
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shopping list created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 list:
 *                   $ref: "#/components/schemas/ShoppingList"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", shoppingListController.create);

/**
 * @openapi
 * /shopping-lists:
 *   get:
 *     tags: [Shopping Lists]
 *     summary: List all shopping lists for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of shopping lists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 lists:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/ShoppingList"
 *       401:
 *         description: Unauthorized
 */
router.get("/", shoppingListController.list);

/**
 * @openapi
 * /shopping-lists/{id}:
 *   patch:
 *     tags: [Shopping Lists]
 *     summary: Rename a shopping list
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
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shopping list renamed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Shopping list not found
 */
router.patch("/:id", shoppingListController.rename);

/**
 * @openapi
 * /shopping-lists/{id}:
 *   delete:
 *     tags: [Shopping Lists]
 *     summary: Delete a shopping list and all its items
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
 *         description: Shopping list deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Shopping list not found
 */
router.delete("/:id", shoppingListController.remove);

export default router;
