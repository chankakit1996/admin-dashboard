import { model, Schema } from "mongoose";
import { IProduct } from "../product";

interface IProductStat {
  _id: Schema.Types.ObjectId;
  productId: IProduct["_id"];
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  monthlyData: { month: string; totalSales: number; totalUnits: number }[];
  dailyData: { date: string; totalSales: number; totalUnits: number }[];
}

const productStatSchema = new Schema<IProductStat>(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    yearlySalesTotal: { type: Number, required: true },
    yearlyTotalSoldUnits: { type: Number, required: true },
    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
  },
  { timestamps: true }
);

const ProductStat = model<IProductStat>("ProductStat", productStatSchema);
export default ProductStat;
