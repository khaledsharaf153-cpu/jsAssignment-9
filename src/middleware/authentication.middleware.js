import { tokenTypeEnum } from "../commen/enum/token.enum.js";
import { UnauthorizedException } from "../commen/exceptions/app.exceptions.js";
import { checkToken } from "../commen/security/token.security.js";

export function authMiddleware(tokenType = tokenTypeEnum.ACCESS) {
  return async function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      throw UnauthorizedException();
    }

    const { user, payload } = await checkToken({ token, tokenType });

    req.user = user;
    req.payload = payload;

    next();
  };
}
