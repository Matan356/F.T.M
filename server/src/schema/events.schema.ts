import { number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
    startDate: number({
      required_error: "Start date is required",
    }),
    endDate: number({
      required_error: "End date is required",
    }),
    startTime: string({
      required_error: "Start time is required",
    }),
    endTime: string({
      required_error: "End time is required",
    }),
  }), 
};

const eventParams = {
  params: object({
    eventId: string({
      required_error: "EventId is required",
    }),
  }),
};
const userParams = {
  params: object({
    userId: string({
      required_error: "userId is required",
    }),
  }),
};

export const createEventSchema = object({
  ...payload,
});

export const updateEventSchema = object({
  ...payload,
  ...eventParams,
});

export const deleteEventSchema = object({
  ...eventParams,
});

////////////////---------------------- admin controls ---------------------------/////////////////////////

export const createEventForUserSchema = object({
  ...payload,
  ...userParams,
});

export const updateEventForUserSchema = object({
  ...eventParams,
  ...userParams,
});

export const deleteEventForUserSchema = object({
  ...eventParams,
  ...userParams,
});

export type CreateEventInput = TypeOf<typeof createEventSchema>;
export type UpdateEventInput = TypeOf<typeof updateEventSchema>;
export type DeleteEventInput = TypeOf<typeof deleteEventSchema>;

////////////////---------------------- admin controls ---------------------------/////////////////////////

export type CreateEventForUserInput = TypeOf<typeof createEventForUserSchema>;
export type UpdateEventForUserInput = TypeOf<typeof updateEventSchema>;
export type DeleteEventForUserInput = TypeOf<typeof deleteEventForUserSchema>;
