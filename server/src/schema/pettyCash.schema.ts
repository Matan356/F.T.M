import { object, number, string, TypeOf } from "zod";


const payload = {
  body: object({
    amount: number({
      required_error: " amount of petty cash is required",
    })
  })
};

const params = {
  params: object({
    pettyCashId: string({
      required_error: "PettyCashId is required",
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

export const createPettyCashSchema = object({
  ...payload,
});

export const updatePettyCashSchema = object({
  ...payload,
  ...params,
});

export const deletePettyCashSchema = object({
  ...params,
});

export const getPettyCashSchema = object({
  ...params,
});

export const getUserPettyCashSchema = object({
  ...userParams,
});

export type CreatePettyCashInput = TypeOf<typeof createPettyCashSchema>;
export type UpdatePettyCashInput = TypeOf<typeof updatePettyCashSchema>;
export type ReadPettyCashInput = TypeOf<typeof getPettyCashSchema>;
export type DeletePettyCashInput = TypeOf<typeof deletePettyCashSchema>;
export type getUserPettyCashInput = TypeOf<typeof getUserPettyCashSchema>;