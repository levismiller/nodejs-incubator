'use strict';
import { getJwtConfig } from "../lib/auth.js";
import { jwtDecrypt } from "jose";

const verifyToken = async (req, res, next) => {
  const { jwtConfig } = getJwtConfig();
  let token = req.cookies?.token || req.headers?.cookie?.replace('token=', '');

  // Check Authorization header if no token in cookies
  if (!token) {
    const bearerToken = req.headers['authorization'];
    if (bearerToken) {
      token = bearerToken.split(' ')[1];
    }
  }

  // Return early if token is still undefined
  if (!token) {
    return res?.status ? res.status(403).send("A token is required for authentication") : res.close();
  }

  try {
    // Ensure the secret is encoded as Uint8Array if it’s a symmetric key
    const secret = jwtConfig.secret instanceof Uint8Array 
      ? jwtConfig.secret 
      : new TextEncoder().encode(jwtConfig.secret);

    const options = {
      contentEncryptionAlgorithms: [jwtConfig.encryption],
      keyManagementAlgorithms: [jwtConfig.wrap],
    };

    const { payload } = await jwtDecrypt(token, secret, options);
    req.user = payload;

    // For socket connections, return early if no `res.status` or `next`
    if (!res?.status || !next) return;
  } catch (err) {
    if (!res?.status && !next) return res.close();
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;