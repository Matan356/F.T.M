import { Request, Response } from "express";
import {
  CreateMileageInput,
  getUserMileagesInput,
  ReadMileageInput,
  UpdateMileageInput,
} from "../schema/mileage.schema";
import {
  createMileage,
  deleteMileage,
  findAndUpdateMileage,
  findMileage,
  getMileages,
  getUserMileages,
} from "../service/mileage.service";
import logger from "../utils/logger";

export async function createMileageHandler(
  req: Request<{}, {}, CreateMileageInput["body"]>,
  res: Response
) {
  const body = req.body;
  const userId = res.locals.user._id;
  const mileage = await createMileage({
    ...body,
    user: userId,
  });

  return res.send(mileage);
}
export async function updateMileageHandler(
  req: Request<UpdateMileageInput["params"]>,
  res: Response
) {
  const mileageId = req.params.mileageId;
  const update = req.body;

  const mileage = await findMileage({ mileageId });

  if (!mileage) {
    return res.sendStatus(404);
  }

  const updatedMileage = await findAndUpdateMileage({ mileageId }, update, {
    new: true,
  });

  return res.send(updatedMileage);
}

export async function getMileageHandler(
  req: Request<ReadMileageInput["params"]>,
  res: Response
) {
  const mileageId = req.params.mileageId;
  const mileage = await findMileage({ _id: mileageId });

  if (!mileage) {
    return res.sendStatus(404);
  }

  return res.send(mileage);
}

export async function deleteMileageHandler(
  req: Request<UpdateMileageInput["params"]>,
  res: Response
) {
  const mileageId = req.params.mileageId;

  const mileage = await findMileage({ mileageId });

  if (!mileage) {
    return res.sendStatus(404);
  }

  await deleteMileage({ mileageId });

  return res.sendStatus(200);
}

export async function getMileagesHandler(req: Request, res: Response) {
  try {
    const Mileages = await getMileages();
    return res.send(Mileages);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserMileagesHandler(
  req: Request<getUserMileagesInput["params"]>,
  res: Response
) {
  const userId = req.params.uid;
  logger.info({ userId: userId });
  try {
    const mileagesOfUser = await getUserMileages({ user: userId });
    return res.send(mileagesOfUser);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
