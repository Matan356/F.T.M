import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = res.locals.user.role;
  role === "admin" && logger.info({ massage: "admin - successfully" });
  if (role != "admin") {
    logger.error("you ar not admin");
    return res.sendStatus(401);
  }

  return next();
};

export default requireAdmin;
