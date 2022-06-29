import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface EventsDocument extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
}

const eventsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: { type: String, required: true },
    title: { type: String, required: true },
    startDate: { type: Number, required: true },
    endDate: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const EventsModel = mongoose.model<EventsDocument>("Events", eventsSchema);

export default EventsModel;
