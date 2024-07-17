import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { order } from "../controllers/order.js";


const router = express.Router();

router.post('/order', verifyUser, order);

export default router;