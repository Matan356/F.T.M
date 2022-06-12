import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  name: string;
  type: string;
  sku: string;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["protein", "carbohydrate", "vegetable"],
    },
    sku: { type: String, required: true, unique: true },
    cost: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
