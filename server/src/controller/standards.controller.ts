import { Request, Response } from "express";
import { UpdateStandardsInput } from "../schema/standards.schema";
import {
  findAndUpdateStandards,
  findStandards,
  getStandards,
} from "../service/standards.service";
import logger from "../utils/logger";

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
export async function getAllStandardsHandler(req: Request, res: Response) {
  try {
    const standards = await getStandards();
    return res.send(standards);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
