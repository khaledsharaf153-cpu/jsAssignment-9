import { Router } from "express";
import { authMiddleware } from "../../middleware/authentication.middleware.js";
import { successResponse } from "../../commen/response/success.response.js";
import { tokenTypeEnum } from "../../commen/enum/token.enum.js";
import { getUserProfile, rotateToken } from "./user.service.js";
import { authorization } from "../../middleware/authorization.middleware.js";
import { userRoleEnum } from "../../commen/enum/user.enum.js";

export const userRouter = Router();

userRouter.post(
  "/rotate-token",
  authMiddleware(tokenTypeEnum.REFRESH),
  async (req, res) => {
    const result = rotateToken(req.payload);
    successResponse({ res, statusCode: 200, msg: result });
  },
);

userRouter.get("/get-profile", authMiddleware(), async (req, res) => {
  const result = getUserProfile(req.user);
  successResponse({ res, statusCode: 200, data: result });
});

// test
userRouter.get(
  "/test",
  authMiddleware(),
  authorization(userRoleEnum.ADMIN),
  async (req, res) => {
    const result = "test done";
    successResponse({ res, statusCode: 200, data: result });
  },
);
//////////
