import express from "express";

import {
  createUserHandler,
  getUsersHandler,
  deleteUserHandler,
  getUserHandler,
  updateUserHandler,
} from "../controller/user.controller";

import validateResource from "../middleware/validateResource";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../schema/user.schema";
import requireAdmin from "../middleware/requireAdmin";

const router = express.Router();

router.get("/api/users", requireAdmin, getUsersHandler);

router.post(
  "/api/users",
  [requireAdmin, validateResource(createUserSchema)],
  createUserHandler
);

router.get(
  "/api/users/:uid",
  [requireAdmin, validateResource(getUserSchema)],
  getUserHandler
);

router.delete(
  "/api/users/:uid",
  [requireAdmin, validateResource(deleteUserSchema)],
  deleteUserHandler
);

router.put(
  "/api/users/:uid",
  [requireAdmin, validateResource(updateUserSchema)],
  updateUserHandler
);

export default router;
