import { object, string, TypeOf } from "zod";

const loginSchema = {
  body: object({
    workerId: string({
      required_error: "workerId is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Invalid workerId or password"),
  }),
};

export const loginUserSchema = object({
  ...loginSchema,
});

export type loginUserInput = TypeOf<typeof loginUserSchema>;
