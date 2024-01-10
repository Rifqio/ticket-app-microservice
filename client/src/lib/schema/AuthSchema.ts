import { z } from "zod";

const Signin = z.object({
    email: z.string().email({ message: "Please provide a valid email" }),
    password: z
        .string()
        .min(4, { message: "Password must contain at least 4 character(s)" })
        .max(100),
});

const Signup = z.object({
    email: z.string().email({ message: "Please provide a valid email" }),
    password: z
        .string()
        .min(4, { message: "Password must contain at least 4 character(s)" })
        .max(100),
});

const AuthSchema = { Signin, Signup };

export default AuthSchema;
