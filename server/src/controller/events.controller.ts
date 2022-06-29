import { Request, Response } from "express";
import {
  CreateEventForUserInput,
  CreateEventInput,
  UpdateEventInput,
} from "../schema/events.schema";
import {
  createEvent,
  deleteEvent,
  findAndUpdateEvent,
  findEvent,
  getEvents,
  getUserEvents,
} from "../service/events.service";
import logger from "../utils/logger";

export async function createEventHandler(
  req: Request<{}, {}, CreateEventInput["body"]>,
  res: Response
) {
  const body = req.body;
  const userId = res.locals.user._id;

  const event = await createEvent({ ...body, user: userId });

  return res.send(event);
}

export async function updateEventHandler(
  req: Request<UpdateEventInput["params"]>,
  res: Response
) {
  const eventId = req.params.eventId;
  const update = req.body;
  const user = res.locals.user;

  let event;
  try {
    event = await findEvent({ _id: eventId });
  } catch (e) {
    return res.sendStatus(400);
  }

  if (!event || event === null) return res.sendStatus(404);

  if (user._id !== event?.user && user.role === "employee")
    return res.sendStatus(401);

  const updatedEvent = await findAndUpdateEvent({ _id: eventId }, update, {
    new: true,
  });

  return res.send(updatedEvent).status(200);
}

export async function deleteEventHandler(
  req: Request<UpdateEventInput["params"]>,
  res: Response
) {
  const eventId = req.params.eventId;
  const user = res.locals.user;
  logger.info({ user: user });
  logger.info({ eventId });

  let event;
  try {
    event = await findEvent({ _id: eventId });
  } catch (e) {
    return res.sendStatus(400);
  }

  if (!event || event === null) return res.sendStatus(404);

  logger.info({ event: event });
  if (user._id !== event?.user && user.role === "employee")
    return res.sendStatus(401);

  await deleteEvent({ _id: eventId });

  return res.sendStatus(200);
}

export async function getAllEventsHandler(req: Request, res: Response) {
  try {
    const events = await getEvents();
    return res.send(events);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function readUserEventsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  try {
    const eventsOfUser = await getUserEvents({ user: userId });
    return res.send(eventsOfUser);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function createEventForUserHandler(
  req: Request<CreateEventForUserInput["params"]>,
  res: Response
) {
  const userId = req.params.userId;
  const body = req.body;

  const event = await createEvent({ ...body, user: userId });

  return res.send(event);
}
