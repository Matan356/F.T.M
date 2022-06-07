import { Request, Response, NextFunction } from "express";
import { findUser } from "../service/user.service";

const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { aid } = req.params;
  const isAdmin = await findUser({ _id: aid });
  if (isAdmin?.role != "admin")
    return res.status(404).send("you are not admin");
  return next();
};

export default requireAdmin;
