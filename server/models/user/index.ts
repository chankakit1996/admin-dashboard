import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  transactions: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    password: { type: String, required: true, minlength: 5 },
    transactions: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Transaction",
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "superadmin"],
    },
    phoneNumber: { type: String, required: true, maxlength: 15 },
    city: { type: String, required: true, maxlength: 50 },
    state: { type: String, maxlength: 50 },
    country: { type: String, required: true, maxlength: 50 },
    occupation: { type: String, required: true, maxlength: 50 },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
