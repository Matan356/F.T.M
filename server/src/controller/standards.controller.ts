import { Request, Response } from "express";
import {
  CreateStandardsInput,
  ReadStandardsInput,
  UpdateStandardsInput,
  DeleteStandardsInput,
} from "../schema/standards.schema";
import {
  createStandards,
  deleteStandards,
  findAndUpdateStandards,
  findStandards,
  getStandards,
} from "../service/standards.service";
import logger from "../utils/logger";

export async function createStandardsHandler(
  req: Request<{}, {}, CreateStandardsInput["body"]>,
  res: Response
) {
  const body = req.body;
  const Standards = await createStandards({
    ...body,
  });

  return res.send(Standards);
}
export async function updateStandardsHandler(
  req: Request<UpdateStandardsInput["params"]>,
  res: Response
) {
  const standardsId = req.params.standardsId;
  const update = req.body;

  const standards = await findStandards({ standardsId });

  if (!standards) {
    return res.sendStatus(404);
  }

  const updatedStandards = await findAndUpdateStandards(
    { standardsId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedStandards);
}

export async function getStandardsHandler(
  req: Request<ReadStandardsInput["params"]>,
  res: Response
) {
  const standardsId = req.params.standardsId;
  const standards = await findStandards({ _id: standardsId });

  if (!standards) {
    return res.sendStatus(404);
  }

  return res.send(standards);
}

export async function deleteStandardsHandler(
  req: Request<DeleteStandardsInput["params"]>,
  res: Response
) {
  const standardsId = req.params.standardsId;

  const standards = await findStandards({ standardsId });

  if (!standards) {
    return res.sendStatus(404);
  }

  await deleteStandards({ standardsId });

  return res.sendStatus(200);
}

export async function getAllStandardsHandler(req: Request, res: Response) {
  try {
    const standards = await getStandards();
    return res.send(standards);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
