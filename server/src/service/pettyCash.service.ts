import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import PettyCashModel, { PettyCashDocument } from "../models/pettyCash.model";

export async function createPettyCash(
  input: DocumentDefinition<Omit<PettyCashDocument, "createdAt" | "updatedAt">>
) {
  return PettyCashModel.create(input);
}

export async function findPettyCash(
  query: FilterQuery<PettyCashDocument>,
  options: QueryOptions = { lean: true }
) {
  return PettyCashModel.findOne(query, {}, options);
}

export async function findAndUpdatePettyCash(
  query: FilterQuery<PettyCashDocument>,
  update: UpdateQuery<PettyCashDocument>,
  options: QueryOptions
) {
  return PettyCashModel.findOneAndUpdate(query, update, options);
}

export async function deletePettyCash(query: FilterQuery<PettyCashDocument>) {
  return PettyCashModel.deleteOne(query);
}

export async function getPettyCashs() {
  let pettyCashs;
  return (pettyCashs = await PettyCashModel.find());
}

export async function getUserPettyCash(
  query: FilterQuery<PettyCashDocument>,
  options: QueryOptions = { lean: true }
) {
  let pettyCashs;
  return (pettyCashs = await PettyCashModel.find(query, {}, options));
}
