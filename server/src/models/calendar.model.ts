import mongoose from "mongoose";
import { EventsDocument } from "./events.model";
import { UserDocument } from "./user.model";

export interface CalenderDocument extends mongoose.Document {
  user: UserDocument["_id"];
  events: [EventsDocument];
}

const calendarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }],
});

const CalenderModel = mongoose.model<CalenderDocument>(
  "Calendars",
  calendarSchema
);

export default CalenderModel;
