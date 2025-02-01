import { LoginSchema, RegisterSchema } from "@/schemas/auth-schema";
import { z } from "zod";

// types
export type LoginProps = z.infer<typeof LoginSchema>;
export type RegisterProps = z.infer<typeof RegisterSchema>;
