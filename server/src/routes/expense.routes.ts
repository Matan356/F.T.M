import express from "express";
import {
  createExpenseHandler,
  deleteExpenseHandler,
  getCustomerExpensesHandler,
  getExpenseHandler,
  getExpensesHandler,
  getUserExpensesHandler,
  updateExpenseHandler,
} from "../controller/expense.controller";
import requireAdmin from "../middleware/requireAdmin";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createExpenseSchema,
  deleteExpenseSchema,
  getExpenseSchema,
  updateExpenseSchema,
} from "../schema/expense.schema";

const router = express.Router();

router.post(
  "/api/expenses",
  [requireUser, validateResource(createExpenseSchema)],
  createExpenseHandler
);

router.put(
  "/api/expenses/:expenseId",
  [requireAdmin, validateResource(updateExpenseSchema)],
  updateExpenseHandler
);

router.get(
  "/api/expenses/:expenseId",
  [requireAdmin, validateResource(getExpenseSchema)],
  getExpenseHandler
);

router.delete(
  "/api/expenses/:expenseId",
  [requireAdmin, validateResource(deleteExpenseSchema)],
  deleteExpenseHandler
);
router.get("/api/expenses", requireAdmin, getExpensesHandler);
router.get(
  "/api/userExpenses/:uid",
  requireAdmin,
  getUserExpensesHandler
);
router.get(
  "/api/customerExpenses/:cid",
  requireAdmin,
  getCustomerExpensesHandler
);
export default router;
