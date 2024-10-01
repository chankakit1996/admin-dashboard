import { Router } from "express";
import { getUsers, getUser, getDashboardStats } from "../controllers/user";
import { getProducts } from "../controllers/product";
import { getTransactions } from "../controllers/transaction";
import { getSales } from "../controllers/sales";

const router = Router();

router.get("/user/:id", getUser);
router.get("/products", getProducts);
router.get("/users", getUsers);
router.get("/transactions", getTransactions);
router.get("/sales", getSales);
router.get("/dashboard-stats", getDashboardStats);

export default router;
