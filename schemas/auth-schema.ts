import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email not valid" }),
  password: z
    .string()
    .min(1, { message: "Min password is 4 characters" })
    .max(10, { message: "Password cant exceed 10 characters" }),
});

export const RegisterSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email({ message: "Email not valid" }),
    password: z
      .string()
      .min(1, { message: "Min password is 4 characters" })
      .max(10, { message: "Password cant exceed 10 characters" }),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
