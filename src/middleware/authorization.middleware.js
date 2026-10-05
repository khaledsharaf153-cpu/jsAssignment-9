import { tokenTypeEnum } from "../commen/enum/token.enum.js";
import { ForbiddenException } from "../commen/exceptions/app.exceptions.js";

export function authorization(role) {
  return async function (req, res, next) {
    if (req.user.role < role) throw ForbiddenException();
    next();
  };
}
