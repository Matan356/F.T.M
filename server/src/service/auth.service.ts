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

  const accessToken = signJwt(
    { ...user },
    { expiresIn: config.get("accessTokenTtl") }
  );

  return accessToken;
}
