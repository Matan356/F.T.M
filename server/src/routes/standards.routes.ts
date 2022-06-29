import express from "express";
import {
  getAllStandardsHandler,
  updateStandardsHandler,
} from "../controller/standards.controller";
import requireAdmin from "../middleware/requireAdmin";
import validateResource from "../middleware/validateResource";
import { updateStandardsSchema } from "../schema/standards.schema";

const router = express.Router();

router.put(
  "/api/standards/:standardsId",
  [requireAdmin, validateResource(updateStandardsSchema)],
  updateStandardsHandler
);

router.get("/api/standards", requireAdmin, getAllStandardsHandler);

export default router;
