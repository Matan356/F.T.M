import express from "express";
import {
  createMileageHandler,
  deleteMileageHandler,
  getMileageHandler,
  getMileagesHandler,
  getUserMileagesHandler,
  updateMileageHandler,
} from "../controller/mileage.controller";
import requireAdmin from "../middleware/requireAdmin";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createMileageSchema,
  deleteMileageSchema,
  getMileageSchema,
  getUserMileagesSchema,
  updateMileageSchema,
} from "../schema/mileage.schema";

const router = express.Router();

router.post(
  "/api/mileages",
  [requireUser, validateResource(createMileageSchema)],
  createMileageHandler
);

router.put(
  "/api/mileages/:mileageId",
  [requireUser, validateResource(updateMileageSchema)],
  updateMileageHandler
);

router.get(
  "/api/mileages/:mileageId",
  [requireUser, validateResource(getMileageSchema)],
  getMileageHandler
);

router.delete(
  "/api/mileages/:mileageId",
  [requireAdmin, validateResource(deleteMileageSchema)],
  deleteMileageHandler
);

router.get("/api/mileages", requireAdmin, getMileagesHandler);

router.get(
  "/api/mileagesOfUser/:uid",
  [requireAdmin, validateResource(getUserMileagesSchema)],
  getUserMileagesHandler
);

export default router;
