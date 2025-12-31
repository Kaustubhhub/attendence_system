import z, { email } from "zod";

export const signupType = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(["teacher", "student"])
})

export const signinType = z.object({
    email: z.email(),
    password: z.string(),
})