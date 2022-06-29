import express from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import product from "./products.routes";
import customer from "./customer.routes";
import mileage from "./mileage.router";
import expense from "./expense.routes";
import pettyCash from "./pettyCash.routes";
import standards from "./standards.routes";
import controls from "./control.routes";
import completions from "./completions.routes";
import events from './events.routes'

const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use(auth);
router.use(user);
router.use(product);
router.use(customer);
router.use(mileage);
router.use(expense);
router.use(pettyCash);
router.use(standards);
router.use(controls);
router.use(completions);
router.use(events);

export default router;
