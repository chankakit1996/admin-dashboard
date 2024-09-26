import { Request, Response } from "express";
import User from "../../models/user";

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
