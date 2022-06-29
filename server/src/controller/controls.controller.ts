import { Request, Response } from "express";
import {
  CreateControlsInput,
  getCustomerControlsInput,
  getUserControlsInput,
  UpdateControlsInput,
} from "../schema/controls.schema";
import {
  createControls,
  deleteControls,
  findAndUpdateControls,
  findControls,
  getControls,
  getCustomerControls,
  getUserControls,
} from "../service/controls.service";
import logger from "../utils/logger";

export async function createControlsHandler(
  req: Request<{}, {}, CreateControlsInput["body"]>,
  res: Response
) {
  const body = req.body;
  const userId = res.locals.user._id;

  const controls = await createControls({
    ...body,
    user: userId,
  });

  return res.send(controls);
}

export async function updateControlsHandler(
  req: Request<UpdateControlsInput["params"]>,
  res: Response
) {
  const controlsId = req.params.controlsId;
  const update = req.body;

  const controls = await findControls({ _id: controlsId });

  if (!controls) {
    return res.sendStatus(404);
  }

  const updatedControls = await findAndUpdateControls({ controlsId }, update, {
    new: true,
  });

  return res.send(updatedControls);
}

export async function getControlsHandler(
  req: Request<UpdateControlsInput["params"]>,
  res: Response
) {
  const controlsId = req.params.controlsId;
  const controls = await findControls({ controlsId });

  if (!controls) {
    return res.sendStatus(404);
  }

  return res.send(controls);
}

export async function deleteControlsHandler(
  req: Request<UpdateControlsInput["params"]>,
  res: Response
) {
  const controlsId = req.params.controlsId;

  const controls = await findControls({ controlsId });

  if (!controls) {
    return res.sendStatus(404);
  }

  await deleteControls({ controlsId });

  return res.sendStatus(200);
}

export async function getAllcontrolsHandler(req: Request, res: Response) {
  try {
    const controls = await getControls();
    return res.send(controls);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserControlsHandler(
  req: Request<getUserControlsInput["params"]>,
  res: Response
) {
  const userId = req.params.uid;
  logger.info({ userId: userId });
  try {
    const ControlsOfUser = await getUserControls({ user: userId });
    return res.send(ControlsOfUser);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getCustomerControlsHandler(
  req: Request<getCustomerControlsInput["params"]>,
  res: Response
) {
  const customerId = req.params.cid;
  logger.info({ customerId: customerId });
  try {
    const ControlsOfCustomer = await getCustomerControls({
      customer: customerId,
    });
    return res.send(ControlsOfCustomer);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
