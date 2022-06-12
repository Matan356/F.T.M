import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import CustomerModel, { CustomerDocument } from "../models/customers.model";

export async function createCustomer(
  input: DocumentDefinition<Omit<CustomerDocument, "createdAt" | "updatedAt">>
) {
  return CustomerModel.create(input);
}

export async function findCustomer(
  query: FilterQuery<CustomerDocument>,
  options: QueryOptions = { lean: true }
) {
  return CustomerModel.findOne(query, {}, options);
}

export async function findAndUpdateCustomer(
  query: FilterQuery<CustomerDocument>,
  update: UpdateQuery<CustomerDocument>,
  options: QueryOptions
) {
  return CustomerModel.findOneAndUpdate(query, update, options);
}

export async function deleteCustomer(query: FilterQuery<CustomerDocument>) {
  return CustomerModel.deleteOne(query);
}

export async function getCustomers() {
  let customers;
  try {
    return (customers = await CustomerModel.find());
  } catch (e: any) {
    throw new Error(e);
  }
}
