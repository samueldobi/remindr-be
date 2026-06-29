import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import * as shoppingItemController from "./shopping-item.controller";

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /shopping-lists/{listId}/items:
 *   post:
 *     tags: [Shopping Items]
 *     summary: Add an item to a shopping list
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   $ref: "#/components/schemas/ShoppingItem"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Shopping list not found
 */
router.post("/:listId/items", shoppingItemController.create);

/**
 * @openapi
 * /shopping-lists/{listId}/items:
 *   get:
 *     tags: [Shopping Items]
 *     summary: List items in a shopping list
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/ShoppingItem"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Shopping list not found
 */
router.get("/:listId/items", shoppingItemController.list);

/**
 * @openapi
 * /shopping-lists/items/{id}:
 *   patch:
 *     tags: [Shopping Items]
 *     summary: Rename an item
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
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item renamed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 */
router.patch("/items/:id", shoppingItemController.rename);

/**
 * @openapi
 * /shopping-lists/items/{id}:
 *   delete:
 *     tags: [Shopping Items]
 *     summary: Delete an item
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
 *         description: Item deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Item not found
 */
router.delete("/items/:id", shoppingItemController.remove);

export default router;
