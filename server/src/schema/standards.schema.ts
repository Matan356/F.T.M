import { object, number, string, TypeOf } from "zod";


const payload = {
  body: object({
    pettyCash: number({
      required_error: "pettyCash tandards number of mileages is required",
    }),
    controls: number({
      required_error: "controls standard number of mileages is required",
    }),
    mileage: number({
      required_error: "mileage standard number of mileages is required",
    })
  }),
};

const params = {
  params: object({
    standardsId: string({
      required_error: "standardId is required",
    }),
  }), 
};



export const createStandardsSchema = object({
  ...payload,
});

export const updateStandardsSchema = object({
  ...payload,
  ...params,
});

export const deleteStandardsSchema = object({
  ...params,
});

export const getStandardsSchema = object({
  ...params,
});


export type CreateStandardsInput = TypeOf<typeof createStandardsSchema>;
export type UpdateStandardsInput = TypeOf<typeof updateStandardsSchema>;
export type ReadStandardsInput = TypeOf<typeof getStandardsSchema>;
export type DeleteStandardsInput = TypeOf<typeof deleteStandardsSchema>;