import { Request, Response } from "express";
import OverallStat from "../../models/overall-stat";

export const getSales = async (req: Request, res: Response) => {
  try {
    const overallStat = await OverallStat.find();
    return res.status(200).json(overallStat[0]);
  } catch (error) {
    return res.status(500).json({ error: "Overall stat not found" });
  }
};
