import express from "express";
import {
  createControlsHandler,
  deleteControlsHandler,
  getAllcontrolsHandler,
  getControlsHandler,
  getCustomerControlsHandler,
  getUserControlsHandler,
  updateControlsHandler,
} from "../controller/controls.controller";
import requireAdmin from "../middleware/requireAdmin";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createControlsSchema,
  deleteControlsSchema,
  getControlsSchema,
  updateControlsSchema,
} from "../schema/controls.schema";

const router = express.Router();

router.post(
  "/api/controls",
  [requireUser, validateResource(createControlsSchema)],
  createControlsHandler
);

router.put(
  "/api/controls/:controlsId",
  [requireUser, validateResource(updateControlsSchema)],
  updateControlsHandler
);

router.get(
  "/api/controls/:controlsId",
  [requireUser, validateResource(getControlsSchema)],
  getControlsHandler
);

router.delete(
  "/api/controls/:controlsId",
  [requireUser, validateResource(deleteControlsSchema)],
  deleteControlsHandler
);

router.get("/api/controls", requireUser, getAllcontrolsHandler);

router.get(
  "/api/userControls/:uid",
  requireAdmin,
  getUserControlsHandler
);
router.get(
  "/api/customerControls/:cid",
  requireAdmin,
  getCustomerControlsHandler
);
export default router;
