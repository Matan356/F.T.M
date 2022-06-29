import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import CompletionModel, {
  CompletionsDocument,
} from "../models/completions.model";

export async function createCompletion(
  input: DocumentDefinition<
    Omit<CompletionsDocument, "createdAt" | "updatedAt">
  >
) {
  return CompletionModel.create(input);
}

export async function findCompletion(
  query: FilterQuery<CompletionsDocument>,
  options: QueryOptions = { lean: true }
) {
  return CompletionModel.findOne(query, {}, options);
}

export async function findAndUpdateCompletion(
  query: FilterQuery<CompletionsDocument>,
  update: UpdateQuery<CompletionsDocument>,
  options: QueryOptions
) {
  return CompletionModel.findOneAndUpdate(query, update, options);
}

export async function deleteCompletion(query: FilterQuery<CompletionsDocument>) {
  return CompletionModel.deleteOne(query);
}

export async function getCompletions() {
  let Completions;
  try {
    return (Completions = await CompletionModel.find());
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserCompletions(
  query: FilterQuery<CompletionsDocument>,
  options: QueryOptions = { lean: true }
) {
  let Completions;
  return (Completions = await CompletionModel.find(query, {}, options));
}

export async function getCustomerCompletions(
  query: FilterQuery<CompletionsDocument>,
  options: QueryOptions = { lean: true }
) {
  let completions;
  return (completions = await CompletionModel.find(query, {}, options));
}
