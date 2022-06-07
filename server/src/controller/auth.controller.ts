import { Request, Response } from "express";
import config from "config";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function loginUserHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send("Invalid email or password");

  // create an access token

  const accessToken = signJwt(
    { ...user },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user },
    { expiresIn: config.get("refreshTokenTtl") } // 1 year
  );

  // return access & refresh tokens

  res.cookie("accessToken", accessToken, {
    //2022-06-02T15:30:44.790Z
    maxAge: 500000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 700000, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: true,
  });

  const responseMassage = " user logged in ";
  return res.send({ accessToken, refreshToken ,responseMassage});
}

export async function getCurrentUser(req: Request, res: Response) {
  // res.locals.user:{
  //   _id: '6297103535e839c11a4dd83c',
  //   email: 'matan845@gmail.com',
  //   name: 'matan',
  //   createdAt: '2022-06-01T07:07:33.207Z',
  //   updatedAt: '2022-06-01T07:07:33.207Z',
  //   __v: 0,
  //   session: '6298de8bc7312b0c3fe8d9c4',
  //   iat: 1654185612,
  //   exp: 1654185732
  // }
  return res.send(res.locals.user);
}

// export async function getUserSessionsHandler(req: Request, res: Response) {
//   const userId = res.locals.user._id;

//   const sessions = await findSessions({ user: userId, valid: true });

//   return res.send(sessions);
// }

// export async function deleteSessionHandler(req: Request, res: Response) {
//   const sessionId = res.locals.user.session;
//   // const sessionId = res.locals.user;
//   console.log("sessionId :" + sessionId);

// await updateSession({ _id: sessionId }, { valid: false });

// return res.send({
//   accessToken: null,
//   refreshToken: null,
// });
// }
