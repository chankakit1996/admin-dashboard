import { Request, Response } from "express";
import Transaction from "../../models/transaction";
import { timeout } from "../../utils";

export const getTransactions = async (request: Request, response: Response) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const {
      page = 1,
      pageSize = 20,
      sort = "{}",
      search = "",
    }: {
      page: number;
      pageSize: number;
      sort: string;
      search: string;
    } = request.query as any;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted as any)
      .skip(page * pageSize)
      .limit(pageSize)
      .lean();

    const total = await Transaction.countDocuments({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    });
    await timeout(3000);
    response.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    response.status(404).json({ message: "Transaction not found" });
  }
};
