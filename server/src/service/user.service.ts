import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import logger from "../utils/logger";

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  workerId,
  password,
}: {
  workerId: string;
  password: string;
}) {
  const user = await UserModel.findOne({ workerId });
  if (!user) {
    logger.warn("Could not fund a user");
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export async function getUsers() {
  let users;
  try {
    return (users = await UserModel.find());
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deleteUser(query: FilterQuery<UserDocument>) {
  return UserModel.deleteOne(query).lean();
}

export async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  return UserModel.findOneAndUpdate(query, update, options);
}
