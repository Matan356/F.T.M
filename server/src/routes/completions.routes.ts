import express from "express";
import {
  createCompletionHandler,
  deleteCompletionHandler,
  getCustomerCompletionsHandler,
  getCompletionHandler,
  getCompletionsHandler,
  getUserCompletionsHandler,
  updateCompletionHandler,
} from "../controller/completions.controller";
import requireAdmin from "../middleware/requireAdmin";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createCompletionSchema,
  deleteCompletionSchema,
  getCompletionSchema,
  updateCompletionSchema,
} from "../schema/completions.schema";

const router = express.Router();

router.post(
  "/api/completions",
  [requireAdmin, validateResource(createCompletionSchema)],
  createCompletionHandler
);

router.put(
  "/api/completions/:completionId",
  [requireUser, validateResource(updateCompletionSchema)],
  updateCompletionHandler
);

router.get(
  "/api/completions/:completionId",
  [requireUser, validateResource(getCompletionSchema)],
  getCompletionHandler
);

router.delete(
  "/api/completions/:completionId",
  [requireAdmin, validateResource(deleteCompletionSchema)],
  deleteCompletionHandler
);
router.get("/api/completions", requireAdmin, getCompletionsHandler);

router.get(
  "/api/userCompletions/:uid",
  requireUser,
  getUserCompletionsHandler
);
router.get(
  "/api/customerCompletions/:cid",
  requireAdmin,
  getCustomerCompletionsHandler
);
export default router;
