import { object, string, TypeOf, z } from "zod";

const STATUS = ["Done", "Accepted", "Rejected", "Sent"] as const;
export const StatusEnum = z.enum(STATUS);

const payload = {
  body: object({
    description: string({
      required_error: "purchase date is required",
    }),
    customer: string({
      required_error: "purchase date is required",
    }),
    status: StatusEnum,
    user: string({
      required_error: "A target for the requested user is a must",
    }),
  }),
};

const params = {
  params: object({
    completionId: string({
      required_error: "completionId is required",
    }),
  }),
};

const userParams = {
  params: object({
    uid: string({
      required_error: "userId is required",
    }),
  }),
};
const customerParams = {
  params: object({
    cid: string({
      required_error: "userId is required",
    }),
  }),
};

export const createCompletionSchema = object({
  ...payload,
});

export const updateCompletionSchema = object({
  ...payload,
  ...params,
});

export const deleteCompletionSchema = object({
  ...params,
});

export const getCompletionSchema = object({
  ...params,
});

export const getUserCompletionsSchema = object({
  ...userParams,
});

export const getCustomerCompletionsSchema = object({
  ...customerParams,
});

export type CreateCompletionInput = TypeOf<typeof createCompletionSchema>;
export type UpdateCompletionInput = TypeOf<typeof updateCompletionSchema>;
export type ReadCompletionInput = TypeOf<typeof getCompletionSchema>;
export type DeleteCompletionInput = TypeOf<typeof deleteCompletionSchema>;
export type getUserCompletionsInput = TypeOf<typeof getUserCompletionsSchema>;
export type getCustomerCompletionsInput = TypeOf<
  typeof getCustomerCompletionsSchema
>;
