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
    get(req, "headers.set-cookie", "").replace(/^Bearer\s/, ""); // headers.set-cookie

  const refreshToken =
    (await get(req, "cookies.refreshToken")) || get(req, "headers.x-refresh");
  accessToken
    ? logger.info("accessToken exist")
    : logger.warn("you dont have accessToken");
  refreshToken
    ? logger.info("refreshToken exist")
    : logger.warn("you dont have refreshToken");

  if (!accessToken) {
    console.log("you dont have a access token");
    // deleteSessionHandler
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);
  console.log("deserializeUser-expired :" + expired);
  console.log("deserializeUser-decoded :" + JSON.stringify(decoded));

  if (decoded) {
    res.locals.user = decoded;
    // res.locals.user {
    //   _id: '6297103535e839c11a4dd83c',
    //   email: 'matan845@gmail.com',
    //   name: 'matan',
    //   createdAt: '2022-06-01T07:07:33.207Z',
    //   updatedAt: '2022-06-01T07:07:33.207Z',
    //   __v: 0,
    //   session: '62988a8052c8e4da4b8e41a2',
    //   iat: 1654164096,
    //   exp: 1654164216
    // }
    return next();
  }

  if (expired && refreshToken) {
    console.log("your access token expired - makeing new ");

    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      console.log("you have a new access token", { newAccessToken }); // i have a problem heare .. the new token not correct

      res.setHeader("x-access-token", newAccessToken);

      res.cookie("accessToken", newAccessToken, {
        maxAge: 120000, // 15 mins
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: true,
      });
    }

    const result = verifyJwt(newAccessToken as string); // i have a problem heare .. the result not correct
    console.log("result:" + JSON.stringify(result.decoded));

    logger.info(result && " result exist");
    // result: {
    //   "valid": true,
    //   "expired": false,
    //   "decoded": {
    //     "_id": "6297103535e839c11a4dd83c",
    //     "email": "matan845@gmail.com",
    //     "name": "matan",
    //     "password": "$2b$10$IcFHaNibFuLrukde16P64OlmQEqvODHu6iXQLKtyviqnSIwOrz0jK",
    //     "createdAt": "2022-06-01T07:07:33.207Z",
    //     "updatedAt": "2022-06-01T07:07:33.207Z",
    //     "__v": 0,
    //     "session": "62988a8052c8e4da4b8e41a2",
    //     "iat": 1654164262,
    //     "exp": 1654164382
    //   }
    // }
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
