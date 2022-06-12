import { object, number, string, TypeOf, z } from "zod";

const payload = {
  body: object({
    authority: string({
      required_error: "Authority is required",
    }),
    name: string({
      required_error: "Name is required",
    }),
    axis: string({
      required_error: "Axis is required",
    }),
    address: string({
      required_error: "Address is required",
    }),
    phone: string({
      required_error: "phone number is required",
    }).min(10, "phone number must be at least 10 characters"),
  }),
};

const params = {
  params: object({
    customerId: string({
      required_error: "kindegardenId is required",
    }),
  }),
};

export const createCustomerSchema = object({
  ...payload,
});

export const updateCustomerSchema = object({
  ...payload,
  ...params,
});

export const deleteCustomerSchema = object({
  ...params,
});

export const getCustomerSchema = object({
  ...params,
});

export type CreateCustomerInput = TypeOf<typeof createCustomerSchema>;
export type UpdateCustomerInput = TypeOf<typeof updateCustomerSchema>;
export type ReadCustomerInput = TypeOf<typeof getCustomerSchema>;
export type DeleteCustomerInput = TypeOf<typeof deleteCustomerSchema>;
