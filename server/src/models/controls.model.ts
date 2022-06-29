import mongoose from "mongoose";
import { CustomerDocument } from "./customers.model";
import { UserDocument } from "./user.model";

export interface ControlsDocument extends mongoose.Document {
  user: UserDocument["_id"];
  customer: CustomerDocument["_id"];
  RegisteredCustomers: number;
  ActualCustomers: number;
  AmountOfDishes: number;
  dliveryTime: string;
  mealTime: string;
  temperatures: {
    protein: number;
    vegetable: number;
    carbohydrate: number;
  };
  weight: {
    protein: number;
    vegetable: number;
    carbohydrate: number;
  };
  amountOfBreads: number;
  amountOfFruits: number;
  badSmell: boolean;
  approvedByDietitian: boolean;
  existingMenu: boolean;
  menuAdjustment: boolean;
  vegetarian: {
    valid: boolean;
    amount: number;
  };
  vegetarianDish: {
    valid: boolean;
    amount: number;
  };
  supplyProblems: {
    valid: boolean;
    description: string;
  };
  revisited: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const controlsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    RegisteredCustomers: { type: Number, required: true },
    ActualCustomers: { type: Number, required: true },
    AmountOfDishes: { type: Number, required: true },
    dliveryTime: { type: String, required: true },
    mealTime: { type: String, required: true },
    temperatures: { type: Object, required: true },
    weight: { type: Object, required: true },
    amountOfBreads: { type: Number, required: true },
    amountOfFruits: { type: Number, required: true },
    badSmell: { type: Boolean, required: true },
    approvedByDietitian: { type: Boolean, required: true },
    existingMenu: { type: Boolean, required: true },
    menuAdjustment: { type: Boolean, required: true },
    vegetarian: { type: Object, required: true },
    vegetarianDish: { type: Object, required: true },
    supplyProblems: { type: Object, required: true },
    revisited: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const ControlsModel = mongoose.model<ControlsDocument>(
  "controls",
  controlsSchema
);

export default ControlsModel;
