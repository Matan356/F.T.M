import express from "express";
import validateResource from "../middleware/validateResource";
import { loginUserSchema } from "../schema/auth.schema";
import {
  getCurrentUser,
  loginUserHandler,
} from "../controller/auth.controller";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post("/api/login", validateResource(loginUserSchema), loginUserHandler);
router.get("/api/me", requireUser, getCurrentUser);

export default router;
