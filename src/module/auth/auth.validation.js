import * as z from "zod";
import { validateFields } from "../../commen/validation.js";

export const loginSchema = (language = "en") => {
  return z.object({
    body: z.object({
      email: validateFields(language).email,
      password: validateFields(language).password,
    }),
  });
};

export const signupSchema = (language = "en") => {
  return z
    .object({
      body: z.object({
        username: validateFields(language).username,
        email: validateFields(language).email,
        password: validateFields(language).password,
        confirmPassword: z.string(),
        phoneNumber: validateFields(language).phoneNumber.optional(),
        gender: validateFields(language).gender.optional(),
        DOB: validateFields(language).DOB.optional(),
      }),
    })
    .superRefine((v, ctx) => {
      if (v.body.password !== v.body.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["password", "confirmPassword"],
          message: "confirm password does't match password",
        });
      }
    });
};
