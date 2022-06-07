import { number, object, string, TypeOf, z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - lastName
 *        - workerId
 *        - name
 *        - password
 *        - role
 *        - phone
 *      properties:
 *        workerId:
 *          type: string
 *          default: 1234
 *        name:
 *          type: string
 *          default: matan
 *        lastName:
 *          type: string
 *          default: matan
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *        role:
 *          type: string
 *          default: employee
 *        phone:
 *          type: string
 *          default: 5548895623
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        workerId:
 *          type: string
 *        name:
 *          type: string
 *        phone:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

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

const adminId = {
  params: object({
    aid: string({ required_error: "admin id is required" }),
  }),
};
const adminId_userId = {
  params: object({
    aid: string({ required_error: "admin id is required" }),
    uid: string({ required_error: "ודקר id is required" }),
  }),
};

export const createUserSchema = object({
  ...userSchema,
  ...adminId,
});

export const deleteUserSchema = object({
  ...adminId_userId,
});

export const getUserSchema = object({
  ...adminId_userId,
});

export const updateUserSchema = object({
  ...userSchema,
  ...adminId_userId,
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
export type UpdateUserInput =   TypeOf<typeof updateUserSchema>
