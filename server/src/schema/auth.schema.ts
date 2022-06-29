import { object, string, TypeOf } from "zod";

const loginSchema = {
  body: object({
    workerId:  string({
      required_error: "worker Id is required",
    }).length(4, "Must be exactly 4 characters"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Invalid workerId or password"),
  }),
};

export const loginUserSchema = object({
  ...loginSchema,
});

export type loginUserInput = TypeOf<typeof loginUserSchema>;
