import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import MileageModel, { MileageDocument } from "../models/mileage.model";

export async function createMileage(
  input: DocumentDefinition<Omit<MileageDocument, "createdAt" | "updatedAt">>
) {
  return MileageModel.create(input);
}

export async function findMileage(
  query: FilterQuery<MileageDocument>,
  options: QueryOptions = { lean: true }
) {
  return MileageModel.findOne(query, {}, options);
}

export async function findAndUpdateMileage(
  query: FilterQuery<MileageDocument>,
  update: UpdateQuery<MileageDocument>,
  options: QueryOptions
) {
  return MileageModel.findOneAndUpdate(query, update, options);
}

export async function deleteMileage(query: FilterQuery<MileageDocument>) {
  return MileageModel.deleteOne(query);
}

export async function getMileages() {
  let mileages;
  return (mileages = await MileageModel.find());
}

export async function getUserMileages(
  query: FilterQuery<MileageDocument>,
  options: QueryOptions = { lean: true }
) {
  let mileages;
  return (mileages = await MileageModel.find(query, {}, options));
}
