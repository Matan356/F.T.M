import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    reason: string({
      required_error: "reason is required",
    }),
    price: number({
      required_error: "price is required",
    }),
    invoicing: string({
      required_error: "invoice number is required",
    }),
    BusinessName: string({
      required_error: "Business Name is required",
    }),
    image: string({
      required_error: "image required",
    }),
    date: string({
      required_error: "purchase date is required",
    }),
    customer: string({
      required_error: "purchase date is required",
    }),
  }),
};

const params = {
  params: object({
    expenseId: string({
      required_error: "expenseId is required",
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

export const createExpenseSchema = object({
  ...payload,
});

export const updateExpenseSchema = object({
  ...payload,
  ...params,
});

export const deleteExpenseSchema = object({
  ...params,
});

export const getExpenseSchema = object({
  ...params,
});

export const getUserExpensesSchema = object({
  ...userParams,
});

export const getCustomerExpensesSchema = object({
  ...customerParams,
});

export type CreateExpenseInput = TypeOf<typeof createExpenseSchema>;
export type UpdateExpenseInput = TypeOf<typeof updateExpenseSchema>;
export type ReadExpenseInput = TypeOf<typeof getExpenseSchema>;
export type DeleteExpenseInput = TypeOf<typeof deleteExpenseSchema>;
export type getUserExpensesInput = TypeOf<typeof getUserExpensesSchema>;
export type getCustomerExpensesInput = TypeOf<typeof getCustomerExpensesSchema>;
