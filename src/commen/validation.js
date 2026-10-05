import * as z from "zod";
import { userGenderEnum } from "./enum/user.enum.js";

export const validateFields = (lang = "en") => {
  return {
    username: z.string().min(4).max(40),
    email: z.email({
      error:
        lang === "en"
          ? "Invalid email pattern"
          : "صيغة البريد الالكتروني خاطئة",
    }),
    password: z.string(),
    confirmPassword: z.string(),
    phoneNumber: z.e164(),
    gender: z.literal([Object.values(userGenderEnum)]),
    DOB: z.date(),
  };
};
