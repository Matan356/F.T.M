import mongoose from "mongoose";
import { CustomerDocument } from "./customers.model";
import { UserDocument } from "./user.model";

export interface ExpenseDocument extends mongoose.Document {
  user: UserDocument["_id"];
  customer: CustomerDocument["_id"];
  price: number;
  reason: string;
  invoicing: string;
  BusinessName: string;
  image: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    invoicing: { type: String, required: true },
    price: { type: Number, required: true },
    reason: { type: String, required: true },
    BusinessName: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ExpenseModel = mongoose.model<ExpenseDocument>("expenses", expenseSchema);

export default ExpenseModel;
