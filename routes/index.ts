import { Router } from "express";
import { getUser } from "../controllers/user";
import { getProducts } from "../controllers/product";
import { getUsers } from "../controllers/user";
import { getTransactions } from "../controllers/transaction";

const router = Router();

router.get("/user/:id", getUser);
router.get("/products", getProducts);
router.get("/users", getUsers);
router.get("/transactions", getTransactions);

export default router;
