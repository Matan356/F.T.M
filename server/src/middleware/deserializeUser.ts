import { get } from "lodash";
import { Request, Response, NextFunction, json } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/auth.service";

import logger from "../utils/logger";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    (await get(req, "cookies.accessToken")) ||
    get(req, "headers.set-cookie", "").replace(/^Bearer\s/, "");

  const refreshToken =
    (await get(req, "cookies.refreshToken")) || get(req, "headers.x-refresh");
  accessToken
    ? logger.info("accessToken exist")
    : logger.warn("you dont have accessToken");
  refreshToken
    ? logger.info("refreshToken exist")
    : logger.warn("you dont have refreshToken");

  if (!accessToken) {
    logger.error("you dont have a access token");
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    logger.warn("your access token expired - makeing new ");

    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      logger.info("you have a new access token", { newAccessToken });

      res.setHeader("x-access-token", newAccessToken);

      res.cookie("accessToken", newAccessToken, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: true,
      });
    }

    const result = verifyJwt(newAccessToken as string);
    logger.info(result.valid && " result exist");
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
