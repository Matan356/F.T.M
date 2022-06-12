import express from "express";
import {
  createPettyCashHandler,
  deletePettyCashHandler,
  getPettyCashHandler,
  getAllPettyCashHandler,
  updatePettyCashHandler,
  getAllUserPettyCashHandler,
} from "../controller/pettyCash.controller";
import requireAdmin from "../middleware/requireAdmin";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createPettyCashSchema,
  deletePettyCashSchema,
  getPettyCashSchema,
  getUserPettyCashSchema,
  updatePettyCashSchema,
} from "../schema/pettyCash.schema";

const router = express.Router();

router.post(
  "/api/pettyCash",
  [requireUser, validateResource(createPettyCashSchema)],
  createPettyCashHandler
);

router.put(
  "/api/pettyCash/:pettyCashId",
  [requireUser, validateResource(updatePettyCashSchema)],
  updatePettyCashHandler
);

router.get(
  "/api/pettyCash/:pettyCashId",
  [requireUser, validateResource(getPettyCashSchema)],
  getPettyCashHandler
);

router.delete(
  "/api/pettyCash/:pettyCashId",
  [requireUser, validateResource(deletePettyCashSchema)],
  deletePettyCashHandler
);

router.get("/api/pettyCash", requireUser, getAllPettyCashHandler);

router.get(
  "/api/pettyCashOfUser/:uid",
  [requireAdmin, validateResource(getUserPettyCashSchema)],
  getAllUserPettyCashHandler
);

export default router;
