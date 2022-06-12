import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface MileageDocument extends mongoose.Document {
  user: UserDocument["_id"];
  initial: number;
  final: number;
  createdAt: Date;
  updatedAt: Date;
}

const mileageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    initial: { type: Number, required: true },
    final: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const MileageModel = mongoose.model<MileageDocument>("mileages", mileageSchema);

export default MileageModel;
