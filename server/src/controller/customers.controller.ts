import { Request, Response } from "express";
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from "../schema/customer.schema";
import {
  createCustomer,
  deleteCustomer,
  findAndUpdateCustomer,
  findCustomer,
  getCustomers,
} from "../service/customer.service";
import logger from "../utils/logger";

export async function createCustomerHandler(
  req: Request<{}, {}, CreateCustomerInput["body"]>,
  res: Response
) {
  const body = req.body;

  const customer = await createCustomer({ ...body });

  return res.send(customer);
}
export async function updateCustomerHandler(
  req: Request<UpdateCustomerInput["params"]>,
  res: Response
) {
  const customerId = req.params.customerId;
  const update = req.body;

  const customer = await findCustomer({ customerId });

  if (!customer) {
    return res.sendStatus(404);
  }

  const updatedcustomer = await findAndUpdateCustomer({ customerId }, update, {
    new: true,
  });

  return res.send(updatedcustomer);
}

export async function getCustomerHandler(
  req: Request<UpdateCustomerInput["params"]>,
  res: Response
) {
  const customerId = req.params.customerId;
  const customer = await findCustomer({ customerId });

  if (!customer) {
    return res.sendStatus(404);
  }

  return res.send(customer);
}

export async function deleteCustomerHandler(
  req: Request<UpdateCustomerInput["params"]>,
  res: Response
) {
  const customerId = req.params.customerId;

  const customer = await findCustomer({ customerId });

  if (!customer) {
    return res.sendStatus(404);
  }

  await deleteCustomer({ customerId });

  return res.sendStatus(200);
}

export async function getCustomersHandler(req: Request, res: Response) {
  try {
    const customers = await getCustomers();
    return res.send(customers);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
