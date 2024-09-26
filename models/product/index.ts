import { Schema, model } from "mongoose";

export interface IProduct {
  _id: Schema.Types.ObjectId;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
}

const productSchema = new Schema<IProduct>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    supply: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);
export default Product;
