import { get } from "lodash";
import config from "config";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);
  console.log("decoded:" + JSON.stringify(decoded));

  if (!decoded) return false;

  const user = await findUser({ _id: get(decoded, "_id") });

  if (!user) return false;

  console.log("user exist :" + JSON.stringify(user));
  // user: {
  //   _id: new ObjectId("6297103535e839c11a4dd83c"),
  //   email: 'matan845@gmail.com',
  //   name: 'matan',
  //   password: '$2b$10$IcFHaNibFuLrukde16P64OlmQEqvODHu6iXQLKtyviqnSIwOrz0jK',
  //   createdAt: 2022-06-01T07:07:33.207Z,
  //   updatedAt: 2022-06-01T07:07:33.207Z,
  //   __v: 0
  // }

  const accessToken = signJwt(
    { ...user },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}
