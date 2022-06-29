import { object, number, string, TypeOf,  boolean } from "zod";

const payload = {
  body: object({
    RegisteredCustomers: number({
      required_error: "Amount of Registered Customers is required",
    }),
    ActualCustomers: number({
      required_error: "Amount of Actual Customers Name is required",
    }),
    AmountOfDishes: number({
      required_error: "Amount of Dishes is required",
    }),
    dliveryTime: string({
      required_error: "Delivery Time is required",
    }),
    mealTime: string({
      required_error: "Meal Time is required",
    }),
    temperatures: object({
      protein: number({
        required_error: "protein temperature is required",
      }),
      vegetable: number({
        required_error: "vegetable temperature is required ",
      }),
      carbohydrate: number({
        required_error: "carbohydrate temperature is required ",
      }),
    }),
    weight: object({
      protein: number({
        required_error: "protein weight is required",
      }),
      vegetable: number({
        required_error: "vegetable weight is required ",
      }),
      carbohydrate: number({
        required_error: "carbohydrate weight is required ",
      }),
    }),
    amountOfBreads: number({
      required_error: "Amount of Breads is required",
    }),
    amountOfFruits: number({
      required_error: "Amount of Fruits Address is required",
    }),
    badSmell: boolean({
      required_error: "bad smell checking is required",
    }),
    approvedByDietitian: boolean({
      required_error: "Approved By Dietitian is required",
    }),
    existingMenu: boolean({
      required_error: "existing menu checking is required",
    }),
    menuAdjustment: boolean({
      required_error: "Menu Adjustment checking is required",
    }),
    vegetarian: object({
      valid: boolean({
        required_error: "vegetarian checking is required",
      }),
      amount: number({
        required_error: "Amount of vegetarians is required ",
      }),
    }),
    vegetarianDish: object({
      valid: boolean({
        required_error: "vegetarian checking is required",
      }),
      amount: number({
        required_error: "Amount of vegetarians dishes is required ",
      }),
    }),
    supplyProblems: object({
      valid: boolean({
        required_error: "vegetarian checking is required",
      }),
      description: string({
        required_error: "description of Supply Problems is required ",
      }),
    }),
    revisited: boolean({
      required_error: "revisited confirmation is required",
    }),
    customer: string({
      required_error: "purchase date is required",
    }),
  }),
};

const params = {
  params: object({
    controlsId: string({
      required_error: "kindegardenId is required",
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

export const createControlsSchema = object({
  ...payload,
});

export const updateControlsSchema = object({
  ...payload,
  ...params,
});

export const deleteControlsSchema = object({
  ...params,
});

export const getControlsSchema = object({
  ...params,
});

export const getUserControlsSchema = object({
  ...userParams,
});

export const getCustomerControlsSchema = object({
  ...customerParams,
});

export type CreateControlsInput = TypeOf<typeof createControlsSchema>;
export type ReadControlsInput = TypeOf<typeof getControlsSchema>;
export type UpdateControlsInput = TypeOf<typeof updateControlsSchema>;
export type DeleteControlsInput = TypeOf<typeof deleteControlsSchema>;
export type getUserControlsInput = TypeOf<typeof getUserControlsSchema>;
export type getCustomerControlsInput = TypeOf<typeof getCustomerControlsSchema>;
