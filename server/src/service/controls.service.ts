import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ControlsModel, { ControlsDocument } from "../models/controls.model";

export async function createControls(
  input: DocumentDefinition<Omit<ControlsDocument, "createdAt" | "updatedAt">>
) {
  return ControlsModel.create(input);
}

export async function findControls(
  query: FilterQuery<ControlsDocument>,
  options: QueryOptions = { lean: true }
) {
  return ControlsModel.findOne(query, {}, options);
}

export async function findAndUpdateControls(
  query: FilterQuery<ControlsDocument>,
  update: UpdateQuery<ControlsDocument>,
  options: QueryOptions
) {
  return ControlsModel.findOneAndUpdate(query, update, options);
}

export async function deleteControls(query: FilterQuery<ControlsDocument>) {
  return ControlsModel.deleteOne(query);
}

export async function getControls() {
  let controls;
  try {
    return (controls = await ControlsModel.find());
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getUserControls(
  query: FilterQuery<ControlsDocument>,
  options: QueryOptions = { lean: true }
) {
  let controls;
  return (controls = await ControlsModel.find(query, {}, options));
}

export async function getCustomerControls(
  query: FilterQuery<ControlsDocument>,
  options: QueryOptions = { lean: true }
) {
  let controls;
  return (controls = await ControlsModel.find(query, {}, options));
}
