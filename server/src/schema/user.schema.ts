import {  object, string, TypeOf, z } from "zod";

const ROLES = ["admin", "manager", "employee"] as const;
export const RolesEnum = z.enum(ROLES);

const userSchema = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    lastName: string({
      required_error: "Last Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 charts minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    phone: string({
      required_error: "Phone is required",
    }).min(10, "The phone number is too short - it should be 10 characters"),
    role: RolesEnum,
    workerId: string({
      required_error: "worker Id is required",
    }).min(4, "The workerId number is too short - it should be 4 characters"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
};


const userId = {
  params: object({
    uid: string({ required_error: "user id is required" }),
  }),
};

export const createUserSchema = object({
  ...userSchema,
});

export const deleteUserSchema = object({
  ...userId,
});

export const getUserSchema = object({
  ...userId,
});

export const updateUserSchema = object({
  ...userSchema,
  ...userId,
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
export type UpdateUserInput =   TypeOf<typeof updateUserSchema>
