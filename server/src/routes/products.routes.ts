import express from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandler,
  updateProductHandler,
} from "../controller/products.controller";
import requireAdmin from "../middleware/requireAdmin";
import validateResource from "../middleware/validateResource";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../schema/products.schema";
const router = express.Router();

router.post(
  "/api/products",
  [requireAdmin, validateResource(createProductSchema)],
  createProductHandler
);

router.put(
  "/api/products/:productId",
  [requireAdmin, validateResource(updateProductSchema)],
  updateProductHandler
);

router.get(
  "/api/products/:productId",
  [requireAdmin, validateResource(getProductSchema)],
  getProductHandler
);

router.delete(
  "/api/products/:productId",
  [requireAdmin, validateResource(deleteProductSchema)],
  deleteProductHandler
);

router.get("/api/products", requireAdmin, getProductsHandler);

export default router;
