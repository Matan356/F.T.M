import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import StandardsModel, { StandardsDocument } from "../models/standards.model";

export async function createStandards(
  input: DocumentDefinition<Omit<StandardsDocument, "createdAt" | "updatedAt">>
) {
  return StandardsModel.create(input);
}

export async function findStandards(
  query: FilterQuery<StandardsDocument>,
  options: QueryOptions = { lean: true }
) {
  return StandardsModel.findOne(query, {}, options);
}

export async function findAndUpdateStandards(
  query: FilterQuery<StandardsDocument>,
  update: UpdateQuery<StandardsDocument>,
  options: QueryOptions
) {
  return StandardsModel.findOneAndUpdate(query, update, options);
}

export async function deleteStandards(query: FilterQuery<StandardsDocument>) {
  return StandardsModel.deleteOne(query);
}

export async function getStandards() {
  let standards;
  return (standards = await StandardsModel.find());
}
