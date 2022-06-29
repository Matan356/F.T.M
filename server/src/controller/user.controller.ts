import { Request, Response } from "express";
import {
  CreateUserInput,
  GetUserInput,
  UpdateUserInput,
  DeleteUserInput,
} from "../schema/user.schema";
import {
  getUsers,
  findUser,
  deleteUser,
  findAndUpdateUser,
  createUser,
} from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  const { body } = req;
  try {
    const user = await createUser({ ...body });
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    const users = await getUsers();
    return res.send(users);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserHandler(
  req: Request<GetUserInput["params"]>,
  res: Response
) {
  const { uid } = req.params;
  let user;
  try {
    user = await findUser({ _id: uid });
    if (!user) {
      return res.status(400).send("Could not find a user by id was provided");
    }
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  } 
  return res.send(user);
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput["params"]>,
  res: Response
) {
  const { uid } = req.params;
  const existUser = await findUser({ _id: uid });
  if (!existUser)
    return res.status(400).send("Could not find a user by id was provided");
  try {
    const user = await deleteUser({ _id: uid });
    if (!user) return res.sendStatus(404);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
  res.status(200).send("User Deleted");
}

export async function updateUserHandler(
  req: Request<
    UpdateUserInput["params"],
    UpdateUserInput,
    UpdateUserInput["body"]
  >,
  res: Response
) {
  const { uid } = req.params;
  const update = req.body;

  const user = await findUser({ uid });

  if (!user) {
    return res.sendStatus(404);
  }
  let updatedUser;
  try {
    updatedUser = await findAndUpdateUser({ uid }, update, {
      new: true,
    });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }

  return res.status(200).send(updatedUser);
}


