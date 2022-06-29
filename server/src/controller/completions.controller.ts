import { Request, Response } from "express";
import {
  CreateCompletionInput,
  getCustomerCompletionsInput,
  getUserCompletionsInput,
  UpdateCompletionInput,
} from "../schema/completions.schema";
import {
  createCompletion,
  deleteCompletion,
  findAndUpdateCompletion,
  findCompletion,
  getCustomerCompletions,
  getCompletions,
  getUserCompletions,
} from "../service/completions.service";
import logger from "../utils/logger";

export async function createCompletionHandler(
  req: Request<{}, {}, CreateCompletionInput["body"]>,
  res: Response
) {
  const body = req.body;

  const completion = await createCompletion({
    ...body,
  });

  return res.send(completion);
}
export async function updateCompletionHandler(
  req: Request<UpdateCompletionInput["params"]>,
  res: Response
) {
  const completionId = req.params.completionId;
  const update = req.body;

  const completion = await findCompletion({ completionId });

  if (!completion) {
    return res.sendStatus(404);
  }

  const updatedCompletion = await findAndUpdateCompletion(
    { completionId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedCompletion);
}

export async function getCompletionHandler(
  req: Request<UpdateCompletionInput["params"]>,
  res: Response
) {
  const completionId = req.params.completionId;
  const completion = await findCompletion({ _id: completionId });

  if (!completion) {
    return res.sendStatus(404);
  }

  return res.send(completion);
}

export async function deleteCompletionHandler(
  req: Request<UpdateCompletionInput["params"]>,
  res: Response
) {
  const completionId = req.params.completionId;

  const completion = await findCompletion({ _id: completionId });

  if (!completion) {
    return res.sendStatus(404);
  }

  await deleteCompletion({ _id: completionId });

  return res.sendStatus(200);
}

export async function getCompletionsHandler(req: Request, res: Response) {
  try {
    const completions = await getCompletions();
    return res.send(completions);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserCompletionsHandler(
  req: Request<getUserCompletionsInput["params"]>,
  res: Response
) {
  const userId = req.params.uid;
  logger.info({ userId: userId });
  try {
    const completionsOfUser = await getUserCompletions({ user: userId });
    return res.send(completionsOfUser);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getCustomerCompletionsHandler(
  req: Request<getCustomerCompletionsInput["params"]>,
  res: Response
) {
  const customerId = req.params.cid;
  logger.info({ customerId: customerId });
  try {
    const completionsOfCustomer = await getCustomerCompletions({
      customer: customerId,
    });
    return res.send(completionsOfCustomer);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
