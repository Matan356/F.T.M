import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ExpenseModel, { ExpenseDocument } from "../models/expense.model";

export async function createExpense(
  input: DocumentDefinition<Omit<ExpenseDocument, "createdAt" | "updatedAt">>
) {
  return ExpenseModel.create(input);
}

export async function findExpense(
  query: FilterQuery<ExpenseDocument>,
  options: QueryOptions = { lean: true }
) {
  return ExpenseModel.findOne(query, {}, options);
}

export async function findAndUpdateExpense(
  query: FilterQuery<ExpenseDocument>,
  update: UpdateQuery<ExpenseDocument>,
  options: QueryOptions
) {
  return ExpenseModel.findOneAndUpdate(query, update, options);
}

export async function deleteExpense(query: FilterQuery<ExpenseDocument>) {
  return ExpenseModel.deleteOne(query);
}

export async function getExpenses() {
  let expenses;
  try {
    return (expenses = await ExpenseModel.find());
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserExpenses(
  query: FilterQuery<ExpenseDocument>,
  options: QueryOptions = { lean: true }
) {
  let expenses;
  return (expenses = await ExpenseModel.find(query, {}, options));
}

export async function getCustomerExpenses(
  query: FilterQuery<ExpenseDocument>,
  options: QueryOptions = { lean: true }
) {
  let expenses;
  return (expenses = await ExpenseModel.find(query, {}, options));
}
