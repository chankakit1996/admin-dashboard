import mongoose, { Schema } from "mongoose";

export interface ITransaction {
  _id: Schema.Types.ObjectId;
  userId: string;
  cost: string;
  products: Schema.Types.ObjectId[];
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    cost: { type: String, required: true },
    products: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);
export default Transaction;
