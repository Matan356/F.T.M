import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    initial: number({
      required_error: "Initial number of mileages is required",
    }),
    final: number({
      required_error: "Final number of mileages is required",
    }),
  }).refine((data) => data.initial < data.final, {
    message: "The final mileage can not be less than the initial mileage",
  }),
};

const params = {
  params: object({
    mileageId: string({
      required_error: "MileageId is required",
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

export const createMileageSchema = object({
  ...payload,
});

export const updateMileageSchema = object({
  ...payload,
  ...params,
});

export const deleteMileageSchema = object({
  ...params,
});

export const getMileageSchema = object({
  ...params,
});

export const getUserMileagesSchema = object({
  ...userParams,
});

export type CreateMileageInput = TypeOf<typeof createMileageSchema>;
export type UpdateMileageInput = TypeOf<typeof updateMileageSchema>;
export type ReadMileageInput = TypeOf<typeof getMileageSchema>;
export type DeleteMileageInput = TypeOf<typeof deleteMileageSchema>;
export type getUserMileagesInput = TypeOf<typeof getUserMileagesSchema>;
