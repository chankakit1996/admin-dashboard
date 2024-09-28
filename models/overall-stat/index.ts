import { Schema, model } from "mongoose";

export type IMonthlyData = {
  month: string;
  totalSales: number;
  totalUnits: number;
  _id: string;
};

export type IDailyData = {
  date: string;
  totalSales: number;
  totalUnits: number;
  _id: string;
};

export type ISalesByCategory = {
  shoes: number;
  clothing: number;
  accessories: number;
  misc: number;
};

export interface IOverallStat {
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: IMonthlyData[];
  dailyData: IDailyData[];
  salesByCategory: ISalesByCategory;
}

const monthlyDataSchema = new Schema<IMonthlyData>({
  month: { type: String, required: true },
  totalSales: { type: Number, required: true },
  totalUnits: { type: Number, required: true },
});

const dailyDataSchema = new Schema<IDailyData>({
  date: { type: String, required: true },
  totalSales: { type: Number, required: true },
  totalUnits: { type: Number, required: true },
});

const salesByCategorySchema = new Schema<ISalesByCategory>({
  shoes: { type: Number, required: true },
  clothing: { type: Number, required: true },
  accessories: { type: Number, required: true },
  misc: { type: Number, required: true },
});

const overallStatSchema = new Schema<IOverallStat>(
  {
    totalCustomers: { type: Number, required: true },
    yearlySalesTotal: { type: Number, required: true },
    yearlyTotalSoldUnits: { type: Number, required: true },
    year: { type: Number, required: true },
    monthlyData: { type: [monthlyDataSchema], required: true },
    dailyData: { type: [dailyDataSchema], required: true },
    salesByCategory: { type: salesByCategorySchema, required: true },
  },
  { timestamps: true }
);

const OverallStat = model<IOverallStat>("OverallStat", overallStatSchema);
export default OverallStat;
