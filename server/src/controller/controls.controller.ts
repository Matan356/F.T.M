import { Request, Response } from "express";
import {
  CreateControlsInput,
  UpdateControlsInput,
} from "../schema/controls.schema";
import {
  createControls,
  deleteControls,
  findAndUpdateControls,
  findControls,
  getControls,
} from "../service/controls.service";
import logger from "../utils/logger";

export async function createControlsHandler(
  req: Request<{}, {}, CreateControlsInput["body"]>,
  res: Response
) {
  const body = req.body;
  const userName = `${res.locals.user.name}-${res.locals.user.lastName}`;

  const controls = await createControls({
    ...body,
    userName: userName,
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
