import express from "express";
import {
  createEventForUserHandler,
  createEventHandler,
  deleteEventHandler,
  getAllEventsHandler,
  readUserEventsHandler,
  updateEventHandler,
} from "../controller/events.controller";
import requireAdmin from "../middleware/requireAdmin";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createEventForUserSchema,
  createEventSchema,
  deleteEventSchema,
  // getEventSchema,
  updateEventForUserSchema,
  updateEventSchema,
} from "../schema/events.schema";

const router = express.Router();

router.get("/api/calendar/events", requireUser, readUserEventsHandler);

router.post(
  "/api/calendar/events",
  [requireUser, validateResource(createEventSchema)],
  createEventHandler
);

router.put(
  "/api/calendar/events/:eventId",
  [requireUser, validateResource(updateEventSchema)],
  updateEventHandler
);

router.delete(
  "/api/calendar/events/:eventId",
  [requireUser, validateResource(deleteEventSchema)],
  deleteEventHandler
);

////////////////---------------------- admin controls ---------------------------/////////////////////////

router.get("/api/calendar/allEvents", requireAdmin, getAllEventsHandler);

router.post(
  "/api/calendar/events/:userId",
  [requireAdmin, validateResource(createEventForUserSchema)],
  createEventForUserHandler
);


export default router;
