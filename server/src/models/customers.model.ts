import mongoose from "mongoose";

export interface CustomerDocument extends mongoose.Document {
  authority: string;
  name: string;
  axis: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

const costomerSchema = new mongoose.Schema(
  {
    authority: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    axis: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CustomerModel = mongoose.model<CustomerDocument>(
  "costomers",
  costomerSchema
);

export default CustomerModel;