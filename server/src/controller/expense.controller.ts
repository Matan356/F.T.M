import { Request, Response } from "express";
import {
  CreateExpenseInput,
  getCustomerExpensesInput,
  getUserExpensesInput,
  UpdateExpenseInput,
} from "../schema/expense.schema";
import {
  createExpense,
  deleteExpense,
  findAndUpdateExpense,
  findExpense,
  getCustomerExpenses,
  getExpenses,
  getUserExpenses,
} from "../service/expense.sevice";
import logger from "../utils/logger";

export async function createExpenseHandler( 
  req: Request<{}, {}, CreateExpenseInput["body"]>,
  res: Response
) {
  const body = req.body;
  const userId = res.locals.user._id;

  const Expense = await createExpense({
    ...body,
    user: userId,
  });

  return res.send(Expense);
}
export async function updateExpenseHandler(
  req: Request<UpdateExpenseInput["params"]>,
  res: Response
) {
  const expenseId = req.params.expenseId;
  const update = req.body;

  const expense = await findExpense({ expenseId });

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await findAndUpdateExpense({ expenseId }, update, {
    new: true,
  });

  return res.send(updatedExpense);
}

export async function getExpenseHandler(
  req: Request<UpdateExpenseInput["params"]>,
  res: Response
) {
  const expenseId = req.params.expenseId;
  const expense = await findExpense({_id: expenseId });

  if (!expense) {
    return res.sendStatus(404);
  }

  return res.send(expense);
}

export async function deleteExpenseHandler(
  req: Request<UpdateExpenseInput["params"]>,
  res: Response
) {
  const expenseId = req.params.expenseId;

  const expense = await findExpense({_id: expenseId });

  if (!expense) {
    return res.sendStatus(404);
  }

  await deleteExpense({_id: expenseId });

  return res.sendStatus(200);
}

export async function getExpensesHandler(req: Request, res: Response) {
  try {
    const expenses = await getExpenses();
    return res.send(expenses);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserExpensesHandler(
    req: Request<getUserExpensesInput["params"]>,
    res: Response
  ) {
    const userId = req.params.uid;
    logger.info({ userId: userId });
    try {
      const expensesOfUser = await getUserExpenses({ user: userId });
      return res.send(expensesOfUser);
    } catch (e: any) {
      logger.error(e);
      return res.status(409).send(e.message);
    }
  }
  
  export async function getCustomerExpensesHandler(
    req: Request<getCustomerExpensesInput["params"]>,
    res: Response
  ) {
    const customerId = req.params.cid;
    logger.info({ customerId: customerId });
    try {
      const expensesOfCustomer = await getCustomerExpenses({ customer: customerId });
      return res.send(expensesOfCustomer);
    } catch (e: any) {
      logger.error(e);
      return res.status(409).send(e.message);
    }
  }
  