import mongoose from "mongoose";

export interface StandardsDocument extends mongoose.Document {
  pettyCash: number;
  mileage: number;
  controls: number;
  createdAt: Date;
  updatedAt: Date;
}

const standardsSchema = new mongoose.Schema(
  {
    pettyCash: { type: Number, required: true },
    mileage: { type: Number, required: true },
    controls: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

const StandardsModel = mongoose.model<StandardsDocument>("standards", standardsSchema);

export default StandardsModel;
