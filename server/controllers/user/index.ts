import { Request, Response } from "express";
import User from "../../models/user";
import OverallStat from "../../models/overall-stat";
import Transaction from "../../models/transaction";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // generalize the property to be dynamic
    const { role } = req.query;
    // exclude password from the response
    const customers = await User.find({ role }).select("-password").lean();
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({ error: "Customers not found" });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 })
      .lean();

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear }).select(
      "-salesByCategory._id"
    );

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: "Dashboard Stats not found" });
  }
};
