import { Router } from "express";
import { login, signup } from "./auth.service.js";
import { successResponse } from "../../commen/response/success.response.js";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
import { loginSchema, signupSchema } from "./auth.validation.js";

export const authRouter = Router();

authRouter.post(
  "/signup",
  validationMiddleware(signupSchema),
  async (req, res) => {
    await signup(req.body);
    successResponse({
      res,
      statusCode: 201,
      msg: "Account created successfully",
    });
  },
);

authRouter.post(
  "/login",
  validationMiddleware(loginSchema),
  async (req, res) => {
    const result = await login(req.body);
    successResponse({
      res,
      statusCode: 201,
      msg: "You logged in successfully",
      data: result,
    });
  },
);
