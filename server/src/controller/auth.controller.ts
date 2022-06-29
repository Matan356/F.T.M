import { Request, Response } from "express";
import config from "config";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function loginUserHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send("Invalid workerId or password");

  const accessToken = signJwt(
    { ...user },
    { expiresIn: config.get("accessTokenTtl") }
  );

  const refreshToken = signJwt(
    { ...user },
    { expiresIn: config.get("refreshTokenTtl") }
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 10,
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: true,
  });

  return res.send({ accessToken, refreshToken });
}

export async function getCurrentUser(req: Request, res: Response) {
  return res.send(res.locals.user);
}
