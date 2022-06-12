import mongoose from "mongoose";
import { StandardsDocument } from "./standards.model";
import { UserDocument } from "./user.model";

export interface PettyCashDocument extends mongoose.Document {
  user: UserDocument["_id"];
  standards: StandardsDocument['pettyCash'];
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const pettyCashSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    standards: { type: mongoose.Schema.Types.Number, ref: "Standards" },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const PettyCashModel = mongoose.model<PettyCashDocument>("pettyCash", pettyCashSchema);

export default PettyCashModel;
