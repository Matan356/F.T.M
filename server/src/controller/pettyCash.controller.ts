import { Request, Response } from "express";
import moment from "moment";
import {
  CreatePettyCashInput,
  getUserPettyCashInput,
  ReadPettyCashInput,
  UpdatePettyCashInput,
} from "../schema/pettyCash.schema";
import {
  createPettyCash,
  deletePettyCash,
  findAndUpdatePettyCash,
  findPettyCash,
  getPettyCashs,
  getUserPettyCash,
} from "../service/pettyCash.service";
import { getStandards } from "../service/standards.service";
import logger from "../utils/logger";

export async function createPettyCashHandler(
  req: Request<CreatePettyCashInput["params"], {}, CreatePettyCashInput["body"]>,
  res: Response
) {
  const body = req.body;
  const userId = req.params.uid;
  const standards = await getStandards();
  const pettyCash = await createPettyCash({
    ...body,
    user: userId,
    standards: standards[0].pettyCash,
  });

  return res.send(pettyCash);
}
export async function updatePettyCashHandler(
  req: Request<UpdatePettyCashInput["params"]>,
  res: Response
) {
  const pettyCashId = req.params.pettyCashId;
  const update = req.body;

  const pettyCash = await findPettyCash({ pettyCashId });

  if (!pettyCash) {
    return res.sendStatus(404);
  }

  const updatedPettyCash = await findAndUpdatePettyCash(
    { pettyCashId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedPettyCash);
}

export async function getPettyCashHandler(
  req: Request<ReadPettyCashInput["params"]>,
  res: Response
) {
  const pettyCashId = req.params.pettyCashId;
  const pettyCash = await findPettyCash({ _id: pettyCashId });

  if (!pettyCash) {
    return res.sendStatus(404);
  }

  return res.send(pettyCash);
}

export async function deletePettyCashHandler(
  req: Request<UpdatePettyCashInput["params"]>,
  res: Response
) {
  const pettyCashId = req.params.pettyCashId;

  const pettyCash = await findPettyCash({ pettyCashId });

  if (!pettyCash) {
    return res.sendStatus(404);
  }

  await deletePettyCash({ pettyCashId });

  return res.sendStatus(200);
}

export async function getAllPettyCashHandler(req: Request, res: Response) {
  try {
    const pettyCashes = await getPettyCashs();
    return res.send(pettyCashes);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getAllUserPettyCashHandler(
  req: Request<getUserPettyCashInput["params"]>,
  res: Response
) {
  const userId = req.params.uid;
  logger.info({ userId: userId });
  try {
    const pettyCashesOfUser = await getUserPettyCash({ user: userId });
    return res.send(pettyCashesOfUser);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
