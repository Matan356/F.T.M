import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    logger.warn({ massage: " not find any user in locals" });
    return res.sendStatus(403);}

  return next();
};

export default requireUser;
