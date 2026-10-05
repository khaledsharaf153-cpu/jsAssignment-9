import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from "../../config/config.js";
import { BadrequestException } from "../../commen/exceptions/app.exceptions.js";
import { decryptValue } from "../../commen/security/encryption.js";
import { createLoginTokens } from "../../commen/security/token.security.js";

export function rotateToken(payload) {
  const tokenExpiryDate = payload.iat + JWT_ACCESS_EXPIRES_IN;
  if (tokenExpiryDate > Date.now() / 1000) {
    throw BadrequestException("Old token still valid");
  }

  return createLoginTokens({
    payload: { sub: payload.sub },
    refreshTokenExpiresIn:
      JWT_REFRESH_EXPIRES_IN - Math.ceil(Date.now() / 1000 - payload.iat),
  });
}

export function getUserProfile(user) {
  user = user.toObject();
  delete user.id;
  user.phoneNumber = decryptValue(user.phoneNumber);
  return user;
}
