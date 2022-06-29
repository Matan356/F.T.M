import { object, number, string, TypeOf, z } from "zod";

const TYPES = ["protein", "carbohydrate", "vegetable"] as const;
export const TypesEnum = z.enum(TYPES);

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    type: TypesEnum,
    sku: string({
      required_error: "SKU is required",
    }),
    cost: number({
      required_error: "cost is required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
