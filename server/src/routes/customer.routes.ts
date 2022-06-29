import express from "express";
import {
  createCustomerHandler,
  deleteCustomerHandler,
  getCustomerHandler,
  getCustomersHandler,
  updateCustomerHandler,
} from "../controller/customers.controller";
import requireAdmin from "../middleware/requireAdmin";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import {
  createCustomerSchema,
  deleteCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} from "../schema/customer.schema";

const router = express.Router();

router.post(
  "/api/customers",
  [requireAdmin, validateResource(createCustomerSchema)],
  createCustomerHandler
);

router.put(
  "/api/customers/:customerId",
  [requireAdmin, validateResource(updateCustomerSchema)],
  updateCustomerHandler
);

router.get(
  "/api/customers/:customerId",
  [requireUser, validateResource(getCustomerSchema)],
  getCustomerHandler
);

router.delete(
  "/api/customers/:customerId",
  [requireAdmin, validateResource(deleteCustomerSchema)],
  deleteCustomerHandler
);

router.get("/api/customers", requireUser, getCustomersHandler);

export default router;
