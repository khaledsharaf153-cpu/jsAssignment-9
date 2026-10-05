import {
  ConflictExceptions,
  UnauthorizedException,
} from "../../commen/exceptions/app.exceptions.js";
import { encryptValue } from "../../commen/security/encryption.js";
import { compareValue, hashValue } from "../../commen/security/hashing.js";
import { createLoginTokens } from "../../commen/security/token.security.js";
import { userModel } from "../../DB/model/user.model.js";
import { createDoc, findOneDoc } from "../../DB/repo.js";

export async function signup(bodyData) {
  const { email } = bodyData;
  const user = await findOneDoc({ model: userModel, filter: { email } });
  if (user) {
    throw ConflictExceptions("Email already exists");
  }

  bodyData.password = await hashValue(bodyData.password);
  if (bodyData.phoneNumber) {
    bodyData.phoneNumber = encryptValue(bodyData.phoneNumber);
  }

  await createDoc({ model: userModel, insertData: bodyData });
}

export async function login(bodyData) {
  const { email, password } = bodyData;
  const user = await findOneDoc({ model: userModel, filter: { email } });
  if (!user) {
    throw UnauthorizedException("Invalid email or password");
  }

  const isMatch = await compareValue(password, user.password);
  if (!isMatch) {
    throw UnauthorizedException("Invalid email or password");
  }

  return createLoginTokens({ user });
}
