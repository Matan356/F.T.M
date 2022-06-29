import mongoose from "mongoose";
import { CustomerDocument } from "./customers.model";
import { UserDocument } from "./user.model";

export interface CompletionsDocument extends mongoose.Document {
  user: UserDocument["_id"];
  customer: CustomerDocument["_id"];
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const completionsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Done", "Accepted", "Rejected", "Sent"],
      default: "Sent",
    },
  },
  {
    timestamps: true,
  }
);

const CompletionsModel = mongoose.model<CompletionsDocument>(
  "completions",
  completionsSchema
);

export default CompletionsModel;
