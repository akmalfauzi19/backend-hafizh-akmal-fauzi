import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { mytransaction, order } from "../controllers/order.js";


const router = express.Router();

router.post('/order', verifyUser, order);
router.get('/order', verifyAdmin, mytransaction);

export default router;